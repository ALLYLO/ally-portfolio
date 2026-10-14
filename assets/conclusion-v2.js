(() => {
  const icons = { genshin: 'genshin.png', rail: 'star-rail.png', reverse: 'reverse-1999.png' };
  const icon = (key, alt) => `<img src="assets/game-icons/${icons[key]}" alt="${alt}" width="68" height="68">`;
  const pair = icon('genshin', 'Genshin Impact') + icon('rail', 'Honkai: Star Rail');
  const rIcon = icon('reverse', 'Reverse: 1999');
  const head = (page, label) => `<div class="cm-view-head"><span>04 / CONCLUSION <em>${String(page).padStart(2, '0')} / 03</em></span><span>${label}</span></div>`;
  const nav = page => `<nav class="conclusion-navigation" aria-label="Conclusion pages">${[['SCOPE', 1], ['LANDSCAPE', 2], ['TAKEAWAY', 3]].map(([label, target]) => `<button type="button" data-conclusion-page="${target}" ${page === target ? 'class="active" aria-current="page"' : ''}><small>0${target}</small><span>${label}</span></button>`).join('')}</nav>`;
  const insight = (first, rest, page) => `<div class="conclusion-insight"><span>KEY INSIGHT</span><strong><em>${first}</em> ${rest}</strong><small>0${page} / 03</small></div>`;
  const intro = (eyebrow, title, copy, timeNote) => `<div class="conclusion-intro"><div><span class="conclusion-eyebrow">${eyebrow}</span><h3>${title}</h3></div><div class="conclusion-intro-copy"><p>${copy}</p><div class="conclusion-time-note">JAPAN · NOV 2023 <span>${timeNote}</span></div></div></div>`;

  const format = (number, name, image, gameplayTags, lead, detail, tags) => `<article class="conclusion-format-card"><div class="conclusion-card-heading"><div><small>${number}</small><h4>${name}</h4><div class="conclusion-gameplay-tags">${gameplayTags.map(tag => `<span>${tag}</span>`).join('')}</div></div><div class="conclusion-game-icons">${image}</div></div><div class="conclusion-format-description"><span>CONTENT I SAW</span><p><strong>${lead}</strong><small>${detail}</small></p></div><div class="conclusion-format-tags">${tags.map(tag => `<span>${tag}</span>`).join('')}</div></article>`;
  const page1 = () => `${intro('EVIDENCE SCOPE', 'ONE CASE.<br><span>TWO KINDS OF EVIDENCE.</span>', '<b>01–02</b> Screening & outreach workflow · mainly HoYoverse<br><b>03</b> Selected creator works · all three games<br><strong>Different evidence, not comparable campaign results.</strong>', 'Project records and selected works')}<div class="conclusion-format-grid">
    ${format('01 / HOYOVERSE', 'GENSHIN IMPACT', icon('genshin', 'Genshin Impact'), ['Open-world', 'Action RPG', 'Gacha'], 'Exploration & gameplay', 'Guides and fan works broadened the mix.', ['EXPLORATION', 'GAMEPLAY', 'GUIDES', 'FAN WORKS'])}
    ${format('02 / HOYOVERSE', 'HONKAI: STAR RAIL', icon('rail', 'Honkai: Star Rail'), ['Exploration', 'Turn-based RPG', 'Gacha'], 'Combat & characters', 'Builds, pulls and fan works; some cross-title creators.', ['GAMEPLAY', 'TEAM BUILDS', 'PULLS', 'FAN WORKS'])}
    ${format('03 / NEW LAUNCH', 'REVERSE: 1999', rIcon, ['Story-driven', 'Turn-based RPG', 'Gacha'], 'Illustration stood out', 'Pulls and guides appeared; fewer dedicated gameplay creators observed.', ['FAN ART', 'PULLS', 'BUILD GUIDES'])}
  </div>${insight('CONTENT FORMATS DIFFERED.', 'CREATOR-POOL SIZE IS A SEPARATE QUESTION.', 1)}`;

  const condition = (number, label, copy) => `<div class="conclusion-condition"><small>${number}</small><div><strong>${label}</strong><p>${copy}</p></div></div>`;
  const ecosystem = (kind, name, image, subtitle, rows, question) => `<article class="conclusion-ecosystem-card"><div class="conclusion-card-heading"><div><small>${kind}</small><h4>${name}</h4><b>${subtitle}</b></div><div class="conclusion-game-icons">${image}</div></div><div class="conclusion-conditions">${rows.map((row, index) => condition(`0${index + 1}`, row[0], row[1])).join('')}</div><div class="conclusion-challenge"><span>FIRST QUESTION</span><p>${question}</p></div></article>`;
  const page2 = () => `${intro('OBSERVED CREATOR LANDSCAPE', 'A DIFFERENT<br><span>DISCOVERY PROBLEM.</span>', 'A view from the channels and tags I monitored—not a census of either game’s entire creator community.', 'Reverse: 1999 has grown since')}<div class="conclusion-ecosystem-grid">
    ${ecosystem('ESTABLISHED RECRUITMENT CONTEXT', 'HOYOVERSE', pair, 'GENSHIN IMPACT + HONKAI: STAR RAIL', [['VISIBLE POOL', 'Broad and active; dedicated creators, fans and some cross-title overlap.'], ['EXISTING STRUCTURE', 'Creator communities, recruitment programs and incentives already in place.'], ['SCREENING FRICTION', 'Quality, fit and recent cadence—beyond known collaborators.']], 'Who is worth approaching within an already active pool?')}
    ${ecosystem('NEWLY LAUNCHED IN JAPAN', 'REVERSE: 1999', rIcon, 'EARLY-STAGE CREATOR COMMUNITY', [['VISIBLE POOL', 'Fewer dedicated creators in monitored tags; many player-led posts.'], ['CONTENT SIGNAL', 'Standout fan art; guide and gameplay specialists less visible.'], ['SCREENING FRICTION', 'Recurring names; few new profiles with enough work to assess.']], 'Where else can we find relevant creators?')}
  </div>${insight('THE FIRST MOVE DIFFERED:', 'QUALIFY AN EXISTING POOL OR BUILD ONE ACROSS GAME COMMUNITIES.', 2)}`;

  const step = (number, label, copy) => `<div class="conclusion-strategy-step"><small>${number}</small><div><strong>${label}</strong><p>${copy}</p></div></div>`;
  const strategy = (name, image, subtitle, rows, resultLabel, result) => `<article class="conclusion-strategy-card"><div class="conclusion-card-heading"><div><small>${subtitle}</small><h4>${name}</h4></div><div class="conclusion-game-icons">${image}</div></div><div class="conclusion-strategy-steps">${rows.map((row, index) => step(`0${index + 1}`, row[0], row[1])).join('')}</div><div class="conclusion-strategy-result"><span>${resultLabel}</span><p>${result}</p></div></article>`;
  const page3 = () => `${intro('STRATEGIC TAKEAWAY', 'DIFFERENT<br><span>FIRST MOVES.</span>', 'Both are recruitment approaches I used in Japan: screen an established pool, or expand a small one through player tags and comparable games.', 'Recruitment approach at the time')}<div class="conclusion-strategy-grid">
    ${strategy('HOYOVERSE', pair, 'RECRUITMENT APPROACH', [['MAP', 'Active creator communities.'], ['QUALIFY', 'Quality · fit · recent cadence.'], ['CONNECT', 'Outreach and content coordination.']], 'SOURCING FOCUS', 'Find overlooked creators within an established ecosystem.')}
    ${strategy('REVERSE: 1999', rIcon, 'RECRUITMENT APPROACH', [['MONITOR', 'Game tags and player posts.'], ['EXPAND', 'Find creators of competing games in the same genre.'], ['INVITE', 'Approach promising creators to participate.']], 'SOURCING FOCUS', 'Build beyond the small in-game pool through competing-title communities.')}
  </div>${insight('DIFFERENT STARTING POOLS', 'CALL FOR DIFFERENT SOURCING ROUTES.', 3)}`;

  window.renderCreatorConclusion = (requestedPage = 1) => {
    const page = Math.max(1, Math.min(3, Number(requestedPage) || 1));
    const label = ['EVIDENCE SCOPE', 'CREATOR LANDSCAPE', 'STRATEGIC TAKEAWAY'][page - 1];
    return `<div class="cm-view cm-conclusion" data-conclusion-current="${page}" aria-label="Japan creator marketing conclusion, page ${page} of 3"><div class="conclusion-artboard">${head(page, label)}<div class="conclusion-content">${[page1, page2, page3][page - 1]()}</div>${nav(page)}</div></div>`;
  };

  const ARTBOARD_WIDTH = 1360, ARTBOARD_HEIGHT = 1000;
  let observedStage = null;
  const fit = () => document.querySelectorAll('.cm-conclusion').forEach(view => {
    const stage = view.closest('.cm-stage'), board = view.querySelector('.conclusion-artboard');
    if (!stage || !board || !stage.clientWidth || !stage.clientHeight) return;
    const scale = Math.min(stage.clientWidth / ARTBOARD_WIDTH, stage.clientHeight / ARTBOARD_HEIGHT, 1.18);
    board.style.transform = `translate(${(stage.clientWidth - ARTBOARD_WIDTH * scale) / 2}px, ${(stage.clientHeight - ARTBOARD_HEIGHT * scale) / 2}px) scale(${scale})`;
    board.style.visibility = 'visible';
  });
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(fit) : null;
  const watch = () => {
    const stage = document.querySelector('.cm-conclusion')?.closest('.cm-stage') || null;
    if (observer && stage !== observedStage) {
      if (observedStage) observer.unobserve(observedStage);
      if (stage) observer.observe(stage);
      observedStage = stage;
    }
    fit();
  };
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-conclusion-page]');
    if (button) button.closest('.cm-stage').innerHTML = window.renderCreatorConclusion(button.dataset.conclusionPage);
  });
  const initialize = () => {
    new MutationObserver(() => requestAnimationFrame(watch)).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', fit);
    requestAnimationFrame(watch);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();

/* Homepage resume CTA. Kept here temporarily while index.html contains oversized inline media. */
(() => {
  const link = document.querySelector('.home-hero-actions .resume-link');
  if (!link) return;
  const label = link.firstChild;
  if (label?.nodeType === Node.TEXT_NODE && label.textContent.includes('DOWNLOAD RÉSUMÉ')) {
    label.textContent = label.textContent.replace('DOWNLOAD RÉSUMÉ', 'VIEW RESUME');
  }
  const pdf = (link.dataset.resumeFile || '').trim();
  if (!pdf) return;
  link.href = pdf;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.removeAttribute('download');
  link.removeAttribute('aria-disabled');
  link.removeAttribute('title');
})();

/* Standalone site scrolling enhancement; the oversized index.html is left unchanged. */
(() => {
  if (document.querySelector('script[data-portfolio-scroll-loader]')) return;
  const script = document.createElement('script');
  const source = document.currentScript?.src || document.baseURI;
  script.src = new URL('site-scroll.js', source).href;
  script.dataset.portfolioScrollLoader = 'true';
  script.async = true;
  document.head.appendChild(script);
})();

/* Smooth pointer trail asset loader. The original inline trail stays as fallback. */
(() => {
  if (document.querySelector('script[data-smooth-pointer-loader]')) return;
  const source = document.currentScript?.src || document.baseURI;
  const script = document.createElement('script');
  script.src = new URL('pointer-trail-smooth.js', source).href;
  script.dataset.smoothPointerLoader = 'true';
  script.async = true;
  document.head.appendChild(script);
})();

/* Mobile homepage menu: reuse the desktop navigation without editing the large index file. */
(() => {
  if (document.querySelector('script[data-mobile-hero-nav-loader]')) return;
  const script = document.createElement('script');
  const source = document.currentScript?.src || document.baseURI;
  script.src = new URL('mobile-hero-nav.js', source).href;
  script.dataset.mobileHeroNavLoader = 'true';
  script.async = true;
  document.head.appendChild(script);
})();


/* Bilingual interface: load dictionary first, then the reversible DOM
   presentation layer. Leave the large canonical HTML and source media intact. */
(() => {
  if (window.__allyPortfolioI18nLoaderReady) return;
  window.__allyPortfolioI18nLoaderReady = true;
  const source = document.currentScript?.src || document.baseURI;
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('portfolio-i18n.css', source).href;
  stylesheet.dataset.portfolioI18nStyle = 'true';
  document.head.appendChild(stylesheet);

  const dictionary = document.createElement('script');
  dictionary.src = new URL('portfolio-i18n-dictionary.js', source).href;
  dictionary.async = true;
  dictionary.onload = () => {
    const controller = document.createElement('script');
    controller.src = new URL('portfolio-i18n.js', source).href;
    controller.async = true;
    controller.dataset.portfolioI18nLoader = 'true';
    document.head.appendChild(controller);
  };
  dictionary.onerror = () => {
    // English canonical content remains readable if the translation asset
    // cannot be loaded; do not display a nonfunctional switcher.
    console.warn('[Portfolio] Language dictionary unavailable; English retained.');
  };
  document.head.appendChild(dictionary);
})();

/* Keep the hero portrait physically inside its right-hand collage so desktop
   CSS Grid can reserve distinct areas for the photo and the three cards.
   The narrow layout uses display: contents to preserve the original order. */
(() => {
  const layout = document.querySelector('.home-hero-layout');
  const collage = layout?.querySelector(':scope > .home-hero-collage');
  const portrait = layout?.querySelector(':scope > .home-hero-person');
  const cards = collage?.querySelector(':scope > .home-hero-cards');
  if (!layout || !collage || !portrait || !cards) return;
  collage.insertBefore(portrait, cards);

  // In the first expanded layout, the headline spans the page while the
  // description and its two CTAs stay together in a separate grid cell.
  // Keep the original elements and their links; do not clone their content.
  const copy = layout.querySelector(':scope > .home-hero-copy');
  const thesis = copy?.querySelector('.home-hero-thesis');
  const actions = copy?.querySelector('.home-hero-actions');
  if (copy && thesis && actions && !copy.querySelector('.home-hero-info')) {
    const info = document.createElement('div');
    info.className = 'home-hero-info';
    thesis.before(info);
    info.append(thesis, actions);
  }
  layout.classList.add('home-hero-structured');
})();

/* WORKS card previews are still covers, not self-running galleries.
   This only removes repeated card-preview image nodes after the large
   canonical index is parsed; case-study content and source files stay intact. */
(() => {
  const cards = [
    ['.work .koc-media .koc-carousel-track', '.work .koc-media-label', 'PROJECT VISUAL'],
    ['.work .nikke-media .nikke-carousel-track', '.work .nikke-media-label', 'OFFICIAL PROJECT VISUAL']
  ];
  const apply = () => {
    let ready = 0;
    for (const [trackSelector, labelSelector, caption] of cards) {
      const track = document.querySelector(trackSelector);
      if (!track) continue;
      ready++;
      if (!track.dataset.staticProjectCover) {
        const images = track.querySelectorAll(':scope > img');
        for (let i = 1; i < images.length; i++) images[i].remove();
        track.dataset.staticProjectCover = 'true';
      }
      const label = document.querySelector(labelSelector);
      if (label && !label.dataset.staticProjectCoverLabel) {
        label.textContent = caption;
        label.dataset.staticProjectCoverLabel = 'true';
      }
    }
    return ready === cards.length;
  };
  const init = () => {
    if (apply()) return;
    // The NIKKE card is inserted later by the existing inline page script.
    const root = document.getElementById('more-work') || document.querySelector('.work') || document.body;
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(root, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else init();
})();


/* One-line Chinese labels for the two featured WORKS titles. The original
   two-line English headings are restored on language change. */
(() => {
  const featured = [
    ['#koc', 'JAPAN CREATOR', 'MARKETING', '日本创作者营销'],
    ['#nikke', 'NIKKE North America', 'Discord Operations', 'NIKKE 北美 · Discord 社群运营']
  ];
  const render = () => {
    const chinese = document.documentElement.lang === 'zh-CN';
    for (const [id, first, second, localized] of featured) {
      const h3 = document.querySelector('.work ' + id + ' .project-head h3');
      if (!h3) continue;
      if (chinese) {
        if (h3.dataset.portfolioChineseTitle !== 'true' || h3.textContent !== localized) {
          h3.replaceChildren(document.createTextNode(localized));
          h3.dataset.portfolioChineseTitle = 'true';
        }
      } else if (h3.dataset.portfolioChineseTitle === 'true') {
        h3.replaceChildren(document.createTextNode(first), document.createElement('br'), document.createTextNode(second));
        h3.removeAttribute('data-portfolio-chinese-title');
      }
    }
  };
  document.addEventListener('portfolio:languagechange', render);
  const init = () => {
    render();
    const container = document.getElementById('more-work');
    if (container) {
      new MutationObserver(records => {
        if (records.some(record => record.addedNodes.length)) render();
      }).observe(container, { childList: true });
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
