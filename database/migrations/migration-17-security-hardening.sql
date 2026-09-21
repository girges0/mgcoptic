-- ============================================================================
-- MG COPTIC — Migration 17: Database Security Hardening & Privacy Protection
-- حماية البيانات ومنع استخراج أرقام الهواتف أو الإيميلات ومنع ترقية الصلاحيات
-- ============================================================================

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
-- منع أي مستخدم من تسجيل نفسه كـ admin أو super_admin
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

-- 4. تعزيز حماية تقدم الطلاب (User Progress)
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can read user_progress" ON public.user_progress;
DROP POLICY IF EXISTS "user can read own progress or admin" ON public.user_progress;

CREATE POLICY "user can read own progress or admin" ON public.user_progress
  FOR SELECT
  USING (
    auth.uid() = user_id 
    OR public.is_admin()
  );

-- تم بنجاح تفعيل أقصى درجات الحماية على قاعدة البيانات
