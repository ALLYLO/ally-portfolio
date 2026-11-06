/* In-page bilingual presentation layer. English remains the canonical source.
   Content is translated in place without duplicating pages, links, data,
   creator evidence or case-study metrics. */
(() => {
  'use strict';
  if (window.__allyPortfolioI18nReady) return;
  window.__allyPortfolioI18nReady = true;

  const dictionary = window.__allyPortfolioTranslations || {};
  const canonical = new Map(Object.entries(dictionary).map(([en, zh]) => [normalize(en), zh]));
  const reverse = new Map([...canonical].map(([en, zh]) => [normalize(zh), en]));
  const NODE_TEXT = 3;
  const attributes = ['aria-label', 'title', 'placeholder', 'alt'];
  const originalNodes = new WeakMap();
  const originalAttrs = new WeakMap();
  const controls = [];
  const storageKey = 'ally-portfolio-language';
  const metadata = {
    en: {
      title: 'Ally Lo — Data · Marketing · Automation',
      description: 'Ally Lo’s portfolio. Turning messy information into clear action through data, marketing and automation.'
    },
    zh: {
      title: 'Ally Lo — 数据 · 营销 · 自动化',
      description: 'Ally Lo 的个人作品集。通过数据、营销与自动化，将复杂信息转化为清晰的行动。'
    }
  };
  let activeLanguage = 'en', observer, scheduled = false;
  let requested = 'en';
  try {
    const saved = localStorage.getItem(storageKey);
    requested = saved === 'zh' ? 'zh' : 'en';
  } catch (_) { /* Storage may be disabled by the browser. */ }

  function normalize(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function phrase(source) {
    const key = normalize(source);
    if (!key) return null;
    if (canonical.has(key)) return canonical.get(key);

    let m = key.match(/^CASE STUDY\s+(\d+)\s*\/\s*(\d+)$/i);
    if (m) return '项目案例 ' + m[1] + ' / ' + m[2];
    m = key.match(/^(PREVIOUS|NEXT)\s*\/\s*(\d+)$/i);
    if (m) return (m[1].toUpperCase() === 'PREVIOUS' ? '上一个' : '下一个') + ' / ' + m[2];
    m = key.match(/^Open (.+?) (case study|details|concept)$/i);
    if (m) return '打开' + (canonical.get(normalize(m[1])) || m[1]) + (m[2] === 'concept' ? '概念方案' : '项目详情');
    m = key.match(/^(.+), page (\d+) of (\d+)$/i);
    if (m) return (canonical.get(normalize(m[1])) || m[1]) + '，第 ' + m[2] + ' / ' + m[3] + ' 页';
    return null;
  }

  // Preserve surrounding spaces and the source English on every text node.
  function translatedText(value) {
    const match = String(value).match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!match) return null;
    const replacement = phrase(match[2]);
    return replacement === null ? null : match[1] + replacement + match[3];
  }

  function paintText(node) {
    const parent = node.parentElement;
    if (!parent || parent.closest('script, style, noscript, textarea, code, pre, .portfolio-language-switcher')) return;
    const value = node.nodeValue || '';
    let saved = originalNodes.get(node);
    if (saved && value !== saved.rendered && value !== saved.english) {
      // A live component reused the node for a new caption; track its new copy.
      saved = null;
    }
    if (!saved) {
      const original = reverse.get(normalize(value));
      const english = original || value;
      if (!translatedText(english)) return;
      saved = { english, rendered: value };
      originalNodes.set(node, saved);
    }
    const next = activeLanguage === 'zh' ? (translatedText(saved.english) || saved.english) : saved.english;
    if (node.nodeValue !== next) node.nodeValue = next;
    saved.rendered = next;
  }

  function paintAttributes(el) {
    if (el.closest('.portfolio-language-switcher')) return;
    let memo = originalAttrs.get(el);
    if (!memo) { memo = new Map(); originalAttrs.set(el, memo); }
    for (const name of attributes) {
      if (!el.hasAttribute(name)) continue;
      const current = el.getAttribute(name);
      let saved = memo.get(name);
      if (saved && current !== saved.rendered && current !== saved.english) saved = null;
      if (!saved) {
        const english = reverse.get(normalize(current)) || current;
        const translation = phrase(english);
        if (translation === null) continue;
        saved = { english, rendered: current };
        memo.set(name, saved);
      }
      const next = activeLanguage === 'zh' ? (phrase(saved.english) || saved.english) : saved.english;
      if (current !== next) el.setAttribute(name, next);
      saved.rendered = next;
    }
  }

  function paint(root = document.body) {
    if (!root) return;
    if (root.nodeType === NODE_TEXT) return paintText(root);
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) paintAttributes(root);
    const iterator = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = iterator.nextNode())) {
      if (node.nodeType === NODE_TEXT) paintText(node);
      else paintAttributes(node);
    }
  }

  function switcher(variant) {
    const group = document.createElement('div');
    group.className = 'portfolio-language-switcher portfolio-language-switcher--' + variant;
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Language');
    for (const [language, label] of [['en', 'EN'], ['zh', '中文']]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.dataset.portfolioLang = language;
      button.addEventListener('click', () => setLanguage(language));
      group.appendChild(button);
    }
    controls.push(group);
    return group;
  }

  function mount() {
    const header = document.querySelector('.editorial-header');
    if (header && !header.querySelector('.portfolio-language-switcher--header')) {
      header.appendChild(switcher('header'));
    }
    const mobilePanel = document.querySelector('.portfolio-mobile-navigation-panel');
    if (mobilePanel && !mobilePanel.querySelector('.portfolio-language-switcher--mobile')) {
      mobilePanel.insertBefore(switcher('mobile'), mobilePanel.firstChild);
    }
    refreshControls();
  }

  function refreshControls() {
    for (const control of controls) {
      const groupLabel = activeLanguage === 'zh' ? '网站语言' : 'Website language';
      if (control.getAttribute('aria-label') !== groupLabel) control.setAttribute('aria-label', groupLabel);
      for (const button of control.querySelectorAll('button')) {
        const isCurrent = button.dataset.portfolioLang === activeLanguage;
        if (button.getAttribute('aria-pressed') !== String(isCurrent)) {
          button.setAttribute('aria-pressed', String(isCurrent));
        }
        const ariaLabel = button.dataset.portfolioLang === 'zh'
          ? (activeLanguage === 'zh' ? '当前语言：中文' : '切换为中文')
          : (activeLanguage === 'en' ? 'Current language: English' : 'Switch to English');
        if (button.getAttribute('aria-label') !== ariaLabel) button.setAttribute('aria-label', ariaLabel);
      }
    }
  }

  function setLanguage(language) {
    if (language !== 'zh' && language !== 'en') return;
    activeLanguage = language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.dataset.portfolioLanguage = language;
    document.title = metadata[language].title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', metadata[language].description);
    try { localStorage.setItem(storageKey, language); } catch (_) { /* Optional preference only. */ }
    paint();
    refreshControls();
    document.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
  }

  function update() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      mount();
      paint();
    });
  }

  function initialize() {
    mount();
    setLanguage(requested);
    observer = new MutationObserver(mutations => {
      // Case-study dialogs, work cards, and the mobile menu can be inserted
      // after initial load. Translation follows those inserts automatically.
      if (mutations.some(m => m.addedNodes.length || m.type === 'characterData' || m.type === 'attributes')) update();
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: attributes
    });
  }

  window.allyPortfolioSetLanguage = setLanguage;
  window.allyPortfolioGetLanguage = () => activeLanguage;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else initialize();
})();
