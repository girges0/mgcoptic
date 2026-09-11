/**
 * MG COPTIC — Gamification & Curriculum Service
 * يتيح التعامل المشترك مع Supabase، مع التخزين المحلي الاحتياطي التلقائي (LocalStorage Fallback)
 * ونظام الصوتيات المولد بـ Web Audio API
 */

const MG_CONFIG = {
  SUPABASE_URL: 'https://kdoanxzpfiscprjjzzic.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo',
  STORAGE_KEYS: {
    USER: 'mg_coptic_user',
    PROGRESS: 'mg_coptic_progress',
    CURRICULUM: 'mg_coptic_curriculum_v1',
    LESSON_PROGRESS: 'mg_coptic_lesson_progress',
    SETTINGS: 'mg_coptic_game_settings'
  }
};

// إنشاء عميل Supabase إذا توفرت المكتبة
let sbClient = null;
if(window.supabase && typeof window.supabase.createClient === 'function'){
  try {
    sbClient = window.supabase.createClient(MG_CONFIG.SUPABASE_URL, MG_CONFIG.SUPABASE_ANON_KEY, {
      auth: {
        storageKey: 'mg_coptic_student_auth_token',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    window.sbClient = sbClient;
  } catch(e){
    console.warn('Supabase client init error:', e);
  }
}

/* ============================================================
   المنهج الافتراضي النظيف (جاهز لاستقبال المنهج الفعلي)
   ============================================================ */
const DEFAULT_CURRICULUM = {
  levels: [
    {
      id: 1,
      title: 'المستوى 1: الأساسيات',
      description: 'مسار تعلم اللغة القبطية',
      order_index: 1
    }
  ],
  level: {
    id: 1,
    title: 'المستوى 1: الأساسيات',
    description: 'مسار تعلم اللغة القبطية',
    order_index: 1
  },
  units: [],
  chests: []
};

/* ============================================================
   محرك الصوتيات بواسطة Web Audio API (Chimes, Buzzers, Celebrations)
   ============================================================ */
class SoundEffects {
  constructor(){
    this.ctx = null;
    this._unlocked = false;
  }

  _init(){
    if(!this.ctx){
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if(AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if(this.ctx && this.ctx.state === 'suspended'){
      this.ctx.resume().catch(()=>{});
    }
  }

  unlock(){
    try {
      this._init();
      if(this.ctx){
        if(this.ctx.state === 'suspended'){
          this.ctx.resume().catch(()=>{});
        }
        if(!this._unlocked){
          this._unlocked = true;
          const buf = this.ctx.createBuffer(1, 1, 22050);
          const src = this.ctx.createBufferSource();
          src.buffer = buf;
          src.connect(this.ctx.destination);
          src.start(0);
        }
      }
    } catch(e){}
  }

  _runAudio(fn){
    try {
      this._init();
      if(!this.ctx) return;
      if(this.ctx.state === 'suspended'){
        this.ctx.resume().then(() => {
          try { fn(this.ctx, this.ctx.currentTime); } catch(_) {}
        }).catch(() => {});
      } else {
        fn(this.ctx, this.ctx.currentTime);
      }
    } catch(e){}
  }

  _soundFileCache = new Map();

  _getSoundPath(name) {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname || '';
      if (p.includes('/admin/')) {
        return `../assets/sounds/${name}.wav`;
      }
    }
    return `assets/sounds/${name}.wav`;
  }

  _playSoundFile(name, fallbackFn) {
    try {
      this.unlock();
      const path = this._getSoundPath(name);
      let a = this._soundFileCache.get(name);
      if (!a) {
        a = new Audio(path);
        a.preload = 'auto';
        this._soundFileCache.set(name, a);
      }
      a.currentTime = 0;
      const p = a.play();
      if (p !== undefined) {
        p.catch(() => {
          if (fallbackFn) fallbackFn();
        });
      }
    } catch (_) {
      if (fallbackFn) fallbackFn();
    }
  }

  _lastSoundTimes = new Map();

  _shouldDebounce(soundName, cooldownMs = 250) {
    const now = Date.now();
    const last = this._lastSoundTimes.get(soundName) || 0;
    if (now - last < cooldownMs) return true;
    this._lastSoundTimes.set(soundName, now);
    return false;
  }

  playCorrect(){
    if (this._shouldDebounce('correct', 250)) return;
    try {
      this._init();
      if(!this.ctx) return;
      const now = this.ctx.currentTime;
      // نغمة نجاح ثنائية فائقة السرعة والمرح (F5 -> A5)
      [698.46, 880.00].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.2, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.23);
      });
    } catch(e){}
  }

  playWrong(){
    if (this._shouldDebounce('wrong', 250)) return;
    try {
      this._init();
      if(!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.2);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    } catch(e){}
  }

  playVictory(){
    if (this._shouldDebounce('victory', 500)) return;
    try {
      this._init();
      if(!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const times = [0, 0.12, 0.24, 0.38];
      const durs  = [0.15, 0.15, 0.18, 0.60];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + times[i]);
        gain.gain.setValueAtTime(0.2, now + times[i]);
        gain.gain.exponentialRampToValueAtTime(0.001, now + times[i] + durs[i]);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + times[i]);
        osc.stop(now + times[i] + durs[i]);
      });
    } catch(e){}
  }

  playChestReward(){
    if (this._shouldDebounce('chest', 400)) return;
    try {
      this._init();
      if(!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch(e){}
  }

  playClick(){
    // ملغى نهائياً بناءً على رغبة المستخدم
  }
  _audioBufferCache = new Map();
  _currentSourceNode = null;

  resolveAudioCandidates(input){
    if(!input) return [];
    const raw = String(input).trim();
    if(!raw) return [];

    const audioMap = (typeof LOCAL_AUDIO_MAP !== 'undefined') ? LOCAL_AUDIO_MAP : {
      '1': '1alfa.mp3', 'alfa': '1alfa.mp3', '1alfa': '1alfa.mp3', 'ألفا': '1alfa.mp3', 'الفا': '1alfa.mp3', 'Ⲁ': '1alfa.mp3', 'ⲁ': '1alfa.mp3',
      '2': '2veta.mp3', 'veta': '2veta.mp3', '2veta': '2veta.mp3', 'vida': '2veta.mp3', 'فيدا': '2veta.mp3', 'بيتا': '2veta.mp3', 'ڤيتا': '2veta.mp3', 'ڤيتا (بيتا)': '2veta.mp3', 'Ⲃ': '2veta.mp3', 'ⲃ': '2veta.mp3',
      '3': '3ghamma.mp3', 'ghamma': '3ghamma.mp3', '3ghamma': '3ghamma.mp3', 'غاما': '3ghamma.mp3', 'غما': '3ghamma.mp3', 'Ⲅ': '3ghamma.mp3', 'ⲅ': '3ghamma.mp3',
      '4': '4delta.mp3', 'delta': '4delta.mp3', '4delta': '4delta.mp3', 'دلدا': '4delta.mp3', 'دلتا': '4delta.mp3', 'Ⲇ': '4delta.mp3', 'ⲇ': '4delta.mp3',
      '5': '5ei.mp3', 'ei': '5ei.mp3', '5ei': '5ei.mp3', 'إي': '5ei.mp3', 'اي': '5ei.mp3', 'Ⲉ': '5ei.mp3', 'ⲉ': '5ei.mp3',
      '6': '6sow.mp3', 'sow': '6sow.mp3', '6sow': '6sow.mp3', 'سو': '6sow.mp3', 'Ⲋ': '6sow.mp3', 'ⲋ': '6sow.mp3',
      '7': '7zeta.mp3', 'zeta': '7zeta.mp3', '7zeta': '7zeta.mp3', 'زيتا': '7zeta.mp3', 'زاتا': '7zeta.mp3', 'Ⲍ': '7zeta.mp3', 'ⲍ': '7zeta.mp3',
      '8': '8eta.mp3', 'eta': '8eta.mp3', '8eta': '8eta.mp3', 'إيتا': '8eta.mp3', 'ايتا': '8eta.mp3', 'هيتا': '8eta.mp3', 'Ⲏ': '8eta.mp3', 'ⲏ': '8eta.mp3',
      '9': '9seta.mp3', 'seta': '9seta.mp3', '9seta': '9seta.mp3', 'ثيتا': '9seta.mp3', 'سيتا': '9seta.mp3', 'Ⲑ': '9seta.mp3', 'ⲑ': '9seta.mp3',
      '10': '10yota.mp3', 'yota': '10yota.mp3', '10yota': '10yota.mp3', 'يوطا': '10yota.mp3', 'يوتا': '10yota.mp3', 'إيوتا': '10yota.mp3', 'Ⲓ': '10yota.mp3', 'ⲓ': '10yota.mp3',
      '11': '11kapa.mp3', 'kapa': '11kapa.mp3', '11kapa': '11kapa.mp3', 'كابا': '11kapa.mp3', 'كبا': '11kapa.mp3', 'Ⲕ': '11kapa.mp3', 'ⲕ': '11kapa.mp3',
      '12': '12lavla.mp3', 'lavla': '12lavla.mp3', '12lavla': '12lavla.mp3', 'لافلا': '12lavla.mp3', 'لولا': '12lavla.mp3', 'لابدا': '12lavla.mp3', 'Ⲗ': '12lavla.mp3', 'ⲗ': '12lavla.mp3',
      '13': '13mi.mp3', 'mi': '13mi.mp3', '13mi': '13mi.mp3', 'مي': '13mi.mp3', 'Ⲙ': '13mi.mp3', 'ⲙ': '13mi.mp3',
      '14': '14ni.mp3', 'ni': '14ni.mp3', '14ni': '14ni.mp3', 'ني': '14ni.mp3', 'Ⲛ': '14ni.mp3', 'ⲛ': '14ni.mp3',
      '15': '15axsy.mp3', 'axsy': '15axsy.mp3', '15axsy': '15axsy.mp3', 'إكسي': '15axsy.mp3', 'اكسي': '15axsy.mp3', 'كسي': '15axsy.mp3', 'Ⲝ': '15axsy.mp3', 'ⲝ': '15axsy.mp3',
      '16': '16oo.mp3', '16oo': '16oo.mp3', 'أو القصيرة': '16oo.mp3', 'او': '16oo.mp3', 'Ⲟ': '16oo.mp3', 'ⲟ': '16oo.mp3',
      '17': '17pee.mp3', 'pee': '17pee.mp3', '17pee': '17pee.mp3', 'بي': '17pee.mp3', 'Ⲡ': '17pee.mp3', 'ⲡ': '17pee.mp3',
      '18': '18roo.mp3', 'roo': '18roo.mp3', '18roo': '18roo.mp3', 'رو': '18roo.mp3', 'Ⲣ': '18roo.mp3', 'ⲣ': '18roo.mp3',
      '19': '19sema.mp3', 'sema': '19sema.mp3', '19sema': '19sema.mp3', 'سيما': '19sema.mp3', 'Ⲥ': '19sema.mp3', 'ⲥ': '19sema.mp3',
      '20': '20tav.mp3', 'tav': '20tav.mp3', '20tav': '20tav.mp3', 'تاف': '20tav.mp3', 'Ⲧ': '20tav.mp3', 'ⲧ': '20tav.mp3',
      '21': '21epselon.mp3', 'epselon': '21epselon.mp3', '21epselon': '21epselon.mp3', 'إبسيلون': '21epselon.mp3', 'ابسلون': '21epselon.mp3', 'Ⲩ': '21epselon.mp3', 'ⲩ': '21epselon.mp3',
      '22': '22fi.mp3', 'fi': '22fi.mp3', '22fi': '22fi.mp3', 'في': '22fi.mp3', 'Ⲫ': '22fi.mp3', 'ⲫ': '22fi.mp3',
      '23': '23ki.mp3', 'ki': '23ki.mp3', '23ki': '23ki.mp3', 'خي': '23ki.mp3', 'كي': '23ki.mp3', 'Ⲭ': '23ki.mp3', 'ⲭ': '23ki.mp3',
      '24': '24psi.mp3', 'psi': '24psi.mp3', '24psi': '24psi.mp3', 'إبسي': '24psi.mp3', 'بسي': '24psi.mp3', 'Ⲯ': '24psi.mp3', 'ⲯ': '24psi.mp3',
      '25': '25oo.mp3', '25oo': '25oo.mp3', 'أوميغا': '25oo.mp3', 'اوميجا': '25oo.mp3', 'أو الطويلة': '25oo.mp3', 'Ⲱ': '25oo.mp3', 'ⲱ': '25oo.mp3',
      '26': '26shay.mp3', 'shay': '26shay.mp3', '26shay': '26shay.mp3', 'شاي': '26shay.mp3', 'Ϣ': '26shay.mp3', 'ϣ': '26shay.mp3',
      '27': '27fay.mp3', 'fay': '27fay.mp3', '27fay': '27fay.mp3', 'فاي': '27fay.mp3', 'Ϥ': '27fay.mp3', 'ϥ': '27fay.mp3',
      '28': '28khay.mp3', 'khay': '28khay.mp3', '28khay': '28khay.mp3', 'خاي': '28khay.mp3', 'Ϧ': '28khay.mp3', 'ϧ': '28khay.mp3',
      '29': '29hory.mp3', 'hory': '29hory.mp3', '29hory': '29hory.mp3', 'هوري': '29hory.mp3', 'Ϩ': '29hory.mp3', 'ϩ': '29hory.mp3',
      '30': '30ganga.mp3', 'ganga': '30ganga.mp3', '30ganga': '30ganga.mp3', 'جانجا': '30ganga.mp3', 'Ϫ': '30ganga.mp3', 'ϫ': '30ganga.mp3',
      '31': '31chema.mp3', 'chema': '31chema.mp3', '31chema': '31chema.mp3', 'تشيما': '31chema.mp3', 'Ϭ': '31chema.mp3', 'ϭ': '31chema.mp3',
      '32': '32tee.mp3', 'tee': '32tee.mp3', '32tee': '32tee.mp3', 'تي': '32tee.mp3', 'Ϯ': '32tee.mp3', 'ϯ': '32tee.mp3',
      'chest': 'chest.mp3', 'correct': 'correct.mp3', 'victory': 'victory.mp3', 'wrong': 'wrong.mp3'
    };

    const rawClean = raw.toLowerCase().replace(/\.mp3$/i, '');
    const mapped = audioMap[raw] || audioMap[rawClean];
    const filename = mapped || raw.split('/').pop().split('\\').pop();

    // 1. الأولوية القصوى للملفات الصوتية المحلية المباشرة
    if(mapped || /\.(mp3|wav|ogg|m4a|aac|webm)$/i.test(raw)){
      return Array.from(new Set([
        `audio_coptic/${filename}`,
        `assets/sounds/${filename}`,
        `../audio_coptic/${filename}`,
        `../assets/sounds/${filename}`,
        `/${filename}`,
        `/${raw}`,
        raw,
        `../${raw}`,
        `audio/${filename}`
      ]));
    }

    // 2. Google Drive
    const gdMatch = raw.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^&]*&)*id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]{20,})/i);
    if(gdMatch && gdMatch[1]){
      const id = gdMatch[1];
      return [
        `https://drive.usercontent.google.com/download?id=${id}&export=download`,
        `https://drive.usercontent.google.com/download?id=${id}&export=download&authuser=0`,
        `https://lh3.googleusercontent.com/d/${id}`,
        `https://docs.google.com/uc?export=download&id=${id}`,
        `https://drive.google.com/uc?id=${id}&export=download`,
        raw
      ];
    }

    // 3. Dropbox
    if(/dropbox\.com/i.test(raw)){
      let u = raw.replace(/\?dl=0/i, '').replace(/&dl=0/i, '');
      u = u.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      return [u, raw.includes('?') ? `${raw}&raw=1` : `${raw}?raw=1`, raw];
    }

    // 4. ملفات أخرى أو روابط كاملة
    if(/^https?:\/\/|^data:audio/i.test(raw)){
      return [raw];
    }

    return [
      `audio_coptic/${filename}`,
      `assets/sounds/${filename}`,
      `../audio_coptic/${filename}`,
      `../assets/sounds/${filename}`,
      raw
    ];
  }

  async playAudio(urlOrText){
    const cleanPrimary = String(urlOrText || '').trim();
    if(!cleanPrimary) return false;

    // إيقاف أي صوت شغال
    if(this._currentSourceNode){
      try { this._currentSourceNode.stop(); } catch(e){}
      this._currentSourceNode = null;
    }
    if(this._activeAudio){
      try { this._activeAudio.pause(); this._activeAudio.currentTime = 0; } catch(e){}
      this._activeAudio = null;
    }

    this._init();
    if(this.ctx && this.ctx.state === 'suspended'){
      try { await this.ctx.resume(); } catch(e){}
    }

    const isUrl = /^https?:\/\/|^data:audio|\.(mp3|wav|ogg|m4a|aac|webm)(\?|$)/i.test(cleanPrimary) || cleanPrimary.startsWith('audio/') || /drive\.google\.com|dropbox\.com|1drv\.ms|docs\.google\.com|supabase\.co/i.test(cleanPrimary);

    if(!isUrl){
      return false;
    }

    // 1. إذا كان الصوت مخزناً في كاش Web Audio
    if(this._audioBufferCache.has(cleanPrimary) && this.ctx){
      try {
        const buffer = this._audioBufferCache.get(cleanPrimary);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);
        this._currentSourceNode = source;
        return true;
      } catch(e){}
    }

    const candidates = this.resolveAudioCandidates(cleanPrimary);

    // 2. المحاولة عبر Web Audio API (أدق وأعلى نقاء وموثوقية)
    for(let i = 0; i < candidates.length; i++){
      const candidateUrl = candidates[i];
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
        const resp = await fetch(candidateUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if(resp.ok){
          const arrayBuffer = await resp.arrayBuffer();
          if(arrayBuffer && arrayBuffer.byteLength > 100 && this.ctx){
            const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
            this._audioBufferCache.set(cleanPrimary, audioBuffer);
            const source = this.ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.ctx.destination);
            source.start(0);
            this._currentSourceNode = source;
            return true;
          }
        }
      } catch(err){}
    }

    // 3. المحاولة عبر HTML5 Audio
    for(let i = 0; i < candidates.length; i++){
      const candidateUrl = candidates[i];
      const ok = await new Promise((resolve) => {
        let done = false;
        const a = new Audio();
        this._activeAudio = a;

        const finishOk = () => {
          if(!done){
            done = true;
            resolve(true);
          }
        };
        const finishFail = () => {
          if(!done){
            done = true;
            resolve(false);
          }
        };

        a.addEventListener('playing', finishOk, { once: true });
        a.addEventListener('error', finishFail, { once: true });

        try {
          a.src = candidateUrl;
          const p = a.play();
          if(p !== undefined) p.then(finishOk).catch(finishFail);
        } catch(err){
          finishFail();
        }

        setTimeout(() => {
          if(!done){
            done = true;
            resolve(false);
          }
        }, 1200);
      });

      if(ok) return true;
    }

    return false;
  }

  async playChallengeAudio(audioUrl, audioText) {
    this.unlock();
    const cleanUrl = String(audioUrl || '').trim();
    if (cleanUrl) {
      try {
        const ok = await this.playAudio(cleanUrl);
        if (ok) return true;
      } catch(e){}
    }
    const textToSpeak = String(audioText || '').trim();
    if (textToSpeak) {
      try {
        const ok = await this.playAudio(textToSpeak);
        if (ok) return true;
      } catch(e){}
      return this.speakArabic(textToSpeak);
    }
    return false;
  }

  speakArabic(text){
    if(!text) return false;
    const clean = String(text).trim();
    if(!clean) return false;

    // استخدام محرك النطق الصوتي للمتصفح (SpeechSynthesis) لتفادي أخطاء 404 الناتجة عن خدمات خارجية معطلة
    try {
      if(!('speechSynthesis' in window)) return false;
      const synth = window.speechSynthesis;
      if(synth.paused) synth.resume();
      synth.cancel();

      const utter = new SpeechSynthesisUtterance(clean);
      utter.rate = 0.90;
      utter.pitch = 1.0;
      utter.volume = 1.0;

      const voices = synth.getVoices ? synth.getVoices() : [];
      if(voices && voices.length > 0){
        const arVoice = voices.find(v => v.lang && (v.lang.startsWith('ar') || v.lang.includes('Arabic'))) ||
                        voices.find(v => v.name && (v.name.includes('Arabic') || v.name.includes('عربي') || v.name.includes('Hoda') || v.name.includes('Salma') || v.name.includes('Tarik') || v.name.includes('Maged') || v.name.includes('Laila')));
        if(arVoice){
          utter.voice = arVoice;
          utter.lang = arVoice.lang;
        } else {
          utter.lang = 'ar-EG';
        }
      } else {
        utter.lang = 'ar-EG';
      }

      synth.speak(utter);
      return true;
    } catch(err){
      console.warn('Speech synthesis error:', err);
      return false;
    }
  }
}

