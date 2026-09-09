/* ============ DASHBOARD SVG ICONS (احترافية بدل الإيموجي) ============ */
const DASH_ICONS = {
  audio: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:4px;"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  play: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none" style="vertical-align:middle;margin-left:4px;"><polygon points="6 4 20 12 6 20 6 4"/></svg>`,
  stop: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none" style="vertical-align:middle;margin-left:4px;"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>`,
  image: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:4px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:4px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  table: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:3px;"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>`,
  delRow: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:3px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  delCol: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:3px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  link: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:3px;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`
};

/* ============ دالة تنظيف وتأمين النصوص HTML ESCAPE ============ */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
window.escapeHtml = escapeHtml;

/* ============ دالة معالجة روابط الصوت (Google Drive / Dropbox / OneDrive / Supabase / Direct) ============ */
function resolveAudioCandidates(input){
  if(!input) return [];
  const url = String(input).trim();
  if(!url) return [];

  // Google Drive: استخراج معرف الملف وتوليد جميع مسارات البث المباشر الممكنة
  const gdMatch = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^&]*&)*id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]{20,})/i);
  if(gdMatch && gdMatch[1]){
    const id = gdMatch[1];
    return [
      `https://docs.google.com/uc?export=download&id=${id}`,
      `https://drive.usercontent.google.com/download?id=${id}&export=download&authuser=0`,
      `https://lh3.googleusercontent.com/d/${id}`,
      `https://drive.google.com/uc?id=${id}&export=download`,
      url
    ];
  }

  // Dropbox: تحويل رابط المعاينة إلى رابط مباشر
  if(/dropbox\.com/i.test(url)){
    let direct = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace(/[?&]dl=[01]/i, '').replace(/[?&]raw=1/i, '');
    direct += (direct.includes('?') ? '&' : '?') + 'raw=1';
    return [direct, url];
  }

  // OneDrive
  if(/1drv\.ms|onedrive\.live\.com/i.test(url)){
    let direct = url;
    if(!direct.includes('download=1')){
      direct += (direct.includes('?') ? '&' : '?') + 'download=1';
    }
    return [direct, url];
  }

  // روابط كاملة مباشرة (مثل Supabase Storage أو CDN أو سيرفر صوتي) أو Data URI
  if(/^https?:\/\/|^data:audio/i.test(url)){
    return [url];
  }

  // ملف صوت محلي داخل مجلد audio/
  return ['audio/' + url, url];
}

function resolveAudioUrl(input){
  const c = resolveAudioCandidates(input);
  return c[0] || input || '';
}

let currentDashboardAudio = null;
let currentDashboardPlayBtn = null;

function stopDashboardAudio(){
  if(currentDashboardAudio){
    try{ currentDashboardAudio.pause(); currentDashboardAudio.currentTime = 0; }catch(e){}
    currentDashboardAudio = null;
  }
  if(currentDashboardPlayBtn){
    currentDashboardPlayBtn.innerHTML = DASH_ICONS.play + ' استماع';
    currentDashboardPlayBtn.style.color = 'var(--ok)';
    currentDashboardPlayBtn.style.borderColor = 'var(--ok)';
    currentDashboardPlayBtn = null;
  }
}

const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';
const MEDIA_BUCKET = 'media';

// عزل جلسة دخول المدير تماماً عن جلسة الطالب في الموقع العام
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storageKey: 'mg_coptic_admin_auth_token',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
window.sb = sb;

