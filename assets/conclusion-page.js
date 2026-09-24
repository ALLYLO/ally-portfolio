(() => {
  const journey = (steps, highlighted) => `<div class="conclusion-journey">${steps.map((step, i) => `<div class="conclusion-step ${i === highlighted ? 'is-highlighted' : ''}"><span>${String(i + 1).padStart(2, '0')}</span><b>${step}</b></div>`).join('<i aria-hidden="true">→</i>')}</div>`;
  window.renderCreatorConclusion = () => `<div class="cm-view cm-conclusion" aria-label="Japan creator marketing conclusion, context"><div class="conclusion-artboard">
    <div class="cm-view-head"><span>04 / CONCLUSION&nbsp;&nbsp; <em>01 / 03</em></span><span>CONTEXT</span></div>
    <div class="conclusion-content"><div class="conclusion-intro">
      <h3>SAME GOAL.<br><span>DIFFERENT<br>STARTING POINTS.</span></h3>
      <div class="conclusion-intro-copy"><p>Working across established and emerging creator ecosystems showed that the path to finding and developing creators can look completely different.</p>
      <div class="conclusion-time-note"><strong>JAPAN · NOV 2023</strong><span>Insights reflect the creator landscape at that time. Reverse: 1999 has grown since.</span></div></div>
    </div>
    <div class="conclusion-compare">
      <article class="conclusion-panel conclusion-panel--established">
        <div class="conclusion-ecosystem"><div class="conclusion-panel-top"><div><small>ESTABLISHED IP</small><h4>HOYOVERSE</h4><strong>A MATURE CREATOR ECOSYSTEM</strong></div><div class="conclusion-game-icons"><img src="assets/game-icons/genshin.png" alt="Genshin Impact" width="72" height="72"><img src="assets/game-icons/star-rail.png" alt="Honkai: Star Rail" width="72" height="72"></div></div>
        <ul><li>Large and active creator pool</li><li>Established creator community</li><li>Diverse content formats</li><li>Recruitment & incentive mechanisms</li></ul></div>
        <div class="conclusion-panel-divider"></div>
        <div class="conclusion-journey-section"><span class="conclusion-section-label">CREATOR JOURNEY / ESTABLISHED</span>
        ${journey(['IDENTIFY','CONTACT','CONNECT','ACTIVATE','RETAIN'], 0)}</div>
        <div class="conclusion-challenge"><span>KEY CHALLENGE</span><p>The challenge was not finding creators, but finding overlooked creators worth developing.</p></div>
      </article>
      <article class="conclusion-panel conclusion-panel--emerging">
        <div class="conclusion-ecosystem"><div class="conclusion-panel-top"><div><small>NEWLY LAUNCHED IP</small><h4>REVERSE: 1999</h4><strong>BUILDING FROM ZERO</strong></div><div class="conclusion-game-icons"><img src="assets/game-icons/reverse-1999.png" alt="Reverse: 1999" width="72" height="72"></div></div>
        <ul><li>Newly launched in Japan</li><li>Very limited creator supply</li><li>Mostly organic player posts</li><li>Few established game creators</li></ul></div>
        <div class="conclusion-panel-divider"></div>
        <div class="conclusion-journey-section"><span class="conclusion-section-label">CREATOR JOURNEY / EMERGING</span>
        ${journey(['ACTIVATE','MONITOR TAGS','DISCOVER','OBSERVE','DEVELOP'], 0)}</div>
        <div class="conclusion-challenge"><span>KEY CHALLENGE</span><p>Without an established creator pool, activation became a way to create participation and discover potential creators.</p></div>
      </article>
    </div>
    <div class="conclusion-insight"><span>KEY INSIGHT</span><strong><em>MARKET MATURITY</em> CHANGES WHERE THE CREATOR JOURNEY BEGINS.</strong><small>01 / 03 <i></i></small></div></div>
  </div></div>`;

  const ARTBOARD_WIDTH = 1360;
  const ARTBOARD_HEIGHT = 1000;
  let observedStage = null;
  const fitConclusion = () => {
    document.querySelectorAll('.cm-conclusion').forEach(view => {
      const stage = view.closest('.cm-stage');
      const artboard = view.querySelector('.conclusion-artboard');
      if (!stage || !artboard || !stage.clientWidth || !stage.clientHeight) return;
      const scale = Math.min(stage.clientWidth / ARTBOARD_WIDTH, stage.clientHeight / ARTBOARD_HEIGHT, 1.18);
      const x = (stage.clientWidth - ARTBOARD_WIDTH * scale) / 2;
      const y = (stage.clientHeight - ARTBOARD_HEIGHT * scale) / 2;
      artboard.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      artboard.style.visibility = 'visible';
    });
  };
  const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(fitConclusion) : null;
  const watchConclusion = () => {
    const stage = document.querySelector('.cm-conclusion')?.closest('.cm-stage') || null;
    if (resizeObserver && stage !== observedStage) {
      if (observedStage) resizeObserver.unobserve(observedStage);
      if (stage) resizeObserver.observe(stage);
      observedStage = stage;
    }
    fitConclusion();
  };
  const initializeFit = () => {
    new MutationObserver(() => requestAnimationFrame(watchConclusion)).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', fitConclusion);
    requestAnimationFrame(watchConclusion);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeFit, { once: true });
  else initializeFit();
})();
