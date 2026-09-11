const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';

async function check() {
  for (const t of ['units', 'lessons', 'challenges', 'chests']) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${t}?select=id`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      });
      const d = await res.json();
      console.log(t, Array.isArray(d) ? d.length : d);
    } catch (e) {
      console.error(t, e.message);
    }
  }
}
check();