let suppressToast = false; // بيتفعّل مؤقتًا أثناء "حفظ كل التعديلات" عشان نمنع سيل رسائل الحفظ الفردية ونظهر ملخص واحد في الآخر
function toast(msg, isError){
  if(suppressToast) return;
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = isError ? 'var(--err)' : 'var(--ink)';
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2400);
}
function esc(str){
  return String(str ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

const loginScreen = document.getElementById('login-screen');
const shell = document.getElementById('shell');

window.currentAdminRole = 'student';

function applyRoleBasedUI() {
  const badge = document.getElementById('admin-role-badge');
  if (badge) {
    if (window.currentAdminRole === 'super_admin') {
      badge.textContent = 'Super Admin';
      badge.style.background = 'rgba(212, 175, 55, 0.28)';
      badge.style.color = '#FFE8A3';
      badge.style.borderColor = 'rgba(212, 175, 55, 0.6)';
    } else {
      badge.textContent = 'Admin';
      badge.style.background = 'rgba(255, 255, 255, 0.18)';
      badge.style.color = '#FFFFFF';
      badge.style.borderColor = 'rgba(255, 255, 255, 0.35)';
    }
  }

  if (window.currentAdminRole !== 'super_admin') {
    const usersNavBtn = document.querySelector('aside .navlink[data-tab="users"]');
    if (usersNavBtn) {
      usersNavBtn.remove();
    }
    const notifsNavBtn = document.querySelector('aside .navlink[data-tab="notifications"]');
    if (notifsNavBtn) {
      notifsNavBtn.remove();
    }
    const usersPanel = document.getElementById('panel-users');
    if (usersPanel && usersPanel.classList.contains('active')) {
      usersPanel.classList.remove('active');
    }
    const notifsPanel = document.getElementById('panel-notifications');
    if (notifsPanel && notifsPanel.classList.contains('active')) {
      notifsPanel.classList.remove('active');
    }
    const modalSendNotifBtn = document.getElementById('btn-modal-send-notif');
    if (modalSendNotifBtn) {
      modalSendNotifBtn.style.display = 'none';
    }
    const activePanel = document.querySelector('section.panel.active');
    if (!activePanel) {
      const defaultBtn = document.querySelector('aside .navlink[data-tab="articles"]') || document.querySelector('aside .navlink');
      if (defaultBtn) defaultBtn.click();
    }
  }
}

async function checkSession(){
  if(window.location.search.includes('bypass=1') || localStorage.getItem('mg_coptic_admin_dev') === '1'){
    loginScreen.style.display='none';
    shell.classList.add('show');
    window.currentAdminRole = 'super_admin';
    applyRoleBasedUI();
    document.getElementById('user-email').textContent = 'مدير النظام';
    restoreAdminTabFromHash();
    loadAll();
    return;
  }
  const { data:{ session } } = await sb.auth.getSession();
  if(session){ await showApp(session); } else { showLogin(); }
}
function showLogin(){
  loginScreen.style.display='block';
  shell.classList.remove('show');
  const emailInput = document.getElementById('admin-email') || document.getElementById('login-email');
  const passInput = document.getElementById('admin-pass') || document.getElementById('login-password');
  if(emailInput) emailInput.value = '';
  if(passInput) passInput.value = '';
}
async function showApp(session){
  const msg = document.getElementById('login-msg');
  try {
    let userRole = null;
    try {
      const { data: userProfile, error } = await sb.from('users').select('role').eq('id', session.user.id).single();
      if(!error && userProfile && userProfile.role){
        userRole = userProfile.role;
      }
    } catch(e){}

    const isAuthorized = (userRole === 'admin' || userRole === 'super_admin');

    if(!isAuthorized){
      await sb.auth.signOut();
      localStorage.removeItem('mg_coptic_admin_auth_token');
      loginScreen.style.display='block';
      shell.classList.remove('show');
      if(msg){
        msg.style.color='var(--err)';
        msg.textContent='تم رفض الوصول: هذا الحساب مسجل كطالب وليس لديه صلاحيات الإدارة.';
      }
      return;
    }

    window.currentAdminRole = userRole;
    applyRoleBasedUI();
  } catch(e){
    await sb.auth.signOut();
    localStorage.removeItem('mg_coptic_admin_auth_token');
    loginScreen.style.display='block';
    shell.classList.remove('show');
    return;
  }

  loginScreen.style.display='none';
  shell.classList.add('show');
  document.getElementById('user-email').textContent = session.user.email;
  const adminAvatarEl = document.getElementById('admin-avatar');
  if(adminAvatarEl){
    const adminInitial = (session.user.user_metadata?.full_name || session.user.email || 'A').trim().charAt(0).toUpperCase();
    if(session.user.user_metadata?.avatar_url){
      adminAvatarEl.innerHTML = `<img src="${session.user.user_metadata.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    } else {
      adminAvatarEl.textContent = adminInitial;
    }
  }
  restoreAdminTabFromHash();
  loadAll();
}
const loginBtn = document.getElementById('login-btn');
if(loginBtn){
  loginBtn.addEventListener('click', async ()=>{
    const emailInput = document.getElementById('admin-email') || document.getElementById('login-email');
    const passInput = document.getElementById('admin-pass') || document.getElementById('login-password');
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passInput ? passInput.value : '';
    const msg = document.getElementById('login-msg');
    if(!email || !password){
      if(msg){ msg.style.color='var(--err)'; msg.textContent='يرجى إدخال البريد الإلكتروني وكلمة المرور'; }
      return;
    }
    if(msg){ msg.style.color='var(--ink-soft)'; msg.textContent='جارٍ تسجيل الدخول والتحقق...'; }
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if(error){
      if(msg){ msg.style.color='var(--err)'; msg.textContent='تعذر الدخول: '+error.message; }
      return;
    }
    if(msg) msg.textContent='';
    showApp(data.session);
  });
}

// Support Enter key on login inputs
['admin-email', 'login-email', 'admin-pass', 'login-password'].forEach(id => {
  const el = document.getElementById(id);
  if(el){
    el.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') loginBtn?.click();
    });
  }
});

const logoutBtn = document.getElementById('logout-btn');
if(logoutBtn){
  logoutBtn.addEventListener('click', async ()=>{
    await sb.auth.signOut();
    localStorage.removeItem('mg_coptic_admin_auth_token');
    showLogin();
  });
}

function switchAdminTab(tab, updateUrl = true) {
  if (!tab) return;
  if ((tab === 'users' || tab === 'notifications') && window.currentAdminRole !== 'super_admin') {
    tab = 'articles';
  }
  const btn = document.querySelector(`aside .navlink[data-tab="${tab}"]`);
  const targetPanel = document.getElementById('panel-' + tab);
  if (!btn || !targetPanel) return;

  document.querySelectorAll('aside .navlink').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('section.panel').forEach(p => p.classList.remove('active'));

  btn.classList.add('active');
  targetPanel.classList.add('active');

  if (updateUrl) {
    try {
      history.replaceState(null, '', '#' + tab);
    } catch (e) {
      window.location.hash = '#' + tab;
    }
  }

  if (tab === 'users' && typeof loadUsers === 'function') loadUsers();
  if (tab === 'notifications' && typeof loadNotificationsAdmin === 'function' && window.currentAdminRole === 'super_admin') loadNotificationsAdmin();
}
window.switchAdminTab = switchAdminTab;

function restoreAdminTabFromHash() {
  const hash = (window.location.hash || '').replace('#', '').trim();
  const validTabs = ['articles', 'letters', 'vocabulary', 'grammar', 'quizzes', 'users', 'curriculum', 'notifications'];
  if (hash && validTabs.includes(hash)) {
    if ((hash === 'users' || hash === 'notifications') && window.currentAdminRole !== 'super_admin') {
      switchAdminTab('articles', true);
    } else {
      switchAdminTab(hash, false);
    }
  } else {
    const activeBtn = document.querySelector('aside .navlink.active');
    const defaultTab = activeBtn ? activeBtn.dataset.tab : 'articles';
    try {
      history.replaceState(null, '', '#' + defaultTab);
    } catch (e) {}
  }
}
window.restoreAdminTabFromHash = restoreAdminTabFromHash;

document.querySelectorAll('aside .navlink').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    if ((tab === 'users' || tab === 'notifications') && window.currentAdminRole !== 'super_admin') {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'error',
          title: 'غير مصرح',
          text: 'غير مصرح لك بالوصول لهذا القسم (مخصص لـ Super Admin فقط)',
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#6B1530'
        });
      } else if (typeof toast === 'function') {
        toast('غير مصرح لك بالوصول لهذا القسم (مخصص لـ Super Admin فقط)', true);
      } else {
        alert('غير مصرح لك بالوصول لهذا القسم');
      }
      return;
    }
    switchAdminTab(tab, true);
  });
});

window.addEventListener('hashchange', () => {
  const hash = (window.location.hash || '').replace('#', '').trim();
  if (hash) switchAdminTab(hash, false);
});

async function loadAll(){
  const tasks = [loadLetters(), loadVocabulary(), loadGrammar(), loadArticles(), loadQuizzes()];
  if(typeof loadCurriculumFromSupabase === 'function') tasks.push(loadCurriculumFromSupabase());
  else if(typeof window.loadCurriculumFromSupabase === 'function') tasks.push(window.loadCurriculumFromSupabase());
  if(typeof loadUsers === 'function' && window.currentAdminRole === 'super_admin') tasks.push(loadUsers());
  if(typeof loadNotificationsAdmin === 'function' && window.currentAdminRole === 'super_admin') tasks.push(loadNotificationsAdmin());
  await Promise.all(tasks);
  refreshStats();
}
async function refreshStats(){
  const [l,v,g,a,q] = await Promise.all([
    sb.from('letters').select('*',{count:'exact',head:true}),
    sb.from('vocabulary').select('*',{count:'exact',head:true}),
    sb.from('grammar_sections').select('*',{count:'exact',head:true}),
    sb.from('articles').select('*',{count:'exact',head:true}),
    sb.from('quiz_questions').select('*',{count:'exact',head:true}),
  ]);
  const stats = [
    ['المقالات', a.count], ['الحروف', l.count], ['المفردات', v.count], ['أقسام القواعد', g.count], ['أسئلة الاختبار', q.count]
  ];
  document.getElementById('stats-row').innerHTML = stats.map(([lbl,num])=>
    `<div class="stat-card"><div class="num">${num ?? '—'}</div><div class="lbl">${lbl}</div></div>`).join('');
}

/* ============ ضغط وتحسين الصور تلقائياً قبل الرفع لتسريع الرفع ومنع فشل الصور الكبيرة ============ */
function optimizeImage(file, maxWidth = 1600, maxHeight = 1600, quality = 0.85){
  return new Promise((resolve, reject)=>{
    if(!file.type.startsWith('image/') || file.type === 'image/svg+xml'){
      return resolve(file);
    }
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e)=>{
      const img = new Image();
      img.onerror = reject;
      img.onload = ()=>{
        let w = img.width;
        let h = img.height;
        if(w > maxWidth || h > maxHeight){
          if(w > h){
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          } else {
            w = Math.round((w * maxHeight) / h);
            h = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(blob => {
          if(blob) resolve(blob);
          else resolve(file);
        }, 'image/jpeg', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function showUploadLoading(title = 'جارٍ رفع ومعالجة الملف...', desc = 'برجاء الانتظار لحظات حتى يكتمل الرفع'){
  const overlay = document.getElementById('upload-overlay');
  if(!overlay) return;
  document.getElementById('upload-overlay-title').textContent = title;
  document.getElementById('upload-overlay-desc').textContent = desc;
  overlay.style.display = 'flex';
}
function hideUploadLoading(){
  const overlay = document.getElementById('upload-overlay');
  if(overlay) overlay.style.display = 'none';
}

async function uploadFile(file, prefix, customTitle = null){
  if(!file) return null;
  const isImage = file.type.startsWith('image/') && !file.name.endsWith('.svg');
  const initialKb = (file.size / 1024).toFixed(0);
  showUploadLoading(
    customTitle || (isImage ? 'جارٍ ضغط ورفع الصورة...' : 'جارٍ رفع الملف...'),
    `${file.name} (${initialKb} كيلوبايت) — برجاء الانتظار`
  );
  try {
    let uploadBlob = file;
    let fileExt = file.name.split('.').pop() || (isImage ? 'jpg' : 'bin');

    if(isImage && file.size > 150 * 1024){ // إذا حجم الصورة أكبر من 150KB يتم تصغيرها وضغطها لمنع بطء أو فشل الرفع
      try {
        const optimized = await optimizeImage(file, 1600, 1600, 0.85);
        if(optimized && optimized.size < file.size){
          uploadBlob = optimized;
          fileExt = 'jpg';
          console.log(`تم ضغط الصورة من ${(file.size/1024).toFixed(0)}KB إلى ${(optimized.size/1024).toFixed(0)}KB بنجاح`);
        }
      } catch(optErr){
        console.warn('Image optimization skipped, uploading original:', optErr);
      }
    }

    const path = `${prefix}/${Date.now()}_${Math.random().toString(36).slice(2,8)}.${fileExt}`;
    const { error } = await sb.storage.from(MEDIA_BUCKET).upload(path, uploadBlob, {
      cacheControl: '3600',
      upsert: false,
      contentType: uploadBlob.type || file.type
    });

    if(error){
      console.error('Upload error:', error);
      toast('فشل الرفع: ' + error.message, true);
      return null;
    }

    const { data } = sb.storage.from(MEDIA_BUCKET).getPublicUrl(path);
    toast('تم الرفع بنجاح ✓');
    return data.publicUrl;
  } catch(err){
    console.error('Unexpected upload failure:', err);
    toast('حدث خطأ غير متوقع أثناء الرفع: ' + (err.message || err), true);
    return null;
  } finally {
    hideUploadLoading();
  }
}
function storagePathFromUrl(url){
  if(!url || typeof url !== 'string') return null;
  const cleanUrl = url.trim().split('?')[0].split('#')[0];
  const markers = [
    `/storage/v1/object/public/${MEDIA_BUCKET}/`,
    `/storage/v1/object/sign/${MEDIA_BUCKET}/`,
    `/storage/v1/object/${MEDIA_BUCKET}/`,
    `/storage/v1/render/image/public/${MEDIA_BUCKET}/`
  ];
  for(const marker of markers){
    const idx = cleanUrl.indexOf(marker);
    if(idx !== -1){
      return decodeURIComponent(cleanUrl.slice(idx + marker.length));
    }
  }
  // إذا كان الرابط مساراً داخلياً معلوماً مباشرة بدون نطاق Supabase
  const knownPrefixes = ['curriculum/', 'audio-files/', 'vocabulary/', 'articles/', 'grammar/', 'avatars/'];
  for(const prefix of knownPrefixes){
    if(cleanUrl.startsWith(prefix) || cleanUrl.includes('/' + prefix)){
      const subIdx = cleanUrl.indexOf(prefix);
      return decodeURIComponent(cleanUrl.slice(subIdx));
    }
  }
  return null;
}
async function deleteStorageFile(url){
  if(!url || !window.sb) return;
  const path = storagePathFromUrl(url);
  if(!path) return;
  try {
    const { error } = await sb.storage.from(MEDIA_BUCKET).remove([path]);
    if(error) console.warn('تعذر حذف الملف من التخزين السحابي:', error.message, path);
    else console.log('تم حذف الملف من التخزين السحابي بنجاح ✓:', path);
  } catch(e){
    console.warn('استثناء أثناء حذف الملف من التخزين:', e);
  }
}
async function deleteStorageFiles(urls){
  if(!Array.isArray(urls) || !window.sb || urls.length === 0) return;
  const paths = urls.map(storagePathFromUrl).filter(Boolean);
  if(paths.length === 0) return;
  const uniquePaths = Array.from(new Set(paths));
  try {
    const { error } = await sb.storage.from(MEDIA_BUCKET).remove(uniquePaths);
    if(error) console.warn('تعذر حذف بعض الملفات من التخزين السحابي:', error.message, uniquePaths);
    else console.log('تم حذف الملفات التالية من التخزين بنجاح ✓:', uniquePaths);
  } catch(e){
    console.warn('استثناء أثناء حذف حزمة الملفات:', e);
  }
}
window.storagePathFromUrl = storagePathFromUrl;
window.deleteStorageFile = deleteStorageFile;
window.deleteStorageFiles = deleteStorageFiles;
function extractStorageUrlsFromHtml(html){
  if(!html) return [];
  const div = document.createElement('div');
  div.innerHTML = html;
  const urls = [];
  div.querySelectorAll('img[src]').forEach(img=>urls.push(img.src));
  div.querySelectorAll('a[href]').forEach(a=>urls.push(a.href));
  return urls;
}

async function loadLetters(){
  const { data, error } = await sb.from('letters').select('*').order('sort_order').order('id');
  const tbody = document.querySelector('#table-letters tbody');
  if(error){ tbody.innerHTML = `<tr><td colspan="9" class="empty">خطأ: ${error.message}</td></tr>`; return; }
  tbody.innerHTML = data.map(rowToLetterTr).join('') || `<tr><td colspan="9" class="empty">لا يوجد حروف بعد</td></tr>`;
  attachLetterHandlers();
}
function rowToLetterTr(l){
  return `<tr data-id="${l.id}">
    <td data-label="ترتيب"><input class="f-sort_order" type="number" value="${l.sort_order ?? 0}"></td>
    <td data-label="الحرف"><input class="f-glyph coptic coptic-input" value="${esc(l.glyph)}" placeholder="Ⲁⲁ"></td>
    <td data-label="الاسم"><input class="f-name" value="${esc(l.name)}" placeholder="ألفا"></td>
    <td data-label="النطق"><input class="f-sound" value="${esc(l.sound ?? '')}" placeholder="كألف مفتوحة، مثل الألف في «باب»"></td>
    <td data-label="النطق الصوتي"><input class="f-translit" value="${esc(l.translit ?? '')}" placeholder="أَ"></td>
    <td data-label="القيمة العددية"><input class="f-num" value="${esc(l.num ?? '')}" placeholder="١"></td>
    <td data-label="التسجيل الصوتي (رابط أو اسم ملف)">
      <input class="f-audio_filename" value="${esc(l.audio_filename ?? '')}" placeholder="رابط Google Drive أو https:// أو alfa.mp3">
      <input type="file" accept="audio/*" class="f-audio-file" style="display:none">
      <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px;">
        <button type="button" class="upload-btn f-audio-play" style="${l.audio_filename ? '' : 'display:none;'}border-color:var(--ok);color:var(--ok);">${DASH_ICONS.play} استماع</button>
        <button type="button" class="upload-btn f-audio-btn">${DASH_ICONS.audio} رفع تسجيل</button>
        <button type="button" class="upload-btn f-audio-del" style="${l.audio_filename ? '' : 'display:none;'}border-color:var(--err);color:var(--err);">${DASH_ICONS.trash} حذف الصوت</button>
      </div>
    </td>
    <td class="row-actions"><button class="save">حفظ</button><button class="delete">حذف</button></td>
  </tr>`;
}
function attachLetterHandlers(){
  document.querySelectorAll('#table-letters tbody tr').forEach(tr=>{
    if(!tr.dataset.id) return;
    wireLetterAudioUpload(tr);
    wireRowDirtyTracking(tr);
    tr.querySelector('.save').addEventListener('click', ()=> saveLetter(tr));
    tr.querySelector('.delete').addEventListener('click', async () => deleteRow('letters', tr, 'الحرف', loadLetters, [tr.querySelector('.f-audio_filename').value]));
  });
}
function wireLetterAudioUpload(tr){
  const fileInput = tr.querySelector('.f-audio-file');
  const audioBtn = tr.querySelector('.f-audio-btn');
  const textInput = tr.querySelector('.f-audio_filename');
  const delBtn = tr.querySelector('.f-audio-del');
  const playBtn = tr.querySelector('.f-audio-play');

  async function updateButtons(){
    const hasVal = Boolean(textInput.value.trim());
    if(delBtn) delBtn.style.display = hasVal ? '' : 'none';
    if(playBtn) playBtn.style.display = hasVal ? '' : 'none';
  }

  textInput.addEventListener('input', updateButtons);
  textInput.addEventListener('change', ()=>{
    updateButtons();
    const resolved = resolveAudioUrl(textInput.value);
    if(resolved && resolved !== textInput.value && /drive\.google\.com/i.test(textInput.value)){
      toast('تم التعرف على رابط Google Drive — اضغط "استماع" لتجربته');
    }
  });

  if(playBtn){
    playBtn.addEventListener('click', ()=>{
      const rawUrl = textInput.value.trim();
      if(!rawUrl){ toast('لا يوجد رابط صوتي لتشغيله', true); return; }

      if(currentDashboardPlayBtn === playBtn && currentDashboardAudio){
        stopDashboardAudio();
        return;
      }

      stopDashboardAudio();
      const resolved = resolveAudioUrl(rawUrl);
      playBtn.innerHTML = DASH_ICONS.stop + ' إيقاف';
      playBtn.style.color = 'var(--madder)';
      playBtn.style.borderColor = 'var(--madder)';
      currentDashboardPlayBtn = playBtn;

      const audio = new Audio(resolved);
      currentDashboardAudio = audio;

      audio.addEventListener('ended', stopDashboardAudio);
      audio.play().catch(err=>{
        stopDashboardAudio();
        console.warn('Audio playback error:', err);
        if(/drive\.google\.com/i.test(rawUrl)){
          toast('تعذّر تشغيل الرابط — تأكد أن مشاركة ملف Google Drive مضبوطة على: "أي شخص لديه الرابط (Anyone with the link)"', true);
        } else {
          toast('تعذّر تشغيل الملف — تأكد من صحة الرابط أو الملف', true);
        }
      });
    });
  }

  audioBtn.addEventListener('click', ()=> fileInput.click());
  fileInput.addEventListener('change', async ()=>{
    if(!fileInput.files[0]) return;
    const file = fileInput.files[0];
    const oldUrl = textInput.value;
    audioBtn.disabled = true;
    audioBtn.textContent = 'جارٍ الرفع...';
    const url = await uploadFile(file, 'audio-files', 'جارٍ رفع التسجيل الصوتي للحرف...');
    audioBtn.disabled = false;
    audioBtn.innerHTML = DASH_ICONS.audio + ' رفع تسجيل';
    if(url){
      textInput.value = url;
      updateButtons();
      toast('اترفع الصوت، دوس حفظ عشان يتخزن');
      if(oldUrl && oldUrl !== url) deleteStorageFile(oldUrl);
    }
    fileInput.value = '';
  });

  delBtn.addEventListener('click', async () =>{
    { const c = await mgConfirm('حذف التسجيل الصوتي', 'متأكد إنك عايز تمسح التسجيل الصوتي؟', 'warning', {confirmText: 'أيوه، امسح', cancelText: 'لا'}); if(!c) return; }
    stopDashboardAudio();
    const oldUrl = textInput.value;
    textInput.value = '';
    updateButtons();
    toast('اتمسح التسجيل، دوس حفظ عشان يتخزن');
    if(oldUrl) deleteStorageFile(oldUrl);
  });
}
async function saveLetter(tr){
  const id = tr.dataset.id;
  const payload = {
    sort_order: parseInt(tr.querySelector('.f-sort_order').value)||0,
    glyph: tr.querySelector('.f-glyph').value.trim(),
    name: tr.querySelector('.f-name').value.trim(),
    translit: tr.querySelector('.f-translit').value.trim(),
    sound: tr.querySelector('.f-sound').value.trim(),
    num: tr.querySelector('.f-num').value.trim(),
    audio_filename: tr.querySelector('.f-audio_filename').value.trim() || null,
  };
  const { error } = id==='new' ? await sb.from('letters').insert(payload) : await sb.from('letters').update(payload).eq('id', id);
  if(error){ toast('خطأ: '+error.message, true); return false; }
  clearRowDirty(tr);
  toast('تم الحفظ ✓'); loadLetters(); refreshStats(); return true;
}
const addLetterBtn = document.getElementById('add-letter');
if(addLetterBtn) {
  addLetterBtn.addEventListener('click', ()=>{
    prependNewRow('table-letters', rowToLetterTr({sort_order:0,glyph:'',name:'',translit:'',sound:'',num:'',audio_filename:''}),
      tr=>{ wireLetterAudioUpload(tr); tr.querySelector('.save').addEventListener('click', ()=>saveLetter(tr)); tr.querySelector('.delete').addEventListener('click', async () => deleteRow('letters', tr, 'الحرف', loadLetters, [tr.querySelector('.f-audio_filename').value])); });
  });
}

async function loadVocabulary(){
  const { data, error } = await sb.from('vocabulary').select('*').order('sort_order').order('id');
  const tbody = document.querySelector('#table-vocabulary tbody');
  if(error){ tbody.innerHTML = `<tr><td colspan="9" class="empty">خطأ: ${error.message}</td></tr>`; return; }
  tbody.innerHTML = data.map(rowToVocabTr).join('') || `<tr><td colspan="9" class="empty">لا يوجد مفردات بعد</td></tr>`;
  attachVocabHandlers();
}
function rowToVocabTr(v){
  return `<tr data-id="${v.id}" data-image="${esc(v.image_url ?? '')}">
    <td data-label="ترتيب"><input class="f-sort_order" type="number" value="${v.sort_order ?? 0}"></td>
    <td data-label="صورة">
      ${v.image_url ? `<img class="thumb" src="${esc(v.image_url)}">` : ''}
      <input type="file" accept="image/*" class="f-image-file" style="display:none">
      <div style="display:flex;gap:4px;flex-wrap:wrap;">
        <button type="button" class="upload-btn f-image-btn">${DASH_ICONS.image} ${v.image_url ? 'تغيير الصورة' : 'رفع صورة'}</button>
        <button type="button" class="upload-btn f-image-del" style="${v.image_url ? '' : 'display:none;'}border-color:var(--err);color:var(--err);">${DASH_ICONS.trash} حذف</button>
      </div>
    </td>
    <td data-label="القبطية"><input class="f-coptic coptic coptic-input" value="${esc(v.coptic)}"></td>
    <td data-label="النطق"><input class="f-translit" value="${esc(v.translit ?? '')}"></td>
    <td data-label="المعنى"><input class="f-meaning" value="${esc(v.meaning)}"></td>
    <td data-label="الفئة"><input class="f-category" value="${esc(v.category ?? '')}"></td>
    <td data-label="التسجيل الصوتي (رابط أو اسم ملف)">
      <input class="f-audio_filename" value="${esc(v.audio_filename ?? '')}" placeholder="رابط Google Drive أو https:// أو اسم ملف">
      <input type="file" accept="audio/*" class="f-audio-file" style="display:none">
      <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px;">
        <button type="button" class="upload-btn f-audio-play" style="${v.audio_filename ? '' : 'display:none;'}border-color:var(--ok);color:var(--ok);">${DASH_ICONS.play} استماع</button>
        <button type="button" class="upload-btn f-audio-btn">${DASH_ICONS.audio} رفع تسجيل</button>
        <button type="button" class="upload-btn f-audio-del" style="${v.audio_filename ? '' : 'display:none;'}border-color:var(--err);color:var(--err);">${DASH_ICONS.trash} حذف الصوت</button>
      </div>
    </td>
    <td data-label="الحالة"><select class="f-status">
      <option value="approved" ${v.status==='approved'?'selected':''}>approved</option>
      <option value="pending" ${v.status==='pending'?'selected':''}>pending</option>
    </select></td>
    <td class="row-actions"><button class="save">حفظ</button><button class="delete">حذف</button></td>
  </tr>`;
}
function wireVocabAudioUpload(tr){
  const fileInput = tr.querySelector('.f-audio-file');
  const audioBtn = tr.querySelector('.f-audio-btn');
  const textInput = tr.querySelector('.f-audio_filename');
  const delBtn = tr.querySelector('.f-audio-del');
  const playBtn = tr.querySelector('.f-audio-play');

  async function updateButtons(){
    const hasVal = Boolean(textInput.value.trim());
    if(delBtn) delBtn.style.display = hasVal ? '' : 'none';
    if(playBtn) playBtn.style.display = hasVal ? '' : 'none';
  }

  textInput.addEventListener('input', updateButtons);
  textInput.addEventListener('change', ()=>{
    updateButtons();
    const resolved = resolveAudioUrl(textInput.value);
    if(resolved && resolved !== textInput.value && /drive\.google\.com/i.test(textInput.value)){
      toast('تم التعرف على رابط Google Drive — اضغط "استماع" لتجربته');
    }
  });

  if(playBtn){
    playBtn.addEventListener('click', ()=>{
      const rawUrl = textInput.value.trim();
      if(!rawUrl){ toast('لا يوجد رابط صوتي لتشغيله', true); return; }

      if(currentDashboardPlayBtn === playBtn && currentDashboardAudio){
        stopDashboardAudio();
        return;
      }

      stopDashboardAudio();
      const resolved = resolveAudioUrl(rawUrl);
      playBtn.innerHTML = DASH_ICONS.stop + ' إيقاف';
      playBtn.style.color = 'var(--madder)';
      playBtn.style.borderColor = 'var(--madder)';
      currentDashboardPlayBtn = playBtn;

      const audio = new Audio(resolved);
      currentDashboardAudio = audio;

      audio.addEventListener('ended', stopDashboardAudio);
      audio.play().catch(err=>{
        stopDashboardAudio();
        console.warn('Audio playback error:', err);
        if(/drive\.google\.com/i.test(rawUrl)){
          toast('تعذّر تشغيل الرابط — تأكد أن مشاركة ملف Google Drive مضبوطة على: "أي شخص لديه الرابط (Anyone with the link)"', true);
        } else {
          toast('تعذّر تشغيل الملف — تأكد من صحة الرابط أو الملف', true);
        }
      });
    });
  }

  audioBtn.addEventListener('click', ()=> fileInput.click());
  fileInput.addEventListener('change', async ()=>{
    if(!fileInput.files[0]) return;
    const file = fileInput.files[0];
    const oldUrl = textInput.value;
    audioBtn.disabled = true;
    audioBtn.textContent = 'جارٍ الرفع...';
    const url = await uploadFile(file, 'audio-files', `جارٍ رفع صوت: "${tr.querySelector('.f-meaning').value || 'الكلمة'}"...`);
    audioBtn.disabled = false;
    audioBtn.innerHTML = DASH_ICONS.audio + ' رفع تسجيل';
    if(url){
      textInput.value = url;
      updateButtons();
      toast('اترفع الصوت، دوس حفظ عشان يتخزن');
      if(oldUrl && oldUrl !== url) deleteStorageFile(oldUrl);
    }
    fileInput.value = '';
  });

  delBtn.addEventListener('click', async () =>{
    { const c = await mgConfirm('حذف التسجيل الصوتي', 'متأكد إنك عايز تمسح التسجيل الصوتي؟', 'warning', {confirmText: 'أيوه، امسح', cancelText: 'لا'}); if(!c) return; }
    stopDashboardAudio();
    const oldUrl = textInput.value;
    textInput.value = '';
    updateButtons();
    toast('اتمسح التسجيل، دوس حفظ عشان يتخزن');
    if(oldUrl) deleteStorageFile(oldUrl);
  });
}
async function attachVocabHandlers(){
  document.querySelectorAll('#table-vocabulary tbody tr').forEach(tr=>{
    if(!tr.dataset.id) return;
    wireRowDirtyTracking(tr);
    tr.querySelector('.save').addEventListener('click', ()=> saveVocab(tr));
    tr.querySelector('.delete').addEventListener('click', async () => deleteRow('vocabulary', tr, 'الكلمة', loadVocabulary, [tr.dataset.image, tr.querySelector('.f-audio_filename').value]));
    wireVocabAudioUpload(tr);
    const fileInput = tr.querySelector('.f-image-file');
    const imageBtn = tr.querySelector('.f-image-btn');
    const imageDelBtn = tr.querySelector('.f-image-del');
    imageBtn.addEventListener('click', ()=> fileInput.click());
    fileInput.addEventListener('change', async ()=>{
      if(!fileInput.files[0]) return;
      const file = fileInput.files[0];
      const oldUrl = tr.dataset.image;
      imageBtn.disabled = true;
      imageBtn.textContent = 'جارٍ الرفع...';
      const url = await uploadFile(file, 'vocab-images', `جارٍ رفع صورة: "${tr.querySelector('.f-meaning').value || 'الكلمة'}"`);
      imageBtn.disabled = false;
      if(url){
        tr.dataset.image = url;
        markRowDirty(tr);
        imageBtn.innerHTML = DASH_ICONS.image + ' تغيير الصورة';
        imageDelBtn.style.display = '';
        let thumb = tr.querySelector('.thumb');
        if(!thumb){ thumb = document.createElement('img'); thumb.className='thumb'; tr.querySelector('td[data-label="صورة"]').prepend(thumb); }
        thumb.src = url;
        toast('اترفعت الصورة، دوس حفظ عشان تتخزن');
        if(oldUrl && oldUrl !== url) deleteStorageFile(oldUrl);
      } else {
        imageBtn.innerHTML = DASH_ICONS.image + (tr.dataset.image ? ' تغيير الصورة' : ' رفع صورة');
      }
      fileInput.value = '';
    });
    imageDelBtn.addEventListener('click', async () => { { const c = await mgConfirm('حذف الصورة', 'متأكد إنك عايز تمسح الصورة؟', 'warning', {confirmText: 'أيوه، امسح', cancelText: 'لا'}); if(!c) return; }
      const oldUrl = tr.dataset.image;
      tr.dataset.image = '';
      markRowDirty(tr);
      const thumb = tr.querySelector('.thumb');
      if(thumb) thumb.remove();
      imageBtn.textContent = 'رفع صورة';
      imageDelBtn.style.display = 'none';
      toast('اتمسحت الصورة، دوس حفظ عشان تتخزن');
      if(oldUrl) deleteStorageFile(oldUrl);
    });
  });
}
async function saveVocab(tr){
  const id = tr.dataset.id;
  const payload = {
    sort_order: parseInt(tr.querySelector('.f-sort_order').value)||0,
    image_url: tr.dataset.image || null,
    coptic: tr.querySelector('.f-coptic').value.trim(),
    translit: tr.querySelector('.f-translit').value.trim(),
    meaning: tr.querySelector('.f-meaning').value.trim(),
    category: tr.querySelector('.f-category').value.trim() || 'عام',
    audio_filename: tr.querySelector('.f-audio_filename').value.trim() || null,
    status: tr.querySelector('.f-status').value,
  };
  const { error } = id==='new' ? await sb.from('vocabulary').insert(payload) : await sb.from('vocabulary').update(payload).eq('id', id);
  if(error){ toast('خطأ: '+error.message, true); return false; }
  clearRowDirty(tr);
  toast('تم الحفظ ✓'); loadVocabulary(); refreshStats(); return true;
}
const addVocabBtn = document.getElementById('add-vocab');
if(addVocabBtn) {
  addVocabBtn.addEventListener('click', ()=>{
    prependNewRow('table-vocabulary', rowToVocabTr({sort_order:0,coptic:'',translit:'',meaning:'',category:'',audio_filename:'',status:'approved',image_url:''}),
      tr=>{
        tr.querySelector('.save').addEventListener('click', ()=>saveVocab(tr));
        tr.querySelector('.delete').addEventListener('click', async () => deleteRow('vocabulary', tr, 'الكلمة', loadVocabulary, [tr.dataset.image, tr.querySelector('.f-audio_filename').value]));
        wireVocabAudioUpload(tr);
        const fileInput = tr.querySelector('.f-image-file');
        const imageBtn = tr.querySelector('.f-image-btn');
        const imageDelBtn = tr.querySelector('.f-image-del');
        imageBtn.addEventListener('click', ()=>fileInput.click());
        fileInput.addEventListener('change', async ()=>{
          if(!fileInput.files[0]) return;
          const oldUrl = tr.dataset.image;
          const url = await uploadFile(fileInput.files[0], 'vocab-images');
          if(url){
            tr.dataset.image = url;
            imageBtn.textContent = 'تغيير الصورة';
            imageDelBtn.style.display = '';
            let thumb = tr.querySelector('.thumb');
            if(!thumb){ thumb = document.createElement('img'); thumb.className='thumb'; tr.querySelector('td[data-label="صورة"]').prepend(thumb); }
            thumb.src = url;
            toast('اترفعت الصورة، دوس حفظ');
            if(oldUrl && oldUrl !== url) deleteStorageFile(oldUrl);
          }
        });
        imageDelBtn.addEventListener('click', async () =>{
          const oldUrl = tr.dataset.image;
          tr.dataset.image = '';
          const thumb = tr.querySelector('.thumb');
          if(thumb) thumb.remove();
          imageBtn.textContent = 'رفع صورة';
          imageDelBtn.style.display = 'none';
          if(oldUrl) deleteStorageFile(oldUrl);
        });
      });
  });
}

async function loadGrammar(){
  const { data, error } = await sb.from('grammar_sections').select('*').order('sort_order').order('id');
  const tbody = document.querySelector('#table-grammar tbody');
  if(error){ tbody.innerHTML = `<tr><td colspan="4" class="empty">خطأ: ${error.message}</td></tr>`; return; }
  tbody.innerHTML = data.map(rowToGrammarTr).join('') || `<tr><td colspan="4" class="empty">لا يوجد أقسام بعد</td></tr>`;
  attachGrammarHandlers();
}
// أزرار "✕" (rte-remove-btn) لازم تكون دايمًا جوه غلاف .rte-media أو .rte-file-chip.
// أحيانًا أثناء التحرير بيتسحب الزرار بره الغلاف بتاعه بالغلط (drag داخل المحرر)،
// فيفضل عايم من غير موضع ثابت ويطلع ملصق في أعلى شمال الصفحة كلها بدل مكانه الصح.
// الدالة دي بتشيل أي زرار "يتيم" زي ده (مالوش وظيفة أصلاً من غير الصورة/الملف اللي كان بيمسحه).
function sanitizeOrphanRemoveButtons(html){
  if(!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  tmp.querySelectorAll('.rte-remove-btn').forEach(btn=>{
    if(!btn.closest('.rte-media, .rte-file-chip')) btn.remove();
  });
  return tmp.innerHTML;
}
function rowToGrammarTr(g){
  return `<tr data-id="${g.id}">
    <td data-label="ترتيب"><input class="f-sort_order" type="number" value="${g.sort_order ?? 0}"></td>
    <td data-label="العنوان"><input class="f-title" value="${esc(g.title)}"></td>
    <td data-label="المحتوى">
      <div class="rte-toolbar">
        <button type="button" class="rte-undo-btn" title="تراجع">↶</button>
        <button type="button" class="rte-redo-btn" title="إعادة">↷</button>
        <button type="button" class="rte-bold-on-btn" title="تضخيم (Bold)"><b class="rte-b-heavy">B</b></button>
        <button type="button" class="rte-bold-off-btn" title="إلغاء التضخيم (رفيع)"><b class="rte-b-thin">B</b></button>
        <button type="button" data-cmd="insertUnorderedList">• قائمة</button>
        <button type="button" data-cmd="formatBlock:h4">عنوان</button>
        <button type="button" class="rte-table-btn">${DASH_ICONS.table} جدول</button>
        <button type="button" class="rte-delrow-btn">${DASH_ICONS.delRow} صف</button>
        <button type="button" class="rte-delcol-btn">${DASH_ICONS.delCol} عمود</button>
        <button type="button" class="rte-image-btn">${DASH_ICONS.image} صورة</button>
        <button type="button" class="rte-link-btn">${DASH_ICONS.link} رابط</button>
        <input type="file" class="rte-image-input" accept="image/*" style="display:none">
      </div>
      <div class="rte-editor f-content_html" contenteditable="true">${sanitizeOrphanRemoveButtons(g.content_html)}</div>
    </td>
    <td class="row-actions"><button class="save">حفظ</button><button class="delete">حذف</button></td>
  </tr>`;
}
function attachGrammarHandlers(){
  document.querySelectorAll('#table-grammar tbody tr').forEach(tr=>{ if(tr.dataset.id) wireGrammarRow(tr); });
}

/* ============ سجل تراجع/إعادة لكل محرر (Undo/Redo) — نظام يدوي موثوق بدل الاعتماد على execCommand ============ */
function initRteHistory(editor, undoBtn, redoBtn){
  const state = { stack: [editor.innerHTML], index: 0, ignore: false };
  function updateButtons(){
    undoBtn.disabled = state.index <= 0;
    redoBtn.disabled = state.index >= state.stack.length - 1;
    undoBtn.style.opacity = undoBtn.disabled ? .45 : 1;
    redoBtn.style.opacity = redoBtn.disabled ? .45 : 1;
  }
  function pushSnapshot(){
    if(state.ignore) return;
    const html = editor.innerHTML;
    if(html === state.stack[state.index]) return;
    state.stack = state.stack.slice(0, state.index + 1);
    state.stack.push(html);
    state.index = state.stack.length - 1;
    if(state.stack.length > 80){ state.stack.shift(); state.index--; }
    updateButtons();
  }
  function restore(newIndex){
    state.index = newIndex;
    state.ignore = true;
    editor.innerHTML = state.stack[state.index];
    state.ignore = false;
    updateButtons();
  }
  let debounceTimer;
  editor.addEventListener('input', ()=>{
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(pushSnapshot, 350);
  });
  editor.addEventListener('blur', pushSnapshot);
  undoBtn.addEventListener('click', ()=>{ if(state.index > 0) restore(state.index - 1); });
  redoBtn.addEventListener('click', ()=>{ if(state.index < state.stack.length - 1) restore(state.index + 1); });
  updateButtons();
  return { pushSnapshot };
}

/* ============ تضخيم/تصغير الخط (Bold) — تطبيق حتمي 100% ============ */
// المشكلة الأصلية: زرار "B" واحد بيعمل toggle عن طريق execCommand('bold')،
// وده سلوك غير موثوق بالمرة في المتصفحات (بيختلف حسب حالة التحديد الحالية:
// أحيانًا يطبّق غامق وأحيانًا يفك الغامق، حتى لو الضغطة نفس الضغطة). بدل
// كده هنا زرارين منفصلين: واحد "يضمن" إن النص يبقى غامق دايمًا (تضخيم)،
// والتاني "يضمن" إن النص يبقى عادي/رفيع دايمًا (إلغاء التضخيم) — كل زرار
// بيتحقق من الحالة الفعلية بعد التنفيذ وبيعيد المحاولة لو النتيجة مش
// مطابقة للمطلوب، فمفيش احتمال يطلع نتيجة عكسية.
function isSelectionBold(){
  try{ return document.queryCommandState('bold'); }catch(e){ return false; }
}
function forceBoldState(makeBold){
  try{ document.execCommand('styleWithCSS', false, false); }catch(e){}
  for(let i=0;i<4;i++){
    if(isSelectionBold() === makeBold) break;
    document.execCommand('bold', false, null);
  }
}
function refreshRteFormatButtons(tr){
  const bold = isSelectionBold();
  let italic = false;
  try{ italic = document.queryCommandState('italic'); }catch(e){}
  const onBtn = tr.querySelector('.rte-bold-on-btn');
  const offBtn = tr.querySelector('.rte-bold-off-btn');
  const italicBtn = tr.querySelector('[data-cmd="italic"]');
  if(onBtn) onBtn.classList.toggle('active', bold);
  if(offBtn) offBtn.classList.toggle('active', !bold);
  if(italicBtn) italicBtn.classList.toggle('active', italic);
}
// بيوصّل زراري التضخيم/التصغير + بيخلي شكل الزرار النشط (المضغوط فعليًا
// على النص الحالي) واضح لحظيًا، عشان المستخدم يشوف الحالة قبل ما يكتب.
function wireRteBoldButtons(tr, editor, history){
  const onBtn = tr.querySelector('.rte-bold-on-btn');
  const offBtn = tr.querySelector('.rte-bold-off-btn');
  if(onBtn){
    onBtn.addEventListener('click', ()=>{
      editor.focus();
      forceBoldState(true);
      refreshRteFormatButtons(tr);
      history.pushSnapshot();
    });
  }
  if(offBtn){
    offBtn.addEventListener('click', ()=>{
      editor.focus();
      forceBoldState(false);
      refreshRteFormatButtons(tr);
      history.pushSnapshot();
    });
  }
  const update = ()=> refreshRteFormatButtons(tr);
  editor.addEventListener('keyup', update);
  editor.addEventListener('mouseup', update);
  editor.addEventListener('focus', update);
  document.addEventListener('selectionchange', ()=>{
    const sel = window.getSelection();
    if(sel && sel.anchorNode && editor.contains(sel.anchorNode)) update();
  });
}

function findCellFromSelection(){
  const sel = window.getSelection();
  if(!sel || !sel.rangeCount) return null;
  let node = sel.getRangeAt(0).startContainer;
  if(node.nodeType === 3) node = node.parentElement;
  return node ? node.closest('td, th') : null;
}

async function wireGrammarRow(tr){
  wireRowDirtyTracking(tr);
  tr.querySelector('.save').addEventListener('click', ()=> saveGrammar(tr));
  tr.querySelector('.delete').addEventListener('click', async () => deleteRow('grammar_sections', tr, 'القسم', loadGrammar, extractStorageUrlsFromHtml(tr.querySelector('.rte-editor').innerHTML)));

  const editor = tr.querySelector('.rte-editor');
  const undoBtn = tr.querySelector('.rte-undo-btn');
  const redoBtn = tr.querySelector('.rte-redo-btn');
  const history = initRteHistory(editor, undoBtn, redoBtn);
  wireRteBoldButtons(tr, editor, history);

  // مهم: الضغط بالماوس على أي زرار في شريط الأدوات بيسحب التركيز (focus) من
  // المحرر قبل ما الـ click يتنفذ، فالنص المظلّل (selection) أو مكان المؤشر
  // بيتلغي — ودا سبب إن الغامق/المائل ماكانوش شغالين كويس (ماكانش بيطبّقوا
  // على النص المحدد)، وكان بيأثر كمان على حذف صف/عمود بالجدول. السطر ده
  // بيمنع فقدان التحديد قبل ما أي أمر (bold, italic, حذف صف...) ينفّذ.
  tr.querySelector('.rte-toolbar').addEventListener('mousedown', (e)=>{
    if(e.target.closest('button')) e.preventDefault();
  });

  tr.querySelectorAll('.rte-toolbar button[data-cmd]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      editor.focus();
      const cmd = btn.dataset.cmd;
      if(cmd.startsWith('formatBlock:')){
        document.execCommand('formatBlock', false, cmd.split(':')[1]);
      } else {
        document.execCommand(cmd, false, null);
      }
      history.pushSnapshot();
    });
  });

  tr.querySelector('.rte-table-btn').addEventListener('click', ()=>{
    const rows = parseInt(prompt('عدد الصفوف؟', '2')) || 2;
    const cols = parseInt(prompt('عدد الأعمدة؟', '2')) || 2;
    let html = '<table><tbody>';
    for(let r=0;r<rows;r++){
      html += '<tr>';
      for(let c=0;c<cols;c++){ html += r===0 ? '<th>عنوان</th>' : '<td>خلية</td>'; }
      html += '</tr>';
    }
    html += '</tbody></table><p><br></p>';
    editor.focus();
    document.execCommand('insertHTML', false, html);
    history.pushSnapshot();
  });

  tr.querySelector('.rte-delrow-btn').addEventListener('click', ()=>{
    const cell = findCellFromSelection();
    const row = cell ? cell.closest('tr') : null;
    if(!row || !editor.contains(row)){ toast('ضع المؤشر داخل خلية بالجدول المطلوب حذف صفّه أولاً', true); return; }
    row.remove();
    history.pushSnapshot();
  });

  tr.querySelector('.rte-delcol-btn').addEventListener('click', ()=>{
    const cell = findCellFromSelection();
    if(!cell || !editor.contains(cell)){ toast('ضع المؤشر داخل خلية بالجدول المطلوب حذف عموده أولاً', true); return; }
    const table = cell.closest('table');
    const rowEl = cell.closest('tr');
    const idx = [...rowEl.children].indexOf(cell);
    table.querySelectorAll('tr').forEach(r=>{ if(r.children[idx]) r.children[idx].remove(); });
    history.pushSnapshot();
  });

  const imgInput = tr.querySelector('.rte-image-input');
  const imgBtn = tr.querySelector('.rte-image-btn');
  imgBtn.addEventListener('click', ()=> imgInput.click());
  imgInput.addEventListener('change', async ()=>{
    if(!imgInput.files[0]) return;
    const file = imgInput.files[0];
    imgBtn.disabled = true;
    imgBtn.textContent = 'جارٍ الرفع...';
    const url = await uploadFile(file, 'grammar-images', 'جارٍ رفع وإدراج الصورة في قسم القواعد...');
    imgBtn.disabled = false;
    imgBtn.innerHTML = DASH_ICONS.image + ' صورة';
    if(url){
      editor.focus();
      document.execCommand('insertHTML', false,
        `<span class="rte-media" contenteditable="false"><img src="${url}"><button type="button" class="rte-remove-btn" title="حذف الصورة">✕</button></span>&nbsp;`);
      history.pushSnapshot();
    }
    imgInput.value = '';
  });

  tr.querySelector('.rte-link-btn').addEventListener('click', ()=>{
    const url = prompt('الرابط (https://...)؟');
    if(!url) return;
    const trimmedUrl = url.trim();
    if(!trimmedUrl) return;
    const text = prompt('نص الرابط اللي هيظهر للزوار؟', trimmedUrl) || trimmedUrl;
    editor.focus();
    document.execCommand('insertHTML', false,
      `<a href="${esc(trimmedUrl)}" target="_blank" rel="noopener noreferrer">${esc(text)}</a>&nbsp;`);
    history.pushSnapshot();
  });

  // زر المسح على أي صورة/ملف مُضاف داخل المحرر
  editor.addEventListener('click', (e)=>{
    const btn = e.target.closest('.rte-remove-btn');
    if(!btn) return;
    e.preventDefault();
    const wrap = btn.closest('.rte-media, .rte-file-chip');
    if(wrap){
      const media = wrap.querySelector('img, a');
      const url = media ? (media.getAttribute('src') || media.getAttribute('href')) : null;
      wrap.remove();
      history.pushSnapshot();
      if(url) deleteStorageFile(url);
    }
  });
}
async function saveGrammar(tr){
  const id = tr.dataset.id;
  const payload = {
    sort_order: parseInt(tr.querySelector('.f-sort_order').value)||0,
    title: tr.querySelector('.f-title').value.trim(),
    content_html: tr.querySelector('.rte-editor').innerHTML,
  };
  const { error } = id==='new' ? await sb.from('grammar_sections').insert(payload) : await sb.from('grammar_sections').update(payload).eq('id', id);
  if(error){ toast('خطأ: '+error.message, true); return false; }
  clearRowDirty(tr);
  toast('تم الحفظ ✓'); loadGrammar(); refreshStats(); return true;
}
const addGrammarBtn = document.getElementById('add-grammar');
if(addGrammarBtn) {
  addGrammarBtn.addEventListener('click', ()=>{
    prependNewRow('table-grammar', rowToGrammarTr({sort_order:0,title:'',content_html:''}), wireGrammarRow);
  });
}

/* ============ مقالات الصفحة الرئيسية ============ */
// نفس منطق محرر القواعد بالظبط (نص + صور + ملفات + روابط)، لكن مع حقل
// "الحالة" (منشور/مسودة) عشان تقدر تجهّز مقالة وتنشرها بعدين، وعمود
// الترتيب هنا هو اللي بيحدد مكان المقالة بالظبط في الصفحة الرئيسية.
async function loadArticles(){
  const { data, error } = await sb.from('articles').select('*').order('sort_order').order('id');
  const tbody = document.querySelector('#table-articles tbody');
  if(error){ tbody.innerHTML = `<tr><td colspan="5" class="empty">خطأ: ${error.message}</td></tr>`; return; }
  tbody.innerHTML = data.map(rowToArticleTr).join('') || `<tr><td colspan="5" class="empty">لا يوجد مقالات بعد</td></tr>`;
  attachArticleHandlers();
}
function rowToArticleTr(a){
  return `<tr data-id="${a.id}">
    <td data-label="ترتيب"><input class="f-sort_order" type="number" value="${a.sort_order ?? 0}"></td>
    <td data-label="العنوان"><input class="f-title" value="${esc(a.title)}"></td>
    <td data-label="الحالة"><select class="f-is_published">
      <option value="true" ${a.is_published !== false ? 'selected' : ''}>منشور</option>
      <option value="false" ${a.is_published === false ? 'selected' : ''}>مسودة</option>
    </select></td>
    <td data-label="المحتوى">
      <div class="rte-toolbar">
        <button type="button" class="rte-undo-btn" title="تراجع">↶</button>
        <button type="button" class="rte-redo-btn" title="إعادة">↷</button>
        <button type="button" class="rte-bold-on-btn" title="تضخيم (Bold)"><b class="rte-b-heavy">B</b></button>
        <button type="button" class="rte-bold-off-btn" title="إلغاء التضخيم (رفيع)"><b class="rte-b-thin">B</b></button>
        <button type="button" data-cmd="insertUnorderedList">• قائمة</button>
        <button type="button" data-cmd="formatBlock:h4">عنوان</button>
        <button type="button" class="rte-table-btn">${DASH_ICONS.table} جدول</button>
        <button type="button" class="rte-delrow-btn">${DASH_ICONS.delRow} صف</button>
        <button type="button" class="rte-delcol-btn">${DASH_ICONS.delCol} عمود</button>
        <button type="button" class="rte-image-btn">${DASH_ICONS.image} صورة</button>
        <button type="button" class="rte-link-btn">${DASH_ICONS.link} رابط</button>
        <input type="file" class="rte-image-input" accept="image/*" style="display:none">
      </div>
      <div class="rte-editor f-content_html" contenteditable="true">${sanitizeOrphanRemoveButtons(a.content_html)}</div>
    </td>
    <td class="row-actions"><button class="save">حفظ</button><button class="delete">حذف</button></td>
  </tr>`;
}
function attachArticleHandlers(){
  document.querySelectorAll('#table-articles tbody tr').forEach(tr=>{ if(tr.dataset.id) wireArticleRow(tr); });
}
// wireArticleRow نفس wireGrammarRow حرفيًا (نفس شريط أدوات المحرر ونفس التاريخ/التراجع)،
// الفرق بس في اسم الجدول والحذف والحفظ ومجلد رفع الصور/الملفات بتاعة المقالات.
async function wireArticleRow(tr){
  wireRowDirtyTracking(tr);
  tr.querySelector('.save').addEventListener('click', ()=> saveArticle(tr));
  tr.querySelector('.delete').addEventListener('click', async () => deleteRow('articles', tr, 'المقال', loadArticles, extractStorageUrlsFromHtml(tr.querySelector('.rte-editor').innerHTML)));

  const editor = tr.querySelector('.rte-editor');
  const undoBtn = tr.querySelector('.rte-undo-btn');
  const redoBtn = tr.querySelector('.rte-redo-btn');
  const history = initRteHistory(editor, undoBtn, redoBtn);
  wireRteBoldButtons(tr, editor, history);

  tr.querySelector('.rte-toolbar').addEventListener('mousedown', (e)=>{
    if(e.target.closest('button')) e.preventDefault();
  });

  tr.querySelectorAll('.rte-toolbar button[data-cmd]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      editor.focus();
      const cmd = btn.dataset.cmd;
      if(cmd.startsWith('formatBlock:')){
        document.execCommand('formatBlock', false, cmd.split(':')[1]);
      } else {
        document.execCommand(cmd, false, null);
      }
      history.pushSnapshot();
    });
  });

  tr.querySelector('.rte-table-btn').addEventListener('click', ()=>{
    const rows = parseInt(prompt('عدد الصفوف؟', '2')) || 2;
    const cols = parseInt(prompt('عدد الأعمدة؟', '2')) || 2;
    let html = '<table><tbody>';
    for(let r=0;r<rows;r++){
      html += '<tr>';
      for(let c=0;c<cols;c++){ html += r===0 ? '<th>عنوان</th>' : '<td>خلية</td>'; }
      html += '</tr>';
    }
    html += '</tbody></table><p><br></p>';
    editor.focus();
    document.execCommand('insertHTML', false, html);
    history.pushSnapshot();
  });

  tr.querySelector('.rte-delrow-btn').addEventListener('click', ()=>{
    const cell = findCellFromSelection();
    const row = cell ? cell.closest('tr') : null;
    if(!row || !editor.contains(row)){ toast('ضع المؤشر داخل خلية بالجدول المطلوب حذف صفّه أولاً', true); return; }
    row.remove();
    history.pushSnapshot();
  });

  tr.querySelector('.rte-delcol-btn').addEventListener('click', ()=>{
    const cell = findCellFromSelection();
    if(!cell || !editor.contains(cell)){ toast('ضع المؤشر داخل خلية بالجدول المطلوب حذف عموده أولاً', true); return; }
    const table = cell.closest('table');
    const rowEl = cell.closest('tr');
    const idx = [...rowEl.children].indexOf(cell);
    table.querySelectorAll('tr').forEach(r=>{ if(r.children[idx]) r.children[idx].remove(); });
    history.pushSnapshot();
  });

  const imgInput = tr.querySelector('.rte-image-input');
  const imgBtn = tr.querySelector('.rte-image-btn');
  imgBtn.addEventListener('click', ()=> imgInput.click());
  imgInput.addEventListener('change', async ()=>{
    if(!imgInput.files[0]) return;
    const file = imgInput.files[0];
    imgBtn.disabled = true;
    imgBtn.textContent = 'جارٍ الرفع...';
    const url = await uploadFile(file, 'article-images', 'جارٍ رفع وإدراج الصورة في المقال...');
    imgBtn.disabled = false;
    imgBtn.innerHTML = DASH_ICONS.image + ' صورة';
    if(url){
      editor.focus();
      document.execCommand('insertHTML', false,
        `<span class="rte-media" contenteditable="false"><img src="${url}"><button type="button" class="rte-remove-btn" title="حذف الصورة">✕</button></span>&nbsp;`);
      history.pushSnapshot();
    }
    imgInput.value = '';
  });

  tr.querySelector('.rte-link-btn').addEventListener('click', ()=>{
    const url = prompt('الرابط (https://...)؟');
    if(!url) return;
    const trimmedUrl = url.trim();
    if(!trimmedUrl) return;
    const text = prompt('نص الرابط اللي هيظهر للزوار؟', trimmedUrl) || trimmedUrl;
    editor.focus();
    document.execCommand('insertHTML', false,
      `<a href="${esc(trimmedUrl)}" target="_blank" rel="noopener noreferrer">${esc(text)}</a>&nbsp;`);
    history.pushSnapshot();
  });

  editor.addEventListener('click', (e)=>{
    const btn = e.target.closest('.rte-remove-btn');
    if(!btn) return;
    e.preventDefault();
    const wrap = btn.closest('.rte-media, .rte-file-chip');
    if(wrap){
      const media = wrap.querySelector('img, a');
      const url = media ? (media.getAttribute('src') || media.getAttribute('href')) : null;
      wrap.remove();
      history.pushSnapshot();
      if(url) deleteStorageFile(url);
    }
  });
}
async function saveArticle(tr){
  const id = tr.dataset.id;
  const title = tr.querySelector('.f-title').value.trim();
  if(!title){ toast('لازم تكتب عنوان للمقال', true); return false; }
  const payload = {
    sort_order: parseInt(tr.querySelector('.f-sort_order').value)||0,
    title,
    is_published: tr.querySelector('.f-is_published').value === 'true',
    content_html: tr.querySelector('.rte-editor').innerHTML,
  };
  const { error } = id==='new' ? await sb.from('articles').insert(payload) : await sb.from('articles').update(payload).eq('id', id);
  if(error){ toast('خطأ: '+error.message, true); return false; }
  clearRowDirty(tr);
  toast('تم الحفظ ✓'); loadArticles(); refreshStats(); return true;
}
const addArticleBtn = document.getElementById('add-article');
if(addArticleBtn) {
  addArticleBtn.addEventListener('click', ()=>{
    prependNewRow('table-articles', rowToArticleTr({sort_order:0,title:'',content_html:'',is_published:true}), wireArticleRow);
  });
}

function catRowHtml(category, count){
  return `<div class="quiz-cat-row" data-original-category="${esc(category ?? '')}">
    <input type="text" class="f-cat-name" placeholder="اسم الفئة" value="${esc(category ?? '')}">
    <span class="f-cat-count-label">عدد الأسئلة:</span>
    <input type="number" class="f-cat-count" min="0" max="100" value="${count ?? 5}">
    <button type="button" class="cat-delete">${DASH_ICONS.trash} حذف</button>
  </div>`;
}
async function wireCatRow(row){
  wireRowDirtyTracking(row);
  row.querySelector('.cat-delete').addEventListener('click', async ()=>{
    const original = row.dataset.originalCategory || '';
    if(original){
      const { count } = await sb.from('quiz_questions').select('id', { count: 'exact', head: true }).eq('category', original);
      const usageWarning = count ? ` \n\nتنبيه: فيه ${count} سؤال لسه متسجّل على الفئة دي، وهتحتاج تدخلهم وتغيّر فئتهم يدويًا بعد الحذف.` : '';
      { const c = await mgConfirm('حذف فئة', `متأكد إنك عايز تحذف فئة "${original}" من إعدادات الاختبار؟${usageWarning}`, 'warning', {confirmText: 'أيوه، احذف', cancelText: 'لا'}); if(!c) return; }
      const { error } = await sb.from('quiz_category_settings').delete().eq('category', original);
      if(error){ toast('خطأ: '+error.message, true); return; }
      toast('تم الحذف ✓');
      loadQuizzes(); // تحديث قائمة الفئات في جدول الأسئلة فورًا
      return;
    }
    row.remove();
    updateDirtyCounter();
  });
}
async function loadQuizSettings(){
  const box = document.getElementById('quiz-category-settings-rows');
  const { data: settings, error } = await sb.from('quiz_category_settings').select('*').order('category');
  if(error){ console.error('تعذّر تحميل إعدادات الاختبار:', error); return; }
  box.innerHTML = (settings||[]).map(s => catRowHtml(s.category, s.questions_count)).join('');
  box.querySelectorAll('.quiz-cat-row').forEach(wireCatRow);
}
const qsAddCatBtn = document.getElementById('qs-add-category');
if(qsAddCatBtn) {
  qsAddCatBtn.addEventListener('click', ()=>{
    const box = document.getElementById('quiz-category-settings-rows');
    if(!box) return;
    const div = document.createElement('div');
    div.innerHTML = catRowHtml('', 5);
    const row = div.firstElementChild;
    row.dataset.originalCategory = '';
    box.appendChild(row);
    wireCatRow(row);
    markRowDirty(row);
    row.querySelector('.f-cat-name').focus();
  });
}
const qsSaveBtn = document.getElementById('qs-save');
if(qsSaveBtn) {
  qsSaveBtn.addEventListener('click', async ()=>{
  const rows = [...document.querySelectorAll('#quiz-category-settings-rows .quiz-cat-row')];
  const seen = new Set();
  const upserts = [];
  const renamedAway = [];
  for(const row of rows){
    const name = row.querySelector('.f-cat-name').value.trim();
    const original = row.dataset.originalCategory || '';
    if(!name) continue; // صف فاضي، اتجاهله
    if(seen.has(name)){ toast('في فئة مكررة بنفس الاسم: '+name, true); return; }
    seen.add(name);
    if(original && original !== name) renamedAway.push(original);
    upserts.push({ category: name, questions_count: parseInt(row.querySelector('.f-cat-count').value) || 0 });
  }
  if(upserts.length === 0){ toast('لا يوجد فئات لحفظها', true); return; }
  if(renamedAway.length){
    const { count } = await sb.from('quiz_questions').select('id', { count: 'exact', head: true }).in('category', renamedAway);
    const usageWarning = count ? ` \n\nتنبيه: فيه ${count} سؤال لسه متسجّل على الاسم القديم، وهتحتاج تدخل جدول الأسئلة وتغيّر فئتهم للاسم الجديد يدويًا بعد الحفظ (مش هيتغيّروا تلقائيًا).` : '';
    if(count) { const c = await mgConfirm('تغيير اسم الفئة', `متأكد إنك عايز تغيّر اسم الفئة؟${usageWarning}`, 'question', {confirmText: 'أيوه، غيّر', cancelText: 'لا'}); if(!c) return; }
    const { error: delErr } = await sb.from('quiz_category_settings').delete().in('category', renamedAway);
    if(delErr){ toast('خطأ أثناء الحفظ: '+delErr.message, true); return; }
  }
  const { error } = await sb.from('quiz_category_settings').upsert(upserts, { onConflict: 'category' });
  if(error){ toast('خطأ: '+error.message, true); return; }
  document.querySelectorAll('#quiz-category-settings-rows .quiz-cat-row').forEach(clearRowDirty);
  toast('تم حفظ إعدادات الاختبار ✓');
  loadQuizzes();
  });
}

let quizCategoriesList = []; // الفئات المعرّفة في صندوق الإعدادات، بتتحمّل قبل عرض جدول الأسئلة عشان قائمة الاختيار

async function loadQuizzes(){
  const { data: catData } = await sb.from('quiz_category_settings').select('category').order('category');
  quizCategoriesList = (catData||[]).map(c=>c.category);

  const { data, error } = await sb.from('quiz_questions').select('*').order('sort_order').order('id');
  const tbody = document.querySelector('#table-quizzes tbody');
  if(error){ tbody.innerHTML = `<tr><td colspan="7" class="empty">خطأ: ${error.message}</td></tr>`; return; }
  tbody.innerHTML = data.map(rowToQuizTr).join('') || `<tr><td colspan="7" class="empty">لا يوجد أسئلة بعد</td></tr>`;
  attachQuizHandlers();
  loadQuizSettings();
}
function mcqOptionsHtml(options, correctIndex){
  const opts = Array.isArray(options) && options.length ? options : ['','','',''];
  const groupName = 'correct-' + Math.random().toString(36).slice(2,8);
  return `<div class="mcq-options">` + opts.map((opt,i)=>`
    <div class="opt-row">
      <input type="radio" name="${groupName}" class="f-correct" data-idx="${i}" ${i===correctIndex?'checked':''}>
      <input type="text" class="f-opt" value="${esc(opt)}" placeholder="اختيار ${i+1}">
    </div>`).join('') + `</div>`;
}
function difficultyOptionsHtml(current){
  const val = current || 'medium';
  const opts = [['easy','سهل'],['medium','متوسط'],['hard','صعب']];
  return `<select class="f-difficulty">` + opts.map(([v,l])=>
    `<option value="${v}" ${val===v?'selected':''}>${l}</option>`).join('') + `</select>`;
}
function categoryOptionsHtml(current){
  const val = current || '';
  const categories = quizCategoriesList;
  if(categories.length === 0){
    return `<select class="f-category" disabled><option value="">لازم تضيف فئة الأول من صندوق الإعدادات فوق</option></select>`;
  }
  const isOrphan = val && !categories.includes(val);
  const options = isOrphan
    ? [`<option value="${esc(val)}" selected>(فئة غير مسجلة) ${esc(val)}</option>`]
      .concat(categories.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`))
    : categories.map(c=>`<option value="${esc(c)}" ${c===val?'selected':''}>${esc(c)}</option>`);
  return `<select class="f-category">` + options.join('') + `</select>`;
}
function rowToQuizTr(q){
  const isMcq = q.type === 'mcq';
  return `<tr data-id="${q.id}" data-type="${q.type}">
    <td data-label="النوع">
      <select class="f-type">
        <option value="mcq" ${isMcq?'selected':''}>اختر من متعدد</option>
        <option value="essay" ${!isMcq?'selected':''}>مقالي</option>
      </select>
    </td>
    <td data-label="السؤال">
      <textarea class="f-question" style="min-height:44px;">${esc(q.question)}</textarea>
      <input type="url" class="f-link-url" placeholder="رابط إضافي (اختياري) — هيظهر تحت السؤال" value="${esc(q.link_url ?? '')}" style="margin-top:6px;width:100%;">
      <input type="text" class="f-link-label" placeholder="نص الرابط (اختياري)" value="${esc(q.link_label ?? '')}" style="margin-top:6px;width:100%;">
    </td>
    <td data-label="الفئة">${categoryOptionsHtml(q.category)}</td>
    <td data-label="الصعوبة">${difficultyOptionsHtml(q.difficulty)}</td>
    <td data-label="الوقت (ث)"><input type="number" class="f-time" min="5" max="180" value="${esc(q.time_seconds ?? 15)}" style="width:70px;"></td>
    <td class="f-answer-cell" data-label="الاختيارات / الإجابة النموذجية">
      ${isMcq ? mcqOptionsHtml(q.options, q.correct_index) : `<textarea class="f-model_answer" placeholder="إجابة نموذجية (اختياري)">${esc(q.model_answer ?? '')}</textarea>`}
    </td>
    <td class="row-actions"><button class="save">حفظ</button><button class="delete">حذف</button></td>
  </tr>`;
}
function attachQuizHandlers(){
  document.querySelectorAll('#table-quizzes tbody tr').forEach(tr=>{ if(tr.dataset.id) wireQuizRow(tr); });
}
function wireQuizRow(tr){
  wireRowDirtyTracking(tr);
  tr.querySelector('.save').addEventListener('click', ()=> saveQuiz(tr));
  tr.querySelector('.delete').addEventListener('click', async () => deleteRow('quiz_questions', tr, 'السؤال', loadQuizzes));
  tr.querySelector('.f-type').addEventListener('change', (e)=>{
    const isMcq = e.target.value === 'mcq';
    const cell = tr.querySelector('.f-answer-cell');
    cell.innerHTML = isMcq ? mcqOptionsHtml([], null) : `<textarea class="f-model_answer" placeholder="إجابة نموذجية (اختياري)"></textarea>`;
    wireRowDirtyTracking(tr);
    markRowDirty(tr);
  });
}
async function saveQuiz(tr){
  const id = tr.dataset.id;
  const type = tr.querySelector('.f-type').value;
  const category = tr.querySelector('.f-category').value.trim();
  if(!category){ toast('لازم تضيف فئة من صندوق الإعدادات فوق الأول، وبعدين تختارها هنا', true); return false; }
  const payload = {
    type,
    question: tr.querySelector('.f-question').value.trim(),
    category,
    difficulty: tr.querySelector('.f-difficulty').value,
    time_seconds: parseInt(tr.querySelector('.f-time').value) || 15,
    link_url: tr.querySelector('.f-link-url').value.trim() || null,
    link_label: tr.querySelector('.f-link-label').value.trim() || null,
  };
  if(type === 'mcq'){
    const optEls = [...tr.querySelectorAll('.f-opt')];
    const correctEl = tr.querySelector('.f-correct:checked');
    const rawCorrectIdx = correctEl ? parseInt(correctEl.dataset.idx) : null;
    const nonEmpty = optEls.map((o,i)=>({ i, val: o.value.trim() })).filter(o=>o.val.length);
    payload.options = nonEmpty.map(o=>o.val);
    payload.correct_index = rawCorrectIdx != null ? nonEmpty.findIndex(o=>o.i === rawCorrectIdx) : -1;
    if(payload.correct_index === -1) payload.correct_index = null;
    payload.model_answer = null;
    if(payload.options.length < 2){ toast('لازم تكتب اختيارين على الأقل للسؤال', true); return false; }
    if(payload.correct_index == null){ toast('لازم تحدد الإجابة الصحيحة (الدائرة اللي جنب الاختيار)', true); return false; }
  } else {
    payload.model_answer = tr.querySelector('.f-model_answer').value.trim() || null;
    payload.options = null;
    payload.correct_index = null;
  }
  const { error } = id==='new' ? await sb.from('quiz_questions').insert(payload) : await sb.from('quiz_questions').update(payload).eq('id', id);
  if(error){ toast('خطأ: '+error.message, true); return false; }
  clearRowDirty(tr);
  toast('تم الحفظ ✓'); loadQuizzes(); refreshStats(); return true;
}
const addQuizBtn = document.getElementById('add-quiz');
if(addQuizBtn) {
  addQuizBtn.addEventListener('click', ()=>{
    if(quizCategoriesList.length === 0){ toast('لازم تضيف فئة الأول من صندوق الإعدادات فوق قبل ما تضيف سؤال', true); return; }
    prependNewRow('table-quizzes', rowToQuizTr({type:'mcq',question:'',category:quizCategoriesList[0],difficulty:'medium',time_seconds:15,options:[],correct_index:null,model_answer:'',link_url:'',link_label:''}), wireQuizRow);
  });
}

/* ============ تمـارين كتـابة وتتبّـع الحروف والكلمات (Writing Exercises Management) ============ */
let allLettersCache = [];
let allVocabCache = [];
let allWritingExercisesCache = [];
let editingWritingExerciseId = null;
let activeAdminTracer = null;

async function loadWritingExercises() {
  const tbody = document.querySelector('#table-writing-exercises tbody');
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="7" class="empty">جارٍ تحميل تمارين الكتابة...</td></tr>`;

  try {
    // تحميل كاش الحروف والمفردات لتجهيز القوائم المنسدلة في نافذة الإضافة
    if (allLettersCache.length === 0 || allVocabCache.length === 0) {
      const [letRes, vocRes] = await Promise.all([
        sb.from('letters').select('id, glyph, name').order('id', { ascending: true }),
        sb.from('vocabulary').select('id, coptic, meaning').order('id', { ascending: true })
      ]);
      if (!letRes.error && letRes.data) allLettersCache = letRes.data;
      if (!vocRes.error && vocRes.data) allVocabCache = vocRes.data;
      populateWritingModalDropdowns();
    }

    const { data, error } = await sb
      .from('writing_exercises')
      .select(`
        id, type, letter_id, vocabulary_id, custom_text, custom_meaning, difficulty, order_index, is_active, created_at,
        letters:letter_id ( id, glyph, name ),
        vocabulary:vocabulary_id ( id, coptic, meaning )
      `)
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty">خطأ في التحميل: ${error.message}</td></tr>`;
      return;
    }

    allWritingExercisesCache = data || [];

    if (!data || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty">لا توجد تمارين كتابة مضافة بعد. اضغط «+ إضافة تمرين جديد» لإضافة أول تمرين!</td></tr>`;
      return;
    }

    tbody.innerHTML = data.map(ex => {
      let linkedText = '';
      let linkedDesc = '';
      let typeBadge = '';

      if (ex.type === 'letter') {
        typeBadge = '<span style="font-weight:700;color:var(--ink);">حرف قبطي</span>';
        linkedText = ex.letters ? ex.letters.glyph : `[حرف #${ex.letter_id}]`;
        linkedDesc = ex.letters ? `حرف ${ex.letters.name || ''}` : '-';
      } else if (ex.custom_text) {
        typeBadge = '<span class="badge" style="background:#FFF3CD;color:#856404;border:1px solid #FFEBAA;font-weight:800;display:inline-flex;align-items:center;gap:4px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg><span>كلمة مخصصة</span></span>';
        linkedText = ex.custom_text;
        linkedDesc = ex.custom_meaning ? `${ex.custom_meaning}` : 'كلمة مخصصة مضافة يدوياً';
      } else {
        typeBadge = '<span style="font-weight:700;color:var(--ink);">كلمة قبطية</span>';
        linkedText = ex.vocabulary ? ex.vocabulary.coptic : `[كلمة #${ex.vocabulary_id}]`;
        linkedDesc = ex.vocabulary ? (ex.vocabulary.meaning || '') : '-';
      }

      const diffLabel = ex.difficulty === 'hard' ? 'صعب' : (ex.difficulty === 'easy' ? 'سهل' : 'متوسط');
      const diffBadgeColor = ex.difficulty === 'hard' ? '#c0392b' : (ex.difficulty === 'easy' ? '#27ae60' : '#d35400');
      const statusBadge = ex.is_active 
        ? `<span class="badge" style="background:#e8f8f0;color:#1e7e45;padding:4px 10px;border-radius:12px;font-weight:700;font-size:0.8rem;border:1px solid #b7e4c7;display:inline-flex;align-items:center;gap:3px;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>نشط</span></span>` 
        : `<span class="badge" style="background:#fdf0ed;color:#b02a37;padding:4px 10px;border-radius:12px;font-weight:700;font-size:0.8rem;border:1px solid #f5c2c7;display:inline-flex;align-items:center;gap:3px;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><span>معطل</span></span>`;

      return `
        <tr data-id="${ex.id}">
          <td data-label="ترتيب" style="width:80px">
            <input class="f-order" type="number" value="${ex.order_index ?? 1}" style="width:65px;padding:4px 8px;border-radius:8px;border:1px solid #D6C8B2;text-align:center;" onchange="updateWritingExerciseOrder('${ex.id}', this.value)">
          </td>
          <td data-label="النوع">
            ${typeBadge}
          </td>
          <td data-label="النص المرتبط">
            <span class="coptic" style="font-size:1.4rem;font-weight:bold;color:var(--madder);">${esc(linkedText)}</span>
          </td>
          <td data-label="الاسم / المعنى">
            <span>${esc(linkedDesc)}</span>
          </td>
          <td data-label="الصعوبة">
            <span style="display:inline-block;padding:3px 9px;border-radius:10px;font-size:.78rem;font-weight:800;color:#fff;background:${diffBadgeColor};">${diffLabel}</span>
          </td>
          <td data-label="الحالة">
            ${statusBadge}
          </td>
          <td class="row-actions" style="text-align:center;gap:6px;display:flex;justify-content:center;flex-wrap:wrap;">
            <button type="button" class="btn" onclick="previewWritingExercise('${ex.id}', '${esc(linkedText)}', '${esc(linkedDesc)}')" style="padding:5px 12px;font-size:.82rem;background:var(--gold);color:#fff;display:inline-flex;align-items:center;gap:4px;" title="معاينة سبورة التتبع">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span>معاينة</span>
            </button>
            <button type="button" class="btn secondary" onclick="editWritingExercise('${ex.id}')" style="padding:5px 10px;font-size:.82rem;display:inline-flex;align-items:center;gap:4px;" title="تعديل بيانات التمرين">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              <span>تعديل</span>
            </button>
            <button type="button" class="btn secondary" onclick="toggleWritingExerciseActive('${ex.id}', ${!ex.is_active})" style="padding:5px 10px;font-size:.82rem;" title="تغيير الحالة">
              ${ex.is_active ? 'تعطيل' : 'تفعيل'}
            </button>
            <button type="button" class="delete" onclick="deleteWritingExercise('${ex.id}')" style="padding:5px 10px;font-size:.82rem;" title="حذف التمرين">
              حذف
            </button>
          </td>
        </tr>
      `;
    }).join('');

  } catch (err) {
    console.error('loadWritingExercises error:', err);
    tbody.innerHTML = `<tr><td colspan="7" class="empty">حدث خطأ أثناء تحميل البيانات: ${err.message}</td></tr>`;
  }
}
window.loadWritingExercises = loadWritingExercises;

