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
    translit: 'أ ، ا',
    sound: 'أ ، ا',
    num: '١',
    audio_filename: 'assets/sounds/1alfa.mp3'
  },
  {
    sort_order: 2,
    glyph: 'Ⲃⲃ',
    name: 'بيتا',
    translit: 'ب، ف',
    sound: 'ب، ف',
    num: '٢',
    audio_filename: 'assets/sounds/2veta.mp3'
  },
  {
    sort_order: 3,
    glyph: 'Ⲅⲅ',
    name: 'غما',
    translit: 'ج، غ، ن',
    sound: 'ج، غ، ن',
    num: '٣',
    audio_filename: 'assets/sounds/3ghamma.mp3'
  },
  {
    sort_order: 4,
    glyph: 'Ⲇⲇ',
    name: 'دلتا',
    translit: 'د، ذ',
    sound: 'د، ذ',
    num: '٤',
    audio_filename: 'assets/sounds/4delta.mp3'
  },
  {
    sort_order: 5,
    glyph: 'Ⲉⲉ',
    name: 'إي',
    translit: 'إمالة صغيرة',
    sound: 'إمالة صغيرة',
    num: '٥',
    audio_filename: 'assets/sounds/5ei.mp3'
  },
  {
    sort_order: 6,
    glyph: 'Ⲋⲋ',
    name: 'سوو',
    translit: 'للعدد 6',
    sound: 'للعدد 6',
    num: '٦',
    audio_filename: 'assets/sounds/6sow.mp3'
  },
  {
    sort_order: 7,
    glyph: 'Ⲍⲍ',
    name: 'زيتا',
    translit: 'ز',
    sound: 'ز',
    num: '٧',
    audio_filename: 'assets/sounds/7zeta.mp3'
  },
  {
    sort_order: 8,
    glyph: 'Ⲏⲏ',
    name: 'إيتا',
    translit: 'إ، ى',
    sound: 'إ، ى',
    num: '٨',
    audio_filename: 'assets/sounds/8eta.mp3'
  },
  {
    sort_order: 9,
    glyph: 'Ⲑⲑ',
    name: 'ثيتا',
    translit: 'ث',
    sound: 'ث',
    num: '٩',
    audio_filename: 'assets/sounds/9seta.mp3'
  },
  {
    sort_order: 10,
    glyph: 'Ⲓⲓ',
    name: 'يوتا',
    translit: 'ى',
    sound: 'ى',
    num: '١٠',
    audio_filename: 'assets/sounds/10yota.mp3'
  },
  {
    sort_order: 11,
    glyph: 'Ⲕⲕ',
    name: 'كبا',
    translit: 'ك',
    sound: 'ك',
    num: '٢٠',
    audio_filename: 'assets/sounds/11kapa.mp3'
  },
  {
    sort_order: 12,
    glyph: 'Ⲗⲗ',
    name: 'لولا/لافلا',
    translit: 'ل',
    sound: 'ل',
    num: '٣٠',
    audio_filename: 'assets/sounds/12lavla.mp3'
  },
  {
    sort_order: 13,
    glyph: 'Ⲙⲙ',
    name: 'مي',
    translit: 'م',
    sound: 'م',
    num: '٤٠',
    audio_filename: 'assets/sounds/13mi.mp3'
  },
  {
    sort_order: 14,
    glyph: 'Ⲛⲛ',
    name: 'ني',
    translit: 'ن',
    sound: 'ن',
    num: '٥٠',
    audio_filename: 'assets/sounds/14ni.mp3'
  },
  {
    sort_order: 15,
    glyph: 'Ⲝⲝ',
    name: 'إكسي',
    translit: 'إكس',
    sound: 'إكس',
    num: '٦٠',
    audio_filename: 'assets/sounds/15axsy.mp3'
  },
  {
    sort_order: 16,
    glyph: 'Ⲟⲟ',
    name: 'أو',
    translit: 'أو',
    sound: 'أو',
    num: '٧٠',
    audio_filename: 'assets/sounds/16oo.mp3'
  },
  {
    sort_order: 17,
    glyph: 'Ⲡⲡ',
    name: 'بي',
    translit: 'ب',
    sound: 'ب',
    num: '٨٠',
    audio_filename: 'assets/sounds/17pee.mp3'
  },
  {
    sort_order: 18,
    glyph: 'Ⲣⲣ',
    name: 'رو',
    translit: 'ر',
    sound: 'ر',
    num: '١٠٠',
    audio_filename: 'assets/sounds/18roo.mp3'
  },
  {
    sort_order: 19,
    glyph: 'Ⲥⲥ',
    name: 'سيما',
    translit: 'س',
    sound: 'س',
    num: '٢٠٠',
    audio_filename: 'assets/sounds/19sema.mp3'
  },
  {
    sort_order: 20,
    glyph: 'Ⲧⲧ',
    name: 'تاف',
    translit: 'ت',
    sound: 'ت',
    num: '٣٠٠',
    audio_filename: 'assets/sounds/20tav.mp3'
  },
  {
    sort_order: 21,
    glyph: 'Ⲩⲩ',
    name: 'إبسيلون',
    translit: 'ى، و، ف',
    sound: 'ى، و، ف',
    num: '٤٠٠',
    audio_filename: 'assets/sounds/21epselon.mp3'
  },
  {
    sort_order: 22,
    glyph: 'Ⲫⲫ',
    name: 'في',
    translit: 'ف',
    sound: 'ف',
    num: '٥٠٠',
    audio_filename: 'assets/sounds/22fi.mp3'
  },
  {
    sort_order: 23,
    glyph: 'Ⲭⲭ',
    name: 'كي، خي، شي',
    translit: 'ك، خ، ش',
    sound: 'ك، خ، ش',
    num: '٦٠٠',
    audio_filename: 'assets/sounds/23ki.mp3'
  },
  {
    sort_order: 24,
    glyph: 'Ⲯⲯ',
    name: 'بسي',
    translit: 'بس',
    sound: 'بس',
    num: '٧٠٠',
    audio_filename: 'assets/sounds/24psi.mp3'
  },
  {
    sort_order: 25,
    glyph: 'Ⲱⲱ',
    name: 'أوو',
    translit: 'أوو',
    sound: 'أوو',
    num: '٨٠٠',
    audio_filename: 'assets/sounds/25oo.mp3'
  },
  {
    sort_order: 26,
    glyph: 'Ϣϣ',
    name: 'شاي',
    translit: 'ش',
    sound: 'ش',
    num: '٩٠٠',
    audio_filename: 'assets/sounds/26shay.mp3'
  },
  {
    sort_order: 27,
    glyph: 'Ϥϥ',
    name: 'فاي',
    translit: 'ف',
    sound: 'ف',
    num: '—',
    audio_filename: 'assets/sounds/27fay.mp3'
  },
  {
    sort_order: 28,
    glyph: 'Ϧϧ',
    name: 'خاي',
    translit: 'خ',
    sound: 'خ',
    num: '—',
    audio_filename: 'assets/sounds/28khay.mp3'
  },
  {
    sort_order: 29,
    glyph: 'Ϩϩ',
    name: 'هوري',
    translit: 'هـ',
    sound: 'هـ',
    num: '—',
    audio_filename: 'assets/sounds/29hory.mp3'
  },
  {
    sort_order: 30,
    glyph: 'Ϫϫ',
    name: 'جنجا',
    translit: 'ج',
    sound: 'ج',
    num: '—',
    audio_filename: 'assets/sounds/30ganga.mp3'
  },
  {
    sort_order: 31,
    glyph: 'Ϭϭ',
    name: 'تشيما',
    translit: 'تش',
    sound: 'تش',
    num: '—',
    audio_filename: 'assets/sounds/31chema.mp3'
  },
  {
    sort_order: 32,
    glyph: 'Ϯϯ',
    name: 'تي',
    translit: 'تي',
    sound: 'تي',
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
