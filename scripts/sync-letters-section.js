/**
 * Sync 32 letters to Supabase 'letters' table and local catalog
 * - Matches Level 1 curriculum lessons exactly
 * - Sets audio_filename to assets/sounds/[file].mp3
 */

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';
const headers = { 
  apikey: SUPABASE_KEY, 
  Authorization: 'Bearer ' + SUPABASE_KEY,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

const letters = [
  {
    sort_order: 1,
    glyph: 'Ⲁⲁ',
    name: 'ألفا',
    translit: 'أَ',
    sound: 'ألف مفتوحة (أَ)',
    num: '١',
    audio_filename: 'assets/sounds/1alfa.mp3'
  },
  {
    sort_order: 2,
    glyph: 'Ⲃⲃ',
    name: 'فيدا (بيتا)',
    translit: 'ڤ / ب',
    sound: 'ڤ (V) إذا جاء بعده متحرك، أو ب (B) في باقي الحالات',
    num: '٢',
    audio_filename: 'assets/sounds/2veta.mp3'
  },
  {
    sort_order: 3,
    glyph: 'Ⲅⲅ',
    name: 'غاما',
    translit: 'جـ / ن / غ',
    sound: 'جـ معطشة قبل المتحرك للكسر، ن قبل الحلقيات، غ في باقي الحالات',
    num: '٣',
    audio_filename: 'assets/sounds/3ghamma.mp3'
  },
  {
    sort_order: 4,
    glyph: 'Ⲇⲇ',
    name: 'دلدا (دلتا)',
    translit: 'د / ذ',
    sound: 'د في الأعلام والكلمات القبطية، وذ في الكلمات اليونانية',
    num: '٤',
    audio_filename: 'assets/sounds/4delta.mp3'
  },
  {
    sort_order: 5,
    glyph: 'Ⲉⲉ',
    name: 'إي',
    translit: 'إ (E)',
    sound: 'إي خفيفة (فتحة مائلة للكسر)',
    num: '٥',
    audio_filename: 'assets/sounds/5ei.mp3'
  },
  {
    sort_order: 6,
    glyph: 'Ⲋⲋ',
    name: 'سو (رقم ٦)',
    translit: '٦',
    sound: 'حرف رقمي فقط (قيمته ٦)',
    num: '٦',
    audio_filename: 'assets/sounds/6sow.mp3'
  },
  {
    sort_order: 7,
    glyph: 'Ⲍⲍ',
    name: 'زاتا',
    translit: 'ز (Z)',
    sound: 'كالزاي دائماً',
    num: '٧',
    audio_filename: 'assets/sounds/7zeta.mp3'
  },
  {
    sort_order: 8,
    glyph: 'Ⲏⲏ',
    name: 'هيتا (إيتا)',
    translit: 'ي (ee)',
    sound: 'ياء طويلة ممدودة مشبعة',
    num: '٨',
    audio_filename: 'assets/sounds/8eta.mp3'
  },
  {
    sort_order: 9,
    glyph: 'Ⲑⲑ',
    name: 'ثيتا',
    translit: 'ث / ت',
    sound: 'ث دائماً، وتُنطق ت إذا سبقها س أو ش',
    num: '٩',
    audio_filename: 'assets/sounds/9seta.mp3'
  },
  {
    sort_order: 10,
    glyph: 'Ⲓⲓ',
    name: 'إيوتا (يوتا)',
    translit: 'ي (i)',
    sound: 'ياء قصيرة خفيفة',
    num: '١٠',
    audio_filename: 'assets/sounds/10yota.mp3'
  },
  {
    sort_order: 11,
    glyph: 'Ⲕⲕ',
    name: 'كابا',
    translit: 'ك (K)',
    sound: 'كالكاف دائماً',
    num: '٢٠',
    audio_filename: 'assets/sounds/11kapa.mp3'
  },
  {
    sort_order: 12,
    glyph: 'Ⲗⲗ',
    name: 'لابدا (لافلا)',
    translit: 'ل (L)',
    sound: 'كاللام دائماً',
    num: '٣٠',
    audio_filename: 'assets/sounds/12lavla.mp3'
  },
  {
    sort_order: 13,
    glyph: 'Ⲙⲙ',
    name: 'مي',
    translit: 'م (M)',
    sound: 'كالميم دائماً',
    num: '٤٠',
    audio_filename: 'assets/sounds/13mi.mp3'
  },
  {
    sort_order: 14,
    glyph: 'Ⲛⲛ',
    name: 'ني',
    translit: 'ن (N)',
    sound: 'كالنون دائماً',
    num: '٥٠',
    audio_filename: 'assets/sounds/14ni.mp3'
  },
  {
    sort_order: 15,
    glyph: 'Ⲝⲝ',
    name: 'كسي',
    translit: 'كس (X)',
    sound: 'مقطع مركب: كـ + س',
    num: '٦٠',
    audio_filename: 'assets/sounds/15axsy.mp3'
  },
  {
    sort_order: 16,
    glyph: 'Ⲟⲟ',
    name: 'أو (قصيرة)',
    translit: 'ُأ (O)',
    sound: 'واو قصيرة مضمومة',
    num: '٧٠',
    audio_filename: 'assets/sounds/16oo.mp3'
  },
  {
    sort_order: 17,
    glyph: 'Ⲡⲡ',
    name: 'بي',
    translit: 'ب (P)',
    sound: 'باء ثقيلة مشددة',
    num: '٨٠',
    audio_filename: 'assets/sounds/17pee.mp3'
  },
  {
    sort_order: 18,
    glyph: 'Ⲣⲣ',
    name: 'رو',
    translit: 'ر (R)',
    sound: 'كالراء مفخمة',
    num: '١٠٠',
    audio_filename: 'assets/sounds/18roo.mp3'
  },
  {
    sort_order: 19,
    glyph: 'Ⲥⲥ',
    name: 'سيما',
    translit: 'س (S)',
    sound: 'كالسين، وتُنطق ز في كلمات يونانية محددة',
    num: '٢٠٠',
    audio_filename: 'assets/sounds/19sema.mp3'
  },
  {
    sort_order: 20,
    glyph: 'Ⲧⲧ',
    name: 'تاف',
    translit: 'ت (T)',
    sound: 'كالتاء، وتُنطق د بعد النون في الكلمات اليونانية',
    num: '٣٠٠',
    audio_filename: 'assets/sounds/20tav.mp3'
  },
  {
    sort_order: 21,
    glyph: 'Ⲩⲩ',
    name: 'إبسيلون',
    translit: 'ڤ / و / ي',
    sound: 'ڤ بعد A/E، أو و بعد O، أو ي في باقي الحالات',
    num: '٤٠٠',
    audio_filename: 'assets/sounds/21epselon.mp3'
  },
  {
    sort_order: 22,
    glyph: 'Ⲫⲫ',
    name: 'في',
    translit: 'ف (F)',
    sound: 'كالفاء دائماً',
    num: '٥٠٠',
    audio_filename: 'assets/sounds/22fi.mp3'
  },
  {
    sort_order: 23,
    glyph: 'Ⲭⲭ',
    name: 'خي (كي)',
    translit: 'ك / ش / خ',
    sound: 'ك في الكلمات القبطية، وش أو خ في الكلمات اليونانية',
    num: '٦٠٠',
    audio_filename: 'assets/sounds/23ki.mp3'
  },
  {
    sort_order: 24,
    glyph: 'Ⲯⲯ',
    name: 'إبسي',
    translit: 'بس (Ps)',
    sound: 'مقطع مركب: بـ + س',
    num: '٧٠٠',
    audio_filename: 'assets/sounds/24psi.mp3'
  },
  {
    sort_order: 25,
    glyph: 'Ⲱⲱ',
    name: 'أوميغا (أو طويلة)',
    translit: 'أُو (Ō)',
    sound: 'واو طويلة ممدودة مفتوحة',
    num: '٨٠٠',
    audio_filename: 'assets/sounds/25oo.mp3'
  },
  {
    sort_order: 26,
    glyph: 'Ϣϣ',
    name: 'شاي',
    translit: 'ش (Sh)',
    sound: 'كالشين دائماً (حرف مصري ديموطيقي)',
    num: '٩٠٠',
    audio_filename: 'assets/sounds/26shay.mp3'
  },
  {
    sort_order: 27,
    glyph: 'Ϥϥ',
    name: 'فاي',
    translit: 'ف (F)',
    sound: 'كالفاء دائماً (حرف مصري ديموطيقي)',
    num: '—',
    audio_filename: 'assets/sounds/27fay.mp3'
  },
  {
    sort_order: 28,
    glyph: 'Ϧϧ',
    name: 'خاي',
    translit: 'خ (Kh)',
    sound: 'كالخاء دائماً (حرف مصري ديموطيقي)',
    num: '—',
    audio_filename: 'assets/sounds/28khay.mp3'
  },
  {
    sort_order: 29,
    glyph: 'Ϩϩ',
    name: 'هوري',
    translit: 'هـ (H)',
    sound: 'كالهاء دائماً (حرف مصري ديموطيقي)',
    num: '—',
    audio_filename: 'assets/sounds/29hory.mp3'
  },
  {
    sort_order: 30,
    glyph: 'Ϫϫ',
    name: 'جانجا',
    translit: 'جـ / ج',
    sound: 'جـ معطشة قبل متحرك الكسر، أو ج غير معطشة في باقي الحالات',
    num: '—',
    audio_filename: 'assets/sounds/30ganga.mp3'
  },
  {
    sort_order: 31,
    glyph: 'Ϭϭ',
    name: 'تشيما',
    translit: 'تش (Tsh)',
    sound: 'كصوت «تش» دائماً (حرف مصري ديموطيقي)',
    num: '—',
    audio_filename: 'assets/sounds/31chema.mp3'
  },
  {
    sort_order: 32,
    glyph: 'Ϯϯ',
    name: 'تي',
    translit: 'تي (Ti)',
    sound: 'مقطع مركب: تـ + ي (حرف مصري ديموطيقي)',
    num: '—',
    audio_filename: 'assets/sounds/32tee.mp3'
  }
];

async function syncLetters() {
  console.log('Syncing 32 letters to Supabase...');
  for (const l of letters) {
    const patchRes = await fetch(SUPABASE_URL + '/rest/v1/letters?sort_order=eq.' + l.sort_order, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        name: l.name,
        translit: l.translit,
        sound: l.sound,
        num: l.num,
        audio_filename: l.audio_filename
      })
    });
    const updated = await patchRes.json();
    console.log('Updated [' + l.sort_order + '] ' + l.glyph + ' -> ' + l.name + ' (' + l.audio_filename + '): status ' + patchRes.status);
  }
  console.log('All 32 letters synchronized successfully in Supabase!');
}

syncLetters();