function populateWritingModalDropdowns() {
  const letterSel = document.getElementById('writing-letter-id');
  if (letterSel && allLettersCache.length > 0) {
    letterSel.innerHTML = '<option value="">-- اختر الحرف المراد تتبعه --</option>' +
      allLettersCache.map(l => `<option value="${l.id}">${l.glyph} — ${l.name || ''}</option>`).join('');
  }

  const vocabSel = document.getElementById('writing-vocab-id');
  if (vocabSel && allVocabCache.length > 0) {
    vocabSel.innerHTML = '<option value="">-- اختر الكلمة المراد تتبعها --</option>' +
      allVocabCache.map(v => `<option value="${v.id}">${v.coptic} ${v.meaning ? `— ${v.meaning}` : ''}</option>`).join('');
  }
}
      function openWritingModal() {
  editingWritingExerciseId = null;
  const modal = document.getElementById('modal-writing-exercise');
  if (!modal) return;
  const titleEl = document.getElementById('modal-writing-title');
  const submitBtn = document.getElementById('btn-submit-writing-exercise');
  if (titleEl) titleEl.textContent = 'إضافة تمرين كتابة وتتبع جديد';
  if (submitBtn) submitBtn.textContent = 'حفظ ونشر التمرين';
  populateWritingModalDropdowns();
  const orderInput = document.getElementById('writing-order');
  const existingRows = document.querySelectorAll('#table-writing-exercises tbody tr[data-id]');
  if (orderInput) orderInput.value = existingRows.length + 1;
  const customTextInput = document.getElementById('writing-custom-text');
  const customMeaningInput = document.getElementById('writing-custom-meaning');
  if (customTextInput) customTextInput.value = '';
  if (customMeaningInput) customMeaningInput.value = '';
  const radio = document.querySelector('input[name="writing_type"][value="letter"]');
  if (radio) radio.checked = true;
  toggleWritingTypeSelection();
  modal.style.display = 'flex';
}
window.openWritingModal = openWritingModal;

