/**
 * LetterTracer - مكوّن تتبع رسم الحروف والكلمات القبطية
 * MG COPTIC Letter & Word Tracing Engine
 *
 * Uses opentype.js to extract vector glyph paths from Coptic WOFF/TTF fonts,
 * renders guide paths, samples guide points, tracks touch/mouse pointer events,
 * and calculates tracing accuracy & coverage.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LetterTracer = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Coptic letter name mapping (Arabic -> Unicode Coptic Glyph)
  const COPTIC_NAME_TO_GLYPH = {
    'الفا': 'Ⲁ', 'ألفا': 'Ⲁ', 'الفا الكبير': 'Ⲁ', 'ألفا الكبير': 'Ⲁ', 'الفا الصغير': 'ⲁ', 'ألفا الصغير': 'ⲁ',
    'فيدا': 'Ⲃ', 'بيتا': 'Ⲃ', 'فيدا الصغير': 'ⲃ', 'فيدا الكبير': 'Ⲃ',
    'غاما': 'Ⲅ', 'غما': 'Ⲅ',
    'دلدا': 'Ⲇ', 'دلتا': 'Ⲇ',
    'اي': 'Ⲉ', 'إي': 'Ⲉ', 'إيه': 'Ⲉ',
    'سو': 'ⲋ', 'سوء': 'ⲋ',
    'زيتا': 'Ⲍ',
    'ايتا': 'Ⲏ', 'إيتا': 'Ⲏ',
    'ثيتا': 'Ⲑ',
    'يوطا': 'Ⲓ', 'يوتا': 'Ⲓ',
    'كبا': 'Ⲕ', 'كابا': 'Ⲕ',
    'لافلا': 'Ⲗ', 'لولا': 'Ⲗ', 'لامدا': 'Ⲗ',
    'مي': 'Ⲙ',
    'ني': 'Ⲛ',
    'اكسي': 'Ⲝ', 'إكسي': 'Ⲝ',
    'او': 'Ⲟ', 'أو': 'Ⲟ', 'او القصيرة': 'Ⲟ',
    'بي': 'Ⲡ',
    'رو': 'Ⲣ',
    'سيما': 'Ⲥ',
    'تاو': 'Ⲧ',
    'ابسلون': 'Ⲩ', 'إبسلون': 'Ⲩ', 'ابسيلون': 'Ⲩ', 'إبسيلون': 'Ⲩ',
    'في': 'Ⲫ',
    'كي': 'Ⲭ',
    'بسي': 'Ⲯ', 'ابسي': 'Ⲯ', 'إبسي': 'Ⲯ', 'يوبسي': 'Ⲯ', 'يؤبسي': 'Ⲯ', 'يؤببسي': 'Ⲯ',
    'او الكبير': 'Ⲱ', 'اوميغا': 'Ⲱ', 'أوميغا': 'Ⲱ',
    'شاي': 'Ϣ',
    'فاي': 'Ϥ',
    'خاي': 'Ϧ',
    'هوري': 'Ϩ',
    'جانجا': 'Ϫ',
    'تشيما': 'Ϭ',
    'تي': 'Ϯ'
  };

  // Font cache across tracer instances to avoid duplicate downloads
  const fontCache = {};

  class LetterTracer {
    /**
     * @param {Object} options
     * @param {string|HTMLCanvasElement} options.canvasId Canvas element or its DOM ID
     * @param {string} [options.fontUrl] Path to Coptic font (e.g. 'assets/fonts/girges.woff' or 'girges.woff')
     * @param {string} options.text The letter or word to trace (e.g. 'Ⲁ', 'ⲛⲟⲩϯ')
     * @param {number} [options.fontSize=260] Base font size in px
     * @param {number} [options.strokeWidth=12] User brush stroke width
     * @param {string} [options.strokeColor='#2e6b3e'] User brush stroke color
     * @param {string} [options.guideColor='rgba(111, 23, 55, 0.22)'] Guide background fill
     * @param {string} [options.guideOutlineColor='rgba(111, 23, 55, 0.45)'] Guide outline
     * @param {number} [options.passThreshold=70] Passing score threshold (0-100)
     * @param {number} [options.minCoverageThreshold=60] Minimum coverage required
     * @param {boolean} [options.showGuideDots=true] Whether to show numbered start dots
     * @param {boolean} [options.soundEnabled=true] Play audio chime on success / retry
     * @param {Function} [options.onSuccess] Callback on passing attempt: (score) => void
     * @param {Function} [options.onAttempt] Callback on each attempt: (score) => void
     * @param {Function} [options.onReady] Callback when font is loaded and ready
     */
    constructor(options = {}) {
      this.options = Object.assign(
        {
          fontUrl: 'assets/fonts/girges.woff',
          fontSize: 260,
          strokeWidth: 12,
          strokeColor: '#2e6b3e',
          guideColor: 'rgba(111, 23, 55, 0.22)',
          guideOutlineColor: 'rgba(111, 23, 55, 0.45)',
          passThreshold: 70,
          minCoverageThreshold: 60,
          showGuideDots: false,
          soundEnabled: true,
          onSuccess: null,
          onAttempt: null,
          onIncomplete: null,
          onStrokeEnd: null,
          onReady: null
        },
        options
      );

      this.canvas =
        typeof this.options.canvasId === 'string'
          ? document.getElementById(this.options.canvasId)
          : this.options.canvasId;

      if (!this.canvas) {
        throw new Error(`LetterTracer: Canvas element not found: "${this.options.canvasId}"`);
      }

      this.ctx = this.canvas.getContext('2d');
      this.rawText = String(this.options.text || 'Ⲁ').trim();
      this.text = this._resolveText(this.rawText);
      this.font = null;
      this.path = null;
      this.useCanvasFallback = false;

      // Flattened guide points: [{x, y}, ...]
      this.guidePoints = [];
      // Subpath start points: [{x, y, index}, ...]
      this.guideStarts = [];

      // User drawing state
      this.userStrokes = []; // Array of strokes, each is [{x, y, time}, ...]
      this.currentStroke = null;
      this.isDrawing = false;
      this.hasCompleted = false;

      // Animation & particles
      this.particles = [];
      this.animId = null;

      // Audio context for sound effects
      this.audioCtx = null;

      // Event listener references for clean destroy()
      this._boundPointerDown = this._onPointerDown.bind(this);
      this._boundPointerMove = this._onPointerMove.bind(this);
      this._boundPointerUp = this._onPointerUp.bind(this);
      this._boundPointerCancel = this._onPointerCancel.bind(this);
      this._boundResize = this._onResize.bind(this);

      this._init();
    }

    /* ==========================================================================
       INITIALIZATION & FONT LOADING
       ========================================================================== */

    async _init() {
      // Prevent mobile touch gestures from scrolling the page while tracing
      this.canvas.style.touchAction = 'none';
      this.canvas.style.userSelect = 'none';
      this.canvas.__letterTracerInstance = this;

      this._setupCanvasSize();
      this._bindEvents();

      // IMMEDIATE FIRST RENDER: Show semi-transparent guide text instantly so it's NEVER blank!
      this._prepareCanvasFallbackPath();
      this.draw();

      try {
        await this._ensureOpentype();
        await this._loadFont();
        this._prepareGlyphPath();
        this.draw();

        if (typeof this.options.onReady === 'function') {
          this.options.onReady(this);
        }
      } catch (err) {
        console.warn('LetterTracer vector font failed, using high-precision Canvas 2D fallback:', err);
        this._prepareCanvasFallbackPath();
        this.draw();
      }
    }

    /** Ensure opentype.js library is loaded, dynamically injecting script tag if absent */
    _ensureOpentype() {
      return new Promise((resolve, reject) => {
        if (typeof window.opentype !== 'undefined') {
          return resolve(window.opentype);
        }

        const scriptId = 'opentype-js-cdn';
        let script = document.getElementById(scriptId);

        if (!script) {
          script = document.createElement('script');
          script.id = scriptId;
          script.src = 'https://cdn.jsdelivr.net/npm/opentype.js@latest/dist/opentype.min.js';
          script.async = true;
          document.head.appendChild(script);
        }

        script.addEventListener('load', () => {
          if (typeof window.opentype !== 'undefined') {
            resolve(window.opentype);
          } else {
            reject(new Error('opentype.js loaded but window.opentype is undefined'));
          }
        });

        script.addEventListener('error', () => {
          reject(new Error('Failed to load opentype.js from CDN'));
        });
      });
    }

    /** Load font via opentype with memory caching */
    _loadFont() {
      const url = this.options.fontUrl || 'assets/fonts/girges.woff';

      if (fontCache[url]) {
        this.font = fontCache[url];
        return Promise.resolve(this.font);
      }

      // Check if any cached font exists
      for (const k in fontCache) {
        if (fontCache[k]) {
          this.font = fontCache[k];
          return Promise.resolve(this.font);
        }
      }

      const candidates = [
        url,
        url.startsWith('/') ? url.substring(1) : `/${url}`,
        url.startsWith('../') ? url.replace(/^\.\.\//, '') : `../${url}`,
        'girges.woff',
        '/girges.woff',
        '../girges.woff',
        'assets/fonts/girges.woff',
        '/assets/fonts/girges.woff',
        '../assets/fonts/girges.woff'
      ];
      // remove duplicates
      const uniqueCandidates = [...new Set(candidates)];

      return new Promise((resolve, reject) => {
        let index = 0;
        const tryNext = () => {
          if (index >= uniqueCandidates.length) {
            reject(new Error('Could not load Coptic font girges.woff from any candidate path'));
            return;
          }
          const currentUrl = uniqueCandidates[index++];
          fetch(currentUrl)
            .then(res => {
              if (!res.ok) throw new Error('HTTP ' + res.status);
              return res.arrayBuffer();
            })
            .then(buffer => {
              const font = (typeof window.opentype?.parse === 'function')
                ? window.opentype.parse(buffer)
                : null;
              if (!font) throw new Error('Could not parse font buffer');
              fontCache[url] = font;
              fontCache[currentUrl] = font;
              this.font = font;
              resolve(font);
            })
            .catch(() => {
              if (typeof window.opentype?.load === 'function') {
                window.opentype.load(currentUrl, (err, font) => {
                  if (err || !font) {
                    tryNext();
                  } else {
                    fontCache[url] = font;
                    fontCache[currentUrl] = font;
                    this.font = font;
                    resolve(font);
                  }
                });
              } else {
                tryNext();
              }
            });
        };
        tryNext();
      });
    }

    /* ==========================================================================
       CANVAS & DPI MANAGEMENT
       ========================================================================== */

    _setupCanvasSize() {
      const rect = this.canvas.getBoundingClientRect();
      const parent = this.canvas.parentElement;
      const width = Math.max(120, Math.round(rect.width || this.canvas.clientWidth || (parent ? parent.clientWidth : 0) || 320));
      const height = Math.max(120, Math.round(rect.height || this.canvas.clientHeight || (parent ? parent.clientHeight : 0) || 280));

      this.dpr = window.devicePixelRatio || 1;
      this.displayWidth = width;
      this.displayHeight = height;

      this.canvas.width = Math.round(width * this.dpr);
      this.canvas.height = Math.round(height * this.dpr);

      this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale
      this.ctx.scale(this.dpr, this.dpr);
    }

    _onResize() {
      const prevW = this.displayWidth;
      const prevH = this.displayHeight;
      const prevFontSize = this.calculatedFontSize || 100;
      const prevCenterX = prevW / 2;
      const prevCenterY = prevH / 2;

      this._setupCanvasSize();

      if (this.displayWidth !== prevW || this.displayHeight !== prevH) {
        // Re-prepare glyph path to calculate the new optimal font size and dimensions
        this._prepareGlyphPath();
        const newFontSize = this.calculatedFontSize || 100;
        const newCenterX = this.displayWidth / 2;
        const newCenterY = this.displayHeight / 2;

        const uniformScale = (prevFontSize > 0 && newFontSize > 0)
          ? (newFontSize / prevFontSize)
          : Math.min(this.displayWidth / (prevW || 1), this.displayHeight / (prevH || 1));

        // Uniformly scale user strokes aligned with glyph center to prevent distortion
        if (prevW > 0 && prevH > 0 && uniformScale > 0) {
          for (const stroke of this.userStrokes) {
            if (stroke.strokeWidth) {
              stroke.strokeWidth = Math.max(3, Math.min(48, Math.round(stroke.strokeWidth * uniformScale)));
            }
            for (const pt of stroke) {
              pt.x = newCenterX + (pt.x - prevCenterX) * uniformScale;
              pt.y = newCenterY + (pt.y - prevCenterY) * uniformScale;
            }
          }
          if (this.currentStroke) {
            if (this.currentStroke.strokeWidth) {
              this.currentStroke.strokeWidth = Math.max(3, Math.min(48, Math.round(this.currentStroke.strokeWidth * uniformScale)));
            }
            for (const pt of this.currentStroke) {
              pt.x = newCenterX + (pt.x - prevCenterX) * uniformScale;
              pt.y = newCenterY + (pt.y - prevCenterY) * uniformScale;
            }
          }
        }
      }
      this.draw();
    }

    /** Trigger manual canvas resize (e.g. after zoom or layout change) */
    resize() {
      this._onResize();
    }

    /* ==========================================================================
       GLYPH PATH EXTRACTION & SMART WORD SPACING
       ========================================================================== */


    /**
     * Resolve raw text input: if user passed Arabic letter name (e.g. "يؤبسي" or "ألفا"),
     * map it to the authentic Coptic Unicode glyph. If text contains mixed characters,
     * extract the Coptic sequence.
     */
    _resolveText(input) {
      const str = String(input || '').trim();
      if (!str) return 'Ⲁ';

      // 1. If string contains Unicode Coptic characters, extract them
      const copticMatches = str.match(/[\u2C80-\u2CFF\u0370-\u03FF]+/g);
      if (copticMatches && copticMatches.length > 0) {
        return copticMatches.join('');
      }

      // 2. Check direct mapping from Arabic name to Coptic glyph
      const normalized = str.replace(/[\s\-_()]/g, '');
      if (COPTIC_NAME_TO_GLYPH[normalized]) {
        return COPTIC_NAME_TO_GLYPH[normalized];
      }

      // 3. Substring match for Arabic names
      for (const name in COPTIC_NAME_TO_GLYPH) {
        if (normalized.includes(name) || name.includes(normalized)) {
          return COPTIC_NAME_TO_GLYPH[name];
        }
      }

      // 4. Latin transliteration fallback (Capital -> Capital Coptic, Small -> Small Coptic)
      const latinMap = {
        'A': 'Ⲁ', 'B': 'Ⲃ', 'G': 'Ⲅ', 'D': 'Ⲇ', 'E': 'Ⲉ', 'Z': 'Ⲍ', 'H': 'Ⲏ', 'Q': 'Ⲑ',
        'I': 'Ⲓ', 'K': 'Ⲕ', 'L': 'Ⲗ', 'M': 'Ⲙ', 'N': 'Ⲛ', 'X': 'Ⲝ', 'O': 'Ⲟ', 'P': 'Ⲡ',
        'R': 'Ⲣ', 'S': 'Ⲥ', 'T': 'Ⲧ', 'U': 'Ⲩ', 'V': 'Ⲃ', 'W': 'Ⲱ', 'F': 'Ⲫ', 'C': 'Ϭ', 'J': 'Ϫ', 'Y': 'Ⲩ',
        'a': 'ⲁ', 'b': 'ⲃ', 'g': 'ⲅ', 'd': 'ⲇ', 'e': 'ⲉ', 'z': 'ⲍ', 'h': 'ⲏ', 'q': 'ⲑ',
        'i': 'ⲓ', 'k': 'ⲕ', 'l': 'ⲗ', 'm': 'ⲙ', 'n': 'ⲛ', 'x': 'ⲝ', 'o': 'ⲟ', 'p': 'ⲡ',
        'r': 'ⲣ', 's': 'ⲥ', 't': 'ⲧ', 'u': 'ⲩ', 'v': 'ⲃ', 'w': 'ⲱ', 'f': 'ⲫ', 'c': 'ϭ', 'j': 'ϫ', 'y': 'ⲩ'
      };
      let latinResolved = str
        .replace(/Sh/g, 'Ϣ').replace(/sh/g, 'ϣ').replace(/SH/g, 'Ϣ')
        .replace(/Kh/g, 'Ϧ').replace(/kh/g, 'ϧ').replace(/KH/g, 'Ϧ')
        .replace(/Ti/g, 'Ϯ').replace(/ti/g, 'ϯ').replace(/TI/g, 'Ϯ')
        .replace(/Ps/g, 'Ⲯ').replace(/ps/g, 'ⲯ').replace(/PS/g, 'Ⲯ')
        .replace(/Hh/g, 'Ϩ').replace(/hh/g, 'ϩ').replace(/HH/g, 'Ϩ')
        .replace(/[A-Za-z]/g, ch => latinMap[ch] || ch);
      
      const newMatches = latinResolved.match(/[\u2C80-\u2CFF\u0370-\u03FF]+/g);
      if (newMatches && newMatches.length > 0) {
        return newMatches.join('');
      }

      return str;
    }

    /**
     * Break word into logical glyph units, keeping combining diacritical marks
     * (like Jinkim `̀` or accents) attached to their preceding base letter.
     */
    _getGlyphUnits(text) {
      if (!text) return [];
      const rawChars = Array.from(text);
      const units = [];
      for (let i = 0; i < rawChars.length; i++) {
        const ch = rawChars[i];
        if (!ch || ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') continue;
        const isCombining = /[\u0300-\u036F\u1DC0-\u1DFF\u2CFF]/.test(ch);
        if (isCombining && units.length > 0) {
          units[units.length - 1] += ch;
        } else {
          units.push(ch);
        }
      }
      return units;
    }

    /**
     * Smart word and letter glyph scaling:
     * - Uses full horizontal canvas width with minimal side padding (4%).
     * - For words, maximizes character font size and spaces letters across the width
     *   so tracing each letter is comfortable and large on touchscreen devices.
     */
    _prepareGlyphPath() {
      if (!this.text) return;
      this.useCanvasFallback = false;
      this.fallbackUnits = [];

      const paddingX = Math.max(22, Math.round(this.displayWidth * 0.08));
      const paddingY = Math.max(22, Math.round(this.displayHeight * 0.09));
      const maxW = Math.max(60, this.displayWidth - paddingX * 2);
      const maxH = Math.max(60, this.displayHeight - paddingY * 2);

      const glyphUnits = this._getGlyphUnits(this.text);
      const numUnits = glyphUnits.length;
      if (numUnits === 0) return;

      // If font is not loaded or opentype is not available, use Canvas 2D fallback immediately
      if (!this.font) {
        this._prepareCanvasFallbackPath();
        return;
      }

      try {
        if (numUnits === 1) {
          // --- SINGLE LETTER: MAXIMIZE TO FILL CHALKBOARD GRACEFULLY ---
          const testSize = 100;
          const testPath = this.font.getPath(glyphUnits[0], 0, 0, testSize);
          const bbox = testPath ? testPath.getBoundingBox() : null;
          let bbW = bbox ? (bbox.x2 - bbox.x1) : 0;
          let bbH = bbox ? (bbox.y2 - bbox.y1) : 0;

          if (!testPath || !testPath.commands || testPath.commands.length === 0 || bbW <= 0 || bbH <= 0) {
            this._prepareCanvasFallbackPath();
            return;
          }

          const scaleW = maxW / bbW;
          const scaleH = maxH / bbH;
          let fontSize = Math.floor(testSize * Math.min(scaleW, scaleH) * 0.82);
          fontSize = Math.max(26, Math.min(fontSize, 320));
          this.calculatedFontSize = fontSize;

          const finalPath = this.font.getPath(glyphUnits[0], 0, 0, fontSize);
          const finalBbox = finalPath.getBoundingBox();
          const finalW = finalBbox.x2 - finalBbox.x1;
          const finalH = finalBbox.y2 - finalBbox.y1;

          const targetCenterX = this.displayWidth / 2;
          const targetCenterY = this.displayHeight / 2;
          const offsetX = targetCenterX - (finalBbox.x1 + finalW / 2);
          const offsetY = targetCenterY - (finalBbox.y1 + finalH / 2);

          this.path = this.font.getPath(glyphUnits[0], offsetX, offsetY, fontSize);
          this._flattenPathToGuidePoints();
          return;
        }

        // --- MULTI-LETTER (WORD OR LETTER PAIRS LIKE Ⲁⲁ): SMART HORIZONTAL SPACING ---
        // 1. Measure each individual glyph unit at reference testSize = 100
        const testSize = 100;
        const metrics100 = [];
        let sumW100 = 0;
        let maxH100 = 0;

        for (let i = 0; i < numUnits; i++) {
          const unit = glyphUnits[i];
          const uPath = this.font.getPath(unit, 0, 0, testSize);
          const b = uPath ? uPath.getBoundingBox() : null;
          const w = b ? (b.x2 - b.x1) : (testSize * 0.45);
          const h = b ? (b.y2 - b.y1) : (testSize * 0.7);

          if (w <= 0 || h <= 0) {
            const fbW = testSize * 0.45;
            metrics100.push({ unit, w: fbW, h: testSize * 0.7, b: null });
            sumW100 += fbW;
          } else {
            metrics100.push({ unit, w, h, b });
            sumW100 += w;
            if (h > maxH100) maxH100 = h;
          }
        }

        if (maxH100 <= 0 || sumW100 <= 0) {
          this._prepareCanvasFallbackPath();
          return;
        }

        // 2. Calculate optimal font size to fit within both maxW and maxH
        const sizeH = Math.floor(testSize * (maxH / maxH100) * 0.82);
        const numGaps = numUnits - 1;
        const minSpacingRatio = 0.20;
        const totalWidthRatio = (sumW100 / testSize) + (numGaps * minSpacingRatio);
        const sizeW = Math.floor(maxW / totalWidthRatio);

        let optFontSize = Math.min(sizeH, sizeW);
        optFontSize = Math.max(24, Math.min(optFontSize, 260));
        this.calculatedFontSize = optFontSize;

        // 3. Measure glyphs at optFontSize & determine shared baseline
        const actualGlyphs = [];
        let totalGlyphsW = 0;
        let minY = Infinity, maxY = -Infinity;

        for (let i = 0; i < numUnits; i++) {
          const unit = glyphUnits[i];
          const uPath = this.font.getPath(unit, 0, 0, optFontSize);
          const b = uPath ? uPath.getBoundingBox() : null;
          const w = b ? (b.x2 - b.x1) : (optFontSize * 0.45);
          const h = b ? (b.y2 - b.y1) : (optFontSize * 0.7);
          actualGlyphs.push({ unit, w, h, b });
          totalGlyphsW += w;
          if (b) {
            if (b.y1 < minY) minY = b.y1;
            if (b.y2 > maxY) maxY = b.y2;
          }
        }

        if (minY === Infinity) { minY = -optFontSize * 0.7; maxY = 0; }

        // 4. Distribute the remaining horizontal space evenly between characters
        const extraW = maxW - totalGlyphsW;
        let charSpacing = 0;
        if (numGaps > 0) {
          const idealSpacing = extraW / numGaps;
          const maxAllowedSpacing = optFontSize * 0.50;
          charSpacing = Math.max(Math.round(optFontSize * 0.16), Math.min(idealSpacing, maxAllowedSpacing));
        }

        // Total width of the spaced characters
        const totalWordSpan = totalGlyphsW + numGaps * charSpacing;
        let currentX = Math.round((this.displayWidth - totalWordSpan) / 2);
        const targetCenterY = this.displayHeight / 2;
        const commonBaselineY = Math.round(targetCenterY - (minY + maxY) / 2);

        // 5. Combine individual glyph paths into one master opentype.Path
        const combinedPath = new window.opentype.Path();

        for (let i = 0; i < numUnits; i++) {
          const g = actualGlyphs[i];
          const unit = g.unit;

          if (!g.b) {
            currentX += g.w + charSpacing;
            continue;
          }

          const charOffsetX = currentX - g.b.x1;
          const charOffsetY = commonBaselineY;

          const chFinalPath = this.font.getPath(unit, charOffsetX, charOffsetY, optFontSize);
          if (chFinalPath && chFinalPath.commands) {
            for (let c = 0; c < chFinalPath.commands.length; c++) {
              combinedPath.commands.push(chFinalPath.commands[c]);
            }
          }

          currentX += g.w + charSpacing;
        }

        this.path = combinedPath;
        this._flattenPathToGuidePoints();
      } catch (e) {
        console.warn('Opentype getPath error, falling back to Canvas 2D:', e);
        this._prepareCanvasFallbackPath();
      }
    }

    /**
     * High-reliability Canvas 2D raster fallback:
     * Renders characters spaced across the canvas and samples edge points for tracing.
     */
    _prepareCanvasFallbackPath(fontSize) {
      this.useCanvasFallback = true;
      this.path = null;
      this.guidePoints = [];
      this.guideStarts = [];
      this.fallbackUnits = [];

      const w = this.displayWidth;
      const h = this.displayHeight;
      const actualText = this.text || 'Ⲁ';
      const glyphUnits = this._getGlyphUnits(actualText);
      const numUnits = glyphUnits.length;
      if (numUnits === 0) return;

      const paddingX = Math.max(22, Math.round(w * 0.08));
      const paddingY = Math.max(22, Math.round(h * 0.09));
      const maxW = Math.max(60, w - paddingX * 2);
      const maxH = Math.max(60, h - paddingY * 2);

      const offCanvas = document.createElement('canvas');
      offCanvas.width = Math.max(10, Math.round(w));
      offCanvas.height = Math.max(10, Math.round(h));
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      if (numUnits === 1) {
        let size = fontSize || Math.min(260, Math.round(Math.min(maxW, maxH) * 0.82));
        offCtx.font = `bold ${size}px "girges", "Coptic Girges", "Noto Sans Coptic", Cairo, sans-serif`;
        let measuredW = offCtx.measureText(glyphUnits[0]).width || (size * 0.7);
        if (measuredW > maxW) {
          size = Math.max(26, Math.floor(size * (maxW / measuredW)));
        }
        this.calculatedFontSize = size;
        this.fallbackUnits = [{ text: glyphUnits[0], x: w / 2, y: h / 2, size }];

        offCtx.font = `bold ${size}px "girges", "Coptic Girges", "Noto Sans Coptic", Cairo, sans-serif`;
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.fillStyle = '#000000';
        offCtx.fillText(glyphUnits[0], w / 2, h / 2);
      } else {
        const testSize = 100;
        offCtx.font = `bold ${testSize}px "girges", "Coptic Girges", "Noto Sans Coptic", Cairo, sans-serif`;
        let sumW100 = 0;
        const unitMetrics = [];
        for (let i = 0; i < numUnits; i++) {
          const uW = offCtx.measureText(glyphUnits[i]).width || (testSize * 0.55);
          unitMetrics.push(uW);
          sumW100 += uW;
        }

        const numGaps = numUnits - 1;
        const minSpacingRatio = 0.20;
        const totalWidthRatio = (sumW100 / testSize) + (numGaps * minSpacingRatio);
        const sizeW = Math.floor(maxW / totalWidthRatio);
        const sizeH = Math.floor(maxH * 0.78);
        let optFontSize = Math.min(sizeH, sizeW);
        optFontSize = Math.max(24, Math.min(optFontSize, 240));
        this.calculatedFontSize = optFontSize;

        offCtx.font = `bold ${optFontSize}px "girges", "Coptic Girges", "Noto Sans Coptic", Cairo, sans-serif`;
        let totalGlyphsW = 0;
        const actualWidths = [];
        for (let i = 0; i < numUnits; i++) {
          const uW = offCtx.measureText(glyphUnits[i]).width || (optFontSize * 0.55);
          actualWidths.push(uW);
          totalGlyphsW += uW;
        }

        const extraW = maxW - totalGlyphsW;
        let charSpacing = 0;
        if (numGaps > 0) {
          const idealSpacing = extraW / numGaps;
          const maxAllowedSpacing = optFontSize * 0.85;
          charSpacing = Math.max(Math.round(optFontSize * 0.18), Math.min(idealSpacing, maxAllowedSpacing));
        }

        const totalWordSpan = totalGlyphsW + numGaps * charSpacing;
        let curX = Math.round((w - totalWordSpan) / 2);
        const targetY = h / 2;

        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.fillStyle = '#000000';

        for (let i = 0; i < numUnits; i++) {
          const uW = actualWidths[i];
          const charCenterX = curX + uW / 2;
          this.fallbackUnits.push({ text: glyphUnits[i], x: charCenterX, y: targetY, size: optFontSize });
          offCtx.fillText(glyphUnits[i], charCenterX, targetY);
          curX += uW + charSpacing;
        }
      }

      try {
        const imgData = offCtx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const step = 4;
        let isFirst = true;
        for (let y = 0; y < h; y += step) {
          for (let x = 0; x < w; x += step) {
            const alpha = data[(y * w + x) * 4 + 3];
            if (alpha > 70) {
              this.guidePoints.push({ x, y });
              if (isFirst) {
                this.guideStarts.push({ x, y, index: 1 });
                isFirst = false;
              }
            }
          }
        }
      } catch (err) {
        for (const u of this.fallbackUnits) {
          for (let rad = 15; rad <= 50; rad += 15) {
            for (let a = 0; a < Math.PI * 2; a += 0.5) {
              this.guidePoints.push({ x: u.x + Math.cos(a) * rad, y: u.y + Math.sin(a) * rad });
            }
          }
        }
        this.guideStarts.push({ x: w / 2, y: h / 2 - 30, index: 1 });
      }
    }

    /**
     * Flatten Bezier curves and line commands into discrete equidistant points
     * along the glyph perimeter and contours.
     */
    _flattenPathToGuidePoints() {
      this.guidePoints = [];
      this.guideStarts = [];

      if (!this.path || !this.path.commands) return;

      const stepSize = 3; // sample every 3px for high precision
      let curX = 0;
      let curY = 0;
      let subpathIndex = 0;

      for (let i = 0; i < this.path.commands.length; i++) {
        const cmd = this.path.commands[i];

        if (cmd.type === 'M') {
          curX = cmd.x;
          curY = cmd.y;
          this.guidePoints.push({ x: curX, y: curY });
          subpathIndex++;
          this.guideStarts.push({
            x: curX,
            y: curY,
            index: subpathIndex
          });
        } else if (cmd.type === 'L') {
          const dx = cmd.x - curX;
          const dy = cmd.y - curY;
          const dist = Math.hypot(dx, dy);
          const steps = Math.max(1, Math.ceil(dist / stepSize));

          for (let s = 1; s <= steps; s++) {
            const t = s / steps;
            this.guidePoints.push({
              x: curX + dx * t,
              y: curY + dy * t
            });
          }
          curX = cmd.x;
          curY = cmd.y;
        } else if (cmd.type === 'Q') {
          // Quadratic Bezier: P0=(curX, curY), P1=(cmd.x1, cmd.y1), P2=(cmd.x, cmd.y)
          const p0 = { x: curX, y: curY };
          const p1 = { x: cmd.x1, y: cmd.y1 };
          const p2 = { x: cmd.x, y: cmd.y };
          const approxLen = Math.hypot(p1.x - p0.x, p1.y - p0.y) + Math.hypot(p2.x - p1.x, p2.y - p1.y);
          const steps = Math.max(2, Math.ceil(approxLen / stepSize));

          for (let s = 1; s <= steps; s++) {
            const t = s / steps;
            const omt = 1 - t;
            const x = omt * omt * p0.x + 2 * omt * t * p1.x + t * t * p2.x;
            const y = omt * omt * p0.y + 2 * omt * t * p1.y + t * t * p2.y;
            this.guidePoints.push({ x, y });
          }
          curX = cmd.x;
          curY = cmd.y;
        } else if (cmd.type === 'C') {
          // Cubic Bezier: P0=(curX, curY), P1=(cmd.x1, cmd.y1), P2=(cmd.x2, cmd.y2), P3=(cmd.x, cmd.y)
          const p0 = { x: curX, y: curY };
          const p1 = { x: cmd.x1, y: cmd.y1 };
          const p2 = { x: cmd.x2, y: cmd.y2 };
          const p3 = { x: cmd.x, y: cmd.y };
          const approxLen =
            Math.hypot(p1.x - p0.x, p1.y - p0.y) +
            Math.hypot(p2.x - p1.x, p2.y - p1.y) +
            Math.hypot(p3.x - p2.x, p3.y - p2.y);
          const steps = Math.max(2, Math.ceil(approxLen / stepSize));

          for (let s = 1; s <= steps; s++) {
            const t = s / steps;
            const omt = 1 - t;
            const x =
              omt * omt * omt * p0.x +
              3 * omt * omt * t * p1.x +
              3 * omt * t * t * p2.x +
              t * t * t * p3.x;
            const y =
              omt * omt * omt * p0.y +
              3 * omt * omt * t * p1.y +
              3 * omt * t * t * p2.y +
              t * t * t * p3.y;
            this.guidePoints.push({ x, y });
          }
          curX = cmd.x;
          curY = cmd.y;
        } else if (cmd.type === 'Z') {
          // Close path - connect back to first point of subpath
          if (this.guideStarts.length > 0) {
            const start = this.guideStarts[this.guideStarts.length - 1];
            const dx = start.x - curX;
            const dy = start.y - curY;
            const dist = Math.hypot(dx, dy);
            const steps = Math.max(1, Math.ceil(dist / stepSize));

            for (let s = 1; s <= steps; s++) {
              const t = s / steps;
              this.guidePoints.push({
                x: curX + dx * t,
                y: curY + dy * t
              });
            }
            curX = start.x;
            curY = start.y;
          }
        }
      }
    }

    /* ==========================================================================
       RENDERING
       ========================================================================== */

    draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);

      // 1. Draw dashed parchment guidelines (crosshairs / baseline)
      this._drawGuideGrid();

      // 2. Draw the font glyph guide
      if (this.path && this.path.commands && this.path.commands.length > 0) {
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < this.path.commands.length; i++) {
          const cmd = this.path.commands[i];
          if (cmd.type === 'M') ctx.moveTo(cmd.x, cmd.y);
          else if (cmd.type === 'L') ctx.lineTo(cmd.x, cmd.y);
          else if (cmd.type === 'C') ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
          else if (cmd.type === 'Q') ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
          else if (cmd.type === 'Z') ctx.closePath();
        }

        if (this.hasCompleted) {
          // Glow green upon completion
          ctx.fillStyle = 'rgba(46, 107, 62, 0.35)';
          ctx.shadowColor = 'rgba(46, 107, 62, 0.5)';
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.strokeStyle = '#2e6b3e';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
        } else {
          // Semi-transparent ghost watermark without any dotted border
          ctx.fillStyle = this.options.guideColor || 'rgba(111, 23, 55, 0.22)';
          ctx.shadowBlur = 0;
          ctx.fill();
        }
        ctx.restore();
      } else {
        // High-reliability Canvas 2D Semi-Transparent Rendering
        const unitsToRender = (this.fallbackUnits && this.fallbackUnits.length > 0)
          ? this.fallbackUnits
          : [{ text: this.text || this.rawText || 'ⲁ', x: this.displayWidth / 2, y: this.displayHeight / 2, size: this.calculatedFontSize || 120 }];

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let u = 0; u < unitsToRender.length; u++) {
          const unit = unitsToRender[u];
          ctx.font = `bold ${unit.size}px "girges", "Coptic Girges", "Noto Sans Coptic", Cairo, sans-serif`;
          if (this.hasCompleted) {
            ctx.fillStyle = 'rgba(46, 107, 62, 0.35)';
            ctx.shadowColor = 'rgba(46, 107, 62, 0.5)';
            ctx.shadowBlur = 14;
            ctx.fillText(unit.text, unit.x, unit.y);
            ctx.strokeStyle = '#2e6b3e';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeText(unit.text, unit.x, unit.y);
          } else {
            // Semi-transparent ghost watermark without any dotted border
            ctx.fillStyle = this.options.guideColor || 'rgba(111, 23, 55, 0.22)';
            ctx.shadowBlur = 0;
            ctx.fillText(unit.text, unit.x, unit.y);
          }
        }
        ctx.restore();
      }

      // 3. Draw user strokes
      this._drawUserStrokes();

      // 4. Draw Guide Dots (numbered starting points for each subpath)
      if (this.options.showGuideDots && !this.hasCompleted && this.guideStarts.length > 0) {
        this._drawGuideDots();
      }

      // 5. Draw active particle effects (confetti)
      if (this.particles.length > 0) {
        this._drawParticles();
      }
    }

    _drawGuideGrid() {
      const ctx = this.ctx;
      const w = this.displayWidth;
      const h = this.displayHeight;

      ctx.save();
      // Subtle horizontal centerline guideline matching reference sample
      ctx.strokeStyle = 'rgba(215, 205, 195, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([5, 6]);

      // Center horizontal line
      ctx.beginPath();
      ctx.moveTo(12, h / 2);
      ctx.lineTo(w - 12, h / 2);
      ctx.stroke();

      ctx.restore();
    }

    _drawUserStrokes() {
      const ctx = this.ctx;
      const allStrokes = [...this.userStrokes];
      if (this.currentStroke && this.currentStroke.length > 0) {
        allStrokes.push(this.currentStroke);
      }

      if (allStrokes.length === 0) return;

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let s = 0; s < allStrokes.length; s++) {
        const stroke = allStrokes[s];
        if (stroke.length === 0) continue;

        const strokeWidth = stroke.strokeWidth || this.options.strokeWidth;

        ctx.beginPath();
        ctx.strokeStyle = this.hasCompleted ? '#2e6b3e' : this.options.strokeColor;
        ctx.lineWidth = strokeWidth;

        if (stroke.length === 1) {
          ctx.arc(stroke[0].x, stroke[0].y, strokeWidth / 2, 0, Math.PI * 2);
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fill();
        } else {
          ctx.moveTo(stroke[0].x, stroke[0].y);
          for (let i = 1; i < stroke.length; i++) {
            ctx.lineTo(stroke[i].x, stroke[i].y);
          }
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    _drawGuideDots() {
      // Guide dots / numbers intentionally disabled per user request
      return;
    }

    /* ==========================================================================
       POINTER EVENT HANDLERS (MOUSE & TOUCH UNIFIED)
       ========================================================================== */

    _bindEvents() {
      this.canvas.addEventListener('pointerdown', this._boundPointerDown);
      this.canvas.addEventListener('pointermove', this._boundPointerMove);
      this.canvas.addEventListener('pointerup', this._boundPointerUp);
      this.canvas.addEventListener('pointercancel', this._boundPointerCancel);
      window.addEventListener('resize', this._boundResize);
    }

    _unbindEvents() {
      this.canvas.removeEventListener('pointerdown', this._boundPointerDown);
      this.canvas.removeEventListener('pointermove', this._boundPointerMove);
      this.canvas.removeEventListener('pointerup', this._boundPointerUp);
      this.canvas.removeEventListener('pointercancel', this._boundPointerCancel);
      window.removeEventListener('resize', this._boundResize);
    }

    _getPointerPos(e) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * (this.displayWidth / (rect.width || 1)),
        y: (e.clientY - rect.top) * (this.displayHeight / (rect.height || 1)),
        time: Date.now()
      };
    }

    _onPointerDown(e) {
      if (this.hasCompleted) return;
      e.preventDefault();

      try {
        this.canvas.setPointerCapture(e.pointerId);
      } catch (_) {}

      this.isDrawing = true;
      const pt = this._getPointerPos(e);
      this.currentStroke = [pt];
      this.currentStroke.strokeWidth = this.options.strokeWidth;
      this.draw();
    }

    _onPointerMove(e) {
      if (!this.isDrawing || !this.currentStroke) return;
      e.preventDefault();

      const pt = this._getPointerPos(e);
      const lastPt = this.currentStroke[this.currentStroke.length - 1];

      // Only add point if moved at least 2px to avoid bloat
      if (!lastPt || Math.hypot(pt.x - lastPt.x, pt.y - lastPt.y) >= 2) {
        this.currentStroke.push(pt);
        this.draw();
      }
    }

    _onPointerUp(e) {
      if (!this.isDrawing) return;
      this.isDrawing = false;

      try {
        this.canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}

      if (this.currentStroke && this.currentStroke.length > 0) {
        this.userStrokes.push(this.currentStroke);
        this.currentStroke = null;
      }

      this.draw();
      if (typeof this.options.onStrokeEnd === 'function') {
        this.options.onStrokeEnd(this.userStrokes.length);
      }
    }

    _onPointerCancel(e) {
      this.isDrawing = false;
      this.currentStroke = null;
      this.draw();
    }

    /* ==========================================================================
       SCORING & ACCURACY EVALUATION (الخوارزمية الصارمة الجديدة)
       ========================================================================== */

    /**
     * خوارزمية ذكية ومتكيفة لحساب دقة الرسم تتناسب مع جميع أحجام الفرشاة وجميع أشكال الحروف
     * @param {Array} userPoints نقاط رسمة الطالب
     * @param {Array} guidePoints نقاط مسار الحرف
     * @param {Object} boundingBox أبعاد الحرف
     * @returns {Object} { score, coverage, precision, lengthRatio, passed, isComplete, reason }
     */
    calculateTracingScore(userPoints, guidePoints, boundingBox) {
      if (!userPoints || userPoints.length < 5) {
        return { score: 0, coverage: 0, precision: 0, lengthRatio: 0, passed: false, isComplete: false, reason: 'الرسمة قصيرة جدًا' };
      }

      const bbWidth = (boundingBox && boundingBox.width) || this.displayWidth || 240;
      const bbHeight = (boundingBox && boundingBox.height) || this.displayHeight || 240;

      // 1) حساب سمك الفرشاة الفعلي المستخدم من الطالب
      let effectiveStrokeWidth = (this.options && this.options.strokeWidth) || 12;
      if (this.userStrokes && this.userStrokes.length > 0) {
        let sumW = 0, countW = 0;
        for (const s of this.userStrokes) {
          if (s.strokeWidth) {
            sumW += s.strokeWidth;
            countW++;
          }
        }
        if (countW > 0) effectiveStrokeWidth = sumW / countW;
      }
      const brushRadius = Math.max(3, effectiveStrokeWidth / 2);

      // 2) حساب مقياس الحرف الهندسي المتوازن (Geometric Scale) لجميع الحروف (طويلة، عريضة، صغيرة)
      const charScale = Math.max(70, Math.sqrt(bbWidth * bbHeight));

      // 3) عتبة التغطية المتكيفة طرديًا مع سمك الفرشاة وحجم الحرف
      // حبر الفرشاة يغطي مساحة دائرية بنصف قطر brushRadius مع هامش طبيعي لسمك خطوط الحرف
      const coverageThreshold = Math.max(18, brushRadius * 1.25 + charScale * 0.065 + 6);

      // 4) عتبة الدقة المتكيفة مع الفرشاة (تمنع معاقبة من يرسم في منتصف خط الحرف العريض)
      const precisionThreshold = Math.max(22, brushRadius * 1.45 + charScale * 0.08 + 8);

      // 5) عتبة الشطط الأقصى (للخطوط الخارجة تماماً عن الحرف)
      const farThreshold = Math.max(45, precisionThreshold * 2.0 + 15);

      function distToNearest(point, targetArray) {
        let min = Infinity;
        for (let i = 0; i < targetArray.length; i++) {
          const t = targetArray[i];
          const d = Math.hypot(point.x - t.x, point.y - t.y);
          if (d < min) {
            min = d;
            if (min <= 2) break; // تسريع الفحص
          }
        }
        return min;
      }

      // 6) نسبة تغطية مسار الحرف (Coverage)
      let coveredGuidePoints = 0;
      for (let i = 0; i < guidePoints.length; i++) {
        if (distToNearest(guidePoints[i], userPoints) <= coverageThreshold) {
          coveredGuidePoints++;
        }
      }
      const rawCoverage = guidePoints.length > 0 ? (coveredGuidePoints / guidePoints.length) : 0;

      // 7) دقة النقاط داخل الحرف وفحص الشطط (Precision & Far Outliers)
      let precisePoints = 0;
      let farOutliers = 0;
      for (let i = 0; i < userPoints.length; i++) {
        const d = distToNearest(userPoints[i], guidePoints);
        if (d <= precisionThreshold) {
          precisePoints++;
        }
        if (d > farThreshold) {
          farOutliers++;
        }
      }
      const rawPrecision = userPoints.length > 0 ? (precisePoints / userPoints.length) : 0;
      const farOutlierRatio = userPoints.length > 0 ? (farOutliers / userPoints.length) : 0;

      if (farOutlierRatio > 0.35) {
        return {
          score: 0,
          coverage: Math.round(rawCoverage * 100),
          precision: Math.round(rawPrecision * 100),
          lengthRatio: 0,
          passed: false,
          isComplete: false,
          reason: 'الرسمة بعيدة جدًا عن مسار الحرف'
        };
      }

      // 8) طول الرسمة مقارنة بالهيكل العظمي للحرف
      function pathLength(points) {
        let len = 0;
        for (let i = 1; i < points.length; i++) {
          const d = Math.hypot(points[i].x - points[i-1].x, points[i].y - points[i-1].y);
          if (d < 50) len += d; // منع القفزات البعيدة
        }
        return len;
      }

      let userLength = 0;
      if (this.userStrokes && this.userStrokes.length > 0) {
        for (const stroke of this.userStrokes) {
          userLength += pathLength(stroke);
        }
      }
      if (this.currentStroke && this.currentStroke.length > 1) {
        userLength += pathLength(this.currentStroke);
      }
      if (userLength === 0) {
        userLength = pathLength(userPoints);
      }

      const guideLength = Math.max(1, pathLength(guidePoints));
      // محيط خط الحرف مغلق من الجهتين (Double-wall perimeter)، لذلك الهيكل الأحادي للرسمة يعادل حوالي 30% من المحيط الكلي
      const expectedMinLength = Math.max(30, guideLength * 0.28);
      const lengthRatio = Math.min(1.0, userLength / expectedMinLength);

      // 9) تسوية النسب بمرونة تربوية عادلة
      const normCoverage = Math.min(1.0, rawCoverage / 0.68);
      const normPrecision = Math.min(1.0, rawPrecision / 0.72);

      const finalScore = Math.min(100, Math.round(
        (normCoverage * 0.60 + normPrecision * 0.25 + lengthRatio * 0.15) * 100
      ));

      const passThreshold = (typeof this.options.passThreshold === 'number') ? this.options.passThreshold : 70;
      const minCoverage = (typeof this.options.minCoverageThreshold === 'number') ? (this.options.minCoverageThreshold / 100) : 0.45;
      const isComplete = (rawCoverage >= minCoverage) && (lengthRatio >= 0.40);
      const passed = (finalScore >= passThreshold) && isComplete;

      return {
        score: finalScore,
        coverage: Math.round(rawCoverage * 100),
        precision: Math.round(rawPrecision * 100),
        lengthRatio: Math.round(lengthRatio * 100),
        passed: passed,
        isComplete: isComplete
      };
    }

    /**
     * استدعاء فحص النتيجة وربطه بالواجهة والأصوات والتنبيهات
     */
    evaluate() {
      const allUserPoints = [];
      for (let s = 0; s < this.userStrokes.length; s++) {
        const stroke = this.userStrokes[s];
        for (let p = 0; p < stroke.length; p++) {
          allUserPoints.push(stroke[p]);
        }
      }
      if (this.currentStroke && this.currentStroke.length > 0) {
        for (let p = 0; p < this.currentStroke.length; p++) {
          allUserPoints.push(this.currentStroke[p]);
        }
      }

      if (allUserPoints.length < 5 || this.guidePoints.length === 0) {
        return {
          accuracyScore: 0,
          coveragePercent: 0,
          finalScore: 0,
          score: 0,
          passed: false,
          incomplete: true,
          message: 'يرجى البدء بكتابة الحرف على السبورة'
        };
      }

      if (!this.boundingBox || !this.boundingBox.width) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (const pt of this.guidePoints) {
          if (pt.x < minX) minX = pt.x;
          if (pt.x > maxX) maxX = pt.x;
          if (pt.y < minY) minY = pt.y;
          if (pt.y > maxY) maxY = pt.y;
        }
        this.boundingBox = {
          minX, maxX, minY, maxY,
          width: Math.max(20, (maxX - minX) || 120),
          height: Math.max(20, (maxY - minY) || 120)
        };
      }

      console.log('--- Tracing Coordinates Diagnostic ---');
      console.log('First 5 guidePoints:', this.guidePoints.slice(0, 5));
      console.log('First 5 userPoints:', allUserPoints.slice(0, 5));
      console.log('BoundingBox:', this.boundingBox);

      const result = this.calculateTracingScore(allUserPoints, this.guidePoints, this.boundingBox);
      const reqThreshold = (typeof this.options.passThreshold === 'number') ? this.options.passThreshold : 70;

      let message = '';
      if (!result.passed) {
        this._playSound('retry');
        if (result.reason) {
          message = `${result.reason} — حاول مرة أخرى بدقة أعلى`;
        } else if (!result.isComplete || result.coverage < 45) {
          message = `حاول تاني: يرجى إكمال كتابة الحرف كاملاً (التغطية: ${result.coverage}%)`;
        } else if (result.precision < 60) {
          message = `حاول تاني: خرجت برة مسار الحرف كتير (الدقة: ${result.precision}%)`;
        } else {
          message = `حاول تاني: النتيجة ${result.score}% — المطلوب ${reqThreshold}% للنجاح`;
        }

        if (typeof this.options.onAttempt === 'function') {
          this.options.onAttempt(result.score, false, result.reason || 'low_score', result.coverage);
        }
      } else {
        this.hasCompleted = true;
        this.draw();
        this._triggerSuccessAnimation();
        this._playSound('success');
        message = `ممتاز! تم كتابة الحرف بنجاح (النتيجة: ${result.score}%)`;

        if (typeof this.options.onSuccess === 'function') {
          this.options.onSuccess(result.score);
        }
        if (typeof this.options.onAttempt === 'function') {
          this.options.onAttempt(result.score, true, 'success', result.coverage);
        }
      }

      return {
        score: result.score,
        finalScore: result.score,
        accuracyScore: result.precision,
        coveragePercent: result.coverage,
        precision: result.precision,
        lengthRatio: result.lengthRatio,
        passed: result.passed === true,
        reason: result.reason,
        incomplete: !result.isComplete && (result.coverage < 45 || result.lengthRatio < 45),
        message: message
      };
    }

    /* ==========================================================================
       FEEDBACK, ANIMATIONS & AUDIO
       ========================================================================== */

    _triggerSuccessAnimation() {
      // Spawn canvas confetti particles
      this.particles = [];
      const colors = ['#a8823a', '#2e6b3e', '#8c2430', '#c9a35c', '#48bb78', '#38bdf8'];
      const cx = this.displayWidth / 2;
      const cy = this.displayHeight / 2;

      for (let i = 0; i < 45; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        this.particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          radius: 3 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.015 + Math.random() * 0.015
        });
      }

      if (this.animId) cancelAnimationFrame(this.animId);
      this._animateParticles();
    }

    _animateParticles() {
      if (this.particles.length === 0) return;

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
        }
      }

      this.draw();

      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(() => this._animateParticles());
      }
    }

    _drawParticles() {
      const ctx = this.ctx;
      ctx.save();
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    _playSound(type) {
      if (!this.options.soundEnabled) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        if (!this.audioCtx) this.audioCtx = new AudioContext();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const now = this.audioCtx.currentTime;

        if (type === 'success') {
          // Cheerful ascending major triad (C5 - E5 - G5)
          const notes = [523.25, 659.25, 783.99];
          notes.forEach((freq, idx) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.09);

            gain.gain.setValueAtTime(0, now + idx * 0.09);
            gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.09 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(now + idx * 0.09);
            osc.stop(now + idx * 0.09 + 0.4);
          });
        } else if (type === 'retry') {
          // Gentle soft low buzz
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(160, now + 0.18);

          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(now);
          osc.stop(now + 0.22);
        }
      } catch (_) {}
    }

    /* ==========================================================================
       PUBLIC API METHODS
       ========================================================================== */

    /** Clear user strokes and reset canvas for retry */
    clear() {
      this.userStrokes = [];
      this.currentStroke = null;
      this.hasCompleted = false;
      this.particles = [];
      if (this.animId) cancelAnimationFrame(this.animId);
      this.draw();
    }

    /** Change brush stroke thickness for subsequent drawings (e.g. 6 to 36 px) */
    setStrokeWidth(width) {
      const num = parseInt(width, 10);
      if (!isNaN(num) && num >= 4 && num <= 40) {
        this.options.strokeWidth = num;
        // Do NOT resize already drawn strokes; only apply to currently active stroke if drawing
        if (this.currentStroke) {
          this.currentStroke.strokeWidth = num;
          this.draw();
        }
      }
    }

    /** Change text (letter or word) dynamically */
    setText(newText) {
      this.rawText = String(newText || 'Ⲁ').trim();
      this.text = this._resolveText(this.rawText);
      this.clear();
      this._prepareGlyphPath();
      this.draw();
    }

    /** Destroy instance and remove all listeners */
    destroy() {
      this._unbindEvents();
      if (this.animId) cancelAnimationFrame(this.animId);
      if (this.audioCtx && this.audioCtx.state !== 'closed') {
        try {
          this.audioCtx.close();
        } catch (_) {}
      }
    }
  }



  return LetterTracer;
});