const Sound = new SoundEffects();
if (typeof window !== 'undefined') {
  window.Sound = Sound;
  window.SoundEffects = Sound;
  window.playUniversalAudio = (url, fallback) => Sound.playAudio(url, fallback);
  window.playChallengeAudio = (url, text, btn) => {
    if(btn){
      btn.classList.add('is-playing');
      setTimeout(() => btn.classList.remove('is-playing'), 1200);
    }
    return Sound.playChallengeAudio(url, text);
  };
  if('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined){
    window.speechSynthesis.onvoiceschanged = () => {
      try { window.speechSynthesis.getVoices(); } catch(e){}
    };
  }
  // تفعيل الصوت وفك قفل Web Audio API وتفعيل صوت النقر (Tactile Click) لجميع الأزرار التفاعلية
  let _lastClickSoundTime = 0;
  const _interactiveSelector = [
    'button',
    '.btn',
    '.choice-btn',
    '.option-card',
    '.lesson-node-btn',
    '.mystery-chest-btn',
    '.nav-btn',
    '.tab-btn',
    '.coptic-swal-confirm',
    '.coptic-swal-cancel',
    'a.btn',
    '.quiz-opt-btn',
    '.user-chip',
    '.word-tile',
    '.coptic-key',
    '.settings-card',
    '.swal2-confirm',
    '.swal2-cancel',
    '.bottom-nav-item',
    '.trophy-node-btn',
    '[role="button"]'
  ].join(', ');

  const _handleGlobalInteraction = (e) => {
    Sound.unlock();
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    // تم إلغاء صوت النقر تماماً
  };

  const _evtTypes = window.PointerEvent ? ['pointerdown'] : ['touchstart', 'mousedown'];
  _evtTypes.forEach(evt => {
    window.addEventListener(evt, _handleGlobalInteraction, { passive: true, capture: true });
  });
}