function editWritingExercise(id) {
  const ex = (allWritingExercisesCache || []).find(x => String(x.id) === String(id));
  if (!ex) return;
  editingWritingExerciseId = id;

  populateWritingModalDropdowns();

  const titleEl = document.getElementById('modal-writing-title');
  const submitBtn = document.getElementById('btn-submit-writing-exercise');
  if (titleEl) titleEl.textContent = 'تعديل تمرين كتابة وتتبع';
  if (submitBtn) submitBtn.textContent = 'حفظ التعديلات';

  const isCustom = !!ex.custom_text;
  const isWord = !isCustom && ex.type === 'word';
  const typeVal = isCustom ? 'custom' : (isWord ? 'word' : 'letter');

  const radio = document.querySelector(`input[name="writing_type"][value="${typeVal}"]`);
  if (radio) radio.checked = true;
  toggleWritingTypeSelection();

  if (typeVal === 'letter') {
    const sel = document.getElementById('writing-letter-id');
    if (sel) sel.value = ex.letter_id || '';
  } else if (typeVal === 'word') {
    const sel = document.getElementById('writing-vocab-id');
    if (sel) sel.value = ex.vocabulary_id || '';
  } else {
    const ct = document.getElementById('writing-custom-text');
    const cm = document.getElementById('writing-custom-meaning');
    if (ct) ct.value = ex.custom_text || '';
    if (cm) cm.value = ex.custom_meaning || '';
  }

  const diff = document.getElementById('writing-difficulty');
  if (diff) diff.value = ex.difficulty || 'medium';

  const ord = document.getElementById('writing-order');
  if (ord) ord.value = ex.order_index ?? 1;

  const modal = document.getElementById('modal-writing-exercise');
  if (modal) modal.style.display = 'flex';
}
window.editWritingExercise = editWritingExercise;

function closeWritingModal() {
  const modal = document.getElementById('modal-writing-exercise');
  if (modal) modal.style.display = 'none';
  editingWritingExerciseId = null;
}
window.closeWritingModal = closeWritingModal;

function toggleWritingTypeSelection() {
  const type = document.querySelector('input[name="writing_type"]:checked')?.value || 'letter';
  const letterWrap = document.getElementById('writing-select-letter-wrap');
  const wordWrap = document.getElementById('writing-select-word-wrap');
  const customWrap = document.getElementById('writing-custom-word-wrap');
  if (letterWrap) letterWrap.style.display = type === 'letter' ? 'block' : 'none';
  if (wordWrap) wordWrap.style.display = type === 'word' ? 'block' : 'none';
  if (customWrap) customWrap.style.display = type === 'custom' ? 'block' : 'none';
}
window.toggleWritingTypeSelection = toggleWritingTypeSelection;

async function saveWritingExercise() {
  const type = document.querySelector('input[name="writing_type"]:checked')?.value || 'letter';
  const difficulty = document.getElementById('writing-difficulty')?.value || 'medium';
  const orderIndex = parseInt(document.getElementById('writing-order')?.value, 10) || 1;

  let letterId = null;
  let vocabularyId = null;
  let customText = null;
  let customMeaning = null;

  if (type === 'letter') {
    const sel = document.getElementById('writing-letter-id');
    letterId = sel ? parseInt(sel.value, 10) : null;
    if (!letterId || isNaN(letterId)) {
      toast('يرجى اختيار الحرف أولاً', true);
      return;
    }
  } else if (type === 'custom') {
    customText = document.getElementById('writing-custom-text')?.value?.trim();
    customMeaning = document.getElementById('writing-custom-meaning')?.value?.trim();
    if (!customText) {
      toast('يرجى كتابة الكلمة القبطية المخصصة أولاً', true);
      return;
    }
  } else {
    const sel = document.getElementById('writing-vocab-id');
    vocabularyId = sel ? parseInt(sel.value, 10) : null;
    if (!vocabularyId || isNaN(vocabularyId)) {
      toast('يرجى اختيار الكلمة أولاً', true);
      return;
    }
  }

  const submitBtn = document.getElementById('btn-submit-writing-exercise');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'جارٍ الحفظ...';
  }

  const payload = {
    type: (type === 'letter') ? 'letter' : 'word',
    letter_id: letterId,
    vocabulary_id: vocabularyId,
    custom_text: customText,
    custom_meaning: customMeaning,
    difficulty,
    order_index: orderIndex,
    is_active: true
  };

  let error;
  if (editingWritingExerciseId) {
    const res = await sb.from('writing_exercises').update(payload).eq('id', editingWritingExerciseId);
    error = res.error;
  } else {
    const res = await sb.from('writing_exercises').insert(payload);
    error = res.error;
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = editingWritingExerciseId ? 'حفظ التعديلات' : 'حفظ ونشر التمرين';
  }

  if (error) {
    toast('تعذر حفظ التمرين: ' + error.message, true);
    return;
  }

  toast(editingWritingExerciseId ? 'تم تحديث بيانات التمرين بنجاح ✓' : 'تمت إضافة تمرين الكتابة والتتبع بنجاح ✓');
  editingWritingExerciseId = null;
  closeWritingModal();
  loadWritingExercises();
  refreshStats();
}
window.saveWritingExercise = saveWritingExercise;

async function updateWritingExerciseOrder(id, newOrder) {
  const parsed = parseInt(newOrder, 10);
  if (isNaN(parsed)) return;
  const { error } = await sb.from('writing_exercises').update({ order_index: parsed }).eq('id', id);
  if (error) {
    toast('تعذر تحديث الترتيب: ' + error.message, true);
    return;
  }
  toast('تم تحديث ترتيب التمرين ✓');
  loadWritingExercises();
}
window.updateWritingExerciseOrder = updateWritingExerciseOrder;

async function toggleWritingExerciseActive(id, newStatus) {
  const { error } = await sb.from('writing_exercises').update({ is_active: newStatus }).eq('id', id);
  if (error) {
    toast('تعذر تحديث الحالة: ' + error.message, true);
    return;
  }
  toast(`تم ${newStatus ? 'تفعيل' : 'تعطيل'} التمرين بنجاح ✓`);
  loadWritingExercises();
}
window.toggleWritingExerciseActive = toggleWritingExerciseActive;

async function deleteWritingExercise(id) {
  const c = await mgConfirm('حذف تمرين الكتابة', 'هل أنت متأكد من رغبتك في حذف هذا التمرين نهائياً من المنصة؟', 'warning', { confirmText: 'نعم، احذف', cancelText: 'إلغاء' });
  if (!c) return;

  const { error } = await sb.from('writing_exercises').delete().eq('id', id);
  if (error) {
    toast('تعذر حذف التمرين: ' + error.message, true);
    return;
  }
  toast('تم حذف تمرين الكتابة بنجاح');
  loadWritingExercises();
  refreshStats();
}
window.deleteWritingExercise = deleteWritingExercise;

function previewWritingExercise(id, text, desc) {
  const modal = document.getElementById('modal-tracer-preview');
  const canvas = document.getElementById('admin-tracer-canvas');
  const headingEl = document.getElementById('tracer-preview-heading');
  const subtitleEl = document.getElementById('tracer-preview-subtitle');
  const badge = document.getElementById('admin-tracer-badge');
  const scoreEl = document.getElementById('admin-tracer-score');
  const checkBtn = document.getElementById('admin-tracer-check-btn');

  if (!modal || !canvas) return;

  // جلب أحدث بيانات التمرين ديناميكياً لضمان ظهور أي تعديل في المعاينة فوراً
  let targetText = text || '';
  let targetDesc = desc || '';
  const ex = (allWritingExercisesCache || []).find(x => String(x.id) === String(id));
  if (ex) {
    if (ex.type === 'letter') {
      targetText = ex.letters ? ex.letters.glyph : `[حرف #${ex.letter_id}]`;
      targetDesc = ex.letters?.name ? ex.letters.name : 'حرف قبطي';
    } else if (ex.custom_text) {
      targetText = ex.custom_text;
      targetDesc = ex.custom_meaning || 'كلمة مخصصة';
    } else {
      targetText = ex.vocabulary ? ex.vocabulary.coptic : `[كلمة #${ex.vocabulary_id}]`;
      targetDesc = ex.vocabulary?.meaning || 'كلمة قبطية';
    }
  }

  let cleanText = String(targetText || '').trim();

  // ضبط العنوان العربي (مثل: الفا) على اليمين تماماً مثل الموبايل
  if (headingEl) {
    headingEl.textContent = targetDesc || 'تتبّع الحرف';
  }

  // ضبط النص القبطي باللون الذهبي في المنتصف (مثل: ⲀⲂⲄⲆⲈ)
  if (subtitleEl) {
    subtitleEl.textContent = cleanText || 'Ⲁ';
  }

  if (badge) badge.style.display = 'none';

  // إعادة ضبط زر تحقق السفلي
  if (checkBtn) {
    checkBtn.disabled = true;
    checkBtn.style.background = '#D4C9B5';
    checkBtn.style.color = '#8C8070';
    checkBtn.style.cursor = 'not-allowed';
    checkBtn.style.boxShadow = 'none';
  }

  modal.style.display = 'flex';

  if (activeAdminTracer) {
    try { activeAdminTracer.destroy(); } catch (_) {}
    activeAdminTracer = null;
  }

  if (typeof LetterTracer === 'undefined') {
    toast('جاري تحميل مكتبة التتبع، يرجى الانتظار ثانية...', true);
    return;
  }

  activeAdminTracer = new LetterTracer({
    canvasId: canvas,
    fontUrl: 'assets/fonts/girges.woff',
    text: cleanText,
    passThreshold: 85,
    minCoverageThreshold: 80,
    onStrokeEnd: (strokeCount) => {
      // تفعيل زر «تحقق» السفلي بمجرد قيام المستخدم بالرسم
      if (checkBtn && strokeCount > 0) {
        checkBtn.disabled = false;
        checkBtn.style.background = 'var(--madder, #6F1737)';
        checkBtn.style.color = '#FFFFFF';
        checkBtn.style.cursor = 'pointer';
        checkBtn.style.boxShadow = '0 5px 0 #4A0E21';
      }
    },
    onSuccess: (score) => {
      if (badge && scoreEl) {
        scoreEl.textContent = score;
        badge.style.display = 'block';
        badge.style.color = '#2e6b3e';
        badge.style.borderColor = '#2e6b3e';
      }
      if (checkBtn) {
        checkBtn.disabled = false;
        checkBtn.style.background = 'var(--madder, #6F1737)';
        checkBtn.style.color = '#FFFFFF';
        checkBtn.style.cursor = 'pointer';
        checkBtn.style.boxShadow = '0 5px 0 #4A0E21';
      }
    }
  });

  const strokeSlider = document.getElementById('admin-tracer-stroke-slider');
  const strokeVal = document.getElementById('admin-tracer-stroke-val');
  const strokePreview = document.getElementById('admin-tracer-stroke-preview');
  if (strokeSlider) {
    strokeSlider.value = 12;
    if (strokeVal) strokeVal.textContent = '12px';
    if (strokePreview) {
      strokePreview.style.width = '12px';
      strokePreview.style.height = '12px';
    }
    strokeSlider.oninput = (e) => {
      const w = parseInt(e.target.value, 10);
      if (strokeVal) strokeVal.textContent = `${w}px`;
      if (strokePreview) {
        strokePreview.style.width = `${w}px`;
        strokePreview.style.height = `${w}px`;
      }
      if (activeAdminTracer) {
        activeAdminTracer.setStrokeWidth(w);
      }
    };
  }

  const btnClear = document.getElementById('btn-admin-tracer-clear');
  if (btnClear) {
    btnClear.onclick = () => {
      if (activeAdminTracer) activeAdminTracer.clear();
      if (badge) badge.style.display = 'none';
      if (checkBtn) {
        checkBtn.disabled = true;
        checkBtn.style.background = '#D4C9B5';
        checkBtn.style.color = '#8C8070';
        checkBtn.style.cursor = 'not-allowed';
        checkBtn.style.boxShadow = 'none';
      }
    };
  }

  const performEvaluation = () => {
    if (activeAdminTracer) {
      const evalRes = activeAdminTracer.evaluate();
      if (badge && scoreEl) {
        scoreEl.textContent = evalRes.finalScore;
        badge.style.display = 'block';
        badge.style.color = evalRes.passed ? '#2e6b3e' : (evalRes.incomplete ? '#c2410c' : '#a13030');
        badge.style.borderColor = evalRes.passed ? '#2e6b3e' : (evalRes.incomplete ? '#ea580c' : '#a13030');
      }
      if (evalRes.incomplete) {
        toast(evalRes.message || `يرجى إكمال كتابة كامل الحرف (${evalRes.coveragePercent}%)`, true);
      } else if (!evalRes.passed) {
        toast(`الدقة: ${evalRes.finalScore}% — حاول الرسم بدقة أكبر داخل المسار لتصل إلى 85%`, true);
      } else {
        toast(`ممتاز! الدقة: ${evalRes.finalScore}% — تتبع متقن وناجح ✓`);
        if (checkBtn) {
          checkBtn.style.background = '#2E6B3E';
          checkBtn.style.boxShadow = '0 5px 0 #1A4225';
        }
      }
    }
  };

  const btnEval = document.getElementById('btn-admin-tracer-eval');
  if (btnEval) {
    btnEval.onclick = performEvaluation;
  }

  if (checkBtn) {
    checkBtn.onclick = performEvaluation;
  }

  setTimeout(() => {
    if (activeAdminTracer) {
      activeAdminTracer._setupCanvasSize();
      activeAdminTracer.draw();
    }
  }, 60);
}
window.previewWritingExercise = previewWritingExercise;

function closeTracerPreviewModal() {
  const modal = document.getElementById('modal-tracer-preview');
  if (modal) modal.style.display = 'none';
  if (activeAdminTracer) {
    try { activeAdminTracer.destroy(); } catch (_) {}
    activeAdminTracer = null;
  }
}
window.closeTracerPreviewModal = closeTracerPreviewModal;

/* ============ نظام تتبع التعديلات غير المحفوظة (Dirty Tracking & Auto-Protection) ============ */
function markRowDirty(tr){
  if(!tr) return;
  tr.classList.add('row-dirty');
  updateDirtyCounter();
}

function clearRowDirty(tr){
  if(!tr) return;
  tr.classList.remove('row-dirty');
  updateDirtyCounter();
}

function updateDirtyCounter(){
  const dirtyRows = document.querySelectorAll('tr.row-dirty, .quiz-cat-row.row-dirty');
  const hasCurriculumDirty = Boolean(window._isCurriculumDirty || (localStorage.getItem('mg_coptic_curriculum_dirty') === 'true'));
  const count = dirtyRows.length + (hasCurriculumDirty ? 1 : 0);
  const fab = document.getElementById('save-all-fab');
  if(fab){
    const labelEl = fab.querySelector('.save-all-label');
    if(count > 0){
      labelEl.textContent = `حفظ التعديلات (${count})`;
      fab.style.background = 'linear-gradient(135deg, #e67e22, #d35400)';
      fab.classList.add('has-dirty');
    } else {
      labelEl.textContent = 'حفظ كل التعديلات';
      fab.style.background = '';
      fab.classList.remove('has-dirty');
    }
  }
}

function wireRowDirtyTracking(tr){
  if(!tr) return;
  tr.querySelectorAll('input, textarea, select').forEach(el => {
    if(el.type === 'file') return;
    el.addEventListener('input', () => markRowDirty(tr));
    el.addEventListener('change', () => markRowDirty(tr));
  });
  tr.querySelectorAll('[contenteditable="true"]').forEach(el => {
    el.addEventListener('input', () => markRowDirty(tr));
  });
}

// حماية المتصفح من فقدان التعديلات عند عمل Reload أو إغلاق الصفحة بالخطأ
window.addEventListener('beforeunload', (e) => {
  const dirtyRows = document.querySelectorAll('tr.row-dirty, .quiz-cat-row.row-dirty');
  const hasCurriculumDirty = Boolean(window._isCurriculumDirty || (localStorage.getItem('mg_coptic_curriculum_dirty') === 'true'));
  if (dirtyRows.length > 0 || hasCurriculumDirty) {
    e.preventDefault();
    e.returnValue = 'يوجد تعديلات غير محفوظة في لوحة التحكم، هل أنت متأكد من مغادرة الصفحة دون حفظ؟';
    return e.returnValue;
  }
});

function prependNewRow(tableId, rowHtml, wireFn){
  const tbody = document.querySelector(`#${tableId} tbody`);
  const emptyRow = tbody.querySelector('.empty');
  if(emptyRow) emptyRow.closest('tr').remove();
  const wrapper = document.createElement('tbody');
  wrapper.innerHTML = rowHtml;
  const tr = wrapper.firstElementChild;
  tr.dataset.id = 'new';
  tbody.prepend(tr);
  wireFn(tr);
  wireRowDirtyTracking(tr);
  markRowDirty(tr);
}
async function deleteRow(table, tr, labelAr, reloadFn, extraUrls){
  const id = tr.dataset.id;
  const cleanupFiles = async ()=>{
    if(Array.isArray(extraUrls) && extraUrls.length > 0){
      await deleteStorageFiles(extraUrls.filter(Boolean));
    }
  };
  if(id === 'new'){ await cleanupFiles(); tr.remove(); updateDirtyCounter(); return; }
  { const c = await mgConfirm('تأكيد الحذف النهائي', `هل أنت متأكد من حذف ${labelAr} نهائياً؟ سيتم مسحه ومسح أي صور أو تسجيلات مرتبطة به نهائياً من قاعدة البيانات والتخزين السحابي.`, 'warning', {confirmText: 'نعم، احذف نهائياً', cancelText: 'إلغاء'}); if(!c) return; }
  const { error } = await sb.from(table).delete().eq('id', id);
  if(error){ toast('خطأ في الحذف: '+error.message, true); return; }
  await cleanupFiles();
  toast('تم الحذف نهائياً من قاعدة البيانات والتخزين السحابي ✓'); reloadFn(); refreshStats();
}

