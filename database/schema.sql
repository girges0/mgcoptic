-- ============================================================
-- Coptic Learning Platform — Supabase Schema
-- شغّل هذا الملف كامل مرة واحدة في: Supabase Dashboard > SQL Editor > New query
-- ملحوظة: الملف ده آمن تشغّله أكتر من مرة (idempotent) — لو كنت شغّلته
-- قبل كده، مش هيديك خطأ "already exists" ومش هيكرر البيانات.
-- ============================================================

-- ---------- 1) جدول الحروف ----------
create table if not exists letters (
  id           bigint generated always as identity primary key,
  glyph        text not null,          -- الحرف القبطي، مثال: Ⲁⲁ
  name         text not null,          -- الاسم بالعربي، مثال: ألفا
  translit     text,                   -- الحرف المقابل تقريبًا، مثال: أَ
  sound        text,                   -- وصف النطق بالعربي
  num          text,                   -- القيمة العددية، مثال: ١٠٠  أو  -
  audio_filename text,                 -- اسم ملف الصوت، مثال: alfa.mp3
  is_native    boolean default false,  -- حرف قبطي أصيل (مش يوناني الأصل)
  sort_order   int not null default 0,
  created_at   timestamptz default now()
);

-- ---------- 2) جدول المفردات ----------
create table if not exists vocabulary (
  id           bigint generated always as identity primary key,
  coptic       text not null,
  translit     text,
  meaning      text not null,
  category     text default 'عام',
  audio_filename text,
  status       text not null default 'approved',  -- approved / pending
  created_by   uuid references auth.users(id),
  created_at   timestamptz default now()
);

-- ---------- 3) جدول القواعد ----------
create table if not exists grammar_sections (
  id           bigint generated always as identity primary key,
  title        text not null,
  content_html text not null,   -- نفس الـ HTML اللي كان جوه grammarSections
  sort_order   int not null default 0,
  created_at   timestamptz default now()
);

-- ============================================================
-- Row Level Security: قراءة مفتوحة للجميع (الموقع العام)
-- وكتابة/تعديل/حذف للمستخدمين المسجلين بس (الداشبورد)
-- ============================================================

alter table letters enable row level security;
alter table vocabulary enable row level security;
alter table grammar_sections enable row level security;

-- قراءة عامة (أي حد يزور الموقع، من غير تسجيل دخول)
drop policy if exists "public can read letters" on letters;
create policy "public can read letters" on letters
  for select using (true);

drop policy if exists "public can read approved vocabulary" on vocabulary;
create policy "public can read approved vocabulary" on vocabulary
  for select using (status = 'approved');

drop policy if exists "public can read grammar" on grammar_sections;
create policy "public can read grammar" on grammar_sections
  for select using (true);

-- كتابة/تعديل/حذف: للمستخدمين المسجلين بس (فريقك في الداشبورد)
drop policy if exists "authenticated can insert letters" on letters;
create policy "authenticated can insert letters" on letters
  for insert to authenticated with check (true);

drop policy if exists "authenticated can update letters" on letters;
create policy "authenticated can update letters" on letters
  for update to authenticated using (true);

drop policy if exists "authenticated can delete letters" on letters;
create policy "authenticated can delete letters" on letters
  for delete to authenticated using (true);

drop policy if exists "authenticated can insert vocabulary" on vocabulary;
create policy "authenticated can insert vocabulary" on vocabulary
  for insert to authenticated with check (true);

drop policy if exists "authenticated can update vocabulary" on vocabulary;
create policy "authenticated can update vocabulary" on vocabulary
  for update to authenticated using (true);

drop policy if exists "authenticated can delete vocabulary" on vocabulary;
create policy "authenticated can delete vocabulary" on vocabulary
  for delete to authenticated using (true);

-- ملاحظة: عشان أعضاء الفريق يشوفوا حتى الكلمات "pending" في الداشبورد
drop policy if exists "authenticated can read all vocabulary" on vocabulary;
create policy "authenticated can read all vocabulary" on vocabulary
  for select to authenticated using (true);

drop policy if exists "authenticated can insert grammar" on grammar_sections;
create policy "authenticated can insert grammar" on grammar_sections
  for insert to authenticated with check (true);

drop policy if exists "authenticated can update grammar" on grammar_sections;
create policy "authenticated can update grammar" on grammar_sections
  for update to authenticated using (true);

drop policy if exists "authenticated can delete grammar" on grammar_sections;
create policy "authenticated can delete grammar" on grammar_sections
  for delete to authenticated using (true);

-- ============================================================
-- تعبئة البيانات الحالية (نفس محتوى الموقع دلوقتي بالظبط)
-- ملحوظة: كل إدراج هنا بيتنفّذ بس لو الجدول لسه فاضي، عشان
-- لو شغّلت الملف تاني ماتتكررش نفس البيانات مرتين
-- ============================================================