/* ============================================================
   خدمات المستخدم والتقدم (User & Progress Services)
   ============================================================ */
class GamificationService {
  constructor(){
    this.sound = Sound;
    this.channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('mg_coptic_gamification_sync') : null;
    this.listeners = [];
    this.initRealtimeSync();
  }

  // تسجيل مستمع للتحديثات الفورية عبر التبويبات والصفحات
  onUpdate(callback){
    if(typeof callback === 'function'){
      this.listeners.push(callback);
    }
  }

  // بث إشعار بالتحديثات لجميع الصفحات المفتوحة واللوحة فورياً
  broadcastUpdate(type, payload = {}){
    const message = { type, payload, timestamp: Date.now() };
    if(this.channel){
      try { this.channel.postMessage(message); } catch(e){}
    }
    try {
      localStorage.setItem('mg_coptic_sync_ping', Date.now().toString());
    } catch(e){}
    if(typeof window !== 'undefined'){
      window.dispatchEvent(new CustomEvent('mg_coptic_sync', { detail: message }));
    }
    this.listeners.forEach(fn => {
      try { fn(type, payload); } catch(e){ console.warn('Listener error:', e); }
    });
  }

  // تهيئة الاستماع الفوري
  initRealtimeSync(){
    let progressDebounceTimer = null;

    if(this.channel){
      this.channel.onmessage = (e) => {
        const data = e.data || {};
        if(data.type === 'full_account_reset'){
          const curUser = this.getCurrentUser();
          const curUid = curUser?.id;
          const targetUid = data.payload?.user_id;
          if(!targetUid || (curUid && curUid === targetUid)){
            const uidToClear = targetUid || curUid;
            if(uidToClear){
              localStorage.removeItem(`mg_coptic_progress_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_lesson_progress_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_claimed_chests_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_badges_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_daily_goal_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_daily_xp_date_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_daily_xp_val_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_last_synced_date_${uidToClear}`);
            }
            localStorage.removeItem('mg_coptic_lesson_progress');
            localStorage.removeItem('mg_coptic_claimed_chests');
            localStorage.removeItem('mg_coptic_badges');
            localStorage.removeItem('mg_coptic_daily_xp_date');
            localStorage.removeItem('mg_coptic_daily_xp_val');

            const resetProg = {
              user_id: uidToClear,
              points: 0,
              total_points: 0,
              hearts: 5,
              streak_days: 1,
              claimed_chests: [],
              last_active_date: new Date().toISOString().split('T')[0]
            };
            this.saveProgressLocal(resetProg, uidToClear, false);

            const initialLp = { '1': { status: 'in_progress', score: 0 } };
            if(uidToClear) localStorage.setItem(`mg_coptic_lesson_progress_${uidToClear}`, JSON.stringify(initialLp));
            localStorage.setItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(initialLp));

            if(typeof window !== 'undefined'){
              if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(resetProg);
              if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
              if(typeof window.renderSkillMap === 'function') window.renderSkillMap();
              if(typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
            }
          }
        } else if(data.type === 'progress_remote' || data.type === 'progress_admin_update'){
          const curUser = this.getCurrentUser();
          const curUid = curUser?.id;
          if(curUid && data.payload?.user_id === curUid){
            if(progressDebounceTimer) clearTimeout(progressDebounceTimer);
            progressDebounceTimer = setTimeout(() => {
              this.getProgress(curUid, false).then(fresh => {
                if(typeof window !== 'undefined'){
                  if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(fresh);
                  if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
                  if(typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
                }
              });
            }, 600);
          }
        } else if(data.type === 'curriculum_updated'){
          if(typeof window !== 'undefined'){
            if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
            if(typeof window.renderSkillMap === 'function') window.renderSkillMap();
          }
        }
        this.listeners.forEach(fn => {
          try { fn(data.type, data.payload); } catch(err){}
        });
      };
    }
    if(typeof window !== 'undefined'){
      let storageDebounceTimer = null;
      window.addEventListener('storage', (e) => {
        if(e.key === 'mg_coptic_curriculum_v2' || e.key === 'mg_coptic_game_settings'){
          const curUser = this.getCurrentUser();
          const curUid = curUser?.id;
          if(storageDebounceTimer) clearTimeout(storageDebounceTimer);
          storageDebounceTimer = setTimeout(() => {
            this.getProgress(curUid, false).then(fresh => {
              if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(fresh);
              if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
              if(typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
            });
            this.listeners.forEach(fn => {
              try { fn(e.key, null); } catch(err){}
            });
          }, 800);
        }
      });
    }

    // الاشتراك في تحديثات Supabase Realtime إن توفر العميل
    if(sbClient && typeof sbClient.channel === 'function'){
      try {
        let rtProgressDebounce = null;
        sbClient.channel('gamification-realtime-sync')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'levels' }, () => {
            this.getCurriculum(true).then(c => this.broadcastUpdate('curriculum', c));
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'units' }, () => {
            this.getCurriculum(true).then(c => this.broadcastUpdate('curriculum', c));
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'lessons' }, () => {
            this.getCurriculum(true).then(c => this.broadcastUpdate('curriculum', c));
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'challenges' }, () => {
            this.getCurriculum(true).then(c => this.broadcastUpdate('curriculum', c));
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'chests' }, () => {
            this.getCurriculum(true).then(c => this.broadcastUpdate('curriculum', c));
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'user_progress' }, (payload) => {
            const curUser = this.getCurrentUser();
            const curUid = curUser?.id;
            const updatedUid = payload?.new?.user_id || payload?.old?.user_id;
            if(curUid && updatedUid && curUid === updatedUid){
              if(rtProgressDebounce) clearTimeout(rtProgressDebounce);
              rtProgressDebounce = setTimeout(() => {
                const isReset = payload?.new?.points === 0;
                this.getProgress(curUid, isReset).then(fresh => {
                  if(typeof window !== 'undefined'){
                    if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(fresh);
                    if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
                    if(typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
                  }
                });
                if(isReset){
                  this.getLessonProgress(curUid, true).then(() => {
                    if(typeof window !== 'undefined' && typeof window.renderSkillMap === 'function'){
                      window.renderSkillMap();
                    }
                  });
                }
              }, 600);
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'user_lesson_progress' }, (payload) => {
            const curUser = this.getCurrentUser();
            const curUid = curUser?.id;
            const updatedUid = payload?.new?.user_id || payload?.old?.user_id;
            if(curUid && updatedUid && curUid === updatedUid){
              this.getLessonProgress(curUid, true).then(() => {
                if(typeof window !== 'undefined'){
                  if(typeof window.renderSkillMap === 'function') window.renderSkillMap();
                  if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
                }
              });
            }
          })
          .subscribe();
      } catch(e){
        console.warn('Realtime subscription warning:', e);
      }
    }
  }

  // إعدادات نطاق القلوب ونقاط الـ XP المشتركة
  getGameSettings(){
    try {
      const raw = localStorage.getItem(MG_CONFIG.STORAGE_KEYS.SETTINGS);
      if(raw) return JSON.parse(raw);
    } catch(e){}
    return {
      max_hearts: 5,
      heart_cost_xp: 15,
      default_challenge_xp: 1,
      default_lesson_xp: 25,
      default_level_xp: 140
    };
  }

  saveGameSettings(settings){
    const current = this.getGameSettings();
    const updated = { ...current, ...settings };
    try {
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    } catch(e){}
    this.broadcastUpdate('settings', updated);
    return updated;
  }

  // فحص هل المستخدم مسجل حالياً من الكاش المحلي السريع
  getCurrentUser(){
    try {
      const raw = localStorage.getItem(MG_CONFIG.STORAGE_KEYS.USER);
      if(raw) return JSON.parse(raw);
    } catch(e){}
    return null;
  }

  // التحقق الحقيقي من جلسة Supabase Auth وجلب بيانات البروفايل دون مسح الكاش قسرياً
  async getCurrentUserAsync(){
    if(!sbClient) return this.getCurrentUser();
    try {
      let activeSession = null;
      const { data: { session }, error: sErr } = await sbClient.auth.getSession();
      if (session && session.user) {
        activeSession = session;
      } else {
        // محاولة تجديد الجلسة تلقائياً في حال انتهاء صلاحية التوكن
        const rawToken = localStorage.getItem('mg_coptic_student_auth_token');
        if (rawToken) {
          try {
            const parsed = JSON.parse(rawToken);
            if (parsed && parsed.refresh_token) {
              const { data: refData } = await sbClient.auth.refreshSession({ refresh_token: parsed.refresh_token });
              if (refData && refData.session) {
                activeSession = refData.session;
                try { localStorage.setItem('mg_coptic_student_auth_token', JSON.stringify(refData.session)); } catch (_) {}
              }
            }
          } catch (_) {}
        }
      }

      if(!activeSession || !activeSession.user){
        // لا نحذف الكاش المحلي لمنع تسجيل خروج المستخدم تلقائياً عند انقطاع الاتصال أو تحديث الصفحة
        return this.getCurrentUser();
      }
      const authUser = activeSession.user;
      const { data: profile } = await sbClient.from('users').select('*').eq('id', authUser.id).maybeSingle();
      const userObj = {
        id: authUser.id,
        email: authUser.email,
        full_name: (profile && profile.full_name) ? profile.full_name : (authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'بطل قبطي'),
        age: (profile && profile.age) ? profile.age : (authUser.user_metadata?.age || 15),
        avatar_url: (profile && profile.avatar_url) ? profile.avatar_url : (localStorage.getItem('mg_coptic_user.avatar_url') || ''),
        role: (profile && profile.role) ? profile.role : 'student'
      };
      this.saveUserLocal(userObj);
      return userObj;
    } catch(err){
      console.warn('getCurrentUserAsync error:', err);
      return this.getCurrentUser();
    }
  }

  // التأكد من توفر مستخدم (إذا لم يوجد مستخدم مسجل يرجع null حتى تطلب الواجهة منه تسجيل الدخول)
  ensureCurrentUser(){
    return this.getCurrentUser();
  }

  // فحص هل تم فتح صندوق كنز معين للمستخدم الحالي
  isChestClaimed(chestId, userId = null){
    const uid = userId || this.getCurrentUser()?.id;
    try {
      let list = [];
      if (uid) {
        const userRaw = localStorage.getItem(`mg_coptic_claimed_chests_${uid}`);
        if (userRaw !== null) {
          list = JSON.parse(userRaw);
        } else {
          const prog = this.getProgressSync ? this.getProgressSync(uid) : null;
          if (prog && Array.isArray(prog.claimed_chests)) {
            list = prog.claimed_chests;
          } else {
            list = [];
          }
        }
      } else {
        const raw = localStorage.getItem('mg_coptic_claimed_chests');
        list = raw ? JSON.parse(raw) : [];
      }
      return Array.isArray(list) && list.includes(String(chestId));
    } catch(e){ return false; }
  }

  // فحص شارات المستخدم المستلمة من الصناديق والتحديات
  getUserBadges(userId = null){
    const uid = userId || this.getCurrentUser()?.id;
    try {
      const key = uid ? `mg_coptic_badges_${uid}` : 'mg_coptic_badges';
      const raw = localStorage.getItem(key) || localStorage.getItem('mg_coptic_badges');
      return raw ? JSON.parse(raw) : [];
    } catch(e){
      return [];
    }
  }

  // فتح صندوق الكنز وحفظه سحابياً في Supabase لحساب المستخدم عبر RPC الذرية الآمنة
  async claimChest(userId, chestId, xpReward = 30, heartsReward = 1, badgeReward = null){
    try {
      const uid = userId || this.getCurrentUser()?.id;
      const cleanChestId = String(chestId).trim();

      // فحص سريع محلي (UX Guard)
      if (this.isChestClaimed(cleanChestId, uid)) {
        return false;
      }

      let rpcHandled = false;

      if (sbClient && uid) {
        try {
          const { data, error } = await sbClient.rpc('claim_treasure_chest', {
            p_chest_id: cleanChestId
          });

          if (!error && data) {
            rpcHandled = true;
            // إذا كان الصندوق مفتوحاً مسبقاً في السيرفر، يتم مزامنة القائمة ورفض منح الجائزة
            if (data.already_claimed || !data.success) {
              const currentList = Array.isArray(data.claimed_chests) ? data.claimed_chests : [];
              if (uid) localStorage.setItem(`mg_coptic_claimed_chests_${uid}`, JSON.stringify(currentList));
              localStorage.setItem('mg_coptic_claimed_chests', JSON.stringify(currentList));
              return false;
            }

            // اعتماد قيم السيرفر الحقيقية والموثوقة
            const currentList = Array.isArray(data.claimed_chests) ? data.claimed_chests : [];
            if (uid) localStorage.setItem(`mg_coptic_claimed_chests_${uid}`, JSON.stringify(currentList));
            localStorage.setItem('mg_coptic_claimed_chests', JSON.stringify(currentList));

            const curProg = this.getProgressLocal(uid) || {};
            curProg.points = Number(data.points ?? curProg.points ?? 0);
            curProg.total_points = curProg.points;
            curProg.hearts = Number(data.hearts ?? curProg.hearts ?? 5);
            curProg.claimed_chests = currentList;
            this.saveProgressLocal(curProg, uid);
          } else if (error) {
            console.warn('claim_treasure_chest RPC error:', error);
            if (error.message && error.message.includes('مفتوح مسبقاً')) {
              return false;
            }
          }
        } catch (rpcErr) {
          console.warn('claim_treasure_chest RPC call failed:', rpcErr);
        }
      }

      // احتياطي غير متصل (Offline Fallback) فقط عند تعذر اتصال السيرفر
      if (!rpcHandled) {
        const key = uid ? `mg_coptic_claimed_chests_${uid}` : 'mg_coptic_claimed_chests';
        const raw = localStorage.getItem(key) || localStorage.getItem('mg_coptic_claimed_chests');
        let list = raw ? JSON.parse(raw) : [];
        if (list.includes(cleanChestId)) {
          return false;
        }
        list.push(cleanChestId);
        if (uid) localStorage.setItem(key, JSON.stringify(list));
        localStorage.setItem('mg_coptic_claimed_chests', JSON.stringify(list));
        await this.updateProgress(uid, { addPoints: xpReward, addHearts: heartsReward, claimed_chests: list });
      }

      // حفظ الشارة إن وُجدت
      if (badgeReward && (badgeReward.title || badgeReward.badge_title)) {
        try {
          const bTitle = badgeReward.title || badgeReward.badge_title;
          const bIcon = badgeReward.icon || badgeReward.badge_icon || '🏆';
          const bDesc = badgeReward.description || badgeReward.badge_desc || '';
          const badgeKey = uid ? `mg_coptic_badges_${uid}` : 'mg_coptic_badges';
          const rawBadges = localStorage.getItem(badgeKey) || localStorage.getItem('mg_coptic_badges') || '[]';
          let badgesList = JSON.parse(rawBadges);
          const alreadyHas = badgesList.some(b => (b.id === badgeReward.id || b.title === bTitle));
          if (!alreadyHas) {
            badgesList.push({
              id: badgeReward.id || `badge_${Date.now()}`,
              title: bTitle,
              icon: bIcon,
              description: bDesc,
              unlocked_at: new Date().toISOString()
            });
            if (uid) localStorage.setItem(badgeKey, JSON.stringify(badgesList));
            localStorage.setItem('mg_coptic_badges', JSON.stringify(badgesList));
          }
        } catch (bErr) {
          console.warn('Saving chest badge error:', bErr);
        }
      }

      this.sound.playChestReward();
      return true;
    } catch (e) {
      return false;
    }
  }

  // حفظ بيانات المستخدم محلياً كـ cache لحسابه
  saveUserLocal(user){
    try {
      if(user){
        localStorage.setItem(MG_CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
        if(user.id) localStorage.setItem(`mg_coptic_user_${user.id}`, JSON.stringify(user));
      } else {
        localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.USER);
      }
    } catch(e){}
  }

  // تسجيل حساب جديد عبر Supabase Auth الحقيقي
  async createUser(fullName, age, email, password){
    if(!sbClient) throw new Error('Supabase غير متوفر');
    const cleanName = String(fullName || '').trim();
    const cleanAge = parseInt(age, 10) || 15;
    const cleanEmail = String(email || '').trim().toLowerCase();

    const { data, error } = await sbClient.auth.signUp({
      email: cleanEmail,
      password: password,
      options: {
        data: {
          full_name: cleanName,
          age: cleanAge
        }
      }
    });

    if(error) throw error;
    if(data && (data.user || data.session)){
      const user = data.user || data.session?.user;
      const userObj = {
        id: user.id,
        email: cleanEmail,
        full_name: cleanName,
        age: cleanAge,
        avatar_url: '',
        role: 'student'
      };
      this.saveUserLocal(userObj);
      return userObj;
    }
    return null;
  }

  // تسجيل الخروج ومسح بيانات الجلسة السابقة مع الاحتفاظ بالتقدم المخزن
  async signOut(){
    if(sbClient){
      try {
        await sbClient.auth.signOut();
      } catch(e){}
    }
    try {
      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.USER);
      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.PROGRESS);
      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS);
      localStorage.removeItem('mg_coptic_student_auth_token');
      localStorage.removeItem('mg_coptic_claimed_chests');
      // ملاحظة: نحتفظ بكاش المستخدم الخاص mg_coptic_progress_${uid} و mg_coptic_lesson_progress_${uid}
      // لمنع فقدان البيانات عند العودة للدخول لاحقاً
    } catch(e){}
  }

  // قراءة فورية متزامنة (0 ميلي ثانية) لبيانات التقدم المخزنة محلياً
  getProgressLocal(userId = null){
    const uid = userId || this.getCurrentUser()?.id;
    const userKey = uid ? `mg_coptic_progress_${uid}` : MG_CONFIG.STORAGE_KEYS.PROGRESS;
    try {
      const raw = localStorage.getItem(userKey) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.PROGRESS);
      if(raw){
        const parsed = JSON.parse(raw);
        return {
          user_id: uid,
          points: parsed.points ?? parsed.total_points ?? 0,
          total_points: parsed.points ?? parsed.total_points ?? 0,
          hearts: parsed.hearts ?? 5,
          streak_days: parsed.streak_days ?? parsed.streak ?? 1,
          last_active_date: parsed.last_active_date || new Date().toISOString().split('T')[0],
          claimed_chests: parsed.claimed_chests || []
        };
      }
    } catch(e){}
    return {
      user_id: uid,
      hearts: 5,
      points: 0,
      total_points: 0,
      streak_days: 1,
      last_active_date: new Date().toISOString().split('T')[0],
      claimed_chests: []
    };
  }

  // الحصول على بيانات التقدم (القلوب، النقاط، الستريك) من Supabase لحساب المستخدم
  async getProgress(userId, forceRemote = false){
    const uid = userId || this.getCurrentUser()?.id;
    let progress = null;
    const userKey = uid ? `mg_coptic_progress_${uid}` : MG_CONFIG.STORAGE_KEYS.PROGRESS;

    try {
      const raw = localStorage.getItem(userKey) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.PROGRESS);
      if(raw) progress = JSON.parse(raw);
    } catch(e){}

    // إذا كان التقدم مسجلاً محلياً ولم يُطلب الجلب الإجباري، نرجعه فوراً
    if(progress && !forceRemote){
      return progress;
    }

    if(sbClient && uid){
      try {
        const { data, error } = await sbClient.from('user_progress').select('*').eq('user_id', uid).maybeSingle();
        if(!error && data){
          const serverResetVersion = Number(data.reset_version || 0);
          const localResetVersion = Number(localStorage.getItem(`mg_coptic_reset_version_${uid}`) || 0);
          const isResetDetected = (serverResetVersion > localResetVersion);

          if (isResetDetected) {
            console.log('[Gamification] Account reset detected from server. Purging local stale cache...');
            this.resetFullAccountLocal(uid);
            localStorage.setItem(`mg_coptic_reset_version_${uid}`, String(serverResetVersion));
          }

          progress = {
            user_id: uid,
            hearts: data.hearts ?? 5,
            points: data.points ?? 0,
            total_points: data.points ?? 0,
            streak_days: data.streak_days ?? 1,
            reset_version: serverResetVersion,
            reset_at: data.reset_at || null,
            last_active_date: data.last_active_date || new Date().toISOString().split('T')[0],
            claimed_chests: data.claimed_chests || []
          };
          if(Array.isArray(data.claimed_chests)){
            localStorage.setItem(`mg_coptic_claimed_chests_${uid}`, JSON.stringify(data.claimed_chests));
            localStorage.setItem('mg_coptic_claimed_chests', JSON.stringify(data.claimed_chests));
          }
          localStorage.setItem(`mg_coptic_reset_version_${uid}`, String(serverResetVersion));
          this.saveProgressLocal(progress, uid, false);
        } else if(!data && !error && uid){
          // إنشاء سجل تقدم جديد لهذا المستخدم في السحابة فقط إذا كان uid موجود
          const initialProg = {
            user_id: uid,
            hearts: 5,
            points: 0,
            total_points: 0,
            streak_days: 1,
            last_active_date: new Date().toISOString().split('T')[0],
            claimed_chests: []
          };
          try {
            sbClient.from('user_progress').insert(initialProg).then(()=>{}, ()=>{});
          } catch(_) {}
          progress = initialProg;
          this.saveProgressLocal(progress, uid, false);
        }
      } catch(e){
        console.warn('Fetch progress from Supabase error:', e);
      }
    }

    if(!progress){
      progress = {
        user_id: uid,
        hearts: 5,
        points: 0,
        total_points: 0,
        streak_days: 1,
        last_active_date: new Date().toISOString().split('T')[0],
        claimed_chests: []
      };
      this.saveProgressLocal(progress, uid, false);
    }

    return progress;
  }

  saveProgressLocal(prog, userId = null, broadcast = true){
    try {
      const uid = userId || prog?.user_id || this.getCurrentUser()?.id;
      const normalized = {
        ...prog,
        points: prog?.points ?? prog?.total_points ?? 0,
        total_points: prog?.points ?? prog?.total_points ?? 0,
        hearts: prog?.hearts ?? 5,
        streak_days: prog?.streak_days ?? 1
      };
      if(uid){
        localStorage.setItem(`mg_coptic_progress_${uid}`, JSON.stringify(normalized));
      }
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.PROGRESS, JSON.stringify(normalized));
      if(broadcast){
        this.broadcastUpdate('progress', normalized);
      }
    } catch(e){}
  }

  // تحديث التقدم سحابياً في Supabase لحساب المستخدم
  async updateProgress(userId, updates = {}){
    const uid = userId || this.getCurrentUser()?.id;
    let prog = await this.getProgress(uid);
    if(typeof updates.hearts === 'number') prog.hearts = Math.max(0, updates.hearts);
    if(typeof updates.addPoints === 'number') prog.points = Math.max(0, (prog.points || 0) + updates.addPoints);
    if(typeof updates.addHearts === 'number') prog.hearts = Math.max(0, (prog.hearts ?? 5) + updates.addHearts);
    if(typeof updates.streak_days === 'number') prog.streak_days = updates.streak_days;
    if(Array.isArray(updates.claimed_chests)) prog.claimed_chests = updates.claimed_chests;

    this.saveProgressLocal(prog, uid);

    if(sbClient && uid){
      // مزامنة سحابية غير معطلة في الخلفية
      sbClient.from('user_progress').upsert({
        user_id: uid,
        hearts: prog.hearts,
        points: prog.points,
        streak_days: prog.streak_days,
        last_active_date: prog.last_active_date,
        claimed_chests: prog.claimed_chests || []
      }).then(()=>{}).catch(e => {
        console.warn('Supabase updateProgress error:', e);
      });
    }
    return prog;
  }

  // خصم قلب عند الإجابة الخاطئة
  async loseHeart(userId){
    let prog = await this.getProgress(userId);
    prog.hearts = Math.max(0, (prog.hearts || 5) - 1);
    this.saveProgressLocal(prog);

    if(sbClient && userId){
      sbClient.from('user_progress').update({ hearts: prog.hearts }).eq('user_id', userId).then(()=>{}).catch(()=>{});
    }
    return prog;
  }

  // إعادة ملء القلوب إلى 5
  // شراء قلوب بنقاط الـ XP (القلب = 15 XP)
  async buyHeartsWithXp(userId, count = 1, costPerHeart = 15){
    let prog = await this.getProgress(userId);
    const totalCost = count * costPerHeart;
    const currentPoints = prog.points || 0;
    if(currentPoints < totalCost){
      return { success: false, reason: 'insufficient_xp', required: totalCost, current: currentPoints };
    }
    prog.points = Math.max(0, currentPoints - totalCost);
    prog.hearts = Math.max(0, Math.min(5, (prog.hearts || 0) + count));
    this.saveProgressLocal(prog);
    if(sbClient && userId){
      try {
        await sbClient.from('user_progress').update({ points: prog.points, hearts: prog.hearts }).eq('user_id', userId);
      } catch(e){}
    }
    return { success: true, prog };
  }

  async refillHearts(userId){
    let prog = await this.getProgress(userId);
    prog.hearts = 5;
    this.saveProgressLocal(prog);
    if(sbClient && userId){
      try {
        await sbClient.from('user_progress').update({ hearts: 5 }).eq('user_id', userId);
      } catch(e){}
    }
    return prog;
  }

  /* ============================================================
     خدمات المنهج والدروس (Curriculum & Lessons)
     ============================================================ */

  // جلب المنهج كامل مع الوحدات والدروس والتمارين
  async getCurriculum(forceRemote = false){
    let cachedCurriculum = null;
    try {
      const cached = localStorage.getItem('mg_coptic_curriculum_v2') || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.CURRICULUM);
      if(cached) cachedCurriculum = JSON.parse(cached);
    } catch(e){}

    // إذا كان المنهج محفوظاً محلياً ولم يُطلب الجلب الإجباري، نرجعه فوراً
    if(cachedCurriculum && Array.isArray(cachedCurriculum.units) && !forceRemote){
      return cachedCurriculum;
    }

    if(sbClient){
      try {
        const { data: levelsData, error: lvlErr } = await sbClient.from('levels').select('*').order('order_index');
        const { data: unitsData, error: uErr } = await sbClient.from('units').select('*').order('order_index');

        if(!uErr && Array.isArray(unitsData)){
          if(unitsData.length === 0){
            const activeLevel = (levelsData && levelsData[0]) ? levelsData[0] : { id: 1, title: 'المستوى 1: الأساسيات', description: 'مسار تعلم اللغة القبطية', order_index: 1 };
            const curriculum = {
              levels: (levelsData && levelsData.length > 0) ? levelsData : [activeLevel],
              level: activeLevel,
              units: [],
              chests: []
            };
            this.saveCurriculumLocal(curriculum);
            return curriculum;
          }

          const unitIds = unitsData.map(u => u.id);
          const { data: lessonsData } = await sbClient.from('lessons').select('*').in('unit_id', unitIds).order('order_index');
          
          let allChallenges = [];
          if(lessonsData && lessonsData.length > 0){
            const lessonIds = lessonsData.map(l => l.id);
            const { data: chData } = await sbClient.from('challenges').select('*').in('lesson_id', lessonIds).order('order_index');
            allChallenges = chData || [];
          }

          let allOptions = [];
          if(allChallenges.length > 0){
            const chIds = allChallenges.map(c => c.id);
            const { data: optData } = await sbClient.from('challenge_options').select('*').in('challenge_id', chIds);
            allOptions = optData || [];
          }

          let chestsData = [];
          try {
            const { data: chs } = await sbClient.from('chests').select('*').order('created_at');
            chestsData = chs || [];
          } catch(e){}

          // تجميع الهيكل
          const builtUnits = unitsData.map(u => {
            const uLessons = (lessonsData || []).filter(l => String(l.unit_id) === String(u.id)).map(l => {
              const lChallenges = allChallenges.filter(c => String(c.lesson_id) === String(l.id)).map(c => {
                const opts = allOptions.filter(o => String(o.challenge_id) === String(c.id));
                const xp = parseInt(c.xp_reward || c.xp || 10, 10) || 10;
                return {
                  ...c,
                  xp: xp,
                  xp_reward: xp,
                  options: opts
                };
              });
              const finalLessonXp = parseInt(l.xp_reward, 10) || 20;
              const finalPracticeXp = parseInt(l.practice_xp, 10) || 20;
              const finalChallengeXp = parseInt(l.challenge_xp, 10) || 30;

              return {
                ...l,
                xp_reward: finalLessonXp,
                practice_xp: finalPracticeXp,
                challenge_xp: finalChallengeXp,
                challenges: lChallenges
              };
            });
            return {
              ...u,
              lessons: uLessons
            };
          });

          const finalChests = (chestsData && chestsData.length > 0)
            ? chestsData
            : (cachedCurriculum?.chests || []);

          const lvlOrderMap = new Map();
          (levelsData || []).forEach((lvl, idx) => {
            lvlOrderMap.set(String(lvl.id), Number(lvl.order_index) || (idx + 1));
          });
          builtUnits.sort((a, b) => {
            const lvlA = lvlOrderMap.get(String(a.level_id)) ?? 9999;
            const lvlB = lvlOrderMap.get(String(b.level_id)) ?? 9999;
            if (lvlA !== lvlB) return lvlA - lvlB;
            return (Number(a.order_index) || 1) - (Number(b.order_index) || 1);
          });

          const activeLevel = (levelsData && levelsData[0]) ? levelsData[0] : { id: 1, title: 'المستوى الأساسي' };
          const curriculum = {
            levels: (levelsData && levelsData.length > 0) ? levelsData : [activeLevel],
            level: activeLevel,
            units: builtUnits,
            chests: finalChests
          };
          this.saveCurriculumLocal(curriculum);
          return curriculum;
        }
      } catch(err){
        console.warn('Supabase curriculum fetch error, using cache:', err);
      }
    }

    return cachedCurriculum || DEFAULT_CURRICULUM;
  }

  saveCurriculumLocal(curriculum){
    try {
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.CURRICULUM, JSON.stringify(curriculum));
      localStorage.setItem('mg_coptic_curriculum_v2', JSON.stringify(curriculum));
      localStorage.setItem('mg_coptic_curriculum_v1', JSON.stringify(curriculum));
      this.broadcastUpdate('curriculum', curriculum);
    } catch(e){}
  }

  // جلب سجل تقدم الدروس للمستخدم
  async getLessonProgress(userId, forceRemote = false){
    const uid = userId || this.getCurrentUser()?.id;
    let map = {};
    const userLpKey = uid ? `mg_coptic_lesson_progress_${uid}` : MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS;

    // 1. القراءة الفورية من التخزين المحلي (0 ميلي ثانية)
    try {
      const raw = (uid ? localStorage.getItem(userLpKey) : null) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS);
      if(raw) map = JSON.parse(raw);
    } catch(e){}

    if(map && Object.keys(map).length > 0 && !forceRemote){
      return map;
    }

    if(sbClient && uid){
      try {
        const { data, error } = await sbClient.from('user_lesson_progress').select('*').eq('user_id', uid);
        if(!error){
          // السيرفر هو مصدر الحقيقة للحساب المسجل
          const serverMap = {};
          if(Array.isArray(data) && data.length > 0){
            data.forEach(row => {
              const lid = String(row.lesson_id);
              serverMap[lid] = {
                status: row.status,
                score: row.score || 0
              };
              if(row.status === 'completed'){
                serverMap[`${lid}_p`] = { status: 'completed', score: row.score || 100 };
                serverMap[`${lid}_c`] = { status: 'completed', score: row.score || 100 };
              }
            });
            map = Object.keys(serverMap).length > 0 ? serverMap : { '1': { status: 'in_progress', score: 0 } };
          } else {
            // لا توجد أي دروس مكتملة في السحابة لهذا الحساب (تم تصفير الحساب أو حساب جديد)
            map = { '1': { status: 'in_progress', score: 0 } };
          }

          if(uid) localStorage.setItem(userLpKey, JSON.stringify(map));
          localStorage.setItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(map));
          return map;
        }
      } catch(e){
        console.warn('Supabase getLessonProgress error:', e);
      }
    }

    if(!map['1'] && !map['101']){
      map['1'] = { status: 'in_progress', score: 0 };
    }
    return map;
  }

  // تسجيل إكمال درس وحفظه سحابياً في Supabase لحساب المستخدم
  // تسجيل إكمال درس وحفظه سحابياً في Supabase لحساب المستخدم عبر complete_lesson_reward
  async completeLesson(userId, lessonId, score = 100, nextLessonId = null, xpReward = 20){
    const uid = userId || this.getCurrentUser()?.id;
    const userLpKey = uid ? `mg_coptic_lesson_progress_${uid}` : MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS;
    let map = {};
    try {
      const raw = (uid ? localStorage.getItem(userLpKey) : null) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS);
      if(raw) map = JSON.parse(raw);
    } catch(e){}

    const wasAlreadyCompleted = map[String(lessonId)] && map[String(lessonId)].status === 'completed';
    map[String(lessonId)] = { status: 'completed', score: score };

    // إذا كانت محطة تحدي _c اكتملت، نتأكد أن الدرس الأساسي والمحطة _p مسجلان كمكتملين
    if(/_c$/.test(String(lessonId))){
      const baseId = String(lessonId).replace(/_c$/, '');
      if(!map[baseId] || map[baseId].status !== 'completed'){
        map[baseId] = { status: 'completed', score: score };
      }
      if(!map[`${baseId}_p`] || map[`${baseId}_p`].status !== 'completed'){
        map[`${baseId}_p`] = { status: 'completed', score: score };
      }
    } else if(/_p$/.test(String(lessonId))){
      const baseId = String(lessonId).replace(/_p$/, '');
      if(!map[baseId] || map[baseId].status !== 'completed'){
        map[baseId] = { status: 'completed', score: score };
      }
    }

    if(nextLessonId){
      if(!map[String(nextLessonId)] || map[String(nextLessonId)].status === 'locked'){
        map[String(nextLessonId)] = { status: 'in_progress', score: 0 };
      }
    }

    try {
      if(uid) localStorage.setItem(userLpKey, JSON.stringify(map));
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(map));
    } catch(e){}

    const isVirtualStation = /_(p|c)$/.test(String(lessonId));
    const numLessonId = isVirtualStation
      ? parseInt(String(lessonId).replace(/_(p|c)$/, ''), 10)
      : parseInt(lessonId, 10);

    let serverHandled = false;

    // المزامنة السحابية الموثوقة عبر complete_lesson_reward (بدون تمرير قيمة النقاط من العميل)
    if(sbClient && uid && !isNaN(numLessonId)){
      try {
        const { data: rpcData, error: rpcErr } = await sbClient.rpc('complete_lesson_reward', {
          p_lesson_id: numLessonId,
          p_score: parseInt(score, 10) || 100
        });

        if(!rpcErr && rpcData && rpcData.success){
          serverHandled = true;
          const curProg = this.getProgressLocal(uid) || {};
          curProg.points = Number(rpcData.points ?? curProg.points ?? 0);
          curProg.total_points = curProg.points;
          if(rpcData.hearts != null) curProg.hearts = Number(rpcData.hearts);
          if(rpcData.streak_days != null) curProg.streak_days = Number(rpcData.streak_days);
          this.saveProgressLocal(curProg, uid);

          if(rpcData.added_xp > 0){
            this.recordTodayEarnedXP(uid, rpcData.added_xp);
          }
        } else if(rpcErr){
          console.warn('complete_lesson_reward RPC error:', rpcErr);
        }

        // فتح الدرس التالي بالسحابة
        if(nextLessonId && !/_(p|c)$/.test(String(nextLessonId))){
          const nextNumId = parseInt(nextLessonId, 10);
          if(!isNaN(nextNumId)){
            sbClient.from('user_lesson_progress').upsert({
              user_id: uid,
              lesson_id: nextNumId,
              status: 'in_progress',
              score: 0,
              updated_at: new Date().toISOString()
            }).then(()=>{}, ()=>{});
          }
        }
      } catch(err){
        console.warn('completeLesson cloud sync error:', err);
      }
    }

    // احتياطي غير متصل (Offline fallback) فقط في حال تعذر الاتصال بالسيرفر
    if(!serverHandled && !wasAlreadyCompleted){
      const fallbackXp = parseInt(xpReward, 10) || 20;
      const curProg = this.getProgressLocal(uid) || {};
      if(fallbackXp > 0){
        curProg.points = (curProg.points || 0) + fallbackXp;
        curProg.total_points = (curProg.total_points || 0) + fallbackXp;
        this.saveProgressLocal(curProg, uid);
        this.recordTodayEarnedXP(uid, fallbackXp);
      }
      if(sbClient && uid && !isNaN(numLessonId)){
        sbClient.from('user_lesson_progress').upsert({
          user_id: uid,
          lesson_id: numLessonId,
          status: 'completed',
          score: parseInt(score, 10) || 100,
          updated_at: new Date().toISOString()
        }).then(()=>{}, ()=>{});

        sbClient.from('user_progress').update({
          points: curProg.points || 0,
          last_active_date: new Date().toISOString().split('T')[0]
        }).eq('user_id', uid).then(()=>{}, ()=>{});
      }
    }

    return map;
  }

  // مسح كامل الكاش المحلي لحساب المستخدم فور تصفيره
  resetFullAccountLocal(userId = null) {
    const uid = userId || this.getCurrentUser()?.id;
    if (!uid) return;

    const keysToClear = [
      `mg_coptic_progress_${uid}`,
      `mg_coptic_lesson_progress_${uid}`,
      `mg_coptic_claimed_chests_${uid}`,
      `mg_coptic_badges_${uid}`,
      `mg_coptic_daily_goal_${uid}`,
      `mg_coptic_daily_xp_date_${uid}`,
      `mg_coptic_daily_xp_val_${uid}`,
      `mg_coptic_last_synced_date_${uid}`,
      'mg_coptic_progress',
      'mg_coptic_lesson_progress',
      'mg_coptic_claimed_chests',
      'mg_coptic_badges',
      'mg_coptic_daily_xp_date',
      'mg_coptic_daily_xp_val',
      'mg_coptic_guest_migrated'
    ];
    keysToClear.forEach(k => {
      try { localStorage.removeItem(k); } catch(_) {}
    });

    const todayStr = new Date().toISOString().split('T')[0];
    const initialProg = {
      user_id: uid,
      points: 0,
      total_points: 0,
      hearts: 5,
      streak_days: 1,
      claimed_chests: [],
      last_active_date: todayStr
    };
    this.saveProgressLocal(initialProg, uid, false);
    try {
      localStorage.setItem(`mg_coptic_claimed_chests_${uid}`, '[]');
      localStorage.setItem('mg_coptic_claimed_chests', '[]');
      localStorage.setItem(`mg_coptic_badges_${uid}`, '[]');
      localStorage.setItem('mg_coptic_badges', '[]');
    } catch(_) {}

    const initialLp = { '1': { status: 'in_progress', score: 0 } };
    try {
      localStorage.setItem(`mg_coptic_lesson_progress_${uid}`, JSON.stringify(initialLp));
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(initialLp));
    } catch(_) {}

    if (typeof window !== 'undefined') {
      if (typeof window.resetLearningPathUI === 'function') window.resetLearningPathUI();
      if (typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(initialProg);
      if (typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
    }
  }

  // تصفير حساب المستخدم بالكامل وحذف كافة الدروس والتقدم محلياً وسحابياً
  async resetFullAccount(userId = null, actorId = null) {
    const uid = userId || this.getCurrentUser()?.id;
    if (!uid) return false;

    // 1. مسح جميع مفاتيح التخزين المحلي فوراً
    this.resetFullAccountLocal(uid);

    const todayStr = new Date().toISOString().split('T')[0];
    const initialProg = {
      user_id: uid,
      points: 0,
      total_points: 0,
      hearts: 5,
      streak_days: 1,
      claimed_chests: [],
      last_active_date: todayStr
    };

    // 2. استدعاء الـ Edge Function بصلاحيات Service Role لحذف كافة السجلات سحابياً
    try {
      const anonKey = (typeof MG_CONFIG !== 'undefined' && MG_CONFIG?.SUPABASE_ANON_KEY) ? MG_CONFIG.SUPABASE_ANON_KEY : (window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo');
      await fetch('https://kdoanxzpfiscprjjzzic.supabase.co/functions/v1/send-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`
        },
        body: JSON.stringify({
          action: 'reset_account',
          user_id: uid,
          actor_id: actorId || this.getCurrentUser()?.id || null
        })
      });
    } catch (e) {
      console.warn('resetFullAccount edge call notice:', e);
    }

    // 3. محاولة RPC الموثوقة مع تمرير معرّف المشرف
    const sb = this.getSupabaseClient();
    if (sb) {
      let rpcSuccess = false;
      try {
        const callerId = actorId || this.getCurrentUser()?.id || uid;
        const { data: d, error: err } = await sb.rpc('admin_reset_full_account', { p_user_id: uid, p_actor_id: callerId });
        if (!err && d && d.success) rpcSuccess = true;
      } catch(_) {}

      if (!rpcSuccess) {
        try {
          await sb.rpc('admin_reset_full_account', { p_user_id: uid });
        } catch(_) {}
      }

      // مسح سحابي مباشر احتياطي لضمان تصفير الجداول 100%
      try {
        await Promise.all([
          sb.from('user_lesson_progress').delete().eq('user_id', uid),
          sb.from('user_challenge_progress').delete().eq('user_id', uid),
          sb.from('user_writing_progress').delete().eq('user_id', uid)
        ]);
        let nextVer = 1;
        try {
          const { data: curProg } = await sb.from('user_progress').select('reset_version').eq('user_id', uid).maybeSingle();
          nextVer = Number(curProg?.reset_version || 0) + 1;
        } catch(_) {}
        await sb.from('user_progress').upsert({
          user_id: uid,
          points: 0,
          total_points: 0,
          hearts: 5,
          streak_days: 1,
          claimed_chests: [],
          reset_version: nextVer,
          reset_at: new Date().toISOString(),
          last_active_date: todayStr
        }, { onConflict: 'user_id' });
      } catch(tblErr) {
        console.warn('Direct tables reset fallback error in gamification-service:', tblErr);
      }
    }

    // 4. بث التحديث محلياً وعبر قنوات التزامن
    if (this.channel) {
      try {
        this.channel.postMessage({
          type: 'full_account_reset',
          payload: { user_id: uid, points: 0, hearts: 5, streak_days: 1, completed_lessons: 0 }
        });
      } catch(_) {}
    }

    if (typeof window !== 'undefined') {
      if (typeof window.resetLearningPathUI === 'function') window.resetLearningPathUI();
      if (typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(initialProg);
      if (typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
      if (typeof window.renderSkillMap === 'function') window.renderSkillMap();
      if (typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
    }

    return true;
  }

  recordTodayEarnedXP(userId, amount) {
    const addVal = parseInt(amount, 10);
    if (isNaN(addVal) || addVal <= 0) return;
    try {
      const uid = userId || this.getCurrentUser()?.id || 'guest';
      const todayStr = new Date().toISOString().split('T')[0];
      const dateKey = `mg_coptic_daily_xp_date_${uid}`;
      const valKey = `mg_coptic_daily_xp_val_${uid}`;
      const savedDate = localStorage.getItem(dateKey) || localStorage.getItem('mg_coptic_daily_xp_date');
      let current = 0;
      if (savedDate === todayStr) {
        current = parseInt(localStorage.getItem(valKey) || localStorage.getItem('mg_coptic_daily_xp_val') || '0', 10);
        if (isNaN(current) || current < 0) current = 0;
      }
      const updated = current + addVal;
      localStorage.setItem(dateKey, todayStr);
      localStorage.setItem(valKey, String(updated));
      localStorage.setItem('mg_coptic_daily_xp_date', todayStr);
      localStorage.setItem('mg_coptic_daily_xp_val', String(updated));

      if (typeof window !== 'undefined' && typeof window.updateDailyGoalUI === 'function') {
        try { window.updateDailyGoalUI(); } catch (e) {}
      }
    } catch (e) {
      console.warn('recordTodayEarnedXP error:', e);
    }
  }
}

// إنشاء نسخة عامة واحدة
window.DEFAULT_CURRICULUM = DEFAULT_CURRICULUM;
window.GamificationService = GamificationService;
GamificationService.DEFAULT_CURRICULUM = DEFAULT_CURRICULUM;
window.MGCopticGame = new GamificationService();