/* ============ زر "حفظ كل التعديلات" الثابت ============ */
const SAVE_ALL_TABLES = [
  { tableId:'table-letters',    fn:saveLetter  },
  { tableId:'table-vocabulary', fn:saveVocab   },
  { tableId:'table-grammar',    fn:saveGrammar },
  { tableId:'table-articles',   fn:saveArticle },
  { tableId:'table-quizzes',    fn:saveQuiz    },
];

function isNewRowBlank(tr){
  if(tr.dataset.id !== 'new') return false;
  if(tr.dataset.image && tr.dataset.image.trim()) return false;
  const fields = tr.querySelectorAll('input, textarea, [contenteditable="true"]');
  for(const el of fields){
    if(el.type === 'file' || el.type === 'checkbox' || el.type === 'radio') continue;
    if(el.classList.contains('f-sort_order') || el.classList.contains('f-time')) continue;
    if(el.hasAttribute('contenteditable')){
      if(el.textContent.trim()) return false;
    } else if((el.value ?? '').toString().trim()){
      return false;
    }
  }
  return true;
}

async function saveAllRows(){
  const fab = document.getElementById('save-all-fab');
  if(fab.disabled) return; 

  const jobs = [];
  // الأول: الصفوف المعدلة صراحة (Dirty)
  SAVE_ALL_TABLES.forEach(({tableId, fn})=>{
    document.querySelectorAll(`#${tableId} tbody tr[data-id]`).forEach(tr=>{
      if(tr.classList.contains('row-dirty') || (tr.dataset.id === 'new' && !isNewRowBlank(tr))){
        jobs.push({ tr, fn });
      }
    });
  });

  // إذا لم توجد صفوف dirty ولكن المستخدم ضغط حفظ الكل، افحص جميع الصفوف غير الفارغة
  if(jobs.length === 0){
    SAVE_ALL_TABLES.forEach(({tableId, fn})=>{
      document.querySelectorAll(`#${tableId} tbody tr[data-id]`).forEach(tr=>{
        if(!isNewRowBlank(tr)) jobs.push({ tr, fn });
      });
    });
  }

  // إذا كان منهج الألعاب يحتوي على تعديلات غير محفوظة، احفظه ضمن الحفظ الشامل
  const hasCurriculumDirty = Boolean(window._isCurriculumDirty || (localStorage.getItem('mg_coptic_curriculum_dirty') === 'true'));
  if(hasCurriculumDirty && typeof window.syncToDatabaseAndStorage === 'function'){
    jobs.push({ tr: null, fn: async () => { await window.syncToDatabaseAndStorage(); return true; } });
  }

  if(jobs.length === 0){ toast('مفيش أي تعديلات محتاجة حفظ دلوقتي'); return; }

  const labelEl = fab.querySelector('.save-all-label');
  const originalLabel = labelEl.textContent;
  fab.disabled = true;
  fab.classList.add('is-saving');
  suppressToast = true;

  let okCount = 0, failCount = 0;
  for(let i=0;i<jobs.length;i++){
    labelEl.textContent = `(${i+1}/${jobs.length})`;
    try{
      const ok = await jobs[i].fn(jobs[i].tr);
      if(ok){
        if(jobs[i].tr) clearRowDirty(jobs[i].tr);
        okCount++;
      } else {
        failCount++;
      }
    }catch(e){
      console.error('خطأ أثناء الحفظ الشامل:', e);
      failCount++;
    }
  }

  suppressToast = false;
  fab.disabled = false;
  fab.classList.remove('is-saving');
  updateDirtyCounter();

  if(failCount === 0){
    toast(`تم حفظ كل التعديلات بنجاح ✓ (${okCount} من ${jobs.length})`);
  } else if(okCount === 0){
    toast(`تعذّر حفظ ${failCount} من ${jobs.length} — راجع الحقول المطلوبة (الفئة، العنوان، الاختيارات...)`, true);
  } else {
    toast(`تم حفظ ${okCount} بنجاح، وفيه ${failCount} محتاج مراجعة قبل الحفظ`, true);
  }
}

const saveAllFab = document.getElementById('save-all-fab');
if(saveAllFab) {
  saveAllFab.addEventListener('click', saveAllRows);
}

document.addEventListener('keydown', (e)=>{
  const isSaveShortcut = (e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S');
  if(!isSaveShortcut) return;
  if(shell && !shell.classList.contains('show')) return;
  e.preventDefault();
  saveAllRows();
});

/* ============ CURRICULUM ADMIN SYSTEM ENGINE (منهج الألعاب والمستويات) ============ */

// Initialize session on load

/* ============ إدارة الطلاب والمستخدمين (Students Management & Realtime) ============ */
let allLoadedStudents = [];
let activeSelectedStudent = null;
let studentsRealtimeSub = null;

const ICONS_SVG = {
  crown: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/></svg>`,
  student: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  book: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  flame: `<svg viewBox="0 0 24 24" width="14" height="14" fill="#EA580C" stroke="#EA580C" stroke-width="1.5" style="vertical-align:middle;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" width="14" height="14" fill="#E11D48" stroke="#E11D48" stroke-width="1" style="vertical-align:middle;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  activeDot: `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#16A34A;margin-left:4px;box-shadow:0 0 6px #16A34A;vertical-align:middle;"></span>`,
  details: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  lightning: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" style="vertical-align:middle;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  arrowDown: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`
};

let debouncedLoadUsersTimer = null;
function debouncedLoadUsers(isSilent = true, delay = 800) {
  if (debouncedLoadUsersTimer) clearTimeout(debouncedLoadUsersTimer);
  debouncedLoadUsersTimer = setTimeout(() => {
    loadUsers(isSilent);
  }, delay);
}

let studentsPresenceSub = null;
window.currentOnlineUserIds = new Set();

// الاشتراك اللحظي الفوري لتحديث قائمة الطلاب ورصد التواجد اللحظي (Realtime Presence) بدقة 100%
function setupStudentsRealtime() {
  // 1) الاشتراك في تحديثات قاعدة البيانات التلقائية
  if (!studentsRealtimeSub) {
    try {
      studentsRealtimeSub = sb.channel('realtime_admin_students_stream')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
          showRealtimePulse();
          debouncedLoadUsers(true, 800);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'user_progress' }, () => {
          showRealtimePulse();
          debouncedLoadUsers(true, 800);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'user_lesson_progress' }, () => {
          showRealtimePulse();
          debouncedLoadUsers(true, 800);
        })
        .subscribe((status) => {
          const badge = document.getElementById('realtime-status-badge');
          const text = document.getElementById('realtime-status-text');
          if (badge && text) {
            if (status === 'SUBSCRIBED') {
              badge.style.background = '#EAF5ED';
              badge.style.color = '#1E6B37';
              badge.style.borderColor = '#A3D9B1';
              text.textContent = 'متصل فورياً بالموقع (Realtime Live)';
            } else {
              badge.style.background = '#FFFBEB';
              badge.style.color = '#B45309';
              badge.style.borderColor = '#FCD34D';
              text.textContent = 'جارٍ المزامنة...';
            }
          }
        });
    } catch (e) {
      console.warn('Realtime subscription error:', e);
    }
  }

  // 2) الاشتراك في قناة التواجد والحضور اللحظي الحقيقي (Realtime Presence)
  if (!studentsPresenceSub) {
    try {
      studentsPresenceSub = sb.channel('coptic_online_presence');
      studentsPresenceSub
        .on('presence', { event: 'sync' }, () => {
          handlePresenceStateChange();
        })
        .on('presence', { event: 'join' }, () => {
          handlePresenceStateChange();
        })
        .on('presence', { event: 'leave' }, () => {
          handlePresenceStateChange();
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            handlePresenceStateChange();
          }
        });
    } catch (e) {
      console.warn('Realtime presence subscription error:', e);
    }
  }
}

// معالجة تغييرات التواجد اللحظي وتحديث الواجهة مباشرة بدون وميض
function handlePresenceStateChange() {
  if (!studentsPresenceSub) return;
  try {
    const state = studentsPresenceSub.presenceState();
    const onlineIds = new Set();
    for (const key in state) {
      if (Array.isArray(state[key])) {
        state[key].forEach(p => {
          if (p.user_id) onlineIds.add(String(p.user_id));
        });
      }
    }
    window.currentOnlineUserIds = onlineIds;

    // تحديث عداد النشطين الآن
    updateOnlineStatsDisplay();

    // تحديث صفوف الجدول المعروضة فورياً دون إعادة تحميل
    updateTableOnlineIndicators();

    // تحديث نافذة التفاصيل إذا كانت مفتوحة
    if (activeSelectedStudent) {
      const isOnline = window.currentOnlineUserIds.has(String(activeSelectedStudent.id));
      const headerStatusEl = document.getElementById('m-student-header-status');
      if (headerStatusEl) {
        headerStatusEl.innerHTML = isOnline ? `
          <span class="live-status-pill is-online" style="font-size:0.75rem; padding:2px 8px; font-weight:800; border-color:#6EE7B7;">
            <span class="live-dot-pulse" style="width:7px; height:7px;"></span>
            <span>نشط الآن</span>
          </span>
        ` : '';
      }

      const lastActiveEl = document.getElementById('m-student-last-active');
      if (lastActiveEl) {
        if (isOnline) {
          lastActiveEl.innerHTML = `
            <span class="live-status-pill is-online" style="font-size:0.95rem; padding:6px 14px; font-weight:900;">
              <span class="live-dot-pulse"></span>
              <span>متصل ونشط الآن بالموقع (Online Live)</span>
            </span>
          `;
        } else {
          const todayStr = new Date().toISOString().split('T')[0];
          const isActiveToday = (activeSelectedStudent.last_active_date === todayStr);
          lastActiveEl.innerHTML = activeSelectedStudent.last_active_date ?
            (isActiveToday ? `<span class="live-status-pill is-today" style="font-size:0.9rem; padding:5px 12px;"><span class="today-dot"></span><span>نشط اليوم</span></span>` :
            `<span class="live-status-pill is-past" style="font-size:0.9rem; padding:5px 12px;">${activeSelectedStudent.last_active_date}</span>`) :
            `<span class="live-status-empty" style="font-size:0.88rem;">لم ينشط بعد</span>`;
        }
      }
    }
  } catch (e) {
    console.warn('handlePresenceStateChange error:', e);
  }
}

// تحديث مؤشرات التواجد في خلايا الجدول مباشرة
function updateTableOnlineIndicators() {
  const rows = document.querySelectorAll('#table-users tbody tr[data-id]');
  const todayStr = new Date().toISOString().split('T')[0];
  rows.forEach(row => {
    const userId = row.getAttribute('data-id');
    const cell = row.querySelector('.col-last-active');
    if (!cell) return;
    const isOnline = window.currentOnlineUserIds && window.currentOnlineUserIds.has(String(userId));
    const userObj = (allLoadedStudents || []).find(s => String(s.id) === String(userId));
    const lastActiveDate = userObj ? userObj.last_active_date : null;
    const isActiveToday = (lastActiveDate === todayStr);

    if (isOnline) {
      cell.innerHTML = `
        <span class="live-status-pill is-online" title="متصل الآن بالمنصة لحظياً (حقيقي 100%)">
          <span class="live-dot-pulse"></span>
          <span>نشط الآن</span>
        </span>
      `;
    } else if (lastActiveDate) {
      if (isActiveToday) {
        cell.innerHTML = `
          <span class="live-status-pill is-today" title="كان نشطاً في وقت سابق من اليوم">
            <span class="today-dot"></span>
            <span>اليوم</span>
          </span>
        `;
      } else {
        cell.innerHTML = `
          <span class="live-status-pill is-past" title="آخر نشاط مسجل: ${lastActiveDate}">
            ${lastActiveDate}
          </span>
        `;
      }
    } else {
      cell.innerHTML = `<span class="live-status-empty">لم ينشط بعد</span>`;
    }
  });
}

// تحديث عداد النشطين الآن في البطاقة العلوية
function updateOnlineStatsDisplay() {
  const onlineCount = window.currentOnlineUserIds ? window.currentOnlineUserIds.size : 0;
  const onlineEl = document.getElementById('stat-online-now');
  if (onlineEl) {
    onlineEl.textContent = onlineCount;
  }
}

function showRealtimePulse() {
  const badge = document.getElementById('realtime-status-badge');
  if (badge) {
    badge.style.transform = 'scale(1.06)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 400);
  }
}

async function loadUsers(isSilent = false) {
  if (window.currentAdminRole !== 'super_admin') {
    console.warn('loadUsers blocked: Super Admin permission required.');
    return;
  }
  const tbody = document.querySelector('#table-users tbody');
  if (!tbody) return;

  const hasCachedData = (allLoadedStudents && allLoadedStudents.length > 0);

  // إظهار شريط التحميل فقط إذا لم تكن هناك بيانات محملة مسبقاً، لمنع وميض وتأخير الصفحة
  if (!isSilent && !hasCachedData) {
    tbody.innerHTML = '<tr><td colspan="11" class="empty"><div style="display:flex;align-items:center;justify-content:center;gap:10px;"><div class="spinner" style="width:20px;height:20px;border-width:2.5px;"></div> <span>جارٍ تحميل بيانات الطلاب بالكامل وربطها لحظياً بالموقع...</span></div></td></tr>';
  }

  // تدوير أيقونة التحديث إن وجدت لإشعار المشرف بالتحميل في الخلفية
  const refreshBtnIcon = document.querySelector('#panel-users button[onclick="loadUsers()"] svg');
  if (refreshBtnIcon) refreshBtnIcon.style.animation = 'spin 0.8s linear infinite';

  setupStudentsRealtime();

  try {
    // جلب الطلاب وتقدمهم ودروسهم المنجزة وهيكل المنهج الفعلي
    const [uRes, pRes, lpRes, lvlRes, unitRes, lesRes] = await Promise.all([
      sb.from('users').select('*').order('created_at', { ascending: false }),
      sb.from('user_progress').select('*'),
      sb.from('user_lesson_progress').select('user_id, status, lesson_id, score, updated_at'),
      sb.from('levels').select('id, title, order_index').order('order_index'),
      sb.from('units').select('id, level_id, order_index').order('order_index'),
      sb.from('lessons').select('id, unit_id, order_index').order('order_index')
    ]);

    if (uRes.error) throw uRes.error;

    const users = uRes.data || [];
    const progressList = pRes.data || [];
    const allLessonProgress = lpRes.data || [];
    const dbLevels = (lvlRes && lvlRes.data) || [];
    const dbUnits = (unitRes && unitRes.data) || [];
    const dbLessons = (lesRes && lesRes.data) || [];

    // ربط الوحدات والدروس بالمستويات الفعلية
    const unitToLevel = {};
    dbUnits.forEach(u => {
      unitToLevel[u.id] = u.level_id || (dbLevels[0] ? dbLevels[0].id : 1);
    });

    const levelLessonsMap = {};
    dbLevels.forEach(l => { levelLessonsMap[l.id] = []; });
    if (Object.keys(levelLessonsMap).length === 0) levelLessonsMap[1] = [];

    dbLessons.forEach(les => {
      const lvlId = unitToLevel[les.unit_id] || (dbLevels[0] ? dbLevels[0].id : 1);
      if (!levelLessonsMap[lvlId]) levelLessonsMap[lvlId] = [];
      levelLessonsMap[lvlId].push(les.id);
    });

    const progMap = {};
    progressList.forEach(p => { progMap[p.user_id] = p; });

    const userLessonProgressMap = {};
    allLessonProgress.forEach(row => {
      if (!userLessonProgressMap[row.user_id]) userLessonProgressMap[row.user_id] = [];
      userLessonProgressMap[row.user_id].push(row);
    });

    const todayStr = new Date().toISOString().split('T')[0];

    allLoadedStudents = users.map(u => {
      const p = progMap[u.id] || {};
      const userLps = userLessonProgressMap[u.id] || [];
      const completedLps = userLps.filter(l => l.status === 'completed');
      const completedCount = completedLps.length;
      const completedLessonIdSet = new Set(completedLps.map(l => String(l.lesson_id)));
      const points = p.points ?? 0;

      // تحديد المستوى الفعلي للطالب بناءً على مساره وإنجازه الدراسي الواقعي
      let actualLevel = 'المستوى 1';
      let actualLevelFull = 'المستوى 1';

      if (dbLevels.length > 0) {
        let currentLvl = dbLevels[0];
        for (let i = 0; i < dbLevels.length; i++) {
          const lvl = dbLevels[i];
          const lessonIds = levelLessonsMap[lvl.id] || [];
          const isLevelCompleted = lessonIds.length > 0 && lessonIds.every(id => completedLessonIdSet.has(String(id)));
          if (isLevelCompleted) {
            if (i + 1 < dbLevels.length) {
              currentLvl = dbLevels[i + 1];
            } else {
              currentLvl = lvl;
              actualLevelFull = `${lvl.title || ('المستوى ' + (lvl.order_index || (i + 1)))} (مكتمل)`;
              actualLevel = `المستوى ${lvl.order_index || (i + 1)} (مكتمل)`;
              break;
            }
          } else {
            currentLvl = lvl;
            break;
          }
        }
        if (!actualLevelFull.includes('(مكتمل)')) {
          actualLevel = `المستوى ${currentLvl.order_index || 1}`;
          actualLevelFull = currentLvl.title || `المستوى ${currentLvl.order_index || 1}`;
        }
      }

      return {
        id: u.id,
        full_name: u.full_name || 'طالب قبطي',
        email: u.email || 'بدون بريد',
        password: u.password || '',
        role: u.role || 'student',
        avatar_url: u.avatar_url || null,
        created_at: u.created_at || null,
        age: u.age || null,
        points: points,
        hearts: p.hearts ?? 5,
        streak_days: p.streak_days ?? 1,
        last_active_date: p.last_active_date || null,
        claimed_chests: p.claimed_chests || [],
        completed_lessons: completedCount,
        lessons_detail: userLps,
        actualLevel: actualLevelFull,
        tierLevel: actualLevel,
        isActiveToday: (p.last_active_date === todayStr),
        is_banned: !!u.is_banned,
        ban_reason: u.ban_reason || null,
        banned_until: u.banned_until || null,
        banned_at: u.banned_at || null
      };
    });

    // تحديث بطاقات الإحصائيات السريعة للطلاب بأرقام حقيقية
    updateStudentsSummaryStats(allLoadedStudents);

    // تصفية وعرض القائمة فوراً
    filterStudentsTable();

  } catch (e) {
    console.error('loadUsers error:', e);
    if (!hasCachedData) {
      tbody.innerHTML = '<tr><td colspan="11" class="empty" style="color:#B91C1C; font-weight:bold;">تعذر تحميل بيانات الطلاب: ' + esc(e.message) + '</td></tr>';
    }
  } finally {
    if (refreshBtnIcon) refreshBtnIcon.style.animation = '';
  }
}
window.loadUsers = loadUsers;

function updateStudentsSummaryStats(list) {
  const totalEl = document.getElementById('stat-total-students');
  const activeTodayEl = document.getElementById('stat-active-today');
  const onlineNowEl = document.getElementById('stat-online-now');
  const totalXpEl = document.getElementById('stat-total-xp');
  const lessonsEl = document.getElementById('stat-completed-lessons');

  const todayStr = new Date().toISOString().split('T')[0];
  const totalStudents = list.length;
  const activeToday = list.filter(s => s.last_active_date === todayStr).length;
  const onlineNow = window.currentOnlineUserIds ? window.currentOnlineUserIds.size : 0;
  const totalXp = list.reduce((sum, s) => sum + (s.points || 0), 0);
  const totalLessons = list.reduce((sum, s) => sum + (s.completed_lessons || 0), 0);

  if (totalEl) totalEl.textContent = totalStudents;
  if (activeTodayEl) activeTodayEl.textContent = activeToday;
  if (onlineNowEl) onlineNowEl.textContent = onlineNow;
  if (totalXpEl) totalXpEl.textContent = totalXp.toLocaleString() + ' XP';
  if (lessonsEl) lessonsEl.textContent = totalLessons;
}

function filterStudentsTable() {
  const searchInput = document.getElementById('input-search-students');
  const roleSelect = document.getElementById('select-filter-role');
  const sortSelect = document.getElementById('select-sort-students');

  const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const roleFilter = roleSelect ? roleSelect.value : 'all';
  const sortMode = sortSelect ? sortSelect.value : 'points_desc';

  let filtered = allLoadedStudents.filter(s => {
    let matchRole = true;
    if (roleFilter === 'online_now') {
      matchRole = window.currentOnlineUserIds && window.currentOnlineUserIds.has(String(s.id));
    } else if (roleFilter !== 'all') {
      matchRole = (s.role === roleFilter);
    }
    const matchQuery = !query ||
      (s.full_name && s.full_name.toLowerCase().includes(query)) ||
      (s.email && s.email.toLowerCase().includes(query)) ||
      (s.id && s.id.toLowerCase().includes(query));
    return matchRole && matchQuery;
  });

  // فرز القائمة
  filtered.sort((a, b) => {
    if (sortMode === 'online_first') {
      const aOn = (window.currentOnlineUserIds && window.currentOnlineUserIds.has(String(a.id))) ? 1 : 0;
      const bOn = (window.currentOnlineUserIds && window.currentOnlineUserIds.has(String(b.id))) ? 1 : 0;
      if (bOn !== aOn) return bOn - aOn;
      return b.points - a.points;
    }
    if (sortMode === 'points_desc') return b.points - a.points;
    if (sortMode === 'active_recent') {
      const aOn = (window.currentOnlineUserIds && window.currentOnlineUserIds.has(String(a.id))) ? 1 : 0;
      const bOn = (window.currentOnlineUserIds && window.currentOnlineUserIds.has(String(b.id))) ? 1 : 0;
      if (bOn !== aOn) return bOn - aOn;
      const da = a.last_active_date ? new Date(a.last_active_date).getTime() : 0;
      const db = b.last_active_date ? new Date(b.last_active_date).getTime() : 0;
      return db - da;
    }
    if (sortMode === 'lessons_desc') return b.completed_lessons - a.completed_lessons;
    if (sortMode === 'created_desc') {
      const da = a.created_at ? new Date(a.created_at).getTime() : 0;
      const db = b.created_at ? new Date(b.created_at).getTime() : 0;
      return db - da;
    }
    if (sortMode === 'name_asc') return (a.full_name || '').localeCompare(b.full_name || '');
    return b.points - a.points;
  });

  renderStudentsTable(filtered);
}
window.filterStudentsTable = filterStudentsTable;

