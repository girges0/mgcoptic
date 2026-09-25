/**
 * MG COPTIC — Admin Device Intelligence Module
 * ==============================================
 * نظام عرض وإدارة معلومات الأجهزة والجلسات في لوحة التحكم الإدارية.
 * يعمل بالتكامل مع جدول user_devices في Supabase.
 */

(function() {
  'use strict';

  // ─── SVG Icons for Devices ──────────────────────────────────
  const DEVICE_ICONS = {
    smartphone: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3" ry="3"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    tablet: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    desktop: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    unknown: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    android: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="10" width="14" height="9" rx="2"/><path d="M7 10V8a5 5 0 0 1 10 0v2"/><line x1="8" y1="5" x2="6" y2="2"/><line x1="16" y1="5" x2="18" y2="2"/><circle cx="9" cy="7" r="0.8" fill="currentColor"/><circle cx="15" cy="7" r="0.8" fill="currentColor"/></svg>`,
    apple: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`,
    windows: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 12.5h8v8.34l-8-1.17V12.5zm0-8.67l8-1.17v8.34H3V3.83zm10-1.5l8-1.17v9.84h-8V2.33zm0 11.17h8v9.84l-8-1.17V13.5z"/></svg>`,
    linux: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="5"/><path d="M5 19c1-3 3-5 7-5s6 2 7 5"/><circle cx="10" cy="7" r="1" fill="currentColor"/><circle cx="14" cy="7" r="1" fill="currentColor"/></svg>`,
    chrome: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>`,
    safari: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polygon points="16 8 13.5 13.5 8 16 10.5 10.5"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    activity: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    layers: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    filter: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
    barChart: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    search: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    info: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
  };

  // ─── Data Store ─────────────────────────────────────────────
  let allDevices = [];
  let allDeviceStats = null;
  let deviceFilters = { platform: 'all', deviceType: 'all', status: 'all', search: '' };
  let debounceTimer = null;

  // ─── Utility: Escape HTML ─────────────────────────────────
  function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ─── Device Status Helpers ────────────────────────────────
  function getDeviceStatus(lastSeenAt) {
    if (!lastSeenAt) return { label: 'غير معروف', class: 'status-unknown', key: 'unknown' };
    const now = new Date();
    const lastSeen = new Date(lastSeenAt);
    const diffMs = now - lastSeen;
    const diffMinutes = diffMs / (1000 * 60);
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffMinutes <= 5) return { label: 'نشط الآن', class: 'status-active', key: 'active' };
    if (diffHours <= 24) return { label: 'نشط مؤخراً', class: 'status-recent', key: 'recent' };
    return { label: 'غير نشط', class: 'status-inactive', key: 'inactive' };
  }

  function getDeviceIcon(deviceType) {
    switch ((deviceType || '').toLowerCase()) {
      case 'mobile': return DEVICE_ICONS.smartphone;
      case 'tablet': return DEVICE_ICONS.tablet;
      case 'desktop': return DEVICE_ICONS.desktop;
      default: return DEVICE_ICONS.unknown;
    }
  }

  function getPlatformIcon(platform) {
    switch ((platform || '').toLowerCase()) {
      case 'android': return DEVICE_ICONS.android;
      case 'ios': return DEVICE_ICONS.apple;
      default: return DEVICE_ICONS.globe;
    }
  }

  function getOsIcon(osName) {
    const os = (osName || '').toLowerCase();
    if (os.includes('android')) return DEVICE_ICONS.android;
    if (os.includes('ios') || os.includes('mac')) return DEVICE_ICONS.apple;
    if (os.includes('windows')) return DEVICE_ICONS.windows;
    if (os.includes('linux') || os.includes('chrome os')) return DEVICE_ICONS.linux;
    return DEVICE_ICONS.globe;
  }

  function timeAgo(dateStr) {
    if (!dateStr) return '-';
    const now = new Date();
    const past = new Date(dateStr);
    const diffMs = now - past;
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);

    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    if (days < 7) return `منذ ${days} يوم`;
    if (days < 30) return `منذ ${Math.floor(days / 7)} أسبوع`;
    return past.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ar-EG', { 
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  // ─── Hardware Model to Commercial Name Dictionary ──────────
  const HARDWARE_MODEL_DICT = {
    // Xiaomi / Redmi / POCO
    '23117RA68G': { brand: 'Xiaomi', model: 'Redmi Note 13 Pro 4G' },
    '23117RA68I': { brand: 'Xiaomi', model: 'Redmi Note 13 Pro' },
    '2312DRA50G': { brand: 'Xiaomi', model: 'Redmi Note 13 Pro+ 5G' },
    '2312DRA50C': { brand: 'Xiaomi', model: 'Redmi Note 13 Pro+ 5G' },
    '2312DRA50I': { brand: 'Xiaomi', model: 'Redmi Note 13 Pro+ 5G' },
    '23124RA7EO': { brand: 'Xiaomi', model: 'Redmi Note 13 4G' },
    '23129RAA4G': { brand: 'Xiaomi', model: 'Redmi Note 13 5G' },
    '2311DRK48G': { brand: 'POCO', model: 'POCO X6 Pro 5G' },
    '23122PCD1G': { brand: 'POCO', model: 'POCO X6 5G' },
    '23049PCD8G': { brand: 'POCO', model: 'POCO F5 5G' },
    '24053PY09G': { brand: 'POCO', model: 'POCO F6 5G' },
    '24069PC21G': { brand: 'POCO', model: 'POCO F6 Pro' },
    '2201116SG':  { brand: 'Xiaomi', model: 'Redmi Note 11 Pro' },
    '2201116SR':  { brand: 'Xiaomi', model: 'Redmi Note 11 Pro' },
    '2201117TY':  { brand: 'Xiaomi', model: 'Redmi Note 11' },
    '22101316G':  { brand: 'Xiaomi', model: 'Redmi Note 12 Pro 5G' },
    '23021RAAEG': { brand: 'Xiaomi', model: 'Redmi Note 12 4G' },
    '23028RA60G': { brand: 'Xiaomi', model: 'Redmi Note 12' },
    '2109119DG':  { brand: 'Xiaomi', model: 'Xiaomi 11 Lite 5G NE' },
    '2201123G':   { brand: 'Xiaomi', model: 'Xiaomi 12' },
    '2203129G':   { brand: 'Xiaomi', model: 'Xiaomi 12 Pro' },
    '22071212AG': { brand: 'Xiaomi', model: 'Xiaomi 12T' },
    '22081212UG': { brand: 'Xiaomi', model: 'Xiaomi 12T Pro' },
    '2306EPN60G': { brand: 'Xiaomi', model: 'Xiaomi 13T' },
    '23078PND5G': { brand: 'Xiaomi', model: 'Xiaomi 13T Pro' },
    '2407FPN8EG': { brand: 'Xiaomi', model: 'Xiaomi 14T' },
    '2407FPN8ER': { brand: 'Xiaomi', model: 'Xiaomi 14T Pro' },
    '23127PN0CG': { brand: 'Xiaomi', model: 'Xiaomi 14' },
    '24030PN60G': { brand: 'Xiaomi', model: 'Xiaomi 14 Ultra' },

    // Samsung Galaxy Flagships & A-Series
    'SM-S928B': { brand: 'Samsung', model: 'Galaxy S24 Ultra' },
    'SM-S928U': { brand: 'Samsung', model: 'Galaxy S24 Ultra' },
    'SM-S926B': { brand: 'Samsung', model: 'Galaxy S24+' },
    'SM-S921B': { brand: 'Samsung', model: 'Galaxy S24' },
    'SM-S918B': { brand: 'Samsung', model: 'Galaxy S23 Ultra' },
    'SM-S918U': { brand: 'Samsung', model: 'Galaxy S23 Ultra' },
    'SM-S916B': { brand: 'Samsung', model: 'Galaxy S23+' },
    'SM-S911B': { brand: 'Samsung', model: 'Galaxy S23' },
    'SM-S908B': { brand: 'Samsung', model: 'Galaxy S22 Ultra' },
    'SM-S906B': { brand: 'Samsung', model: 'Galaxy S22+' },
    'SM-S901B': { brand: 'Samsung', model: 'Galaxy S22' },
    'SM-G998B': { brand: 'Samsung', model: 'Galaxy S21 Ultra' },
    'SM-G996B': { brand: 'Samsung', model: 'Galaxy S21+' },
    'SM-G991B': { brand: 'Samsung', model: 'Galaxy S21' },
    'SM-G780G': { brand: 'Samsung', model: 'Galaxy S20 FE' },
    'SM-G781B': { brand: 'Samsung', model: 'Galaxy S20 FE 5G' },
    'SM-S711B': { brand: 'Samsung', model: 'Galaxy S23 FE' },
    'SM-S721B': { brand: 'Samsung', model: 'Galaxy S24 FE' },
    'SM-A556B': { brand: 'Samsung', model: 'Galaxy A55 5G' },
    'SM-A546B': { brand: 'Samsung', model: 'Galaxy A54 5G' },
    'SM-A536B': { brand: 'Samsung', model: 'Galaxy A53 5G' },
    'SM-A528B': { brand: 'Samsung', model: 'Galaxy A52s 5G' },
    'SM-A525F': { brand: 'Samsung', model: 'Galaxy A52' },
    'SM-A515F': { brand: 'Samsung', model: 'Galaxy A51' },
    'SM-A356B': { brand: 'Samsung', model: 'Galaxy A35 5G' },
    'SM-A346B': { brand: 'Samsung', model: 'Galaxy A34 5G' },
    'SM-A336B': { brand: 'Samsung', model: 'Galaxy A33 5G' },
    'SM-A256B': { brand: 'Samsung', model: 'Galaxy A25 5G' },
    'SM-A245F': { brand: 'Samsung', model: 'Galaxy A24' },
    'SM-A235F': { brand: 'Samsung', model: 'Galaxy A23' },
    'SM-A155F': { brand: 'Samsung', model: 'Galaxy A15 4G' },
    'SM-A156B': { brand: 'Samsung', model: 'Galaxy A15 5G' },
    'SM-A145F': { brand: 'Samsung', model: 'Galaxy A14' },
    'SM-A146P': { brand: 'Samsung', model: 'Galaxy A14 5G' },
    'SM-A135F': { brand: 'Samsung', model: 'Galaxy A13' },
    'SM-A127F': { brand: 'Samsung', model: 'Galaxy A12 Nacho' },
    'SM-A125F': { brand: 'Samsung', model: 'Galaxy A12' },
    'SM-A057F': { brand: 'Samsung', model: 'Galaxy A05s' },
    'SM-A055F': { brand: 'Samsung', model: 'Galaxy A05' },
    'SM-A047F': { brand: 'Samsung', model: 'Galaxy A04s' },
    'SM-A045F': { brand: 'Samsung', model: 'Galaxy A04' },
    'SM-M546B': { brand: 'Samsung', model: 'Galaxy M54 5G' },
    'SM-M346B': { brand: 'Samsung', model: 'Galaxy M34 5G' },
    'SM-F946B': { brand: 'Samsung', model: 'Galaxy Z Fold5' },
    'SM-F956B': { brand: 'Samsung', model: 'Galaxy Z Fold6' },
    'SM-F731B': { brand: 'Samsung', model: 'Galaxy Z Flip5' },
    'SM-F741B': { brand: 'Samsung', model: 'Galaxy Z Flip6' }
  };

  function resolveDeviceBrandAndModel(device) {
    let brand = (device.manufacturer || '').trim();
    let rawModel = (device.model || '').trim();
    let baseCode = rawModel;

    // 1. Direct match
    if (HARDWARE_MODEL_DICT[baseCode]) {
      const entry = HARDWARE_MODEL_DICT[baseCode];
      return {
        brand: entry.brand,
        model: `${entry.model} (${baseCode})`,
        displayName: `${entry.brand} ${entry.model}`
      };
    }

    // 2. Prefix match (first 7 chars)
    for (const [k, v] of Object.entries(HARDWARE_MODEL_DICT)) {
      if (baseCode.startsWith(k.substring(0, 7)) && baseCode.length >= 7) {
        return {
          brand: v.brand,
          model: `${v.model} (${baseCode})`,
          displayName: `${v.brand} ${v.model}`
        };
      }
    }

    // 3. Xiaomi / Redmi pattern: \d{4,5}[A-Z]{1,3}\d{1,4}[A-Z0-9]
    if (/^\d{4,5}[A-Z]{1,3}\d{1,4}[A-Z0-9]/i.test(baseCode)) {
      brand = brand || 'Xiaomi';
      return {
        brand: brand,
        model: `Redmi (${baseCode})`,
        displayName: `${brand} Redmi (${baseCode})`
      };
    }

    // 4. Samsung Galaxy pattern: SM-[A-Z]\d+
    if (/^SM-([A-Z])(\d+)/i.test(baseCode)) {
      const match = baseCode.match(/^SM-([A-Z])(\d{1,2})/i);
      brand = 'Samsung';
      const series = match ? match[1].toUpperCase() : '';
      const num = match ? match[2] : '';
      const friendlySeries = series === 'S' ? `Galaxy S${num}` : (series === 'A' ? `Galaxy A${num}` : `Galaxy ${series}-Series`);
      return {
        brand: brand,
        model: `${friendlySeries} (${baseCode})`,
        displayName: `Samsung ${friendlySeries}`
      };
    }

    // 5. Apple iPhone screen matching
    if ((device.os_name === 'iOS' || device.platform === 'ios') && (!rawModel || rawModel === 'iPhone')) {
      brand = 'Apple';
      const w = device.screen_width || 0;
      const h = device.screen_height || 0;
      let ipModel = 'iPhone';
      if ((w === 430 && h === 932) || (w === 932 && h === 430)) ipModel = 'iPhone 15/16 Pro Max';
      else if ((w === 393 && h === 852) || (w === 852 && h === 393)) ipModel = 'iPhone 15/16 Pro';
      else if ((w === 390 && h === 844) || (w === 844 && h === 390)) ipModel = 'iPhone 13/14';
      else if ((w === 428 && h === 926) || (w === 926 && h === 428)) ipModel = 'iPhone 13/14 Pro Max';
      else if ((w === 375 && h === 812) || (w === 812 && h === 375)) ipModel = 'iPhone X / 11 Pro';
      else if ((w === 414 && h === 896) || (w === 896 && h === 414)) ipModel = 'iPhone 11 / XR';
      else if ((w === 375 && h === 667) || (w === 667 && h === 375)) ipModel = 'iPhone SE';
      return {
        brand: brand,
        model: ipModel,
        displayName: `Apple ${ipModel}`
      };
    }

    // 6. Windows / macOS / Linux
    if (device.os_name === 'Windows') {
      return { brand: 'Microsoft', model: 'Windows PC', displayName: 'Windows PC' };
    }
    if (device.os_name === 'macOS') {
      return { brand: 'Apple', model: 'Mac', displayName: 'Apple Mac' };
    }
    if (device.os_name === 'Linux') {
      return { brand: 'Linux', model: 'Linux PC', displayName: 'Linux PC' };
    }

    // 7. General Fallback
    const disp = rawModel ? (brand && !rawModel.toLowerCase().includes(brand.toLowerCase()) ? `${brand} ${rawModel}` : rawModel) : (brand || (device.device_type === 'mobile' ? 'هاتف محمول' : 'جهاز'));
    return {
      brand: brand || '-',
      model: rawModel || '-',
      displayName: disp
    };
  }

  function getDeviceDisplayName(device) {
    const info = resolveDeviceBrandAndModel(device);
    return info.displayName;
  }

  // ─── Load Devices from Supabase ─────────────────────────────
  async function loadAllDevices() {
    try {
      const sb = window.sb || window.sbClient;
      if (!sb) return;

      const { data, error } = await sb
        .from('user_devices')
        .select('*')
        .order('last_seen_at', { ascending: false });

      if (error) {
        console.error('[DeviceIntel] Load error:', error.message);
        return;
      }

      allDevices = data || [];
      computeDeviceStats();
      return allDevices;
    } catch (e) {
      console.error('[DeviceIntel] loadAllDevices error:', e);
    }
  }

  // ─── Load Devices for Specific User ──────────────────────────
  async function loadUserDevices(userId) {
    try {
      const sb = window.sb || window.sbClient;
      if (!sb) return [];

      const { data, error } = await sb
        .from('user_devices')
        .select('*')
        .eq('user_id', userId)
        .order('last_seen_at', { ascending: false });

      if (error) {
        console.error('[DeviceIntel] loadUserDevices error:', error.message);
        return [];
      }

      return data || [];
    } catch (e) {
      console.error('[DeviceIntel] loadUserDevices error:', e);
      return [];
    }
  }

  // ─── Compute Statistics ───────────────────────────────────
  function computeDeviceStats() {
    const stats = {
      totalDevices: allDevices.length,
      activeDevices: 0,
      recentDevices: 0,
      inactiveDevices: 0,
      androidCount: 0,
      iosCount: 0,
      webCount: 0,
      mobileCount: 0,
      tabletCount: 0,
      desktopCount: 0,
      uniqueUsers: new Set()
    };

    allDevices.forEach(d => {
      const status = getDeviceStatus(d.last_seen_at);
      if (status.key === 'active') stats.activeDevices++;
      else if (status.key === 'recent') stats.recentDevices++;
      else stats.inactiveDevices++;

      const platform = (d.platform || '').toLowerCase();
      if (platform === 'android') stats.androidCount++;
      else if (platform === 'ios') stats.iosCount++;
      else stats.webCount++;

      const type = (d.device_type || '').toLowerCase();
      if (type === 'mobile') stats.mobileCount++;
      else if (type === 'tablet') stats.tabletCount++;
      else stats.desktopCount++;

      stats.uniqueUsers.add(d.user_id);
    });

    stats.uniqueUserCount = stats.uniqueUsers.size;
    allDeviceStats = stats;
    return stats;
  }

  // ─── Render Statistics Cards ──────────────────────────────
  function renderDeviceStats() {
    const container = document.getElementById('device-stats-grid');
    if (!container || !allDeviceStats) return;

    const s = allDeviceStats;
    container.innerHTML = `
      <div class="device-stat-card">
        <div class="device-stat-icon icon-total-devices">${DEVICE_ICONS.layers}</div>
        <div class="device-stat-data">
          <div class="device-stat-num">${s.totalDevices}</div>
          <div class="device-stat-label">إجمالي الأجهزة</div>
        </div>
      </div>
      <div class="device-stat-card">
        <div class="device-stat-icon icon-active-devices">${DEVICE_ICONS.activity}</div>
        <div class="device-stat-data">
          <div class="device-stat-num text-emerald">${s.activeDevices}</div>
          <div class="device-stat-label">نشطة الآن</div>
        </div>
      </div>
      <div class="device-stat-card">
        <div class="device-stat-icon icon-android-devices">${DEVICE_ICONS.android}</div>
        <div class="device-stat-data">
          <div class="device-stat-num">${s.androidCount}</div>
          <div class="device-stat-label">Android</div>
        </div>
      </div>
      <div class="device-stat-card">
        <div class="device-stat-icon icon-ios-devices">${DEVICE_ICONS.apple}</div>
        <div class="device-stat-data">
          <div class="device-stat-num">${s.iosCount}</div>
          <div class="device-stat-label">iOS</div>
        </div>
      </div>
      <div class="device-stat-card">
        <div class="device-stat-icon icon-web-devices">${DEVICE_ICONS.globe}</div>
        <div class="device-stat-data">
          <div class="device-stat-num">${s.webCount}</div>
          <div class="device-stat-label">Web</div>
        </div>
      </div>
      <div class="device-stat-card">
        <div class="device-stat-icon icon-unique-users">${DEVICE_ICONS.search}</div>
        <div class="device-stat-data">
          <div class="device-stat-num">${s.uniqueUserCount}</div>
          <div class="device-stat-label">مستخدم فريد</div>
        </div>
      </div>
    `;
  }

  // ─── Render Platform Distribution Chart ────────────────────
  function renderPlatformChart() {
    const container = document.getElementById('device-platform-chart');
    if (!container || !allDeviceStats) return;

    const s = allDeviceStats;
    const total = s.totalDevices || 1;
    const androidPct = Math.round((s.androidCount / total) * 100);
    const iosPct = Math.round((s.iosCount / total) * 100);
    const webPct = Math.round((s.webCount / total) * 100);

    container.innerHTML = `
      <div class="device-chart-header">
        <div class="device-chart-title">${DEVICE_ICONS.barChart} <span>توزيع المنصات</span></div>
      </div>
      <div class="device-chart-bars">
        <div class="chart-bar-row">
          <div class="chart-bar-label">${DEVICE_ICONS.android} <span>Android</span></div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill bar-android" style="width:${androidPct}%"></div>
          </div>
          <div class="chart-bar-pct">${androidPct}%</div>
          <div class="chart-bar-count">${s.androidCount}</div>
        </div>
        <div class="chart-bar-row">
          <div class="chart-bar-label">${DEVICE_ICONS.apple} <span>iOS</span></div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill bar-ios" style="width:${iosPct}%"></div>
          </div>
          <div class="chart-bar-pct">${iosPct}%</div>
          <div class="chart-bar-count">${s.iosCount}</div>
        </div>
        <div class="chart-bar-row">
          <div class="chart-bar-label">${DEVICE_ICONS.globe} <span>Web</span></div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill bar-web" style="width:${webPct}%"></div>
          </div>
          <div class="chart-bar-pct">${webPct}%</div>
          <div class="chart-bar-count">${s.webCount}</div>
        </div>
      </div>
      <div class="device-chart-bars" style="margin-top:16px;">
        <div class="device-chart-title" style="margin-bottom:8px;">${DEVICE_ICONS.layers} <span>نوع الجهاز</span></div>
        <div class="chart-bar-row">
          <div class="chart-bar-label">${DEVICE_ICONS.smartphone} <span>محمول</span></div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill bar-mobile" style="width:${Math.round((s.mobileCount / total) * 100)}%"></div>
          </div>
          <div class="chart-bar-pct">${Math.round((s.mobileCount / total) * 100)}%</div>
          <div class="chart-bar-count">${s.mobileCount}</div>
        </div>
        <div class="chart-bar-row">
          <div class="chart-bar-label">${DEVICE_ICONS.tablet} <span>لوحي</span></div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill bar-tablet" style="width:${Math.round((s.tabletCount / total) * 100)}%"></div>
          </div>
          <div class="chart-bar-pct">${Math.round((s.tabletCount / total) * 100)}%</div>
          <div class="chart-bar-count">${s.tabletCount}</div>
        </div>
        <div class="chart-bar-row">
          <div class="chart-bar-label">${DEVICE_ICONS.desktop} <span>مكتبي</span></div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill bar-desktop" style="width:${Math.round((s.desktopCount / total) * 100)}%"></div>
          </div>
          <div class="chart-bar-pct">${Math.round((s.desktopCount / total) * 100)}%</div>
          <div class="chart-bar-count">${s.desktopCount}</div>
        </div>
      </div>
    `;
  }

  // ─── Get Devices Summary for User (Table Column) ──────────
  function getUserDeviceSummary(userId) {
    const userDevices = allDevices.filter(d => d.user_id === userId);
    if (userDevices.length === 0) {
      return `<span class="device-summary-empty">لا توجد أجهزة</span>`;
    }

    const primary = userDevices[0]; // Most recent
    const status = getDeviceStatus(primary.last_seen_at);
    const deviceName = getDeviceDisplayName(primary);
    const icon = getDeviceIcon(primary.device_type);
    const badge = userDevices.length > 1 
      ? `<span class="device-count-badge">${userDevices.length}</span>` : '';

    return `
      <div class="device-summary-cell" title="${esc(deviceName)} — ${esc(primary.os_name)} ${esc(primary.os_version)}">
        <div class="device-summary-icon">${icon}</div>
        <div class="device-summary-info">
          <div class="device-summary-name">${esc(deviceName)} ${badge}</div>
          <div class="device-summary-os">${esc(primary.os_name || primary.platform)}</div>
        </div>
      </div>
    `;
  }

  // ─── Render Device Cards for User Modal ───────────────────
  async function renderUserDeviceCards(userId, containerId) {
    const container = document.getElementById(containerId || 'm-student-devices-section');
    if (!container) return;

    let userDevices = allDevices.filter(d => d.user_id === userId);
    
    // إذا لم تكن البيانات محملة مسبقاً، جلبها فوراً من Supabase لهذا الطالب
    if (userDevices.length === 0) {
      container.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;padding:16px;color:#8C857E;font-size:0.85rem;">
          <div class="spinner" style="width:16px;height:16px;border-width:2px;"></div>
          <span>جارٍ فحص سجل أجهزة الطالب...</span>
        </div>
      `;
      const fetched = await loadUserDevices(userId);
      if (fetched && fetched.length > 0) {
        userDevices = fetched;
        fetched.forEach(f => {
          if (!allDevices.some(d => d.id === f.id)) allDevices.push(f);
        });
      }
    }

    if (userDevices.length === 0) {
      container.innerHTML = `
        <div class="device-section-empty">
          <div class="device-empty-icon">${DEVICE_ICONS.smartphone}</div>
          <p>لم يتم تسجيل أي جهاز لهذا المستخدم بعد</p>
        </div>
      `;
      const headerEl = document.getElementById('m-student-devices-header');
      if (headerEl) {
        headerEl.innerHTML = `
          ${DEVICE_ICONS.smartphone}
          <h4>الأجهزة والجلسات النشطة</h4>
        `;
      }
      return;
    }

    const headerEl = document.getElementById('m-student-devices-header');
    if (headerEl) {
      headerEl.innerHTML = `
        ${DEVICE_ICONS.smartphone}
        <h4>الأجهزة والجلسات النشطة</h4>
        <span class="device-count-pill">${userDevices.length} ${userDevices.length === 1 ? 'جهاز' : 'أجهزة'}</span>
      `;
    }

    container.innerHTML = userDevices.map((device, i) => {
      const status = getDeviceStatus(device.last_seen_at);
      const deviceName = getDeviceDisplayName(device);
      const icon = getDeviceIcon(device.device_type);
      const osIcon = getOsIcon(device.os_name);
      const primaryLabel = i === 0 ? '<span class="device-primary-badge">الأحدث</span>' : '';

      return `
        <div class="device-card ${status.class}" onclick="window.AdminDeviceIntel.showDeviceDetail(${device.id})" role="button" tabindex="0">
          <div class="device-card-header">
            <div class="device-card-icon-box ${status.class}">${icon}</div>
            <div class="device-card-title-group">
              <div class="device-card-name">${esc(deviceName)} ${primaryLabel}</div>
              <div class="device-card-os">${osIcon} ${esc(device.os_name)} ${esc(device.os_version)}</div>
            </div>
            <div class="device-card-status">
              <span class="device-status-dot ${status.class}"></span>
              <span class="device-status-text ${status.class}">${status.label}</span>
            </div>
          </div>
          <div class="device-card-meta">
            <div class="device-meta-item">
              <span class="meta-label">المتصفح</span>
              <span class="meta-value">${esc(device.browser_name)} ${esc(device.browser_version ? device.browser_version.split('.')[0] : '')}</span>
            </div>
            <div class="device-meta-item">
              <span class="meta-label">المنصة</span>
              <span class="meta-value">${esc(device.platform)}</span>
            </div>
            <div class="device-meta-item">
              <span class="meta-label">آخر ظهور</span>
              <span class="meta-value">${timeAgo(device.last_seen_at)}</span>
            </div>
            <div class="device-meta-item">
              <span class="meta-label">النشاط</span>
              <span class="meta-value">${device.activity_count || 1} مرة</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ─── Show Device Detail Modal ─────────────────────────────
  function showDeviceDetail(deviceId) {
    const device = allDevices.find(d => d.id === deviceId);
    if (!device) return;

    const status = getDeviceStatus(device.last_seen_at);
    const resolved = resolveDeviceBrandAndModel(device);
    const deviceName = resolved.displayName;
    const icon = getDeviceIcon(device.device_type);
    const osIcon = getOsIcon(device.os_name);

    const modalHtml = `
      <div class="device-detail-modal-overlay" id="device-detail-modal" onclick="if(event.target===this)window.AdminDeviceIntel.closeDeviceDetail()">
        <div class="device-detail-modal">
          <div class="device-detail-header">
            <div class="device-detail-hero">
              <div class="device-detail-icon-lg ${status.class}">${icon}</div>
              <div class="device-detail-hero-info">
                <h3>${esc(deviceName)}</h3>
                <div class="device-detail-status">
                  <span class="device-status-dot ${status.class}"></span>
                  <span>${status.label}</span>
                </div>
              </div>
            </div>
            <button type="button" class="device-detail-close" onclick="window.AdminDeviceIntel.closeDeviceDetail()" title="إغلاق">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="device-detail-body">
            <div class="device-detail-grid">
              <div class="detail-row">
                <span class="detail-label">${DEVICE_ICONS.smartphone} الجهاز</span>
                <span class="detail-value">${esc(deviceName)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">${DEVICE_ICONS.info} الشركة المصنعة</span>
                <span class="detail-value">${esc(resolved.brand || '-')}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">${DEVICE_ICONS.layers} الموديل</span>
                <span class="detail-value">${esc(resolved.model || '-')}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">${DEVICE_ICONS.globe} المنصة</span>
                <span class="detail-value">${getPlatformIcon(device.platform)} ${esc(device.platform)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">${osIcon} نظام التشغيل</span>
                <span class="detail-value">${esc(device.os_name)} ${esc(device.os_version)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">${DEVICE_ICONS.chrome} المتصفح</span>
                <span class="detail-value">${esc(device.browser_name)} ${esc(device.browser_version)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">${DEVICE_ICONS.layers} إصدار التطبيق</span>
                <span class="detail-value">${esc(device.app_version || '-')}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">${DEVICE_ICONS.clock} أول ظهور</span>
                <span class="detail-value">${formatDate(device.first_seen_at)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">${DEVICE_ICONS.clock} آخر ظهور</span>
                <span class="detail-value">${timeAgo(device.last_seen_at)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">${DEVICE_ICONS.activity} عدد النشاط</span>
                <span class="detail-value">${device.activity_count || 1} مرة</span>
              </div>
              ${device.screen_width ? `
              <div class="detail-row">
                <span class="detail-label">${DEVICE_ICONS.desktop} الشاشة</span>
                <span class="detail-value">${device.screen_width}×${device.screen_height}px</span>
              </div>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Remove existing modal if any
    const existing = document.getElementById('device-detail-modal');
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Close on Escape
    const handler = (e) => {
      if (e.key === 'Escape') {
        closeDeviceDetail();
        document.removeEventListener('keydown', handler);
      }
    };
    document.addEventListener('keydown', handler);
  }

  function closeDeviceDetail() {
    const modal = document.getElementById('device-detail-modal');
    if (modal) modal.remove();
  }

  // ─── Filter & Search Devices ───────────────────────────────
  function filterDevices() {
    let filtered = [...allDevices];

    if (deviceFilters.platform !== 'all') {
      filtered = filtered.filter(d => (d.platform || '').toLowerCase() === deviceFilters.platform);
    }
    if (deviceFilters.deviceType !== 'all') {
      filtered = filtered.filter(d => (d.device_type || '').toLowerCase() === deviceFilters.deviceType);
    }
    if (deviceFilters.status !== 'all') {
      filtered = filtered.filter(d => {
        const s = getDeviceStatus(d.last_seen_at);
        return s.key === deviceFilters.status;
      });
    }
    if (deviceFilters.search) {
      const q = deviceFilters.search.toLowerCase();
      filtered = filtered.filter(d => {
        return (d.model || '').toLowerCase().includes(q) ||
               (d.manufacturer || '').toLowerCase().includes(q) ||
               (d.os_name || '').toLowerCase().includes(q) ||
               (d.browser_name || '').toLowerCase().includes(q) ||
               (d.platform || '').toLowerCase().includes(q);
      });
    }

    return filtered;
  }

  function handleDeviceFilterChange() {
    const platformSelect = document.getElementById('device-filter-platform');
    const typeSelect = document.getElementById('device-filter-type');
    const statusSelect = document.getElementById('device-filter-status');
    const searchInput = document.getElementById('device-filter-search');

    deviceFilters.platform = platformSelect ? platformSelect.value : 'all';
    deviceFilters.deviceType = typeSelect ? typeSelect.value : 'all';
    deviceFilters.status = statusSelect ? statusSelect.value : 'all';
    
    renderDevicesList();
  }

  function handleDeviceSearch(e) {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      deviceFilters.search = e.target.value.trim();
      renderDevicesList();
    }, 350);
  }

  // ─── Render Devices List ──────────────────────────────────
  function renderDevicesList() {
    const container = document.getElementById('device-intel-list');
    if (!container) return;

    const filtered = filterDevices();
    const countEl = document.getElementById('device-filter-count');
    if (countEl) {
      countEl.textContent = `عرض ${filtered.length} من ${allDevices.length} جهاز`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="device-list-empty">
          ${DEVICE_ICONS.smartphone}
          <p>لا توجد أجهزة مطابقة للبحث أو التصفية</p>
        </div>
      `;
      return;
    }

    // Group by user
    const userGroups = {};
    filtered.forEach(d => {
      if (!userGroups[d.user_id]) userGroups[d.user_id] = [];
      userGroups[d.user_id].push(d);
    });

    // Find user names from allLoadedStudents
    const students = window.allLoadedStudents || [];
    const studentMap = {};
    students.forEach(s => { studentMap[s.id] = s; });

    container.innerHTML = filtered.map(device => {
      const status = getDeviceStatus(device.last_seen_at);
      const deviceName = getDeviceDisplayName(device);
      const icon = getDeviceIcon(device.device_type);
      const student = studentMap[device.user_id];
      const userName = student ? student.full_name : (device.user_id || '').substring(0, 8) + '...';

      return `
        <div class="device-list-row" onclick="window.AdminDeviceIntel.showDeviceDetail(${device.id})">
          <div class="device-list-icon ${status.class}">${icon}</div>
          <div class="device-list-info">
            <div class="device-list-name">${esc(deviceName)}</div>
            <div class="device-list-sub">${esc(device.os_name)} ${esc(device.os_version)} — ${esc(device.browser_name)} ${esc(device.browser_version ? device.browser_version.split('.')[0] : '')}</div>
          </div>
          <div class="device-list-user" title="${esc(userName)}">${esc(userName)}</div>
          <div class="device-list-platform">${getPlatformIcon(device.platform)} ${esc(device.platform)}</div>
          <div class="device-list-status">
            <span class="device-status-dot ${status.class}"></span>
            <span class="device-status-text-sm ${status.class}">${status.label}</span>
          </div>
          <div class="device-list-time">${timeAgo(device.last_seen_at)}</div>
        </div>
      `;
    }).join('');
  }

  // ─── Initialize Device Intelligence Tab ───────────────────
  async function initDeviceIntelTab() {
    await loadAllDevices();
    renderDeviceStats();
    renderPlatformChart();
    renderDevicesList();
  }

  // ─── Public API ────────────────────────────────────────────
  window.AdminDeviceIntel = {
    loadAllDevices,
    loadUserDevices,
    renderDeviceStats,
    renderPlatformChart,
    renderDevicesList,
    renderUserDeviceCards,
    getUserDeviceSummary,
    showDeviceDetail,
    closeDeviceDetail,
    handleDeviceFilterChange,
    handleDeviceSearch,
    initDeviceIntelTab,
    getDeviceStatus,
    getDeviceIcon,
    timeAgo,
    formatDate,
    DEVICE_ICONS,
    get allDevices() { return allDevices; },
    get allDeviceStats() { return allDeviceStats; }
  };

})();
