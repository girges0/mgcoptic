const { patchedChallengeIds } = require('../scratch/link_nine_words.js');

const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: 'Bearer ' + SUPABASE_KEY,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

async function patch(table, id, data) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(`Failed to patch ${table} ${id}:`, err);
    } else {
      console.log(`Successfully patched ${table} ${id} with ${JSON.stringify(data)}`);
    }
  } catch (e) {
    console.error(`Error patching ${table} ${id}:`, e.message);
  }
}

async function run() {
  console.log(`Patching ${patchedChallengeIds.length} challenges in Supabase with exact local word audio...`);
  for (const item of patchedChallengeIds) {
    await patch('challenges', item.id, { audio_url: item.sound });
  }
  console.log('Finished patching challenges in Supabase!');
}

run();