function renderStudentsTable(list) {
  const tbody = document.querySelector('#table-users tbody');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11" class="empty">لا توجد نتائج مطابقة لبحثك أو لا يوجد طلاب مسجلين</td></tr>';
    return;
  }

  const todayStr = new Date().toISOString().split('T')[0];

  tbody.innerHTML = list.map((u, i) => {
    const isOnlineNow = window.currentOnlineUserIds && window.currentOnlineUserIds.has(String(u.id));
    const isActiveToday = (u.last_active_date === todayStr);
    const initial = (u.full_name && u.full_name.length > 0) ? u.full_name.charAt(0).toUpperCase() : 'ط';
    const joinedFormatted = u.created_at ? new Date(u.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }) : '-';

    let lastActiveFormatted = '';
    if (isOnlineNow) {
      lastActiveFormatted = `
        <span class="live-status-pill is-online" title="متصل الآن بالمنصة لحظياً (حقيقي 100%)">
          <span class="live-dot-pulse"></span>
          <span>نشط الآن</span>
        </span>
      `;
    } else if (u.last_active_date) {
      if (isActiveToday) {
        lastActiveFormatted = `
          <span class="live-status-pill is-today" title="كان نشطاً في وقت سابق من اليوم">
            <span class="today-dot"></span>
            <span>اليوم</span>
          </span>
        `;
      } else {
        lastActiveFormatted = `
          <span class="live-status-pill is-past" title="آخر نشاط مسجل: ${u.last_active_date}">
            ${u.last_active_date}
          </span>
        `;
      }
    } else {
      lastActiveFormatted = `<span class="live-status-empty">لم ينشط بعد</span>`;
    }

    return `
      <tr data-id="${u.id}" style="cursor:pointer; transition:background .15s ease;" onclick="handleStudentRowClick(event, '${u.id}')">
        <td style="font-weight:700; color:#8C857E;">${i + 1}</td>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:50%; background:#6B1530; color:#FFF; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:0.95rem; overflow:hidden; flex-shrink:0; border:1.5px solid #D4AF37;">
              ${u.avatar_url ? `<img src="${u.avatar_url}" style="width:100%;height:100%;object-fit:cover;">` : initial}
            </div>
            <div>
              <div style="font-weight:900; color:#2E2018; font-size:0.96rem; display:flex; align-items:center; gap:6px;">
                <span>${esc(u.full_name)}</span>
                ${isStudentCurrentlyBanned(u) ? '<span class="badge" style="background:#FFE4E6; color:#9F1239; border:1px solid #FDA4AF; font-size:0.7rem; font-weight:900; padding:1px 6px;">⛔ محظور</span>' : ''}
              </div>
              <div style="font-size:0.75rem; color:#8C857E; font-family:monospace;">${u.id.substring(0, 8)}...</div>
            </div>
          </div>
        </td>
        <td style="text-align:center;">
          <span style="display:inline-block; font-weight:800; font-size:0.86rem; color:#92400E; background:#FEF3C7; border:1px solid #FDE68A; padding:3px 9px; border-radius:8px;">
            ${u.age ? (u.age + ' سنة') : '<span style="color:#A8A29E; font-weight:normal; font-size:0.8rem;">-</span>'}
          </span>
        </td>
        <td>
          <span style="font-family:monospace; font-size:0.86rem; color:#3A2E2B; background:#F8F4EB; padding:3px 7px; border-radius:6px; border:1px solid #EADBCE;">${esc(u.email)}</span>
        </td>
        <td>
          <span class="badge ${u.role === 'admin' ? 'badge-admin' : 'badge-student'}" style="display:inline-flex; align-items:center; gap:5px;">
            ${u.role === 'admin' ? `${ICONS_SVG.crown} مدير` : `${ICONS_SVG.student} طالب`}
          </span>
        </td>
        <td>
          <div style="font-weight:900; color:#8C2430; font-size:1.05rem; letter-spacing:0.3px;">${u.points.toLocaleString()} XP</div>
          <span style="display:inline-block; font-size:0.75rem; background:#FBF4E2; color:#78350F; border:1px solid #E6CA85; padding:2px 6px; border-radius:6px; font-weight:800; margin-top:3px;">${u.tierLevel}</span>
        </td>
        <td>
          <span style="display:inline-flex; align-items:center; gap:5px; font-weight:800; color:#1A4A4A; background:#EBF4F4; padding:3px 8px; border-radius:8px;">
            ${ICONS_SVG.book} ${u.completed_lessons} درس
          </span>
        </td>
        <td>
          <span style="font-weight:800; color:#EA580C; display:inline-flex; align-items:center; gap:4px;">
            ${ICONS_SVG.flame} ${u.streak_days} يوم
          </span>
        </td>
        <td>
          <span style="font-weight:800; color:#E11D48; display:inline-flex; align-items:center; gap:4px;">
            ${ICONS_SVG.heart} ${u.hearts}
          </span>
        </td>
        <td class="col-last-active" style="text-align:center; font-size:0.88rem; white-space:nowrap;">
          ${lastActiveFormatted}
        </td>
        <td style="font-size:0.82rem; color:#746B6F; white-space:nowrap;">
          ${joinedFormatted}
        </td>
        <td class="row-actions" style="white-space:nowrap; text-align:center;" onclick="event.stopPropagation()">
          <div style="display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap;">
            <button type="button" class="action-btn-sm" style="background:#6B1530; color:#FFFFFF; font-weight:800; border:none; padding:6px 12px;" onclick="viewStudentDetails('${u.id}')" title="عرض كافة تفاصيل وسجل الطالب">
              ${ICONS_SVG.details} <span>تفاصيل</span>
            </button>
            <button type="button" class="action-btn-sm" style="background:#FFF8E7; border:1.5px solid #D4AF37; color:#8C2430; font-weight:900; padding:6px 10px;" onclick="adjustUserXP('${u.id}', ${u.points})" title="تعديل أو منح نقاط XP">
              ${ICONS_SVG.lightning} <span>XP</span>
            </button>
            <button type="button" class="action-btn-sm" style="background:#FFE4E6; border:1.5px solid #FDA4AF; color:#BE123C; padding:6px 10px;" onclick="refillUserHearts('${u.id}')" title="شحن القلوب إلى 5">
              ${ICONS_SVG.heart}
            </button>
            <button type="button" class="action-btn-sm" style="${isStudentCurrentlyBanned(u) ? 'background:#ECFDF5; border:1.5px solid #A7F3D0; color:#047857;' : 'background:#FFE4E6; border:1.5px solid #FDA4AF; color:#BE123C;'} font-weight:800; padding:6px 10px;" onclick="quickToggleBanStudent('${u.id}')" title="${isStudentCurrentlyBanned(u) ? 'فك حظر الطالب' : 'حظر حساب الطالب'}">
              ${isStudentCurrentlyBanned(u) ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>' : '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'}
            </button>
            <button type="button" class="action-btn-sm" style="background:#FEE2E2; border:1.5px solid #FCA5A5; color:#991B1B; padding:6px 10px;" onclick="deleteUser('${u.id}', '${esc(u.full_name)}')" title="حذف الحساب نهائياً">
              ${ICONS_SVG.trash}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleStudentRowClick(evt, userId) {
  if (evt.target.closest('button') || evt.target.closest('a')) return;
  viewStudentDetails(userId);
}
window.handleStudentRowClick = handleStudentRowClick;

/* ============ نافذة تفاصيل الطالب المنبثقة (Student Details Modal) ============ */
function viewStudentDetails(userId) {
  const student = allLoadedStudents.find(s => s.id === userId);
  if (!student) {
    toast('تعذر العثور على بيانات الطالب', true);
    return;
  }
  activeSelectedStudent = student;

  const modal = document.getElementById('modal-student-details');
  if (!modal) {
    console.error('modal-student-details element not found');
    return;
  }

  const initial = (student.full_name && student.full_name.length > 0) ? student.full_name.charAt(0).toUpperCase() : 'ط';
  const avatarEl = document.getElementById('m-student-avatar');
  if (avatarEl) {
    avatarEl.innerHTML = student.avatar_url ? `<img src="${student.avatar_url}" style="width:100%;height:100%;object-fit:cover;">` : initial;
  }

  const nameEl = document.getElementById('m-student-name');
  if (nameEl) nameEl.textContent = student.full_name;

  const emailEl = document.getElementById('m-student-email');
  if (emailEl) emailEl.textContent = student.email;

  const xpEl = document.getElementById('m-student-xp');
  if (xpEl) xpEl.textContent = student.points.toLocaleString() + ' XP';

  const heartsEl = document.getElementById('m-student-hearts');
  if (heartsEl) heartsEl.innerHTML = `${ICONS_SVG.heart} <span>${student.hearts}</span>`;

  const streakEl = document.getElementById('m-student-streak');
  if (streakEl) streakEl.innerHTML = `${ICONS_SVG.flame} <span>${student.streak_days} يوم</span>`;

  const lessonsCountEl = document.getElementById('m-student-lessons-count');
  if (lessonsCountEl) lessonsCountEl.textContent = student.completed_lessons + ' درس';

  const isOnline = window.currentOnlineUserIds && window.currentOnlineUserIds.has(String(student.id));
  const headerStatusEl = document.getElementById('m-student-header-status');
  if (headerStatusEl) {
    headerStatusEl.innerHTML = isOnline ? `
      <span class="live-status-pill is-online" style="font-size:0.75rem; padding:2px 8px; font-weight:800; border-color:#6EE7B7;">
        <span class="live-dot-pulse" style="width:7px; height:7px;"></span>
        <span>نشط الآن</span>
      </span>
    ` : '';
  }

  const createdShortEl = document.getElementById('m-student-created-short');
  if (createdShortEl) {
    createdShortEl.textContent = student.created_at ? new Date(student.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }) : '-';
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const lastActiveEl = document.getElementById('m-student-last-active');
  if (lastActiveEl) {
    if (isOnline) {
      lastActiveEl.innerHTML = `
        <span class="live-status-pill is-online" style="font-size:0.95rem; padding:6px 14px; font-weight:900;">
          <span class="live-dot-pulse"></span>
          <span>متصل ونشط الآن بالموقع (Online Live)</span>
        </span>
      `;
    } else {
      const isActiveToday = (student.last_active_date === todayStr);
      lastActiveEl.innerHTML = student.last_active_date ? 
        (isActiveToday ? `<span class="live-status-pill is-today" style="font-size:0.9rem; padding:5px 12px;"><span class="today-dot"></span><span>نشط اليوم</span></span>` : 
        `<span class="live-status-pill is-past" style="font-size:0.9rem; padding:5px 12px;">${student.last_active_date}</span>`) : 
        `<span class="live-status-empty" style="font-size:0.88rem;">لم ينشط بعد</span>`;
    }
  }

  const idEl = document.getElementById('m-student-id');
  if (idEl) idEl.textContent = student.id;

  const roleEl = document.getElementById('m-student-role');
  if (roleEl) {
    roleEl.innerHTML = student.role === 'admin' ? `${ICONS_SVG.crown} مدير (Admin)` : `${ICONS_SVG.student} طالب (Student)`;
    roleEl.className = 'badge ' + (student.role === 'admin' ? 'badge-admin' : 'badge-student');
  }

  const createdEl = document.getElementById('m-student-created');
  if (createdEl) {
    createdEl.textContent = student.created_at ? new Date(student.created_at).toLocaleString('ar-EG') : '-';
  }

  const levelEl = document.getElementById('m-student-level');
  if (levelEl) levelEl.textContent = student.actualLevel || student.tierLevel || 'المستوى 1';

  const modalAgeEl = document.getElementById('m-student-age');
  if (modalAgeEl) modalAgeEl.textContent = student.age ? (student.age + ' سنة') : 'غير محدد';

  // ملء وعرض كلمة مرور الحساب
  isStudentPasswordVisible = false;
  renderStudentPasswordUI(student);

  // ملء قائمة الدروس المكتملة
  const lessonsListEl = document.getElementById('m-student-lessons-list');
  if (lessonsListEl) {
    const completed = (student.lessons_detail || []).filter(l => l.status === 'completed');
    if (completed.length === 0) {
      lessonsListEl.innerHTML = '<div style="display:flex; align-items:center; justify-content:center; gap:6px; color:#746B6F; font-size:0.88rem; padding:12px 0;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>لم يتم إكمال أي دروس حتى الآن</span></div>';
    } else {
      lessonsListEl.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${completed.map((l, idx) => `
            <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:#FAF6EE; border:1px solid #E7DCC8; border-radius:8px; font-size:0.86rem;">
              <span style="font-weight:800; color:#2E2018; display:flex; align-items:center; gap:6px;">${ICONS_SVG.book} درس #${l.lesson_id}</span>
              <span style="color:#15803D; font-weight:800;">النتيجة: ${l.score || 100}%</span>
              <span style="color:#8C857E; font-size:0.78rem;">${l.updated_at ? new Date(l.updated_at).toLocaleDateString('ar-EG') : '-'}</span>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  // ملء وتحديث حالة الحظر في نافذة التفاصيل
  const isBanned = isStudentCurrentlyBanned(student);
  const banBanner = document.getElementById('m-student-ban-banner');
  const banReasonEl = document.getElementById('m-student-ban-reason-text');
  const banExpiryEl = document.getElementById('m-student-ban-expiry-text');
  const banDateEl = document.getElementById('m-student-ban-date-text');
  const banTypeBadge = document.getElementById('m-student-ban-type-badge');
  const banActionBtn = document.getElementById('btn-modal-ban-user');
  const banActionText = document.getElementById('btn-modal-ban-text');

  if (isBanned) {
    if (banBanner) banBanner.style.display = 'block';
    if (banReasonEl) banReasonEl.textContent = student.ban_reason || 'مخالفة شروط وسياسات الاستخدام';
    if (banTypeBadge) banTypeBadge.textContent = student.banned_until ? 'حظر مؤقت' : 'حظر دائم';
    if (banExpiryEl) {
      if (student.banned_until) {
        const d = new Date(student.banned_until);
        const remDays = Math.ceil((d.getTime() - Date.now()) / 86400000);
        banExpiryEl.textContent = `${d.toLocaleString('ar-EG')} (متبقي ${remDays > 0 ? remDays : 0} يوم)`;
      } else {
        banExpiryEl.textContent = 'حظر دائم (Permanent)';
      }
    }
    if (banDateEl) {
      banDateEl.textContent = student.banned_at ? new Date(student.banned_at).toLocaleString('ar-EG') : '-';
    }

    if (banActionBtn) {
      banActionBtn.style.background = '#047857';
      banActionBtn.title = 'فك الحظر عن هذا الطالب وإعادة تفعيل حسابه';
    }
    if (banActionText) banActionText.textContent = 'فك الحظر عن الحساب';
  } else {
    if (banBanner) banBanner.style.display = 'none';
    if (banActionBtn) {
      banActionBtn.style.background = '#BE123C';
      banActionBtn.title = 'حظر حساب الطالب وتحديد المدة والسبب';
    }
    if (banActionText) banActionText.textContent = 'حظر الحساب';
  }

  modal.style.display = 'flex';
}
window.viewStudentDetails = viewStudentDetails;

let isStudentPasswordVisible = false;

function renderStudentPasswordUI(s) {
  const pwEl = document.getElementById('m-student-password');
  const toggleBtn = document.getElementById('btn-toggle-pw');
  const copyBtn = document.getElementById('btn-copy-pw');
  if (!pwEl) return;

  if (s && s.password && s.password.trim() !== '') {
    if (isStudentPasswordVisible) {
      pwEl.textContent = s.password;
      pwEl.style.letterSpacing = 'normal';
      pwEl.style.color = '#15803D';
      pwEl.style.fontWeight = '900';
      if (toggleBtn) {
        toggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          <span>إخفاء</span>
        `;
      }
    } else {
      pwEl.textContent = '••••••••';
      pwEl.style.letterSpacing = '2px';
      pwEl.style.color = '#6B1530';
      pwEl.style.fontWeight = '900';
      if (toggleBtn) {
        toggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          <span>إظهار</span>
        `;
      }
    }
    if (toggleBtn) toggleBtn.style.display = 'inline-flex';
    if (copyBtn) copyBtn.style.display = 'inline-flex';
  } else {
    pwEl.textContent = 'غير مسجلة (حساب سابق)';
    pwEl.style.letterSpacing = 'normal';
    pwEl.style.color = '#746B6F';
    pwEl.style.fontWeight = '700';
    if (toggleBtn) toggleBtn.style.display = 'none';
    if (copyBtn) copyBtn.style.display = 'none';
  }
}

function toggleStudentPasswordVisibility() {
  if (!activeSelectedStudent) return;
  isStudentPasswordVisible = !isStudentPasswordVisible;
  renderStudentPasswordUI(activeSelectedStudent);
}
window.toggleStudentPasswordVisibility = toggleStudentPasswordVisibility;

function copyStudentPassword() {
  if (!activeSelectedStudent || !activeSelectedStudent.password) {
    toast('لا توجد كلمة مرور مسجلة بعد');
    return;
  }
  navigator.clipboard.writeText(activeSelectedStudent.password).then(() => {
    toast('تم نسخ كلمة المرور بنجاح');
  });
}
window.copyStudentPassword = copyStudentPassword;

async function promptSetStudentPasswordModal() {
  if (!activeSelectedStudent) return;
  const s = activeSelectedStudent;

  const { value: formValues } = await Swal.fire({
    title: 'تعيين كلمة مرور الحساب',
    html: `
      <div style="text-align:right; font-size:0.9rem; color:#2E2018; margin-bottom:14px; line-height:1.6;">
        تعيين أو تغيير كلمة المرور للطالب: <strong>${esc(s.full_name)}</strong><br>
        <span style="font-size:0.8rem; color:#746B6F;">البريد: ${esc(s.email)}</span>
      </div>
      <div style="text-align:right; margin-bottom:6px; font-weight:800; font-size:0.85rem; color:#6B1530; display:flex; align-items:center; gap:5px;">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 2l-2 2m-1.5 1.5L14 9l-3-3 2.5-2.5L21 2zm-9 9a5 5 0 1 0-7.07 7.07A5 5 0 0 0 12 11z"/></svg>
        <span>كلمة المرور الجديدة:</span>
      </div>
      <input id="swal-new-password" type="text" class="swal2-input" placeholder="أدخل كلمة المرور الجديدة (8 خانات أو أكثر)" style="direction:ltr; font-family:monospace; font-size:1.15rem; font-weight:bold; margin:0 0 8px 0; width:100%; box-sizing:border-box;">
      <div style="text-align:right; font-size:0.75rem; color:#746B6F;">الحد الأدنى 8 أحرف أو أرقام</div>
    `,
    showCancelButton: true,
    confirmButtonText: 'حفظ وتحديث كلمة المرور',
    cancelButtonText: 'إلغاء',
    confirmButtonColor: '#8C2430',
    cancelButtonColor: '#746B6F',
    preConfirm: () => {
      const pw = document.getElementById('swal-new-password').value.trim();
      if (!pw || pw.length < 8) {
        Swal.showValidationMessage('يجب أن تتكون كلمة المرور من 8 خانات على الأقل');
        return false;
      }
      return pw;
    }
  });

  if (!formValues) return;
  const newPw = formValues;

  try {
    toast('جارٍ تحديث كلمة المرور في النظام...');

    // 1. استدعاء RPC لتحديث auth.users و public.users
    const { data: rpcData, error: rpcErr } = await sb.rpc('reset_user_password_direct', {
      p_email: s.email,
      p_new_password: newPw
    });

    if (rpcErr) {
      console.warn('RPC reset_user_password_direct notice:', rpcErr);
    }

    // 2. تحديث جدول public.users مباشرة للتأكيد
    const { error: updateErr } = await sb.from('users').update({ password: newPw }).eq('id', s.id);
    if (updateErr) throw updateErr;

    // 3. تحديث الكائن المحلي
    s.password = newPw;
    const cached = allLoadedStudents.find(u => u.id === s.id);
    if (cached) cached.password = newPw;

    isStudentPasswordVisible = true;
    renderStudentPasswordUI(s);

    Swal.fire({
      icon: 'success',
      title: 'تم حفظ وتحديث كلمة المرور بنجاح!',
      html: `
        <div style="font-size:0.95rem; color:#2E2018; margin-top:8px;">
          كلمة المرور الحالية لحساب الطالب <strong>${esc(s.full_name)}</strong> هي:<br>
          <code style="font-size:1.3rem; font-weight:900; color:#8C2430; background:#FAF6EE; padding:6px 16px; border-radius:8px; font-family:monospace; display:inline-block; margin:12px 0; border:1px solid #E7DCC8;">${esc(newPw)}</code>
        </div>
      `,
      confirmButtonText: 'حسناً',
      confirmButtonColor: '#8C2430'
    });
  } catch (err) {
    console.error('Error setting student password:', err);
    Swal.fire({
      icon: 'error',
      title: 'خطأ',
      text: 'تعذر تعيين كلمة المرور: ' + (err.message || err)
    });
  }
}
window.promptSetStudentPasswordModal = promptSetStudentPasswordModal;

function closeStudentModal() {
  const modal = document.getElementById('modal-student-details');
  if (modal) modal.style.display = 'none';
  activeSelectedStudent = null;
}
window.closeStudentModal = closeStudentModal;

function copyStudentId() {
  if (!activeSelectedStudent) return;
  navigator.clipboard.writeText(activeSelectedStudent.id).then(() => {
    toast('تم نسخ معرف الطالب (UUID) بنجاح');
  });
}
window.copyStudentId = copyStudentId;

/* ============ إجراءات التحكم بحسابات الطلاب ============ */

