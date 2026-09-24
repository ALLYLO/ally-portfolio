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
