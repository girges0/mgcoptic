-- ============================================================================
-- Migration 19: مزامنة أسماء الطلاب ومعالجة الأسماء الافتراضية
-- Migration 19: Sync Student Real Names & Trigger Enhancement
-- ============================================================================

-- 1) تحسين دالة استقبال المستخدم الجديد handle_new_user() لاستخراج الاسم الحقيقي من كافة الحقول الممكنة
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role VARCHAR(20) := 'student';
  v_full_name VARCHAR(150);
  v_age INT;
  v_phone VARCHAR(50);
  v_meta JSONB;
BEGIN
  v_meta := COALESCE(NEW.raw_user_meta_data, '{}'::JSONB);

  -- استخراج الاسم مع مراعاة كافة الاحتمالات (full_name، name، first_name + father_name، أو البريد)
  v_full_name := NULLIF(TRIM(COALESCE(
    v_meta->>'full_name',
    v_meta->>'name',
    v_meta->>'display_name',
    TRIM(CONCAT(COALESCE(v_meta->>'first_name', ''), ' ', COALESCE(v_meta->>'father_name', ''))),
    split_part(NEW.email, '@', 1)
  )), '');

  IF v_full_name IS NULL OR v_full_name IN ('مستخدم قبطي', 'طالب قبطي', 'بطل قبطي') THEN
    v_full_name := COALESCE(NULLIF(split_part(NEW.email, '@', 1), ''), 'طالب قبطي');
  END IF;

  v_age := COALESCE((v_meta->>'age')::INT, 15);
  v_phone := NULLIF(TRIM(COALESCE(v_meta->>'phone', NEW.phone, '')), '');

  INSERT INTO public.users (id, full_name, age, phone, email, role, created_at)
  VALUES (NEW.id, v_full_name, v_age, v_phone, NEW.email, v_role, COALESCE(NEW.created_at, NOW()))
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    full_name = CASE 
      WHEN EXCLUDED.full_name IS NOT NULL AND EXCLUDED.full_name NOT IN ('مستخدم قبطي', 'طالب قبطي', 'بطل قبطي') THEN EXCLUDED.full_name
      WHEN users.full_name IS NULL OR users.full_name IN ('مستخدم قبطي', 'طالب قبطي', 'بطل قبطي') THEN EXCLUDED.full_name
      ELSE users.full_name
    END,
    phone = COALESCE(EXCLUDED.phone, users.phone),
    role = users.role;

  INSERT INTO public.user_progress (user_id, hearts, points, streak_days, last_active_date)
  VALUES (NEW.id, 5, 0, 1, CURRENT_DATE)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- 2) تفعيل Trigger المستخدم الجديد
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3) تحديث وتصحيح بيانات الطلاب الموجودين مسبقاً في قاعدة البيانات تلقائياً (Backfill)
DO $$
DECLARE
  rec RECORD;
  resolved_name TEXT;
  meta JSONB;
BEGIN
  FOR rec IN 
    SELECT au.id, au.email, au.raw_user_meta_data, u.full_name AS curr_name
    FROM auth.users au
    LEFT JOIN public.users u ON u.id = au.id
  LOOP
    meta := COALESCE(rec.raw_user_meta_data, '{}'::JSONB);
    resolved_name := NULLIF(TRIM(COALESCE(
      meta->>'full_name',
      meta->>'name',
      meta->>'display_name',
      TRIM(CONCAT(COALESCE(meta->>'first_name', ''), ' ', COALESCE(meta->>'father_name', ''))),
      split_part(rec.email, '@', 1)
    )), '');

    IF resolved_name IS NOT NULL AND (rec.curr_name IS NULL OR rec.curr_name IN ('مستخدم قبطي', 'طالب قبطي', 'بطل قبطي', '')) THEN
      UPDATE public.users 
      SET full_name = resolved_name 
      WHERE id = rec.id;
    END IF;
  END LOOP;
END;
$$;