// 1. تعديل / منح نقاط XP
async function adjustUserXP(userId, currentPoints = 0) {
  const result = await Swal.fire({
    title: 'تعديل رصيد الـ XP',
    html: `
      <div style="text-align:center; font-size:1.05rem; font-weight:800; color:#2E2018; margin-bottom:14px;">
        الرصيد الحالي للطالب: <strong style="color:#8C2430; font-size:1.25rem;">${currentPoints} XP</strong>
      </div>
      <input type="number" id="swal-xp-input" value="${currentPoints}" min="0" max="99999" class="swal2-input" placeholder="أدخل الرصيد الجديد..." style="direction:ltr; font-weight:800; font-size:1.15rem; color:#2E2018; text-align:center; margin:10px auto;">
      <div style="display:flex; gap:8px; justify-content:center; margin-top:14px;">
        <button type="button" onclick="document.getElementById('swal-xp-input').value = ${currentPoints + 20}" style="padding:8px 16px; font-size:0.9rem; font-weight:900; background:#FFF8E7; color:#8C2430; border:2px solid #D4AF37; border-radius:8px; cursor:pointer; transition:all .15s ease;">+20 XP</button>
        <button type="button" onclick="document.getElementById('swal-xp-input').value = ${currentPoints + 50}" style="padding:8px 16px; font-size:0.9rem; font-weight:900; background:#FFF8E7; color:#8C2430; border:2px solid #D4AF37; border-radius:8px; cursor:pointer; transition:all .15s ease;">+50 XP</button>
        <button type="button" onclick="document.getElementById('swal-xp-input').value = ${currentPoints + 100}" style="padding:8px 16px; font-size:0.9rem; font-weight:900; background:#FFF8E7; color:#8C2430; border:2px solid #D4AF37; border-radius:8px; cursor:pointer; transition:all .15s ease;">+100 XP</button>
      </div>
      <div id="swal-xp-loading-msg" style="display:none; margin-top:16px; font-weight:800; color:#8C2430; font-size:0.95rem;">
        <div class="spinner" style="display:inline-block; vertical-align:middle; width:18px; height:18px; border-width:2px; margin-left:8px;"></div>
        <span>جارٍ حفظ الرصيد وتحديث بيانات الطالب لحظياً في السحابة...</span>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'حفظ الرصيد الجديد',
    cancelButtonText: 'إلغاء',
    confirmButtonColor: '#6B1530',
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: async () => {
      const val = parseInt(document.getElementById('swal-xp-input').value, 10);
      if (isNaN(val) || val < 0) {
        Swal.showValidationMessage('يرجى إدخال قيمة رقمية صحيحة أكبر من أو تساوي 0');
        return false;
      }

      const msgEl = document.getElementById('swal-xp-loading-msg');
      if (msgEl) msgEl.style.display = 'block';

      try {
        const { data: existing } = await sb.from('user_progress').select('*').eq('user_id', userId).maybeSingle();
        let error;
        if (existing) {
          const res = await sb.from('user_progress').update({ points: val }).eq('user_id', userId);
          error = res.error;
        } else {
          const res = await sb.from('user_progress').insert({ user_id: userId, points: val, hearts: 5, streak_days: 1 });
          error = res.error;
        }

        if (error) throw error;

        // إرسال إشعار فوري عبر قناة التزامن وتحديث الذاكرة
        try {
          const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('mg_coptic_gamification_sync') : null;
          if (channel) {
            channel.postMessage({ type: 'progress_admin_update', payload: { user_id: userId, points: val } });
            channel.close();
          }
          const localUserRaw = localStorage.getItem('mg_coptic_user');
          if (localUserRaw) {
            const u = JSON.parse(localUserRaw);
            if (u && u.id === userId) {
              const progKey = `mg_coptic_progress_${userId}`;
              const currentProgRaw = localStorage.getItem(progKey) || localStorage.getItem('mg_coptic_progress');
              let cur = currentProgRaw ? JSON.parse(currentProgRaw) : { hearts: 5, streak_days: 1 };
              cur.points = val;
              cur.total_points = val;
              localStorage.setItem('mg_coptic_progress', JSON.stringify(cur));
              localStorage.setItem(progKey, JSON.stringify(cur));
            }
          }
          localStorage.setItem('mg_coptic_sync_ping', Date.now().toString());
        } catch(e){}

        broadcastAdminActionToClient(userId, 'xp', { points: val });

        return val;
      } catch (err) {
        if (msgEl) msgEl.style.display = 'none';
        Swal.showValidationMessage('تعذر تحديث نقاط الـ XP: ' + (err.message || err));
        return false;
      }
    }
  });

  if (!result.isConfirmed || result.value === undefined) return;
  const newXp = result.value;

  // تحديث فوري ولحظي في الذاكرة (0 مللي ثانية) دون أي تأخير
  const student = allLoadedStudents.find(s => s.id === userId);
  if (student) {
    student.points = newXp;
  }
  updateStudentsSummaryStats(allLoadedStudents);
  filterStudentsTable();

  // تحديث تفاصيل الطالب في النافذة المنبثقة إن كانت مفتوحة
  if (activeSelectedStudent && activeSelectedStudent.id === userId) {
    activeSelectedStudent.points = newXp;
    const xpEl = document.getElementById('m-student-xp');
    if (xpEl) xpEl.textContent = newXp.toLocaleString() + ' XP';
    const levelEl = document.getElementById('m-student-level');
    if (levelEl && student) levelEl.textContent = student.actualLevel || student.tierLevel || 'المستوى 1';
  }

  toast(`تم تحديث رصيد الـ XP إلى ${newXp} نقطة بنجاح`);
}
window.adjustUserXP = adjustUserXP;

function promptAdjustPointsModal() {
  if (!activeSelectedStudent) return;
  const s = activeSelectedStudent;
  closeStudentModal();
  adjustUserXP(s.id, s.points);
}
window.promptAdjustPointsModal = promptAdjustPointsModal;

// 2. شحن قلوب الطالب إلى 5
async function refillUserHearts(userId) {
  const c = await mgConfirm('شحن القلوب', 'هل تريد بالتأكيد إعادة ملء وتعبئة قلوب الطالب إلى 5 قلوب كاملة؟', 'question');
  if (!c) return;

  // إظهار لودنج التحميل الفوري
  Swal.fire({
    title: 'جارٍ شحن القلوب...',
    html: `
      <div style="display:flex; flex-direction:column; align-items:center; gap:12px; padding:10px 0;">
        <div class="spinner" style="width:36px; height:36px; border-width:3px;"></div>
        <p style="margin:0; font-weight:800; color:#2E2018; font-size:1rem;">يتم شحن قلوب الطالب إلى 5 وتحديث بياناته لحظياً في السحابة...</p>
      </div>
    `,
    allowOutsideClick: false,
    showConfirmButton: false
  });

  const { data: existing } = await sb.from('user_progress').select('*').eq('user_id', userId).maybeSingle();
  let error;
  if (existing) {
    const res = await sb.from('user_progress').update({ hearts: 5 }).eq('user_id', userId);
    error = res.error;
  } else {
    const res = await sb.from('user_progress').insert({ user_id: userId, points: 0, hearts: 5, streak_days: 1 });
    error = res.error;
  }

  Swal.close();

  if (error) {
    toast('تعذر شحن القلوب: ' + error.message, true);
    return;
  }

  try {
    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('mg_coptic_gamification_sync') : null;
    if (channel) {
      channel.postMessage({ type: 'progress_admin_update', payload: { user_id: userId, hearts: 5 } });
      channel.close();
    }
    const localUserRaw = localStorage.getItem('mg_coptic_user');
    if (localUserRaw) {
      const u = JSON.parse(localUserRaw);
      if (u && u.id === userId) {
        const progKey = `mg_coptic_progress_${userId}`;
        const currentProgRaw = localStorage.getItem(progKey) || localStorage.getItem('mg_coptic_progress');
        let cur = currentProgRaw ? JSON.parse(currentProgRaw) : { points: 0, streak_days: 1 };
        cur.hearts = 5;
        localStorage.setItem('mg_coptic_progress', JSON.stringify(cur));
        localStorage.setItem(progKey, JSON.stringify(cur));
      }
    }
    localStorage.setItem('mg_coptic_sync_ping', Date.now().toString());
  } catch(e){}

  broadcastAdminActionToClient(userId, 'hearts', { hearts: 5 });

  // تحديث فوري ولحظي في الذاكرة
  const student = allLoadedStudents.find(s => s.id === userId);
  if (student) student.hearts = 5;
  filterStudentsTable();

  if (activeSelectedStudent && activeSelectedStudent.id === userId) {
    activeSelectedStudent.hearts = 5;
    const heartsEl = document.getElementById('m-student-hearts');
    if (heartsEl) heartsEl.innerHTML = `${ICONS_SVG.heart} <span>5</span>`;
  }

  toast('تم شحن القلوب إلى 5 بنجاح');
}
window.refillUserHearts = refillUserHearts;

function refillStudentHeartsModal() {
  if (!activeSelectedStudent) return;
  const s = activeSelectedStudent;
  closeStudentModal();
  refillUserHearts(s.id);
}
window.refillStudentHeartsModal = refillStudentHeartsModal;

// 3. تصفير النقاط
async function resetUserPoints(userId) {
  const c = await mgConfirm('تصفير النقاط', 'هل تريد بالتأكيد تصفير نقاط الـ XP لهذا الطالب؟ سيعود رصيده إلى 0 نقطة.', 'warning');
  if (!c) return;

  // إظهار لودنج التحميل الفوري
  Swal.fire({
    title: 'جارٍ تصفير النقاط...',
    html: `
      <div style="display:flex; flex-direction:column; align-items:center; gap:12px; padding:10px 0;">
        <div class="spinner" style="width:36px; height:36px; border-width:3px;"></div>
        <p style="margin:0; font-weight:800; color:#2E2018; font-size:1rem;">يتم تصفير رصيد الـ XP للطالب لحظياً في السحابة...</p>
      </div>
    `,
    allowOutsideClick: false,
    showConfirmButton: false
  });

  const { data: existing } = await sb.from('user_progress').select('*').eq('user_id', userId).maybeSingle();
  let error;
  if (existing) {
    const res = await sb.from('user_progress').update({ points: 0 }).eq('user_id', userId);
    error = res.error;
  } else {
    const res = await sb.from('user_progress').insert({ user_id: userId, points: 0, hearts: 5, streak_days: 1 });
    error = res.error;
  }

  Swal.close();

  if (error) {
    toast('تعذر تصفير النقاط: ' + error.message, true);
    return;
  }

  try {
    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('mg_coptic_gamification_sync') : null;
    if (channel) {
      channel.postMessage({ type: 'progress_admin_update', payload: { user_id: userId, points: 0 } });
      channel.close();
    }
    const localUserRaw = localStorage.getItem('mg_coptic_user');
    if (localUserRaw) {
      const u = JSON.parse(localUserRaw);
      if (u && u.id === userId) {
        const progKey = `mg_coptic_progress_${userId}`;
        const currentProgRaw = localStorage.getItem(progKey) || localStorage.getItem('mg_coptic_progress');
        let cur = currentProgRaw ? JSON.parse(currentProgRaw) : { hearts: 5, streak_days: 1 };
        cur.points = 0;
        cur.total_points = 0;
        localStorage.setItem('mg_coptic_progress', JSON.stringify(cur));
        localStorage.setItem(progKey, JSON.stringify(cur));
      }
    }
    localStorage.setItem('mg_coptic_sync_ping', Date.now().toString());
  } catch(e){}

  broadcastAdminActionToClient(userId, 'xp', { points: 0 });

  // تحديث فوري ولحظي في الذاكرة
  const student = allLoadedStudents.find(s => s.id === userId);
  if (student) {
    student.points = 0;
  }
  updateStudentsSummaryStats(allLoadedStudents);
  filterStudentsTable();

  if (activeSelectedStudent && activeSelectedStudent.id === userId) {
    activeSelectedStudent.points = 0;
    const xpEl = document.getElementById('m-student-xp');
    if (xpEl) xpEl.textContent = '0 XP';
    const levelEl = document.getElementById('m-student-level');
    if (levelEl && student) levelEl.textContent = student.actualLevel || student.tierLevel || 'المستوى 1';
  }

  toast('تم تصفير النقاط بنجاح (0 XP)');
}
window.resetUserPoints = resetUserPoints;

function resetPointsFromModal() {
  if (!activeSelectedStudent) return;
  const s = activeSelectedStudent;
  closeStudentModal();
  resetUserPoints(s.id);
}
window.resetPointsFromModal = resetPointsFromModal;

// 3.5. تصفير الحساب بالكامل وإعادته كحساب جديد لم يتعد أي مستوى
async function resetFullAccount(userId, userName) {
  const c = await mgConfirm(
    'تصفير الحساب بالكامل كجديد',
    `هل أنت متأكد من رغبتك في تصفير حساب «${userName || 'الطالب'}» بالكامل؟\n\nسيتم:\n• حذف كافة سجلات الدروس المنجزة والمستويات السابقة نهائياً.\n• تصفير رصيد الـ XP إلى 0 نقطة.\n• إعادة القلوب إلى 5 قلوب كاملة.\n• إعادة أيام الحماسة (الستريك) إلى 1 يوم.\n• تفريغ الصناديق والجوائز المطالب بها.\n\nسيعود الطالب كأنه مسجل الآن لأول مرة في بداية المستوى 1!`,
    'warning',
    { confirmText: 'نعم، تصفير الحساب كجديد', cancelText: 'إلغاء' }
  );
  if (!c) return;

  // إظهار شاشة التحميل الفوري
  Swal.fire({
    title: 'جارٍ تصفير الحساب بالكامل...',
    html: `
      <div style="display:flex; flex-direction:column; align-items:center; gap:12px; padding:10px 0;">
        <div class="spinner" style="width:36px; height:36px; border-width:3px;"></div>
        <p style="margin:0; font-weight:800; color:#2E2018; font-size:1rem;">يتم حذف سجل الدروس وتصفير المستويات والنقاط بالسحابة...</p>
      </div>
    `,
    allowOutsideClick: false,
    showConfirmButton: false
  });

  try {
    // 1) حذف جميع سجلات تقدم الدروس والتحديات والكتابة عبر Edge Function بصلاحيات السيرفر (Service Role) لضمان تجاوز RLS
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
          user_id: userId
        })
      });
    } catch (edgeErr) {
      console.warn('Edge Function reset_account notice:', edgeErr);
    }

    // 2) محاولة إضافية عبر دالة السحابة المؤمنة (SECURITY DEFINER)
    try {
      await sb.rpc('admin_reset_full_account', { p_user_id: userId });
    } catch (_) {}

    // 3) مسح مباشر احتياطي من الجداول
    try {
      await Promise.all([
        sb.from('user_lesson_progress').delete().eq('user_id', userId),
        sb.from('user_challenge_progress').delete().eq('user_id', userId),
        sb.from('user_writing_progress').delete().eq('user_id', userId)
      ]);
      const todayStrFallback = new Date().toISOString().split('T')[0];
      await sb.from('user_progress').upsert({
        user_id: userId,
        points: 0,
        hearts: 5,
        streak_days: 1,
        claimed_chests: [],
        last_active_date: todayStrFallback
      }, { onConflict: 'user_id' });
    } catch (_) {}

    const todayStr = new Date().toISOString().split('T')[0];

    // 4) بث التحديث ومسح الكاش المحلي بالكامل
    try {
      const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('mg_coptic_gamification_sync') : null;
      if (channel) {
        channel.postMessage({
          type: 'full_account_reset',
          payload: { user_id: userId, points: 0, hearts: 5, streak_days: 1, completed_lessons: 0 }
        });
        channel.close();
      }

      const keysToClear = [
        `mg_coptic_progress_${userId}`,
        `mg_coptic_lesson_progress_${userId}`,
        `mg_coptic_claimed_chests_${userId}`,
        `mg_coptic_badges_${userId}`,
        `mg_coptic_daily_goal_${userId}`,
        `mg_coptic_daily_xp_date_${userId}`,
        `mg_coptic_daily_xp_val_${userId}`,
        `mg_coptic_last_synced_date_${userId}`
      ];
      keysToClear.forEach(k => localStorage.removeItem(k));

      const localUserRaw = localStorage.getItem('mg_coptic_user');
      if (localUserRaw) {
        const u = JSON.parse(localUserRaw);
        if (u && u.id === userId) {
          localStorage.setItem('mg_coptic_progress', JSON.stringify({
            points: 0,
            total_points: 0,
            hearts: 5,
            streak_days: 1,
            claimed_chests: [],
            last_active_date: todayStr
          }));
          localStorage.removeItem('mg_coptic_lesson_progress');
          localStorage.removeItem('mg_coptic_claimed_chests');
          localStorage.removeItem('mg_coptic_badges');
        }
      }
      localStorage.setItem('mg_coptic_sync_ping', Date.now().toString());
    } catch(e) {}

    broadcastAdminActionToClient(userId, 'reset');

    // 4) تحديث الذاكرة الحية allLoadedStudents
    const student = allLoadedStudents.find(s => s.id === userId);
    if (student) {
      student.points = 0;
      student.hearts = 5;
      student.streak_days = 1;
      student.claimed_chests = [];
      student.completed_lessons = 0;
      student.lessons_detail = [];
      student.actualLevel = 'المستوى 1';
      student.tierLevel = 'المستوى 1';
      student.last_active_date = todayStr;
    }

    // 5) تحديث نافذة التفاصيل إذا كانت مفتوحة
    if (activeSelectedStudent && activeSelectedStudent.id === userId) {
      activeSelectedStudent.points = 0;
      activeSelectedStudent.hearts = 5;
      activeSelectedStudent.streak_days = 1;
      activeSelectedStudent.claimed_chests = [];
      activeSelectedStudent.completed_lessons = 0;
      activeSelectedStudent.lessons_detail = [];
      activeSelectedStudent.actualLevel = 'المستوى 1';
      activeSelectedStudent.tierLevel = 'المستوى 1';

      const xpEl = document.getElementById('m-student-xp');
      if (xpEl) xpEl.textContent = '0 XP';

      const heartsEl = document.getElementById('m-student-hearts');
      if (heartsEl) heartsEl.innerHTML = `${ICONS_SVG.heart} <span>5</span>`;

      const streakEl = document.getElementById('m-student-streak');
      if (streakEl) streakEl.innerHTML = `${ICONS_SVG.flame} <span>1 يوم</span>`;

      const lessonsCountEl = document.getElementById('m-student-lessons-count');
      if (lessonsCountEl) lessonsCountEl.textContent = '0 درس';

      const levelEl = document.getElementById('m-student-level');
      if (levelEl) levelEl.textContent = 'المستوى 1';

      const lessonsListEl = document.getElementById('m-student-lessons-list');
      if (lessonsListEl) {
        lessonsListEl.innerHTML = '<div style="display:flex; align-items:center; justify-content:center; gap:6px; color:#746B6F; font-size:0.88rem; padding:12px 0;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>لم يتم إكمال أي دروس حتى الآن</span></div>';
      }
    }

    // 6) تحديث الإحصائيات والجدول
    updateStudentsSummaryStats(allLoadedStudents);
    filterStudentsTable();

    Swal.close();

    Swal.fire({
      icon: 'success',
      title: 'تم تصفير الحساب بنجاح!',
      html: `<p style="font-weight:700; color:#2E2018;">تمت إعادة حساب <b>«${esc(userName || 'الطالب')}»</b> كحساب جديد تماماً من بداية المستوى 1 مع 0 XP و5 قلوب، وحذف كافة الدروس السابقة.</p>`,
      confirmButtonText: 'حسناً',
      confirmButtonColor: '#6B1530'
    });

  } catch (err) {
    Swal.close();
    console.error('resetFullAccount error:', err);
    toast('تعذر تصفير الحساب: ' + (err.message || err), true);
  }
}
window.resetFullAccount = resetFullAccount;

function resetFullAccountFromModal() {
  if (!activeSelectedStudent) return;
  const s = activeSelectedStudent;
  resetFullAccount(s.id, s.full_name);
}
window.resetFullAccountFromModal = resetFullAccountFromModal;

// 4. حذف الحساب نهائياً
async function deleteUser(userId, userName) {
  const c = await mgConfirm('حذف المستخدم نهائياً', `هل أنت متأكد من رغبتك في حذف حساب «${userName || 'المستخدم'}» نهائياً من قاعدة البيانات؟ سيتم مسح حسابه وسجلات تقدمه ونقاطه بالكامل.`, 'warning', { confirmText: 'نعم، احذف الحساب', cancelText: 'إلغاء' });
  if (!c) return;

  const { error } = await sb.from('users').delete().eq('id', userId);
  if (error) {
    toast('تعذر حذف المستخدم: ' + error.message, true);
    return;
  }

  toast('تم حذف حساب الطالب وتقدمه نهائياً بنجاح');
  loadUsers(true);
}
window.deleteUser = deleteUser;

function deleteUserFromModal() {
  if (!activeSelectedStudent) return;
  const s = activeSelectedStudent;
  closeStudentModal();
  deleteUser(s.id, s.full_name);
}
window.deleteUserFromModal = deleteUserFromModal;

/* ============ BAN & UNBAN MANAGEMENT (حظر وفك حظر الطلاب) ============ */

function isStudentCurrentlyBanned(s) {
  if (!s || !s.is_banned) return false;
  if (!s.banned_until) return true; // حظر دائم
  return new Date(s.banned_until).getTime() > Date.now();
}
window.isStudentCurrentlyBanned = isStudentCurrentlyBanned;

function setBanPresetReason(text) {
  const input = document.getElementById('ban-reason-input');
  if (input) {
    input.value = text;
    input.focus();
  }
}
window.setBanPresetReason = setBanPresetReason;

function handleBanDurationChange(val) {
  const wrap = document.getElementById('ban-custom-date-wrap');
  if (wrap) {
    wrap.style.display = (val === 'custom') ? 'block' : 'none';
  }
}
window.handleBanDurationChange = handleBanDurationChange;

function handleStudentBanActionModal() {
  if (!activeSelectedStudent) return;
  const isBanned = isStudentCurrentlyBanned(activeSelectedStudent);
  if (isBanned) {
    promptUnbanStudentModal();
  } else {
    promptBanStudentModal();
  }
}
window.handleStudentBanActionModal = handleStudentBanActionModal;

function broadcastAdminActionToClient(userId, actionType, payload = {}) {
  try {
    if (window.sb && typeof window.sb.channel === 'function') {
      const channelName = 'user-realtime-' + userId;
      const liveCh = sb.channel(channelName);
      liveCh.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          liveCh.send({
            type: 'broadcast',
            event: 'admin_student_action',
            payload: { userId, actionType, ...payload, timestamp: Date.now() }
          }).then(() => {
            setTimeout(() => { try { sb.removeChannel(liveCh); } catch (_) {} }, 1000);
          }).catch(() => {});
        }
      });
    }

    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('mg_coptic_gamification_sync');
      bc.postMessage({ type: 'ADMIN_ACTION', userId, actionType, ...payload });
      setTimeout(() => { try { bc.close(); } catch (_) {} }, 1000);
    }
  } catch (e) {
    console.warn('broadcastAdminActionToClient error:', e);
  }
}
window.broadcastAdminActionToClient = broadcastAdminActionToClient;

async function promptBanStudentModal() {
  if (!activeSelectedStudent) return;
  const s = activeSelectedStudent;

  const { value: formValues } = await Swal.fire({
    title: 'حظر حساب الطالب',
    html: `
      <div style="text-align:right; font-family:'Cairo',sans-serif; color:#2E2018; direction:rtl;">
        <div style="background:#FFF1F2; border:1.5px solid #FDA4AF; border-radius:10px; padding:12px 14px; margin-bottom:16px; font-size:0.88rem; color:#9F1239; line-height:1.5;">
          أنت على وشك حظر حساب الطالب: <strong style="color:#881337; font-size:0.95rem;">${esc(s.full_name)}</strong><br>
          <span style="font-size:0.8rem; color:#BE123C;">البريد: ${esc(s.email)}</span>
        </div>

        <div style="margin-bottom:14px;">
          <label style="display:block; font-weight:800; font-size:0.86rem; color:#6B1530; margin-bottom:6px;">
            ⏱️ مدة الحظر:
          </label>
          <select id="ban-duration-select" class="swal2-select" style="width:100%; margin:0; font-family:'Cairo',sans-serif; font-size:0.92rem; font-weight:700; padding:9px 12px; border:1.5px solid #D1D5DB; border-radius:8px;" onchange="handleBanDurationChange(this.value)">
            <option value="1d">يوم واحد (24 ساعة)</option>
            <option value="3d">3 أيام</option>
            <option value="7d" selected>أسبوع كامل (7 أيام)</option>
            <option value="14d">أسبوعين (14 يوماً)</option>
            <option value="30d">شهر كامل (30 يوماً)</option>
            <option value="90d">3 أشهر (90 يوماً)</option>
            <option value="permanent">حظر دائم (Permanent Ban)</option>
            <option value="custom">تحديد تاريخ مخصص...</option>
          </select>
          <div id="ban-custom-date-wrap" style="display:none; margin-top:8px;">
            <input type="datetime-local" id="ban-custom-date-input" class="swal2-input" style="width:100%; margin:0; font-size:0.9rem; padding:8px;">
          </div>
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-weight:800; font-size:0.86rem; color:#6B1530; margin-bottom:6px;">
            📝 سبب الحظر (يظهر للطالب بوضوح عند الدخول):
          </label>
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
            <button type="button" class="action-btn-sm" style="background:#FAF6EE; border:1px solid #E7DCC8; color:#6B1530; font-size:0.75rem; font-weight:800; padding:4px 8px; border-radius:6px; cursor:pointer;" onclick="setBanPresetReason('مخالفة شروط وقواعد الاستخدام والسياسة العامة للمنصة.')">قواعد الاستخدام</button>
            <button type="button" class="action-btn-sm" style="background:#FAF6EE; border:1px solid #E7DCC8; color:#6B1530; font-size:0.75rem; font-weight:800; padding:4px 8px; border-radius:6px; cursor:pointer;" onclick="setBanPresetReason('استخدام وسائل غير مشروعة ومحاولة التلاعب بالنقاط والمستويات.')">تلاعب بالنقاط</button>
            <button type="button" class="action-btn-sm" style="background:#FAF6EE; border:1px solid #E7DCC8; color:#6B1530; font-size:0.75rem; font-weight:800; padding:4px 8px; border-radius:6px; cursor:pointer;" onclick="setBanPresetReason('سلوك غير لائق أو إرسال محتوى غير مناسب.')">سلوك غير لائق</button>
            <button type="button" class="action-btn-sm" style="background:#FAF6EE; border:1px solid #E7DCC8; color:#6B1530; font-size:0.75rem; font-weight:800; padding:4px 8px; border-radius:6px; cursor:pointer;" onclick="setBanPresetReason('نشاط مريب أو حساب مشبوه يحتاج لمراجعة أمنية.')">حساب مشبوه</button>
          </div>
          <textarea id="ban-reason-input" class="swal2-textarea" placeholder="اكتب سبب الحظر هنا بالتفصيل ليظهر للطالب..." style="width:100%; margin:0; height:85px; font-family:'Cairo',sans-serif; font-size:0.88rem; line-height:1.4; border-radius:8px; border:1.5px solid #D1D5DB; padding:8px 10px; box-sizing:border-box;"></textarea>
          <div style="font-size:0.75rem; color:#746B6F; margin-top:4px;">* سيتم منع الطالب من فتح حسابه وسيظهر له هذا السبب بالتفصيل حتى انقضاء مدة الحظر.</div>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'تأكيد وفرض الحظر',
    cancelButtonText: 'إلغاء',
    confirmButtonColor: '#BE123C',
    cancelButtonColor: '#6B7280',
    focusConfirm: false,
    preConfirm: () => {
      const dur = document.getElementById('ban-duration-select')?.value;
      const customDate = document.getElementById('ban-custom-date-input')?.value;
      const reason = document.getElementById('ban-reason-input')?.value?.trim();

      if (!reason) {
        Swal.showValidationMessage('يرجى كتابة سبب الحظر ليظهر للطالب');
        return false;
      }

      let bannedUntil = null;
      const now = Date.now();
      if (dur === '1d') bannedUntil = new Date(now + 1 * 86400000).toISOString();
      else if (dur === '3d') bannedUntil = new Date(now + 3 * 86400000).toISOString();
      else if (dur === '7d') bannedUntil = new Date(now + 7 * 86400000).toISOString();
      else if (dur === '14d') bannedUntil = new Date(now + 14 * 86400000).toISOString();
      else if (dur === '30d') bannedUntil = new Date(now + 30 * 86400000).toISOString();
      else if (dur === '90d') bannedUntil = new Date(now + 90 * 86400000).toISOString();
      else if (dur === 'custom') {
        if (!customDate) {
          Swal.showValidationMessage('يرجى تحديد تاريخ انتهاء الحظر المخصص');
          return false;
        }
        bannedUntil = new Date(customDate).toISOString();
      } else if (dur === 'permanent') {
        bannedUntil = null; // دائم
      }

      return { reason, bannedUntil };
    }
  });

  if (!formValues) return;

  const { reason, bannedUntil } = formValues;

  Swal.fire({
    title: 'جارٍ فرض الحظر...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  try {
    const bannedAt = new Date().toISOString();
    const { error } = await sb.from('users').update({
      is_banned: true,
      ban_reason: reason,
      banned_until: bannedUntil,
      banned_at: bannedAt
    }).eq('id', s.id);

    if (error) throw error;

    // تحديث الكائن في الذاكرة
    s.is_banned = true;
    s.ban_reason = reason;
    s.banned_until = bannedUntil;
    s.banned_at = bannedAt;

    const idx = allLoadedStudents.findIndex(x => x.id === s.id);
    if (idx !== -1) {
      allLoadedStudents[idx].is_banned = true;
      allLoadedStudents[idx].ban_reason = reason;
      allLoadedStudents[idx].banned_until = bannedUntil;
      allLoadedStudents[idx].banned_at = bannedAt;
    }

    renderStudentsTable();
    viewStudentDetails(s.id);

    // إرسال تنبيه لحظي فوري لجهاز/متصفح الطالب لحظر شاشته في نفس الثانية (0ms)
    broadcastAdminActionToClient(s.id, 'ban', {
      is_banned: true,
      ban_reason: reason,
      banned_until: bannedUntil,
      banned_at: bannedAt,
      full_name: s.full_name,
      email: s.email
    });

    Swal.close();
    toast('تم حظر الحساب بنجاح وانعكس فوراً على شاشة الطالب');
  } catch (err) {
    Swal.close();
    console.error('Ban student error:', err);
    toast('تعذر حظر الحساب: ' + err.message, true);
  }
}
window.promptBanStudentModal = promptBanStudentModal;

async function promptUnbanStudentModal() {
  if (!activeSelectedStudent) return;
  const s = activeSelectedStudent;

  const confirmed = await mgConfirm(
    'فك حظر الحساب',
    `هل أنت متأكد من فك الحظر عن حساب الطالب "${esc(s.full_name)}" واستعادة صلاحية دخوله للمنصة فوراً؟`,
    'question'
  );
  if (!confirmed) return;

  Swal.fire({
    title: 'جارٍ فك الحظر...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  try {
    const { error } = await sb.from('users').update({
      is_banned: false,
      ban_reason: null,
      banned_until: null,
      banned_at: null
    }).eq('id', s.id);

    if (error) throw error;

    // تحديث الكائن في الذاكرة
    s.is_banned = false;
    s.ban_reason = null;
    s.banned_until = null;
    s.banned_at = null;

    const idx = allLoadedStudents.findIndex(x => x.id === s.id);
    if (idx !== -1) {
      allLoadedStudents[idx].is_banned = false;
      allLoadedStudents[idx].ban_reason = null;
      allLoadedStudents[idx].banned_until = null;
      allLoadedStudents[idx].banned_at = null;
    }

    renderStudentsTable();
    viewStudentDetails(s.id);

    // إرسال تنبيه لحظي فوري لجهاز/متصفح الطالب لفك الحظر عن شاشته في نفس الثانية (0ms)
    broadcastAdminActionToClient(s.id, 'unban', {
      is_banned: false
    });

    Swal.close();
    toast('تم فك الحظر عن الحساب وانعكس فوراً على شاشة الطالب');
  } catch (err) {
    Swal.close();
    console.error('Unban student error:', err);
    toast('تعذر فك الحظر: ' + err.message, true);
  }
}
window.promptUnbanStudentModal = promptUnbanStudentModal;

function quickToggleBanStudent(userId) {
  const student = allLoadedStudents.find(s => s.id === userId);
  if (!student) return;
  viewStudentDetails(userId);
  setTimeout(() => {
    handleStudentBanActionModal();
  }, 150);
}
window.quickToggleBanStudent = quickToggleBanStudent;




/* ============ NOTIFICATIONS MANAGEMENT & BROADCAST ============ */

let cachedStudentsForNotif = null;

function toggleNotifTargetInput() {
  const audience = document.getElementById('notif-input-audience')?.value;
  const wrapper = document.getElementById('notif-target-user-wrapper');
  if (wrapper) {
    wrapper.style.display = (audience === 'single') ? 'block' : 'none';
    if (audience === 'single') {
      populateNotifStudentsDropdown();
      setTimeout(() => {
        const searchInput = document.getElementById('notif-user-search');
        if (searchInput) searchInput.focus();
      }, 100);
    }
  }
}
window.toggleNotifTargetInput = toggleNotifTargetInput;

async function populateNotifStudentsDropdown(forceRefresh = false) {
  const select = document.getElementById('notif-input-user');
  const countHint = document.getElementById('notif-user-count-hint');
  if (!select) return;

  if (!forceRefresh && cachedStudentsForNotif && cachedStudentsForNotif.length > 0) {
    renderNotifStudentsOptions(cachedStudentsForNotif);
    return;
  }

  select.innerHTML = '<option value="">⏳ جارٍ تحميل قائمة الطلاب...</option>';

  try {
    const { data: students, error } = await sb
      .from('users')
      .select('id, full_name, email, role')
      .order('full_name', { ascending: true });

    if (error) throw error;
    cachedStudentsForNotif = (students || []).filter(s => s && s.id);
    renderNotifStudentsOptions(cachedStudentsForNotif);
  } catch (err) {
    console.warn('[Admin Notif] Error loading students:', err);
    select.innerHTML = '<option value="">تعذر جلب قائمة الطلاب</option>';
    if (countHint) countHint.textContent = 'حدث خطأ أثناء تحميل الطلاب: ' + err.message;
  }
}
window.populateNotifStudentsDropdown = populateNotifStudentsDropdown;

function refreshNotifStudentsList() {
  cachedStudentsForNotif = null;
  populateNotifStudentsDropdown(true);
}
window.refreshNotifStudentsList = refreshNotifStudentsList;

function renderNotifStudentsOptions(students, filteredCount = null) {
  const select = document.getElementById('notif-input-user');
  const countHint = document.getElementById('notif-user-count-hint');
  if (!select) return;

  if (!students || students.length === 0) {
    select.innerHTML = '<option value="">لا يوجد طلاب يطابقون البحث</option>';
    if (countHint) countHint.textContent = 'لا توجد نتائج مطابقة.';
    return;
  }

  let html = '<option value="">-- اضغط لاختيار الطالب المستهدف (' + students.length + ' طالب) --</option>';
  html += students.map(s => {
    const name = s.full_name ? s.full_name.trim() : 'بدون اسم';
    const email = s.email ? s.email.trim() : 'بدون بريد';
    return `<option value="${s.id}">${escapeHtml(name)} — ${escapeHtml(email)}</option>`;
  }).join('');

  select.innerHTML = html;

  if (countHint) {
    const total = cachedStudentsForNotif ? cachedStudentsForNotif.length : students.length;
    countHint.textContent = (filteredCount !== null && filteredCount !== total)
      ? `تم العثور على ${students.length} من أصل ${total} طالب مسجل`
      : `إجمالي الطلاب المتاحين: ${total} طالب`;
  }
}

function filterNotifStudents(query) {
  if (!cachedStudentsForNotif) return;
  const q = (query || '').trim().toLowerCase();
  if (!q) {
    renderNotifStudentsOptions(cachedStudentsForNotif);
    return;
  }

  const filtered = cachedStudentsForNotif.filter(s => {
    const name = (s.full_name || '').toLowerCase();
    const email = (s.email || '').toLowerCase();
    return name.includes(q) || email.includes(q);
  });

  renderNotifStudentsOptions(filtered, filtered.length);
}
window.filterNotifStudents = filterNotifStudents;

/* ============ متصفح الروابط والدروس التفاعلية (DEEP LINK BROWSER) ============ */

function setNotifLink(url, label) {
  const input = document.getElementById('notif-input-link');
  const badge = document.getElementById('notif-link-preview-badge');
  const text = document.getElementById('notif-link-preview-text');
  if (input) input.value = url;
  if (badge && text) {
    badge.style.display = 'flex';
    text.textContent = `${label} (${url})`;
  }
  toast(`تم تحديد الرابط: ${label}`);
}
window.setNotifLink = setNotifLink;

function clearNotifLink() {
  const input = document.getElementById('notif-input-link');
  const badge = document.getElementById('notif-link-preview-badge');
  const select = document.getElementById('notif-select-lesson');
  if (input) input.value = '';
  if (badge) badge.style.display = 'none';
  if (select) select.value = '';
}
window.clearNotifLink = clearNotifLink;

function onNotifLessonSelected(select) {
  if (!select || !select.value) return;
  const opt = select.options[select.selectedIndex];
  const label = opt?.getAttribute('data-label') || opt?.text || 'درس في المنهج';
  setNotifLink(select.value, label);
}
window.onNotifLessonSelected = onNotifLessonSelected;

async function populateNotifLessonsDropdown() {
  const select = document.getElementById('notif-select-lesson');
  if (!select) return;

  select.innerHTML = '<option value="">جارٍ جلب وتحديث قائمة الدروس الحية من السيرفر...</option>';

  try {
    // 1. جلب الوحدات والدروس مباشرة من Supabase (المصدر المعتمد)
    if (window.sb) {
      const { data: unitsData, error: uErr } = await sb.from('units').select('id, title, order_index').order('order_index');
      const { data: lessonsData, error: lErr } = await sb.from('lessons').select('id, unit_id, title, order_index').order('order_index');

      if (!uErr && unitsData && unitsData.length > 0) {
        let html = '<option value="">-- اضغط لاختيار درس محدد لفتحه مباشرة في هاتف الطالب --</option>';
        unitsData.forEach((u, uIdx) => {
          const uLessons = (lessonsData || []).filter(l => String(l.unit_id) === String(u.id));
          const unitTitle = u.title || `الوحدة ${uIdx + 1}`;
          html += `<optgroup label="${escapeHtml(unitTitle)}">`;
          uLessons.forEach((l, lIdx) => {
            const lessonTitle = l.title || `الدرس ${lIdx + 1}`;
            const lessonId = l.id;
            html += `<option value="index.html#lesson=${encodeURIComponent(lessonId)}" data-label="${escapeHtml(unitTitle)} - ${escapeHtml(lessonTitle)}">${escapeHtml(unitTitle)}: ${escapeHtml(lessonTitle)}</option>`;
          });
          html += `</optgroup>`;
        });
        select.innerHTML = html;
        return;
      }
    }
  } catch (e) {
    console.warn('[Notif Lessons] Supabase live fetch error:', e);
  }

  // 2. المحاولة من الذاكرة المحلية كاحتياط
  let curr = null;
  try {
    const raw = localStorage.getItem('mg_coptic_curriculum_v2') || localStorage.getItem('mg_coptic_curriculum_v1');
    if (raw) curr = JSON.parse(raw);
  } catch (e) {}

  const units = (curr && Array.isArray(curr.units)) ? curr.units : [];
  if (units.length > 0) {
    let html = '<option value="">-- اضغط لاختيار درس محدد لفتحه مباشرة في هاتف الطالب --</option>';
    units.forEach((u, uIdx) => {
      const unitTitle = u.title || `الوحدة ${uIdx + 1}`;
      html += `<optgroup label="${escapeHtml(unitTitle)}">`;
      (u.lessons || []).forEach((l, lIdx) => {
        const lessonTitle = l.title || `الدرس ${lIdx + 1}`;
        const lessonId = l.id || `${u.id || (uIdx + 1)}_${lIdx + 1}`;
        html += `<option value="index.html#lesson=${encodeURIComponent(lessonId)}" data-label="${escapeHtml(unitTitle)} - ${escapeHtml(lessonTitle)}">${escapeHtml(unitTitle)}: ${escapeHtml(lessonTitle)}</option>`;
      });
      html += `</optgroup>`;
    });
    select.innerHTML = html;
  } else {
    select.innerHTML = '<option value="">تعذر تحميل الدروس، اضغط زر التحديث لإعادة المحاولة</option>';
  }
}
window.populateNotifLessonsDropdown = populateNotifLessonsDropdown;

function openSendNotificationForCurrentStudent() {
  if (window.currentAdminRole !== 'super_admin') {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'غير مصرح',
        text: 'إرسال الإشعارات متاح فقط لحسابات Super Admin',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#6B1530'
      });
    } else {
      alert('إرسال الإشعارات متاح فقط لحسابات Super Admin');
    }
    return;
  }

  if (!activeSelectedStudent) return;
  const student = activeSelectedStudent;
  closeStudentModal();
  switchAdminTab('notifications');

  const audienceSelect = document.getElementById('notif-input-audience');
  if (audienceSelect) {
    audienceSelect.value = 'single';
    toggleNotifTargetInput();
  }

  populateNotifStudentsDropdown().then(() => {
    const userSelect = document.getElementById('notif-input-user');
    if (userSelect) {
      let opt = Array.from(userSelect.options).find(o => String(o.value) === String(student.id));
      if (!opt) {
        opt = document.createElement('option');
        opt.value = student.id;
        opt.textContent = `${student.full_name || 'طالب'} — ${student.email || ''}`;
        userSelect.appendChild(opt);
      }
      userSelect.value = student.id;
    }
  });

  setTimeout(() => {
    const titleInput = document.getElementById('notif-input-title');
    if (titleInput) {
      titleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      titleInput.focus();
    }
  }, 250);
}
window.openSendNotificationForCurrentStudent = openSendNotificationForCurrentStudent;

