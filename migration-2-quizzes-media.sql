-- ============================================================
-- Coptic Learning Platform — Migration 2
-- (يُنفَّذ بعد schema.sql — يضيف: الاختبارات، صور المفردات، تخزين الملفات، ترتيب المفردات)
-- شغّله في: Supabase Dashboard > SQL Editor > New query
-- ملحوظة: الملف ده آمن تشغّله أكتر من مرة (idempotent) — لو أي جزء كان
-- اتنفّذ قبل كده، مش هيديك خطأ "already exists".
-- ============================================================

-- ---------- 1) صورة لكل كلمة ----------
alter table vocabulary add column if not exists image_url text;

-- ---------- 2) جدول أسئلة الاختبارات ----------
create table if not exists quiz_questions (
  id            bigint generated always as identity primary key,
  type          text not null check (type in ('mcq','essay')),  -- اختيار من متعدد / مقالي
  question      text not null,          -- نص السؤال
  options       jsonb,                  -- لأسئلة الاختيار من متعدد: ["اختيار 1","اختيار 2",...]
  correct_index int,                    -- رقم الاختيار الصحيح (0-based) لأسئلة الـ mcq
  model_answer  text,                   -- إجابة نموذجية لأسئلة المقالي (اختياري)
  category      text default 'عام',    -- تصنيف السؤال، مثال: حروف / مفردات / قواعد
  sort_order    int not null default 0,
  created_at    timestamptz default now()
);

alter table quiz_questions enable row level security;

drop policy if exists "public can read quiz questions" on quiz_questions;
create policy "public can read quiz questions" on quiz_questions
  for select using (true);

drop policy if exists "authenticated can insert quiz questions" on quiz_questions;
create policy "authenticated can insert quiz questions" on quiz_questions
  for insert to authenticated with check (true);

drop policy if exists "authenticated can update quiz questions" on quiz_questions;
create policy "authenticated can update quiz questions" on quiz_questions
  for update to authenticated using (true);

drop policy if exists "authenticated can delete quiz questions" on quiz_questions;
create policy "authenticated can delete quiz questions" on quiz_questions
  for delete to authenticated using (true);

-- ============================================================
-- 3) تخزين الملفات (صور المفردات + ملفات الصوت)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- قراءة عامة لأي حد يزور الموقع
drop policy if exists "public can read media" on storage.objects;
create policy "public can read media"
  on storage.objects for select
  using (bucket_id = 'media');

-- رفع/تعديل/حذف: المستخدمين المسجلين بس (فريق الداشبورد)
drop policy if exists "authenticated can upload media" on storage.objects;
create policy "authenticated can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "authenticated can update media" on storage.objects;
create policy "authenticated can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

drop policy if exists "authenticated can delete media" on storage.objects;
create policy "authenticated can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- ============================================================
-- 4) ترتيب المفردات (نفس فكرة ترتيب الحروف)
-- ============================================================

-- إضافة عمود الترتيب لجدول المفردات
alter table vocabulary add column if not exists sort_order int not null default 0;

-- تعبئة الترتيب الحالي بناءً على ترتيب الإضافة القديم
-- (بما إن الموقع كان بيرتب المفردات بتاريخ الإضافة، وده بيطابق ترتيب الـ id تصاعديًا،
--  فبنخلي sort_order = id عشان الكلمات الموجودة تفضل بنفس ترتيبها الحالي بالظبط)
update vocabulary set sort_order = id where sort_order = 0;

-- ١) إضافة مستوى الصعوبة لكل سؤال اختبار
alter table quiz_questions add column if not exists difficulty text default 'medium';

-- ١-ب) الوقت المخصص لكل سؤال، بقى خاص بكل سؤال لوحده (مش إعداد عام واحد لكل الاختبار)
alter table quiz_questions add column if not exists time_seconds int not null default 15;

-- ٢) جدول إعدادات الاختبار (صف ثابت واحد id=1 بيتحدّث مش بيتكرر)
-- ملحوظة: مفيش عمود وقت هنا؛ الوقت بقى لكل سؤال لوحده في عمود time_seconds فوق
create table if not exists quiz_settings (
  id integer primary key default 1,
  questions_count integer not null default 10
);

insert into quiz_settings (id, questions_count)
values (1, 10)
on conflict (id) do nothing;

-- ٣) صلاحيات RLS للجدول الجديد (لو مفعّل عندك RLS زي باقي الجداول)
-- عدّل شرط الكتابة (auth.role() = 'authenticated') لو باقي جداولك (زي quiz_questions) مستخدمة شرط مختلف
alter table quiz_settings enable row level security;

drop policy if exists "quiz_settings_public_read" on quiz_settings;
create policy "quiz_settings_public_read"
  on quiz_settings for select
  using (true);

drop policy if exists "quiz_settings_admin_write" on quiz_settings;
create policy "quiz_settings_admin_write"
  on quiz_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');






  -- ============================================================
