/**
 * MG Coptic Virtual Keyboard (Gboard Style - Exact Screenshot Layout)
 * Supports Coptic alphabet (Uppercase & Lowercase), Jenkim, Overline, Numbers & Symbols.
 * Seamless cursor positioning, pointer events, and mobile virtual keyboard suppression.
 */

(function () {
  'use strict';

  // 1. Data Definitions - Exact Layout Matching Gboard Coptic
  // Row 1 (12 keys): Ⲑ Ⲱ¹ Ⲉ² Ⲣ³ Ⲧ⁴ Ⲯ⁵ Ⲩ⁶ Ⲓ⁷ Ⲟ⁸ Ⲡ⁹ Ⲝ⁰ Ϣ
  const ROW1_KEYS = [
    { upper: 'Ⲑ', lower: 'ⲑ', name: 'ثيتا', hint: '' },
    { upper: 'Ⲱ', lower: 'ⲱ', name: 'أوو', hint: '1' },
    { upper: 'Ⲉ', lower: 'ⲉ', name: 'إي', hint: '2' },
    { upper: 'Ⲣ', lower: 'ⲣ', name: 'رو', hint: '3' },
    { upper: 'Ⲧ', lower: 'ⲧ', name: 'تاف', hint: '4' },
    { upper: 'Ⲯ', lower: 'ⲯ', name: 'إبسي', hint: '5' },
    { upper: 'Ⲩ', lower: 'ⲩ', name: 'إبسيلون', hint: '6' },
    { upper: 'Ⲓ', lower: 'ⲓ', name: 'يوتا', hint: '7' },
    { upper: 'Ⲟ', lower: 'ⲟ', name: 'أو', hint: '8' },
    { upper: 'Ⲡ', lower: 'ⲡ', name: 'بي', hint: '9' },
    { upper: 'Ⲝ', lower: 'ⲝ', name: 'كسي', hint: '0' },
    { upper: 'Ϣ', lower: 'ϣ', name: 'شاي', hint: '' }
  ];

  // Row 2 (12 keys): Ⲁ Ϭ Ⲇ Ϥ Ⲅ Ⲏ Ϫ Ⲕ Ⲗ Ϯ Ϩ Ϧ
  const ROW2_KEYS = [
    { upper: 'Ⲁ', lower: 'ⲁ', name: 'الفا' },
    { upper: 'Ϭ', lower: 'ϭ', name: 'تشيما' },
    { upper: 'Ⲇ', lower: 'ⲇ', name: 'دلتا' },
    { upper: 'Ϥ', lower: 'ϥ', name: 'فاي' },
    { upper: 'Ⲅ', lower: 'ⲅ', name: 'غاما' },
    { upper: 'Ⲏ', lower: 'ⲏ', name: 'إيتا' },
    { upper: 'Ϫ', lower: 'ϫ', name: 'جانجا' },
    { upper: 'Ⲕ', lower: 'ⲕ', name: 'كابا' },
    { upper: 'Ⲗ', lower: 'ⲗ', name: 'لولا' },
    { upper: 'Ϯ', lower: 'ϯ', name: 'تي' },
    { upper: 'Ϩ', lower: 'ϩ', name: 'هوري' },
    { upper: 'Ϧ', lower: 'ϧ', name: 'خاي' }
  ];

  // Row 3 (8 letters + Jenkim, flanked by Shift on left and Backspace on right)
  // [Shift] Ⲍ Ⲭ Ⲥ Ⲫ Ⲃ Ⲛ Ⲙ Ⲋ ◌̀ [Backspace]
  const ROW3_KEYS = [
    { upper: 'Ⲍ', lower: 'ⲍ', name: 'زيتا' },
    { upper: 'Ⲭ', lower: 'ⲭ', name: 'خي' },
    { upper: 'Ⲥ', lower: 'ⲥ', name: 'سيما' },
    { upper: 'Ⲫ', lower: 'ⲫ', name: 'في' },
    { upper: 'Ⲃ', lower: 'ⲃ', name: 'ڤيتا (بيتا)' },
    { upper: 'Ⲛ', lower: 'ⲛ', name: 'ني' },
    { upper: 'Ⲙ', lower: 'ⲙ', name: 'مي' },
    { upper: 'Ⲋ', lower: 'ⲋ', name: 'سو' }
  ];

  // Symbols Rows (?123)
  const SYMBOL_ROWS = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['@', '#', '$', '%', '&', '-', '+', '(', ')', '/'],
    ['*', '"', "'", ':', ';', '!', '?', '«', '»', '⳩']
  ];

  // 2. Keyboard Engine State
  let containerEl = null;
  let activeTarget = null;
  let isShift = false;
  let isSymbols = false;
  let isVisible = false;
  let backspaceTimer = null;
  let backspaceInterval = null;
  let keyPopupEl = null;

  // Selector for all elements that should invoke Coptic Keyboard
  const TARGET_SELECTOR = [
    '.coptic-input',
    'input.coptic',
    'textarea.coptic',
    '[data-coptic-keyboard]',
    '.f-coptic',
    '.f-glyph',
    '#challenge-input-coptic',
    '#write-correct-word',
    '#write-tiles',
    '#fill-blank-correct',
    '#fill-blank-distractors',
    '#fill-blank-user-input',
    '#fill-blank-preview-input',
    '#trace-target-text',
    '.match-left-input',
    '#unit-input-badge',
    '#writing-custom-text'
  ].join(', ');

  function isCopticTarget(el) {
    if (!el || !(el instanceof HTMLElement)) return false;
    return el.matches(TARGET_SELECTOR) || Boolean(el.closest(TARGET_SELECTOR));
  }

  // 3. Prevent native virtual keyboard on mobile for coptic inputs
  function setupInputProtection(el) {
    if (!el || !(el instanceof HTMLElement)) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (!el.hasAttribute('data-orig-inputmode')) {
        el.setAttribute('data-orig-inputmode', el.getAttribute('inputmode') || '');
      }
      el.setAttribute('inputmode', 'none');
      if (!el.classList.contains('coptic-font-applied')) {
        el.style.fontFamily = "'girges', 'Coptic Girges', sans-serif, inherit";
        el.classList.add('coptic-font-applied');
      }
    }
  }

  function scanAndProtectInputs() {
    try {
      const inputs = document.querySelectorAll(TARGET_SELECTOR);
      inputs.forEach(setupInputProtection);
    } catch (e) {
      console.warn('CopticKeyboard: scan error', e);
    }
  }

  // 4. Cursor & Text Manipulation
  function insertCharAtCursor(char) {
    if (!activeTarget) return;

    if (activeTarget.tagName === 'INPUT' || activeTarget.tagName === 'TEXTAREA') {
      const el = activeTarget;
      const start = el.selectionStart ?? el.value.length;
      const end = el.selectionEnd ?? el.value.length;
      const val = el.value || '';

      el.value = val.slice(0, start) + char + val.slice(end);
      const newPos = start + char.length;
      el.selectionStart = newPos;
      el.selectionEnd = newPos;

      el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      el.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      el.focus();
    } else if (activeTarget.isContentEditable) {
      activeTarget.focus();
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(char);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        activeTarget.innerText += char;
      }
      activeTarget.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    }
  }

  function handleBackspace() {
    if (!activeTarget) return;

    if (activeTarget.tagName === 'INPUT' || activeTarget.tagName === 'TEXTAREA') {
      const el = activeTarget;
      const start = el.selectionStart ?? el.value.length;
      const end = el.selectionEnd ?? el.value.length;
      const val = el.value || '';

      if (start !== end) {
        el.value = val.slice(0, start) + val.slice(end);
        el.selectionStart = start;
        el.selectionEnd = start;
      } else if (start > 0) {
        const before = val.slice(0, start);
        const chars = Array.from(before);
        chars.pop();
        const newBefore = chars.join('');
        const removedLength = before.length - newBefore.length;

        el.value = newBefore + val.slice(start);
        el.selectionStart = start - removedLength;
        el.selectionEnd = start - removedLength;
      }

      el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      el.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      el.focus();
    } else if (activeTarget.isContentEditable) {
      activeTarget.focus();
      document.execCommand('delete', false, null);
      activeTarget.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    }
  }

  // 5. DOM Generation & View Rendering
  function buildKeyboardDOM() {
    if (document.getElementById('coptic-virtual-keyboard')) {
      containerEl = document.getElementById('coptic-virtual-keyboard');
      return;
    }

    containerEl = document.createElement('div');
    containerEl.id = 'coptic-virtual-keyboard';
    containerEl.className = 'coptic-keyboard-container';
    containerEl.setAttribute('role', 'region');
    containerEl.setAttribute('aria-label', 'لوحة المفاتيح القبطية');

    containerEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
    });

    renderKeyboardContent();
    document.body.appendChild(containerEl);
  }

  function renderKeyboardContent() {
    if (!containerEl) return;

    let html = `
      <div class="coptic-kb-header">
        <div class="coptic-kb-brand">
          <span class="coptic-kb-brand-icon">Ϯ</span>
          <span>لوحة المفاتيح القبطية — Ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ</span>
        </div>
        <div class="coptic-kb-actions">
          <button type="button" class="coptic-kb-action-btn btn-close-kb" title="إخفاء لوحة المفاتيح">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
      <div class="coptic-kb-body">
    `;

    if (!isSymbols) {
      // --- Coptic Letters Mode ---

      // Row 1 (12 keys): Ⲑ Ⲱ¹ Ⲉ² Ⲣ³ Ⲧ⁴ Ⲯ⁵ Ⲩ⁶ Ⲓ⁷ Ⲟ⁸ Ⲡ⁹ Ⲝ⁰ Ϣ
      html += `<div class="coptic-kb-row">`;
      ROW1_KEYS.forEach(item => {
        const char = isShift ? item.upper : item.lower;
        const hintHtml = item.hint ? `<span class="key-hint">${item.hint}</span>` : '';
        html += `<button type="button" class="coptic-kb-key" data-char="${char}" data-upper="${item.upper}" data-lower="${item.lower}" data-hint="${item.hint}" title="${item.name}">${char}${hintHtml}</button>`;
      });
      html += `</div>`;

      // Row 2 (12 keys): Ⲁ Ϭ Ⲇ Ϥ Ⲅ Ⲏ Ϫ Ⲕ Ⲗ Ϯ Ϩ Ϧ
      html += `<div class="coptic-kb-row">`;
      ROW2_KEYS.forEach(item => {
        const char = isShift ? item.upper : item.lower;
        html += `<button type="button" class="coptic-kb-key" data-char="${char}" data-upper="${item.upper}" data-lower="${item.lower}" title="${item.name}">${char}</button>`;
      });
      html += `</div>`;

      // Row 3: [Shift ⇧] Ⲍ Ⲭ Ⲥ Ⲫ Ⲃ Ⲛ Ⲙ Ⲋ ◌̀ [Backspace ⌫]
      html += `<div class="coptic-kb-row">`;

      // 1. Shift / Capital Button (⇧) on the left
      html += `
        <button type="button" class="coptic-kb-key key-special key-shift ${isShift ? 'shift-active' : ''}" data-action="toggle-shift" title="زر الحروف الكبيرة (Capital / Shift)">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 4l-8 9h5v7h6v-7h5l-8-9z"/>
          </svg>
        </button>
      `;

      // 2. Letters of Row 3
      ROW3_KEYS.forEach(item => {
        const char = isShift ? item.upper : item.lower;
        html += `<button type="button" class="coptic-kb-key" data-char="${char}" data-upper="${item.upper}" data-lower="${item.lower}" title="${item.name}">${char}</button>`;
      });

      // 3. Jenkim Key (◌̀ - U+0300)
      html += `
        <button type="button" class="coptic-kb-key key-diacritic" data-char="\u0300" title="جنكم (Jenkim)">
          &#9676;&#768;
        </button>
      `;

      // 4. Backspace Button (⌫) on the right
      html += `
        <button type="button" class="coptic-kb-key key-special key-backspace" data-action="backspace" title="حذف (Backspace)">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
            <line x1="18" y1="9" x2="12" y2="15"></line>
            <line x1="12" y1="9" x2="18" y2="15"></line>
          </svg>
        </button>
      `;

      html += `</div>`;

      // Row 4: Bottom Row: [?123] [,] [̅ / ⳩] [Ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ] [.] [⌄]
      html += `
        <div class="coptic-kb-row">
          <button type="button" class="coptic-kb-key key-special key-mode" data-action="toggle-symbols" title="أرقام ورموز">?123</button>
          <button type="button" class="coptic-kb-key" data-char="," title="فاصلة">,</button>
          <button type="button" class="coptic-kb-key key-special" data-char="\u0305" title="خط التمييز والاختصار (Overline)">&#9676;&#773;</button>
          <button type="button" class="coptic-kb-key key-space" data-char=" " title="مسافة (Space)">Ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ</button>
          <button type="button" class="coptic-kb-key" data-char="." title="نقطة">.</button>
          <button type="button" class="coptic-kb-key key-special key-hide" data-action="hide" title="إخفاء لوحة المفاتيح">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      `;

    } else {
      // --- Numbers & Symbols Mode (?123) ---
      SYMBOL_ROWS.forEach(row => {
        html += `<div class="coptic-kb-row">`;
        row.forEach(sym => {
          html += `<button type="button" class="coptic-kb-key" data-char="${sym}">${sym}</button>`;
        });
        html += `</div>`;
      });

      // Bottom Row for Symbols
      html += `
        <div class="coptic-kb-row">
          <button type="button" class="coptic-kb-key key-special key-mode" data-action="toggle-symbols" title="العودة للحروف القبطية">ABC</button>
          <button type="button" class="coptic-kb-key" data-char="،">،</button>
          <button type="button" class="coptic-kb-key" data-char="⳩" title="صليب قبطي">⳩</button>
          <button type="button" class="coptic-kb-key key-space" data-char=" " title="مسافة">مسافة</button>
          <button type="button" class="coptic-kb-key" data-char=".">.</button>
          <button type="button" class="coptic-kb-key key-special key-backspace" data-action="backspace" title="حذف">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
              <line x1="18" y1="9" x2="12" y2="15"></line>
              <line x1="12" y1="9" x2="18" y2="15"></line>
            </svg>
          </button>
          <button type="button" class="coptic-kb-key key-special key-hide" data-action="hide" title="إخفاء لوحة المفاتيح">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      `;
    }

    html += `</div>`;
    containerEl.innerHTML = html;
    attachKeyboardEvents();
  }

  // 6. Visual Popup Feedback
  function showKeyPopup(keyEl, text) {
    if (!keyEl || !text || text === ' ' || text.length > 2) return;
    removeKeyPopup();

    keyPopupEl = document.createElement('div');
    keyPopupEl.className = 'coptic-kb-popup';
    keyPopupEl.textContent = text;
    keyEl.appendChild(keyPopupEl);

    setTimeout(removeKeyPopup, 160);
  }

  function removeKeyPopup() {
    if (keyPopupEl) {
      keyPopupEl.remove();
      keyPopupEl = null;
    }
  }

  // 7. Event Handlers
  function attachKeyboardEvents() {
    if (!containerEl) return;

    const closeBtn = containerEl.querySelector('.btn-close-kb');
    if (closeBtn) {
      closeBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        hideKeyboard();
      });
    }

    const keys = containerEl.querySelectorAll('.coptic-kb-key');
    keys.forEach(key => {
      key.addEventListener('pointerdown', onKeyPointerDown);
      key.addEventListener('pointerup', onKeyPointerUp);
      key.addEventListener('pointercancel', onKeyPointerUp);
      key.addEventListener('pointerleave', onKeyPointerUp);
    });
  }

  function onKeyPointerDown(e) {
    e.preventDefault();
    const key = e.currentTarget;
    key.classList.add('pressed');

    const char = key.getAttribute('data-char');
    const action = key.getAttribute('data-action');

    if (char !== null) {
      showKeyPopup(key, char);
      insertCharAtCursor(char);
    } else if (action === 'backspace') {
      handleBackspace();
      clearTimeout(backspaceTimer);
      clearInterval(backspaceInterval);
      backspaceTimer = setTimeout(() => {
        backspaceInterval = setInterval(handleBackspace, 75);
      }, 350);
    } else if (action === 'toggle-shift') {
      // Toggle Capital / Shift Mode
      isShift = !isShift;
      renderKeyboardContent();
    } else if (action === 'toggle-symbols') {
      isSymbols = !isSymbols;
      renderKeyboardContent();
    } else if (action === 'hide') {
      hideKeyboard();
    }
  }

  function onKeyPointerUp(e) {
    const key = e.currentTarget;
    if (key) key.classList.remove('pressed');
    clearTimeout(backspaceTimer);
    clearInterval(backspaceInterval);
    removeKeyPopup();
  }

  // 8. Visibility Control
  function showKeyboard(target) {
    buildKeyboardDOM();
    if (target) {
      activeTarget = target;
      setupInputProtection(target);
    }
    if (!containerEl) return;

    containerEl.classList.add('active');
    isVisible = true;

    if (activeTarget && typeof activeTarget.getBoundingClientRect === 'function') {
      setTimeout(() => {
        try {
          const rect = activeTarget.getBoundingClientRect();
          const kbRect = containerEl.getBoundingClientRect();
          if (rect.bottom > kbRect.top) {
            window.scrollBy({ top: rect.bottom - kbRect.top + 20, behavior: 'smooth' });
          }
        } catch (err) {}
      }, 150);
    }
  }

  function hideKeyboard() {
    if (!containerEl) return;
    containerEl.classList.remove('active');
    isVisible = false;
    clearTimeout(backspaceTimer);
    clearInterval(backspaceInterval);
    removeKeyPopup();

    if (activeTarget && typeof activeTarget.blur === 'function') {
      activeTarget.blur();
    }
  }

  // 9. Document-level Focus & Click Listeners
  function initGlobalListeners() {
    document.addEventListener('focusin', (e) => {
      const target = e.target;
      if (isCopticTarget(target)) {
        showKeyboard(target);
      }
    }, true);

    document.addEventListener('focusout', (e) => {
      setTimeout(() => {
        const active = document.activeElement;
        if (!active || (!isCopticTarget(active) && !containerEl?.contains(active))) {
          if (!containerEl?.contains(document.activeElement)) {
            hideKeyboard();
          }
        }
      }, 120);
    }, true);

    document.addEventListener('pointerdown', (e) => {
      if (!isVisible) return;
      const target = e.target;
      if (containerEl && containerEl.contains(target)) return;
      if (activeTarget && (activeTarget === target || activeTarget.contains(target))) return;
      if (isCopticTarget(target)) return;

      hideKeyboard();
    }, true);

    const observer = new MutationObserver(() => {
      scanAndProtectInputs();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // 10. Initialization
  function init() {
    scanAndProtectInputs();
    initGlobalListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.CopticKeyboard = {
    open: showKeyboard,
    close: hideKeyboard,
    attach: setupInputProtection,
    scan: scanAndProtectInputs,
    getActiveTarget: () => activeTarget,
    isShift: () => isShift,
    isSymbols: () => isSymbols
  };

})();