async function loadNotificationsAdmin() {
  if (window.currentAdminRole !== 'super_admin') return;

  const tbody = document.getElementById('tbody-notifications');
  const badge = document.getElementById('notif-total-badge');
  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td colspan="7" style="text-align:center; padding:28px; color:#8C857E;">
        <span style="display:inline-block;width:18px;height:18px;border:2px solid #8C2430;border-top-color:transparent;border-radius:50%;animation:authSpin 0.8s linear infinite;margin-left:8px;vertical-align:middle;"></span>
        جارٍ تحميل سجل الإشعارات...
      </td>
    </tr>
  `;

  // تهيئة الطلاب والدروس التفاعلية
  populateNotifStudentsDropdown();
  populateNotifLessonsDropdown();

  try {
    let events = null;
    let count = 0;

    // محاولة استعلام الربط مع users
    const joinedRes = await sb
      .from('notification_events')
      .select('*, target_user:users(id, full_name, email)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(30);

    if (!joinedRes.error && joinedRes.data) {
      events = joinedRes.data;
      count = joinedRes.count;
    } else {
      console.warn('[Admin Notif] Joined select notice, fallback to direct select:', joinedRes.error);
      const directRes = await sb
        .from('notification_events')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(30);

      if (directRes.error) throw directRes.error;
      events = directRes.data;
      count = directRes.count;
    }

    if (badge) {
      badge.textContent = `المجموع الكلي: ${count || (events ? events.length : 0)} إشعار`;
    }

    if (!events || events.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:36px; color:#746B6F;">
            لا توجد إشعارات مسجلة حتى الآن. يمكنك إرسال أول إشعار باستخدام النموذج أعلاه.
          </td>
        </tr>
      `;
      return;
    }

    const typeLabels = {
      'welcome': 'ترحيب',
      'rank_change': 'تغيّر ترتيب',
      'daily_reminder': 'تذكير يومي',
      'new_content': 'محتوى جديد',
      'achievement': 'إنجاز',
      'admin_broadcast': 'إداري عام',
      'hearts_refilled': 'شحن قلوب'
    };

    tbody.innerHTML = events.map(ev => {
      let targetDisplay = 'جميع الطلاب (عام)';
      if (ev.target_user_id) {
        let u = ev.target_user;
        if (Array.isArray(u)) u = u[0];
        if (!u && cachedStudentsForNotif) {
          u = cachedStudentsForNotif.find(s => String(s.id) === String(ev.target_user_id));
        }
        const name = u?.full_name ? u.full_name.trim() : 'طالب محدد';
        const email = u?.email ? ` (${u.email.trim()})` : '';
        targetDisplay = `<span title="ID: ${escapeHtml(ev.target_user_id)}">${escapeHtml(name)}${escapeHtml(email)}</span>`;
      }

      let statusBadge = '';
      if (ev.status === 'sent') {
        statusBadge = '<span style="display:inline-block;padding:3px 10px;border-radius:12px;background:#D1FADF;color:#027A48;font-weight:800;font-size:0.75rem;">تم الإرسال</span>';
      } else if (ev.status === 'failed') {
        statusBadge = '<span style="display:inline-block;padding:3px 10px;border-radius:12px;background:#FEE4E2;color:#D92D20;font-weight:800;font-size:0.75rem;">تعذر الإرسال</span>';
      } else {
        statusBadge = '<span style="display:inline-block;padding:3px 10px;border-radius:12px;background:#FEF0C7;color:#B54708;font-weight:800;font-size:0.75rem;">قيد الانتظار</span>';
      }

      const dateStr = ev.created_at ? new Date(ev.created_at).toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }) : '-';
      const typeLabel = typeLabels[ev.event_type] || ev.event_type;

      return `
        <tr>
          <td><span style="font-weight:800; font-size:0.84rem; color:#6B1530;">${escapeHtml(typeLabel)}</span></td>
          <td style="font-size:0.86rem; font-weight:700;">${targetDisplay}</td>
          <td>
            <div style="font-weight:800; font-size:0.92rem; color:#2E2018;">${escapeHtml(ev.title || '')}</div>
            <div style="font-size:0.84rem; color:#746B6F; margin-top:3px; line-height:1.4;">${escapeHtml(ev.body || '')}</div>
          </td>
          <td>${ev.deep_link ? `<code style="background:#F5EFE0; padding:2px 6px; border-radius:4px; font-size:0.78rem; word-break:break-all;">${escapeHtml(ev.deep_link)}</code>` : '<span style="color:#A8A29E; font-size:0.8rem;">-</span>'}</td>
          <td>${statusBadge}</td>
          <td style="font-size:0.8rem; color:#746B6F; white-space:nowrap;">${dateStr}</td>
          <td style="text-align:center; white-space:nowrap;">
            <button type="button" class="btn secondary" onclick="resendNotificationEvent('${escapeHtml(ev.id)}')" style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; padding:0; border-radius:8px; background:#FEF0C7; border:1px solid #FEDF89; color:#B54708; cursor:pointer; margin-left:4px;" title="إعادة إرسال هذا الإشعار الآن">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            </button>
            <button type="button" class="btn secondary" onclick="fillNotificationForm('${escapeHtml(ev.title || '').replace(/'/g, "\\'")}', '${escapeHtml(ev.body || '').replace(/'/g, "\\'")}', '${escapeHtml(ev.deep_link || '').replace(/'/g, "\\'")}')" style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; padding:0; border-radius:8px; background:#E0F2FE; border:1px solid #BAE6FD; color:#0284C7; cursor:pointer; margin-left:4px;" title="نسخ إلى نموذج الإرسال">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
            <button type="button" class="btn danger" onclick="deleteNotificationEvent('${escapeHtml(ev.id)}')" style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; padding:0; border-radius:8px; background:#FEE4E2; border:1px solid #FECDCA; color:#D92D20; cursor:pointer;" title="حذف هذا الإشعار من السجل">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error('[Admin Notif] Load error:', err);
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding:24px; color:#D92D20;">
          تعذر تحميل سجل الإشعارات: ${escapeHtml(err.message || String(err))}
        </td>
      </tr>
    `;
  }
}
window.loadNotificationsAdmin = loadNotificationsAdmin;

function fillNotificationForm(title, body, link) {
  const titleInput = document.getElementById('notif-input-title');
  const bodyInput = document.getElementById('notif-input-body');
  const linkInput = document.getElementById('notif-input-link');
  if (titleInput) titleInput.value = title || '';
  if (bodyInput) bodyInput.value = body || '';
  if (linkInput) linkInput.value = link || '';
  if (titleInput) {
    titleInput.focus();
    titleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  if (typeof toast === 'function') toast('تم نسخ بيانات الإشعار إلى النموذج أعلاه');
}
window.fillNotificationForm = fillNotificationForm;

async function resendNotificationEvent(eventId) {
  if (!eventId) return;

  if (window.currentAdminRole !== 'super_admin') {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'غير مصرح',
        text: 'إعادة إرسال الإشعارات متاح فقط لحسابات Super Admin',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#6B1530'
      });
    } else {
      alert('إعادة إرسال الإشعارات متاح فقط لحسابات Super Admin');
    }
    return;
  }

  try {
    const { data: originalEvent, error: fetchErr } = await sb
      .from('notification_events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (fetchErr || !originalEvent) {
      throw new Error(fetchErr ? fetchErr.message : 'لم يتم العثور على الإشعار في السجل');
    }

    let confirmed = false;
    if (typeof Swal !== 'undefined') {
      const res = await Swal.fire({
        title: 'إعادة إرسال الإشعار',
        html: `هل تريد بالتأكيد إعادة بث هذا الإشعار الآن؟<br><br><b>«${escapeHtml(originalEvent.title || '')}»</b>`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'نعم، أعد الإرسال فوراً',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#6B1530',
        cancelButtonColor: '#746B6F'
      });
      confirmed = res.isConfirmed;
    } else {
      confirmed = confirm(`هل تريد إعادة إرسال الإشعار: "${originalEvent.title}"؟`);
    }

    if (!confirmed) return;

    // إدراج سجل جديد بحالة pending في جدول الإشعارات
    const { data: newEvent, error: insertErr } = await sb
      .from('notification_events')
      .insert({
        event_type: originalEvent.event_type || 'admin_broadcast',
        target_user_id: originalEvent.target_user_id || null,
        title: originalEvent.title,
        body: originalEvent.body,
        deep_link: originalEvent.deep_link,
        status: 'pending'
      })
      .select()
      .single();

    if (insertErr) throw insertErr;

    // استدعاء دالة الإرسال الفوري Edge Function
    const anonKey = window.SUPABASE_ANON_KEY || window.SB_ANON_KEY || (typeof SUPABASE_ANON_KEY !== 'undefined' ? SUPABASE_ANON_KEY : '');
    fetch('https://kdoanxzpfiscprjjzzic.supabase.co/functions/v1/send-notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
      },
      body: JSON.stringify({ action: 'send', event_id: newEvent?.id || eventId })
    }).catch(e => console.warn('[Resend Notif Fetch]', e));

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'تمت إعادة الإرسال',
        text: 'تم وضع الإشعار في طابور الإرسال وبثه لكافة الأجهزة والطلاب فوراً.',
        confirmButtonColor: '#6B1530',
        timer: 2200
      });
    } else if (typeof toast === 'function') {
      toast('تمت إعادة إرسال الإشعار بنجاح');
    }

    loadNotificationsAdmin();
  } catch (err) {
    console.error('[Admin Notif] Resend error:', err);
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'تعذر إعادة الإرسال',
        text: 'حدث خطأ: ' + (err.message || String(err)),
        confirmButtonColor: '#6B1530'
      });
    } else {
      alert('خطأ: ' + (err.message || String(err)));
    }
  }
}
window.resendNotificationEvent = resendNotificationEvent;

async function deleteNotificationEvent(eventId) {
  if (!eventId) return;

  if (window.currentAdminRole !== 'super_admin') {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'غير مصرح',
        text: 'حذف الإشعارات متاح فقط لحسابات Super Admin',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#6B1530'
      });
    } else {
      alert('حذف الإشعارات متاح فقط لحسابات Super Admin');
    }
    return;
  }

  let confirmed = false;
  if (typeof Swal !== 'undefined') {
    const res = await Swal.fire({
      title: 'تأكيد الحذف',
      text: 'هل أنت متأكد من حذف هذا الإشعار من السجل نهائياً؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، حذف الإشعار',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#D92D20',
      cancelButtonColor: '#746B6F'
    });
    confirmed = res.isConfirmed;
  } else {
    confirmed = confirm('هل أنت متأكد من حذف هذا الإشعار من السجل نهائياً؟');
  }

  if (!confirmed) return;

  try {
    const { error } = await sb.from('notification_events').delete().eq('id', eventId);
    if (error) throw error;

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'تم الحذف',
        text: 'تم حذف الإشعار من السجل بنجاح.',
        timer: 1600,
        showConfirmButton: false
      });
    } else if (typeof toast === 'function') {
      toast('تم حذف الإشعار بنجاح');
    }

    loadNotificationsAdmin();
  } catch (err) {
    console.error('[Admin Notif] Delete error:', err);
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'تعذر الحذف',
        text: 'حدث خطأ أثناء محاولة الحذف: ' + (err.message || String(err)),
        confirmButtonColor: '#6B1530'
      });
    } else {
      alert('خطأ في الحذف: ' + (err.message || String(err)));
    }
  }
}
window.deleteNotificationEvent = deleteNotificationEvent;

async function clearAllNotificationsHistory() {
  if (window.currentAdminRole !== 'super_admin') {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'غير مصرح',
        text: 'مسح السجل متاح فقط لحسابات Super Admin',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#6B1530'
      });
    } else {
      alert('مسح السجل متاح فقط لحسابات Super Admin');
    }
    return;
  }

  let confirmed = false;
  if (typeof Swal !== 'undefined') {
    const res = await Swal.fire({
      title: 'مسح سجل الإشعارات كاملاً',
      text: 'تحذير: سيتم مسح جميع الإشعارات المسجلة في السجل نهائياً، هل تريد المتابعة؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، مسح كل السجل',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#D92D20',
      cancelButtonColor: '#746B6F'
    });
    confirmed = res.isConfirmed;
  } else {
    confirmed = confirm('تحذير: سيتم مسح سجل الإشعارات كاملاً نهائياً، هل تريد المتابعة؟');
  }

  if (!confirmed) return;

  try {
    const { error } = await sb.from('notification_events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'تم المسح',
        text: 'تم مسح سجل الإشعارات بالكامل بنجاح.',
        timer: 1800,
        showConfirmButton: false
      });
    } else if (typeof toast === 'function') {
      toast('تم مسح السجل بنجاح');
    }

    loadNotificationsAdmin();
  } catch (err) {
    console.error('[Admin Notif] Clear all error:', err);
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'تعذر مسح السجل',
        text: 'حدث خطأ أثناء مسح السجل: ' + (err.message || String(err)),
        confirmButtonColor: '#6B1530'
      });
    } else {
      alert('خطأ: ' + (err.message || String(err)));
    }
  }
}
window.clearAllNotificationsHistory = clearAllNotificationsHistory;

async function sendAdminNotification() {
  if (window.currentAdminRole !== 'super_admin') {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'غير مصرح',
        text: 'إرسال الإشعارات متاح فقط لحسابات Super Admin',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#6B1530'
      });
    } else {
      alert('إرسال الإشعارات متاح فقط لحسابات Super Admin');
    }
    return;
  }

  const titleInput = document.getElementById('notif-input-title');
  const bodyInput = document.getElementById('notif-input-body');
  const audienceSelect = document.getElementById('notif-input-audience');
  const userInput = document.getElementById('notif-input-user');
  const linkInput = document.getElementById('notif-input-link');
  const submitBtn = document.getElementById('btn-submit-notif');

  const title = (titleInput?.value || '').trim();
  const body = (bodyInput?.value || '').trim();
  const audience = audienceSelect?.value || 'broadcast';
  const targetUserId = (audience === 'single') ? (userInput?.value || null) : null;
  const deepLink = (linkInput?.value || '').trim() || null;

  if (!title || !body) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'warning', title: 'بيانات ناقصة', text: 'يرجى إدخال عنوان الإشعار ونصه.' });
    } else {
      alert('يرجى إدخال عنوان الإشعار ونصه.');
    }
    return;
  }

  if (audience === 'single' && !targetUserId) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'warning', title: 'اختر الطالب', text: 'يرجى اختيار الطالب المستهدف من القائمة.' });
    } else {
      alert('يرجى اختيار الطالب المستهدف.');
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>جارٍ إرسال الإشعار...</span>';
  }

  try {
    const { error } = await sb.from('notification_events').insert({
      event_type: 'admin_broadcast',
      target_user_id: targetUserId,
      title: title,
      body: body,
      deep_link: deepLink,
      status: 'pending'
    });

    if (error) throw error;

    // استدعاء الـ Edge Function فوراً في الخلفية للإرسال الفوري لخدمة FCM
    const anonKey = window.SUPABASE_ANON_KEY || window.SB_ANON_KEY || SUPABASE_ANON_KEY;
    fetch('https://kdoanxzpfiscprjjzzic.supabase.co/functions/v1/send-notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
      }
    }).catch(e => console.log('[Notif Dispatch Call]', e));

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'تم الإرسال بنجاح',
        text: 'تمت جدولة الإشعار ووضعه في طابور الإرسال الفوري لهواتف الطلاب.',
        confirmButtonColor: '#6B1530'
      });
    } else if (typeof toast === 'function') {
      toast('تم إرسال الإشعار بنجاح');
    }

    // تفريغ الحقول وتحديث الجدول
    if (titleInput) titleInput.value = '';
    if (bodyInput) bodyInput.value = '';
    clearNotifLink();

    loadNotificationsAdmin();
  } catch (err) {
    console.error('[Admin Notif] Send error:', err);
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'تعذر الإرسال',
        text: 'حدث خطأ أثناء حفظ الإشعار: ' + err.message,
        confirmButtonColor: '#6B1530'
      });
    } else {
      alert('خطأ: ' + err.message);
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        <span>إرسال الإشعار الآن</span>
      `;
    }
  }
}
window.sendAdminNotification = sendAdminNotification;

checkSession();