-- Coptic Learning Platform — Migration 3
-- (يُنفَّذ بعد migration-2 — بيخلي "عدد الأسئلة" يتحدد لكل فئة
--  (تصنيف) على حدة، بدل ما يكون رقم واحد شامل لكل الاختبار)
-- شغّله في: Supabase Dashboard > SQL Editor > New query
-- ملحوظة: الملف ده آمن تشغّله أكتر من مرة (idempotent)
-- ============================================================

create table if not exists quiz_category_settings (
  category        text primary key,
  questions_count int not null default 5
);

alter table quiz_category_settings enable row level security;

drop policy if exists "quiz_category_settings_public_read" on quiz_category_settings;
create policy "quiz_category_settings_public_read"
  on quiz_category_settings for select
  using (true);

drop policy if exists "quiz_category_settings_admin_write" on quiz_category_settings;
create policy "quiz_category_settings_admin_write"
  on quiz_category_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- تعبئة أولية: فئة لكل تصنيف موجود فعلًا في أسئلة الاختبار، بعدد ٥ كبداية
-- (تقدر تغيّر العدد لكل فئة بعدين من لوحة التحكم)
insert into quiz_category_settings (category, questions_count)
select distinct coalesce(category, 'عام'), 5 from quiz_questions
on conflict (category) do nothing;

-- ملحوظة: quiz_settings.questions_count بقى مش مستخدم في الموقع ولا لوحة
-- التحكم بعد دلوقتي (العدد بقى لكل فئة لوحدها)، لكن سيبنا الجدول من غير
-- حذف عشان منكسرش حاجة لو فيه كود قديم بيقراه.




-- ============================================================
-- Coptic Learning Platform — Migration 4
-- (يُنفَّذ بعد migration-2 و migration-3 — بيضيف: رابط اختياري
--  لكل سؤال اختبار، يظهر تحت السؤال في صفحة الاختبار)
-- شغّله في: Supabase Dashboard > SQL Editor > New query
-- ملحوظة: الملف ده آمن تشغّله أكتر من مرة (idempotent)
-- ============================================================

-- رابط اختياري لكل سؤال (مثلاً رابط لمصدر، فيديو، أو صفحة فيها شرح إضافي)
alter table quiz_questions add column if not exists link_url text;

-- النص اللي هيظهر للرابط (اختياري) — لو فاضي، هيظهر نص افتراضي في الموقع
alter table quiz_questions add column if not exists link_label text;

-- ملحوظة: القواعد (grammar_sections) مش محتاجة عمود جديد للرابط، لأن محرر
-- القواعد في لوحة التحكم بقى فيه زرار "🔗 رابط" بيضيف الرابط جوه محتوى
-- القسم نفسه (content_html)، ودي أنسب طريقة لأن القواعد أصلاً نص منسّق (Rich Text).

-- ============================================================
-- Coptic Learning Platform — Migration 5
-- (يُنفَّذ بعد migration-2 — يضيف: جدول "المقالات" اللي تظهر
--  في الصفحة الرئيسية للموقع، بترتيب مُحدَّد بالظبط، وكل مقالة
--  ممكن تحتوي نص + صورة + رابط + ملف، بنفس محرر القواعد بالظبط)
-- شغّله في: Supabase Dashboard > SQL Editor > New query
-- ملحوظة: الملف ده آمن تشغّله أكتر من مرة (idempotent) — لو أي جزء
-- كان اتنفّذ قبل كده، مش هيديك خطأ "already exists".
-- ============================================================

create table if not exists articles (
  id            bigint generated always as identity primary key,
  title         text not null,
  content_html  text not null default '',  -- نفس محرر القواعد بالظبط: نص، صور، ملفات مرفوعة، وروابط
  sort_order    int not null default 0,    -- بيحدد مكان المقالة بالظبط في الصفحة الرئيسية (الرقم الأصغر يظهر فوق)
  is_published  boolean not null default true,  -- منشور / مسودة (المسودة تظهر في لوحة التحكم بس)
  created_at    timestamptz default now()
);

alter table articles enable row level security;

-- قراءة عامة: الزوار يشوفوا بس المقالات "المنشورة"
drop policy if exists "public can read published articles" on articles;
create policy "public can read published articles" on articles
  for select using (is_published = true);

-- فريق الداشبورد (المسجلين) يشوفوا كل المقالات، حتى المسودات
drop policy if exists "authenticated can read all articles" on articles;
create policy "authenticated can read all articles" on articles
  for select to authenticated using (true);

drop policy if exists "authenticated can insert articles" on articles;
create policy "authenticated can insert articles" on articles
  for insert to authenticated with check (true);

drop policy if exists "authenticated can update articles" on articles;
create policy "authenticated can update articles" on articles
  for update to authenticated using (true);

drop policy if exists "authenticated can delete articles" on articles;
create policy "authenticated can delete articles" on articles
  for delete to authenticated using (true);

-- ملحوظة: صور وملفات المقالات هتترفع على نفس bucket التخزين الموجود
-- بالفعل "media" (اللي عملناه في migration-2)، فمفيش داعي لأي إعداد
-- تخزين جديد — سياسات الرفع/القراءة عليه شغالة أصلاً.