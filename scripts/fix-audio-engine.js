/**
 * MG COPTIC — Fix Audio Playback Engine
 * 1. Fixes ReferenceError: filename is not defined in playAudio
 * 2. Prioritizes instant HTML5 Audio playback (works on file:///, http://, https://, and WebView)
 * 3. Keeps Web Audio API as cache decoder
 * 4. Syncs learn.js into index.html inline script and www/
 */
const fs = require('fs');

console.log('🔊 Fixing Audio Engine...');

const serviceFiles = [
  'js/services/gamification-service.js',
  'gamification-service.js',
  'www/js/services/gamification-service.js',
  'www/gamification-service.js'
];

const newPlayAudioMethod = `  async playAudio(urlOrText){
    const cleanPrimary = String(urlOrText || '').trim();
    if(!cleanPrimary) return false;

    // 1. إيقاف أي صوت شغال حالياً
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

    const filename = cleanPrimary.split('/').pop().split('\\\\').pop().split('?')[0];

    // 2. كاش عناصر Web Audio فائق السرعة
    const cachedBuf = this._audioBufferCache.get(cleanPrimary) || (filename ? this._audioBufferCache.get(filename) : null);
    if(cachedBuf && this.ctx){
      try {
        const source = this.ctx.createBufferSource();
        source.buffer = cachedBuf;
        source.connect(this.ctx.destination);
        source.start(0);
        this._currentSourceNode = source;
        return true;
      } catch(e){}
    }

    // 3. كاش عناصر HTML5 Audio
    const cachedAudio = this._soundFileCache.get(cleanPrimary) || (filename ? this._soundFileCache.get(filename) : null);
    if(cachedAudio){
      try {
        cachedAudio.currentTime = 0;
        this._activeAudio = cachedAudio;
        const p = cachedAudio.play();
        if(p !== undefined) await p;
        return true;
      } catch(e){}
    }

    // 4. استخراج المرشحين
    let candidates = this.resolveAudioCandidates(cleanPrimary);
    if (filename && (!candidates || candidates.length === 0)) {
      candidates = this.resolveAudioCandidates(filename);
    }
    if (!candidates || candidates.length === 0) {
      candidates = [cleanPrimary];
    }

    // إضافة مسارات إضافية تضمن إيجاد الملف دائماً
    if (filename && filename.endsWith('.mp3')) {
      const extraPaths = [
        \`audio_coptic/\${filename}\`,
        \`assets/sounds/\${filename}\`,
        \`./audio_coptic/\${filename}\`,
        \`./assets/sounds/\${filename}\`,
        \`../audio_coptic/\${filename}\`,
        \`../assets/sounds/\${filename}\`,
        filename
      ];
      extraPaths.forEach(p => {
        if (!candidates.includes(p)) candidates.push(p);
      });
    }

    // 5. التشغيل المباشر عبر HTML5 Audio (يعمل 100% دون أخطاء CORS على كل المنصات)
    for(let i = 0; i < candidates.length; i++){
      const candidateUrl = candidates[i];
      const ok = await new Promise((resolve) => {
        let done = false;
        const audio = new Audio();
        this._activeAudio = audio;
        audio.preload = 'auto';

        const finishOk = () => {
          if(!done){
            done = true;
            this._soundFileCache.set(cleanPrimary, audio);
            if (filename) this._soundFileCache.set(filename, audio);
            resolve(true);
          }
        };

        const finishFail = () => {
          if(!done){
            done = true;
            resolve(false);
          }
        };

        audio.addEventListener('playing', finishOk, { once: true });
        audio.addEventListener('canplaythrough', finishOk, { once: true });
        audio.addEventListener('error', finishFail, { once: true });

        try {
          audio.src = candidateUrl;
          const p = audio.play();
          if(p !== undefined){
            p.then(finishOk).catch(finishFail);
          }
        } catch(err){
          finishFail();
        }

        // أقصى مهلة للمحاولة الفردية 600 ميلي ثانية لتفادي أي تأخير
        setTimeout(finishFail, 600);
      });

      if(ok) return true;
    }

    return false;
  }`;

// Update playAudio in all service files
for (const f of serviceFiles) {
  if (!fs.existsSync(f)) continue;
  let content = fs.readFileSync(f, 'utf-8');

  // Replace playAudio method
  const playAudioRegex = /  async playAudio\(urlOrText\)\{[\s\S]*?\n  \}/;
  if (playAudioRegex.test(content)) {
    content = content.replace(playAudioRegex, newPlayAudioMethod);
    fs.writeFileSync(f, content, 'utf-8');
    console.log(`✅ Updated playAudio in ${f}`);
  } else {
    console.warn(`⚠️ Could not find playAudio in ${f}`);
  }
}

// Update inline learn.js in index.html and www/index.html
const learnJsContent = fs.readFileSync('js/pages/learn.js', 'utf-8');
const htmlFiles = ['index.html', 'www/index.html'];

for (const htmlFile of htmlFiles) {
  if (!fs.existsSync(htmlFile)) continue;
  let html = fs.readFileSync(htmlFile, 'utf-8');

  const startMarker = '(function initLearningPathEngine() {';
  const startIdx = html.indexOf(startMarker);
  if (startIdx !== -1) {
    // Find the end of this IIFE
    const endMarker = '    })();';
    const endIdx = html.indexOf(endMarker, startIdx + 1000);
    if (endIdx !== -1) {
      const fullEndIdx = endIdx + endMarker.length;
      html = html.slice(0, startIdx) + learnJsContent.trim() + html.slice(fullEndIdx);
      fs.writeFileSync(htmlFile, html, 'utf-8');
      console.log(`✅ Synchronized learn.js inline into ${htmlFile}`);
    } else {
      console.warn(`⚠️ Could not find end marker in ${htmlFile}`);
    }
  } else {
    console.warn(`⚠️ Could not find start marker in ${htmlFile}`);
  }
}

console.log('🎉 Audio Engine completely repaired and synchronized!');
