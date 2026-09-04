-- ============================================================
-- MG COPTIC — Migration 5: Role-Based Access Control (RBAC)
-- ============================================================

-- 1) توسيع قيد role ليشمل super_admin
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE public.users ADD CONSTRAINT users_role_check CHECK (role IN ('student', 'admin', 'super_admin'));

-- 2) ترقية الحسابات الثلاثة
UPDATE public.users
SET role = 'super_admin'
WHERE email IN ('girgess07@gmail.com', 'mg@gmail.com', 'mgcoptic@gmail.com');

-- 3) دالة فحص super_admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'super_admin'
  );
$$;

-- 4) تحديث is_admin() لتشمل admin و super_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  );
$$;

-- 5) جدول صلاحيات الأدمن العادي (للمستقبل)
CREATE TABLE IF NOT EXISTS public.admin_permissions (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    permission TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, permission)
);

ALTER TABLE public.admin_permissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "super_admin can manage admin_permissions" ON public.admin_permissions;
CREATE POLICY "super_admin can manage admin_permissions" ON public.admin_permissions
  FOR ALL
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

DROP POLICY IF EXISTS "admin can read own permissions" ON public.admin_permissions;
CREATE POLICY "admin can read own permissions" ON public.admin_permissions
  FOR SELECT
  USING (auth.uid() = user_id OR public.is_super_admin());

-- 6) دالة has_permission
CREATE OR REPLACE FUNCTION public.has_permission(permission_name text)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
DECLARE
  v_role VARCHAR(20);
BEGIN
  SELECT role INTO v_role FROM public.users WHERE id = auth.uid();
  IF v_role = 'super_admin' THEN
    RETURN true;
  ELSIF v_role = 'admin' THEN
    RETURN EXISTS (
      SELECT 1 FROM public.admin_permissions
      WHERE user_id = auth.uid() AND permission = permission_name
    );
  ELSE
    RETURN false;
  END IF;
END;
$$;

-- 7) تحديث trigger تسجيل المستخدمين الجدد
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role VARCHAR(20) := 'student';
  v_full_name VARCHAR(100);
  v_age INT;
BEGIN
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1), 'مستخدم قبطي');
  v_age := COALESCE((NEW.raw_user_meta_data->>'age')::INT, 15);

  INSERT INTO public.users (id, full_name, age, email, role, created_at)
  VALUES (NEW.id, v_full_name, v_age, NEW.email, v_role, COALESCE(NEW.created_at, NOW()))
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      role = users.role; -- الحفاظ على رتبة المستخدم الحالية في قاعدة البيانات بدون أي تغيير

  INSERT INTO public.user_progress (user_id, hearts, points, streak_days, last_active_date)
  VALUES (NEW.id, 5, 0, 1, CURRENT_DATE)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- 8) تبسيط سياسة حذف المستخدمين (is_admin أصلاً بقت شاملة super_admin)
DROP POLICY IF EXISTS "admin can delete user" ON public.users;
CREATE POLICY "admin can delete user" ON public.users
  FOR DELETE
  USING (public.is_admin());

-- 9) حماية ترقية الرتب — محصورة بـ super_admin، مع استثناء استدعاءات النظام الداخلية (زي trigger handle_new_user) عبر فحص عمق الترايجر
CREATE OR REPLACE FUNCTION public.protect_user_role_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF pg_trigger_depth() > 1 THEN
    RETURN NEW;
  END IF;

  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF NOT public.is_super_admin() THEN
      RAISE EXCEPTION 'غير مصرح: تعديل رتب أو صلاحيات المستخدمين محصور فقط بالسوبر أدمن (Super Admin)';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_user_role_escalation ON public.users;
CREATE TRIGGER trg_protect_user_role_escalation
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_user_role_escalation();