insert into letters (glyph, name, translit, sound, num, audio_filename, sort_order)
select * from (values
('Ⲁⲁ','ألفا','أَ','كألف مفتوحة، مثل الألف في «باب»','١','alfa.mp3',1),
('Ⲃⲃ','فيدا','ڤ','صوت بين الباء والفاء','٢',null,2),
('Ⲅⲅ','غاما','غ','كالجيم الفصيحة، وتميل للغين قبل بعض الحروف','٣',null,3),
('Ⲇⲇ','دلدا','د','كالدال','٤',null,4),
('Ⲉⲉ','إي','إ','حركة قصيرة، كالفتحة الخفيفة','٥',null,5),
('Ⲋⲋ','سو','—','حرف رقمي فقط (قيمته ٦)، نادرًا ما يُستخدم في الكتابة','٦',null,6),
('Ⲍⲍ','زاتا','ز','كالزاي','٧',null,7),
('Ⲏⲏ','هيتا','يه','حركة ممدودة، مثل «يه» الممدودة','٨',null,8),
('Ⲑⲑ','ثيتا','ث','كالثاء','٩',null,9),
('Ⲓⲓ','إيوتا','ي','كالياء','١٠',null,10),
('Ⲕⲕ','كابا','ك','كالكاف','٢٠',null,11),
('Ⲗⲗ','لابدا','ل','كاللام','٣٠',null,12),
('Ⲙⲙ','مي','م','كالميم','٤٠',null,13),
('Ⲛⲛ','ني','ن','كالنون','٥٠',null,14),
('Ⲝⲝ','كسي','كس','مثل «كس»','٦٠',null,15),
('Ⲟⲟ','أو','ُأ','حركة قصيرة كالضمة','٧٠',null,16),
('Ⲡⲡ','بي','ب','كالباء','٨٠',null,17),
('Ⲣⲣ','رو','ر','كالراء','١٠٠',null,18),
('Ⲥⲥ','سيما','س','كالسين','٢٠٠',null,19),
('Ⲧⲧ','تاف','ت','كالتاء','٣٠٠',null,20),
('Ⲩⲩ','إبسيلون','و','كالواو، أو كحركة مدّية ممدودة حسب الموضع','٤٠٠',null,21),
('Ⲫⲫ','في','ف','فاء مفخّمة','٥٠٠',null,22),
('Ⲭⲭ','خي','خ','كالخاء','٦٠٠',null,23),
('Ⲯⲯ','إبسي','بس','مثل «بس»','٧٠٠',null,24),
('Ⲱⲱ','أوميغا','أو','حركة ممدودة مثل «أوو»','٨٠٠',null,25),
('Ϣϣ','شاي','ش','كالشين','٩٠٠',null,26),
('Ϥϥ','فاي','ف','فاء خفيفة','-',null,27),
('Ϧϧ','خاي','خ','خاء حلقية أعمق من «خي»','-',null,28),
('Ϩϩ','هوري','ه','كالهاء','-',null,29),
('Ϫϫ','جانجا','ج','كالجيم المصرية أو «دج»','-',null,30),
('Ϭϭ','تشيما','تش','مثل «تش»','-',null,31),
('Ϯϯ','تي','تي','مقطع مركّب «تي»','-',null,32)
) as t(glyph,name,translit,sound,num,audio_filename,sort_order)
where not exists (select 1 from letters);

-- ملاحظة: عمود is_native لسه فاضي (false للكل). راجعه وحدد الـ 7 حروف
-- القبطية الأصيلة (مش يونانية الأصل) بعد ما نرفع البيانات، عادة هي:
-- Ϣ ϣ, Ϥ ϥ, Ϧ ϧ, Ϩ ϩ, Ϫ ϫ, Ϭ ϭ, Ϯ ϯ

