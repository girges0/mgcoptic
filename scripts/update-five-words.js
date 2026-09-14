const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: 'Bearer ' + SUPABASE_KEY,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

async function patch(table, id, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`Failed to patch ${table} ${id}:`, err);
  } else {
    console.log(`Patched ${table} ${id} successfully.`);
  }
}

async function run() {
  console.log('Updating 5 letters curriculum challenges in Supabase...');

  // 1. Letter 4 (Ⲇ ⲇ) -> Ⲇⲟⲝⲁ / ذوكسا / مجد
  await patch('challenges', 686, {
    correct_word: '• اسم الحرف: دلدا\n• نطق الحرف بالعربي: د أو ذ\n• قواعد النطق: الحرف الرابع. يُنطق "د" في أسماء الأعلام والكلمات القبطية، و"ذ" في الكلمات اليونانية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲇⲟⲝⲁ\n  - القبطي المعرب (نطقها): «ذوكسا»\n  - المعنى بالعربية: مجد\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)'
  });
  await patch('challenges', 690, {
    question: 'ما معنى الكلمة القبطية: Ⲇⲟⲝⲁ؟ (المعرب: «ذوكسا»)',
    coptic_display: 'Ⲇⲟⲝⲁ',
    audio_text: 'ذوكسا'
  });
  await patch('challenges', 691, {
    question: 'رتب حروف الكلمة القبطية لتكوين: مجد (المعرب: «ذوكسا»)',
    coptic_display: 'Ⲇⲟⲝⲁ',
    audio_text: 'ذوكسا',
    correct_word: 'Ⲇⲟⲝⲁ',
    tiles: ['Ⲇ', 'ⲟ', 'ⲝ', 'ⲁ']
  });
  await patch('challenge_options', 4369, { text: 'مجد' });
  await patch('challenge_options', 4368, { text: 'كرامة' });
  await patch('challenge_options', 4370, { text: 'بركة' });
  await patch('challenge_options', 4371, { text: 'نعمة' });

  // 2. Letter 6 (Ⲋ ⲋ) -> ⲋ̅ ⲛ̀ⲣⲱⲙⲓ / سوآوو إن رومي / 6 رجال
  await patch('challenges', 698, {
    correct_word: '• اسم الحرف: سو (رقم ٦)\n• نطق الحرف بالعربي: سو (الرقم 6)\n• قواعد النطق: رمز ورقم عددي قبطي يدل على الرقم ستة (6). يوضع فوقه شرطة أفقية لتمييزه كرقم، وينطق "سو".\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲋ̅ ⲛ̀ⲣⲱⲙⲓ\n  - القبطي المعرب (نطقها): «سوآوو إن رومي»\n  - المعنى بالعربية: 6 رجال\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)'
  });
  await patch('challenges', 702, {
    question: 'ما معنى الكلمة القبطية: ⲋ̅ ⲛ̀ⲣⲱⲙⲓ؟ (المعرب: «سوآوو إن رومي»)',
    coptic_display: 'ⲋ̅ ⲛ̀ⲣⲱⲙⲓ',
    audio_text: 'سوآوو إن رومي'
  });
  await patch('challenges', 703, {
    question: 'رتب حروف الكلمة القبطية لتكوين: 6 رجال (المعرب: «سوآوو إن رومي»)',
    coptic_display: 'ⲋ̅ ⲛ̀ⲣⲱⲙⲓ',
    audio_text: 'سوآوو إن رومي',
    correct_word: 'ⲋ̅ ⲛ̀ⲣⲱⲙⲓ',
    tiles: ['ⲋ̅', ' ', 'ⲛ', '̀', 'ⲣ', 'ⲱ', 'ⲙ', 'ⲓ']
  });
  await patch('challenge_options', 4384, { text: '6 رجال' });
  await patch('challenge_options', 4385, { text: '٥ رجال' });
  await patch('challenge_options', 4386, { text: '٦ نساء' });
  await patch('challenge_options', 4387, { text: '٧ رجال' });

  // 3. Letter 7 (Ⲍ ⲍ) -> Ⲍⲱⲏ / زوي / حياة
  await patch('challenges', 704, {
    correct_word: '• اسم الحرف: زاتا\n• نطق الحرف بالعربي: ز\n• قواعد النطق: الحرف السابع في الأبجدية القبطية. يُنطق دائماً حرف "ز" مثل حرف (Z) في الإنجليزية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲍⲱⲏ\n  - القبطي المعرب (نطقها): «زوي»\n  - المعنى بالعربية: حياة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)'
  });
  await patch('challenges', 708, {
    question: 'ما معنى الكلمة القبطية: Ⲍⲱⲏ؟ (المعرب: «زوي»)',
    coptic_display: 'Ⲍⲱⲏ',
    audio_text: 'زوي'
  });
  await patch('challenges', 709, {
    question: 'رتب حروف الكلمة القبطية لتكوين: حياة (المعرب: «زوي»)',
    coptic_display: 'Ⲍⲱⲏ',
    audio_text: 'زوي',
    correct_word: 'Ⲍⲱⲏ',
    tiles: ['Ⲍ', 'ⲱ', 'ⲏ']
  });
  await patch('challenge_options', 4394, { text: 'حياة' });
  await patch('challenge_options', 4393, { text: 'نور' });
  await patch('challenge_options', 4392, { text: 'حق' });
  await patch('challenge_options', 4395, { text: 'سلام' });

  // Letter 7 in Review (Lesson 166)
  await patch('challenges', 867, {
    question: 'ما معنى الكلمة: Ⲍⲱⲏ؟ (المعرب: «زوي»)',
    coptic_display: 'Ⲍⲱⲏ',
    audio_text: 'زوي'
  });
  await patch('challenge_options', 4612, { text: 'حياة' });
  await patch('challenge_options', 4613, { text: 'نور' });
  await patch('challenge_options', 4614, { text: 'حق' });
  await patch('challenge_options', 4615, { text: 'سلام' });

  // 4. Letter 8 (Ⲏ ⲏ) -> Ⲏⲓ / إي / بيت
  await patch('challenges', 710, {
    correct_word: '• اسم الحرف: هيتا\n• نطق الحرف بالعربي: ياء طويلة ممدودة\n• قواعد النطق: الحرف الثامن. حرف متحرك للكسر يُنطق ياء ممدودة وطويلة مثل (ee) في كلمة meet.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲏⲓ\n  - القبطي المعرب (نطقها): «إي»\n  - المعنى بالعربية: بيت\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)'
  });
  await patch('challenges', 714, {
    question: 'ما معنى الكلمة القبطية: Ⲏⲓ؟ (المعرب: «إي»)',
    coptic_display: 'Ⲏⲓ',
    audio_text: 'إي'
  });
  await patch('challenges', 715, {
    question: 'رتب حروف الكلمة القبطية لتكوين: بيت (المعرب: «إي»)',
    coptic_display: 'Ⲏⲓ',
    audio_text: 'إي',
    correct_word: 'Ⲏⲓ',
    tiles: ['Ⲏ', 'ⲓ']
  });
  await patch('challenge_options', 4400, { text: 'بيت' });

  // 5. Letter 9 (Ⲑ ⲑ) -> Ⲑⲁⲙⲓⲟ / ثاميو / يخلق
  await patch('challenges', 716, {
    correct_word: '• اسم الحرف: ثيتا\n• نطق الحرف بالعربي: ث أو ت\n• قواعد النطق: الحرف التاسع. يُنطق "ث" دائماً، إلا إذا سبقه حرف سيما (Ⲥ) أو حرف شاي (Ϣ) فيُنطق "ت".\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲑⲁⲙⲓⲟ\n  - القبطي المعرب (نطقها): «ثاميو»\n  - المعنى بالعربية: يخلق\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)'
  });
  await patch('challenges', 720, {
    question: 'ما معنى الكلمة القبطية: Ⲑⲁⲙⲓⲟ؟ (المعرب: «ثاميو»)',
    coptic_display: 'Ⲑⲁⲙⲓⲟ',
    audio_text: 'ثاميو'
  });
  await patch('challenges', 721, {
    question: 'رتب حروف الكلمة القبطية لتكوين: يخلق (المعرب: «ثاميو»)',
    coptic_display: 'Ⲑⲁⲙⲓⲟ',
    audio_text: 'ثاميو',
    correct_word: 'Ⲑⲁⲙⲓⲟ',
    tiles: ['Ⲑ', 'ⲁ', 'ⲙ', 'ⲓ', 'ⲟ']
  });
  await patch('challenge_options', 4411, { text: 'يخلق' });
  await patch('challenge_options', 4408, { text: 'يصنع' });
  await patch('challenge_options', 4409, { text: 'يبني' });
  await patch('challenge_options', 4410, { text: 'يعمل' });

  console.log('✅ Successfully updated all 5 words in Supabase challenges and options!');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
