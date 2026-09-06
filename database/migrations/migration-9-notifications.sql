-- ============================================================================
-- Migration 9: Push Notifications Events, Snapshots & Automated Cron Procedures
-- ============================================================================

-- 1) جدول أحداث الإشعارات: أي حدث محتاج إشعار بيتسجل هنا
CREATE TABLE IF NOT EXISTS public.notification_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(30) NOT NULL CHECK (event_type IN (
        'welcome', 'rank_change', 'daily_reminder', 'new_content',
        'achievement', 'admin_broadcast', 'hearts_refilled'
    )),
    target_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE, -- NULL يعني للجميع (broadcast)
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    deep_link TEXT, -- مسار داخل التطبيق يفتح عند الضغط على الإشعار (مثال: /learn?lesson=5)
    status VARCHAR(15) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sent','failed')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMPTZ
);

-- فهارس للبحث السريع
CREATE INDEX IF NOT EXISTS idx_notification_events_status ON public.notification_events(status, created_at);
CREATE INDEX IF NOT EXISTS idx_notification_events_target ON public.notification_events(target_user_id);

ALTER TABLE public.notification_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin can manage notification_events" ON public.notification_events;
CREATE POLICY "admin can manage notification_events" ON public.notification_events
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "user can read own notifications" ON public.notification_events;
CREATE POLICY "user can read own notifications" ON public.notification_events
  FOR SELECT USING (auth.uid() = target_user_id OR target_user_id IS NULL OR public.is_admin());

-- السماح للمستخدم الجديد بإنشاء إشعار ترحيبي لنفسه فور التسجيل
DROP POLICY IF EXISTS "user can insert own welcome notification" ON public.notification_events;
CREATE POLICY "user can insert own welcome notification" ON public.notification_events
  FOR INSERT WITH CHECK (
    (auth.uid() = target_user_id AND event_type = 'welcome') 
    OR public.is_admin()
  );

-- 2) جدول لتتبع آخر ترتيب معروف لكل طالب (عشان نكتشف تغيّر الترتيب)
CREATE TABLE IF NOT EXISTS public.user_rank_snapshot (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    last_rank INT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE public.user_rank_snapshot ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin manage rank_snapshot" ON public.user_rank_snapshot;
CREATE POLICY "admin manage rank_snapshot" ON public.user_rank_snapshot
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3) دالة تحسب الترتيب الحالي لكل الطلاب وتنشئ إشعار عند تغيّر ملحوظ
CREATE OR REPLACE FUNCTION public.check_rank_changes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN (
    SELECT up.user_id, u.full_name,
           RANK() OVER (ORDER BY up.points DESC) AS current_rank
    FROM public.user_progress up
    JOIN public.users u ON u.id = up.user_id
    WHERE u.role = 'student'
  ) LOOP
    -- أول مرة: خزّن بس بدون إشعار
    IF NOT EXISTS (SELECT 1 FROM public.user_rank_snapshot WHERE user_id = rec.user_id) THEN
      INSERT INTO public.user_rank_snapshot (user_id, last_rank) VALUES (rec.user_id, rec.current_rank);
      CONTINUE;
    END IF;

    -- لو دخل التوب 10 لأول مرة (كان أكبر من 10 وبقى 10 أو أقل)
    IF rec.current_rank <= 10 AND (SELECT last_rank FROM public.user_rank_snapshot WHERE user_id = rec.user_id) > 10 THEN
      INSERT INTO public.notification_events (event_type, target_user_id, title, body, deep_link)
      VALUES ('rank_change', rec.user_id, 'تهانينا! 🏆', 'دخلت قائمة أفضل 10 طلاب على المنصة!', '/leaderboard');
    END IF;

    UPDATE public.user_rank_snapshot SET last_rank = rec.current_rank, updated_at = now() WHERE user_id = rec.user_id;
  END LOOP;
END;
$$;

-- 4) دالة تنشئ تذكير يومي لمن لم ينشط اليوم
CREATE OR REPLACE FUNCTION public.create_daily_reminders()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notification_events (event_type, target_user_id, title, body, deep_link)
  SELECT 'daily_reminder', up.user_id, 'حافظ على تتابعك! 🔥',
         'ماذا تنتظر؟ ذاكر الآن لتحافظ على سلسلة أيامك المتتالية.', '/learn'
  FROM public.user_progress up
  JOIN public.users u ON u.id = up.user_id
  WHERE u.role = 'student'
    AND (up.last_active_date IS NULL OR up.last_active_date < CURRENT_DATE)
    AND NOT EXISTS (
      SELECT 1 FROM public.notification_events ne
      WHERE ne.target_user_id = up.user_id AND ne.event_type = 'daily_reminder'
        AND ne.created_at::date = CURRENT_DATE
    );
END;
$$;

-- 5) جدولة المهام عبر pg_cron (إذا كانت الإضافة مفعّلة في Supabase)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    -- فحص تغيّر الترتيب كل ساعة
    PERFORM cron.unschedule('check-rank-changes-hourly') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'check-rank-changes-hourly');
    PERFORM cron.schedule('check-rank-changes-hourly', '0 * * * *', 'SELECT public.check_rank_changes();');

    -- إنشاء تذكيرات يومية الساعة 6 مساءً بتوقيت القاهرة (16:00 بالتوقيت العالمي UTC)
    PERFORM cron.unschedule('create-daily-reminders-6pm') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'create-daily-reminders-6pm');
    PERFORM cron.schedule('create-daily-reminders-6pm', '0 16 * * *', 'SELECT public.create_daily_reminders();');
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'pg_cron not enabled or permission denied: %', SQLERRM;
END;
$$;
