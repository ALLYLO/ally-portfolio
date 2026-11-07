/* Restrained desktop wheel easing. Native scrolling remains available elsewhere. */
(() => {
  'use strict';
  if (window.__allyPortfolioScrollReady) return;
  window.__allyPortfolioScrollReady = true;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const distanceMultiplier = 0.75;
  const easingTimeMs = 86;

  let frame = 0;
  let lastFrameTime = 0;
  let rendered = window.scrollY;
  let target = rendered;

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
  const bottom = () => Math.max(0, root.scrollHeight - root.clientHeight);

  function cancel() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastFrameTime = 0;
    root.classList.remove('portfolio-wheel-animating');
    rendered = target = window.scrollY;
  }

  window.__allyPortfolioCancelWheelScroll = cancel;

  function isNativeScrollArea(targetElement) {
    if (!(targetElement instanceof Element)) return false;
    if (targetElement.closest('#work.compact-stepper-active, dialog[open], [role="dialog"], .cm-stage, .cm-modal, .modal, .modal-overlay, [data-scroll-native]')) return true;
    for (let element = targetElement; element && element !== root && element !== document.body; element = element.parentElement) {
      const overflow = getComputedStyle(element).overflowY;
      if (/(auto|scroll|overlay)/.test(overflow) && element.scrollHeight > element.clientHeight + 2) return true;
    }
    return false;
  }

  function draw(now) {
    frame = 0;
    target = clamp(target, 0, bottom());
    const elapsed = lastFrameTime ? Math.min(48, Math.max(1, now - lastFrameTime)) : 1000 / 60;
    lastFrameTime = now;
    const easing = 1 - Math.exp(-elapsed / easingTimeMs);
    rendered += (target - rendered) * easing;
    if (Math.abs(target - rendered) < 0.5) {
      rendered = target;
      window.scrollTo(0, rendered);
      root.classList.remove('portfolio-wheel-animating');
      lastFrameTime = 0;
      return;
    }
    window.scrollTo(0, rendered);
    frame = requestAnimationFrame(draw);
  }

  function onWheel(event) {
    const activeWork = document.querySelector('#work.compact-stepper-active');
    const landingWork = document.querySelector('#work');
    const landingHandoff = landingWork && window.scrollY <= 24 && event.deltaY > 0;
    if (activeWork || landingHandoff) {
      if (frame) cancel();
      return;
    }

    if (reducedMotion.matches || !finePointer.matches || !event.cancelable ||
        event.defaultPrevented || event.ctrlKey || event.metaKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        isNativeScrollArea(event.target)) {
      if (frame) cancel();
      return;
    }

    const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    const delta = clamp(event.deltaY * scale, -360, 360) * distanceMultiplier;
    if (!delta) return;

    event.preventDefault();
    if (!frame) {
      rendered = target = window.scrollY;
      lastFrameTime = 0;
      root.classList.add('portfolio-wheel-animating');
    }
    target = clamp(target + delta, 0, bottom());
    if (!frame) frame = requestAnimationFrame(draw);
  }

  window.addEventListener('wheel', onWheel, { passive: false });
  document.addEventListener('pointerdown', cancel, { passive: true });
  window.addEventListener('hashchange', cancel);
  window.addEventListener('popstate', cancel);
  window.addEventListener('resize', cancel);
  window.addEventListener('blur', cancel);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancel();
  });
  document.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a[href^="#"]')) cancel();
  }, true);
  window.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancel();
  }, true);
  reducedMotion.addEventListener?.('change', cancel);
  finePointer.addEventListener?.('change', cancel);
})();
