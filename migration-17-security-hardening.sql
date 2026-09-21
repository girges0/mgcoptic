-- ============================================================================
-- MG COPTIC — Migration 17: Database Security Hardening & Privacy Protection
-- حماية كاملة ضد التبديل بين الحسابات بالـ ID ومنع التلاعب بالرتب أو ترقية الصلاحيات
-- ============================================================================

-- 0. التأكد من وجود كافة أعمدة المستخدمين (لتفادي أي أخطاء missing column)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone VARCHAR(30);
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS auth_type VARCHAR(30);
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS age INT DEFAULT 15;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS deleted_by TEXT DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS ban_reason TEXT DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS banned_until TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS banned_at TIMESTAMPTZ DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_users_phone ON public.users(phone);
CREATE INDEX IF NOT EXISTS idx_users_is_deleted ON public.users(is_deleted);

-- 1. تقييد استعلام بيانات المستخدمين الحساسة (الهواتف والإيميلات)
-- لا يستطيع أي طالب أو مستخدم عادي قراءة بيانات مستخدمين آخرين
-- فقط صاحب الحساب نفسه أو مدراء المنصة (admin / super_admin)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can read users" ON public.users;
DROP POLICY IF EXISTS "users can read own profile or admin can read all" ON public.users;
CREATE POLICY "users can read own profile or admin can read all" ON public.users
  FOR SELECT
  USING (
    auth.uid() = id 
    OR public.is_admin()
  );

-- منع أي مستخدم من تعديل حساب مستخدم آخر بالـ ID
DROP POLICY IF EXISTS "user can update own profile" ON public.users;
CREATE POLICY "user can update own profile" ON public.users
  FOR UPDATE
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (auth.uid() = id OR public.is_admin());

-- 2. تأمين لوحة المتصدرين (Leaderboard) لعرض الأسماء والنقاط فقط بدون الهواتف أو الإيميلات
-- استخدام SECURITY DEFINER على مستوى الـ View لتسمح للجميع برؤية الترتيب العام
-- دون السماح باستخراج أي بيانات حساسة
CREATE OR REPLACE VIEW public.leaderboard_view 
WITH (security_invoker = false) AS
SELECT 
  u.id,
  u.full_name,
  u.avatar_url,
  COALESCE(p.points, 0) AS points,
  COALESCE(p.streak_days, 1) AS streak_days,
  RANK() OVER (ORDER BY COALESCE(p.points, 0) DESC) AS rank
FROM public.users u
LEFT JOIN public.user_progress p ON u.id = p.user_id
WHERE COALESCE(u.is_deleted, false) = false
ORDER BY points DESC;

-- السماح للجميع (المسجلين والزوار) بقراءة لوحة المتصدرين
GRANT SELECT ON public.leaderboard_view TO anon, authenticated;

-- 3. سد ثغرة ترقية الرتب (Privilege Escalation) على مستوى الـ INSERT والـ UPDATE
-- منع أي مستخدم أو مشرف عادي من تغيير رتبته أو ترقية حسابه إلى admin أو super_admin
CREATE OR REPLACE FUNCTION public.protect_user_role_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- استثناء استدعاءات النظام الداخلية والـ Triggers التلقائية
  IF pg_trigger_depth() > 1 OR auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;

  -- فحص عند إنشاء حساب جديد (INSERT)
  IF TG_OP = 'INSERT' THEN
    IF NEW.role IN ('admin', 'super_admin') AND NOT public.is_super_admin() THEN
      -- إجبار الرتبة على طالب عادي إذا لم يكن المنشئ سوبر أدمن
      NEW.role := 'student';
    END IF;
    RETURN NEW;
  END IF;

  -- فحص عند تعديل الحساب (UPDATE)
  IF TG_OP = 'UPDATE' THEN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      -- التحقق الصارم: السوبر أدمن الموثق فقط هو القادر على تغيير الرتب
      IF NOT public.is_super_admin() THEN
        RAISE EXCEPTION 'غير مصرح: تعديل رتب أو صلاحيات المستخدمين محصور فقط بالسوبر أدمن (Super Admin)';
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_user_role_escalation ON public.users;
CREATE TRIGGER trg_protect_user_role_escalation
  BEFORE INSERT OR UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_user_role_escalation();

-- 4. إحكام الحماية ضد التلاعب بتقدم الطلاب (User Progress IDOR Protection)
-- منع قراءة أو كتابة أو تعديل تقدم أي طالب إلا بواسطة صاحبه الموثق بالتوكن (auth.uid())
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can read user_progress" ON public.user_progress;
DROP POLICY IF EXISTS "user can read own progress or admin" ON public.user_progress;
CREATE POLICY "user can read own progress or admin" ON public.user_progress
  FOR SELECT
  USING (
    auth.uid() = user_id 
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "user can update own progress" ON public.user_progress;
CREATE POLICY "user can update own progress" ON public.user_progress
  FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "user can insert own progress" ON public.user_progress;
CREATE POLICY "user can insert own progress" ON public.user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- 5. إحكام الحماية على تقدم الدروس (User Lesson Progress IDOR Protection)
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user can view own lesson progress" ON public.user_lesson_progress;
CREATE POLICY "user can view own lesson progress" ON public.user_lesson_progress
  FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "user can manage own lesson progress" ON public.user_lesson_progress;
CREATE POLICY "user can manage own lesson progress" ON public.user_lesson_progress
  FOR ALL
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- 6. إحكام الحماية على حل التحديات (User Challenge Progress IDOR Protection)
ALTER TABLE public.user_challenge_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user can manage own challenge progress" ON public.user_challenge_progress;
CREATE POLICY "user can manage own challenge progress" ON public.user_challenge_progress
  FOR ALL
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- تم بنجاح تفعيل أقصى درجات الحماية ضد انتحال الـ ID وتعديل الرتب
