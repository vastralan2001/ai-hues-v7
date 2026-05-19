/**
 * AIHues i18n System — 中英文切换系统
 * All pages reference this file for bilingual support.
 *
 * Usage in HTML:
 *   <span data-zh="中文">English</span>
 *   <input data-zh-placeholder="中文占位" placeholder="English placeholder">
 *   <title data-zh="中文标题">English Title</title>
 *   <button class="lang-btn" onclick="toggleLang()">中文</button>
 */

const i18n = {
  /**
   * Current language: 'en' | 'zh'
   * Priority: localStorage > browser language detection > default 'en'
   */
  lang: (function () {
    const saved = localStorage.getItem('aihues_lang');
    if (saved === 'en' || saved === 'zh') return saved;
    return navigator.language && navigator.language.startsWith('zh') ? 'zh' : 'en';
  })(),

  /**
   * Flag: whether English originals have been cached.
   * Prevents re-caching after language has been switched.
   */
  _cached: false,

  /**
   * Initialize: cache English text, then apply current language.
   * Call once after DOMContentLoaded.
   */
  init() {
    this._cacheEnglish();
    this.apply();
    this.updateToggleButton();
  },

  /**
   * Toggle between English and Chinese.
   */
  toggle() {
    this.lang = this.lang === 'en' ? 'zh' : 'en';
    localStorage.setItem('aihues_lang', this.lang);
    this.apply();
    this.updateToggleButton();
  },

  /**
   * Cache the original English text / placeholder from the DOM.
   * This runs only once — on the very first page load.
   */
  _cacheEnglish() {
    if (this._cached) return;

    // Cache textContent for elements with data-zh
    document.querySelectorAll('[data-zh]').forEach((el) => {
      if (!el.dataset.en) {
        el.dataset.en = el.textContent.trim();
      }
    });

    // Cache placeholder for inputs with data-zh-placeholder
    document.querySelectorAll('[data-zh-placeholder]').forEach((el) => {
      if (!el.dataset.enPlaceholder) {
        el.dataset.enPlaceholder = el.placeholder || '';
      }
    });

    // Cache title text
    const title = document.querySelector('title[data-zh]');
    if (title && !title.dataset.en) {
      title.dataset.en = title.textContent.trim();
    }

    this._cached = true;
  },

  /**
   * Apply current language to the entire page.
   */
  apply() {
    // 1. Update html lang attribute (affects font rendering)
    document.documentElement.lang = this.lang === 'zh' ? 'zh-CN' : 'en';

    // 2. Toggle all elements with data-zh
    document.querySelectorAll('[data-zh]').forEach((el) => {
      if (this.lang === 'zh') {
        el.textContent = el.dataset.zh;
      } else {
        el.textContent = el.dataset.en;
      }
    });

    // 3. Toggle placeholders
    document.querySelectorAll('[data-zh-placeholder]').forEach((el) => {
      if (this.lang === 'zh') {
        el.placeholder = el.dataset.zhPlaceholder;
      } else {
        el.placeholder = el.dataset.enPlaceholder;
      }
    });

    // 4. Toggle page title
    const title = document.querySelector('title[data-zh]');
    if (title) {
      title.textContent = this.lang === 'zh' ? title.dataset.zh : title.dataset.en;
    }
  },

  /**
   * Update the language toggle button text.
   */
  updateToggleButton() {
    const btn = document.querySelector('.lang-btn');
    if (btn) {
      btn.textContent = this.lang === 'en' ? '中文' : 'EN';
    }
  },

  /**
   * Get a localized string by key.
   * Useful for dynamic JS-generated content.
   *
   * @param {string} en - English text
   * @param {string} zh - Chinese text
   * @returns {string} Localized string
   */
  t(en, zh) {
    return this.lang === 'zh' ? zh : en;
  },
};

/**
 * Global toggle function — referenced by onclick="toggleLang()" in HTML.
 */
function toggleLang() {
  i18n.toggle();
}

/* ── Auto-init on DOM ready ─────────────────────────────────────────────── */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  // DOM already loaded
  i18n.init();
}