insert into vocabulary (coptic, translit, meaning, category)
select * from (values
('Ⲫϯ','إفنوتي','الله / الرب','طقسية'),
('Ⲡⲓϭⲟⲓⲥ','بيشويس','الرب (السيد)','طقسية'),
('Ⲁⲙⲏⲛ','آمين','آمين','طقسية'),
('Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ','أليلويا','هلليلويا','طقسية'),
('Ⲉⲕⲕⲗⲏⲥⲓⲁ','إكليسيا','كنيسة','طقسية'),
('Ⲥⲧⲁⲩⲣⲟⲥ','إسطاوروس','صليب','طقسية'),
('Ⲱⲟⲩ','أُو','مجد','طقسية'),
('Ⲉⲓⲣⲏⲛⲏ','إيريني','سلام','طقسية'),
('Ⲉⲓⲱⲧ','إيوت','أب','عائلة'),
('Ⲙⲁⲩ','ماو','أم','عائلة'),
('Ϣⲏⲣⲓ','شيري','ابن','عائلة'),
('Ϣⲉⲣⲓ','شَيري','ابنة','عائلة'),
('Ⲣⲱⲙⲓ','رومي','إنسان / رجل','عام'),
('Ⲥϩⲓⲙⲓ','سحيمي','امرأة','عام'),
('Ⲏⲓ','إي','بيت','عام'),
('Ⲙⲱⲟⲩ','موو','ماء','عام'),
('Ⲱⲓⲕ','ويك','خبز','عام'),
('Ⲟⲩⲱⲙ','أووم','يأكل','أفعال'),
('Ⲥⲱ','سو','يشرب','أفعال'),
('Ⲟⲩⲁⲓ','واي','واحد (١)','أرقام'),
('Ⲥⲛⲟⲩϯ','سنوتي','اثنان (٢)','أرقام'),
('Ϣⲟⲙⲧ','شومت','ثلاثة (٣)','أرقام'),
('Ⲉϥⲧⲟⲟⲩ','إفتوو','أربعة (٤)','أرقام'),
('Ϯⲟⲩ','تيو','خمسة (٥)','أرقام'),
('Ⲥⲟⲟⲩ','سوو','ستة (٦)','أرقام'),
('Ϣⲁϣϥ','شاشف','سبعة (٧)','أرقام'),
('Ϣⲙⲏⲛ','شمين','ثمانية (٨)','أرقام'),
('Ⲯⲓⲧ','بسيت','تسعة (٩)','أرقام'),
('Ⲙⲏⲧ','ميت','عشرة (١٠)','أرقام')
) as t(coptic,translit,meaning,category)
where not exists (select 1 from vocabulary);

insert into grammar_sections (title, content_html, sort_order)
select * from (values
('أدوات التعريف والتنكير',
'<p>في اللغة القبطية تسبق أداة التعريف الاسم مباشرة، وتختلف حسب النوع والعدد:</p>
<table class="gtable">
<tr><th>الحالة</th><th>الأداة</th><th>مثال</th></tr>
<tr><td>مذكر مفرد</td><td class="coptic">Ⲡ- / Ⲡⲓ-</td><td class="coptic">ⲡⲓⲣⲱⲙⲓ (الرجل)</td></tr>
<tr><td>مؤنث مفرد</td><td class="coptic">Ⲧ- / Ϯ-</td><td class="coptic">ϯⲥϩⲓⲙⲓ (المرأة)</td></tr>
<tr><td>جمع (كلا النوعين)</td><td class="coptic">Ⲛⲓ-</td><td class="coptic">ⲛⲓⲣⲱⲙⲓ (الرجال)</td></tr>
<tr><td>نكرة مفرد</td><td class="coptic">Ⲟⲩ-</td><td class="coptic">ⲟⲩⲣⲱⲙⲓ (رجل)</td></tr>
<tr><td>نكرة جمع</td><td class="coptic">Ϩⲁⲛ-</td><td class="coptic">ϩⲁⲛⲣⲱⲙⲓ (رجال)</td></tr>
</table>
<p class="hint" style="margin-top:10px;">الجمع غالبًا يظهر أساسًا في أداة التعريف، مع تغييرات صرفية بسيطة على بعض الأسماء.</p>', 1),
('الضمائر المنفصلة (المستقلة)',
'<table class="gtable">
<tr><th>الضمير</th><th>القبطية</th><th>النطق</th></tr>
<tr><td>أنا</td><td class="coptic">Ⲁⲛⲟⲕ</td><td>أَنُك</td></tr>
<tr><td>أنتَ</td><td class="coptic">Ⲛⲑⲟⲕ</td><td>إنثُك</td></tr>
<tr><td>أنتِ</td><td class="coptic">Ⲛⲑⲟ</td><td>إنثو</td></tr>
<tr><td>هو</td><td class="coptic">Ⲛⲑⲟϥ</td><td>إنثُف</td></tr>
<tr><td>هي</td><td class="coptic">Ⲛⲑⲟⲥ</td><td>إنثُس</td></tr>
<tr><td>نحن</td><td class="coptic">Ⲁⲛⲟⲛ</td><td>أَنُن</td></tr>
<tr><td>أنتم</td><td class="coptic">Ⲛⲑⲱⲧⲉⲛ</td><td>إنثوتِن</td></tr>
<tr><td>هم</td><td class="coptic">Ⲛⲑⲱⲟⲩ</td><td>إنثوو</td></tr>
</table>', 2),
('ملاحظة حول الفعل والزمن',
'<p>القبطية تستخدم نظام "مُحوِّلات" (بادئات) قبل الفعل للدلالة على الزمن والفاعل، بدلًا من تصريف الفعل نفسه كما في العربية.
فمثلاً بادئة <span class="coptic">Ϯ-</span> تدل على المتكلم المفرد في زمن الحاضر (أنا أفعل...). هذا الموضوع من أعمق موضوعات النحو القبطي
ويُفضّل دراسته من كتاب نحو متخصص بعد إتقان الأبجدية والمفردات الأساسية.</p>', 3)
) as t(title, content_html, sort_order)
where not exists (select 1 from grammar_sections);