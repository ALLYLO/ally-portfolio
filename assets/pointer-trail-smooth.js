/* Single spring-driven pointer trail. One continuous path, never parallel echoes. */
(() => {
  'use strict';

  if (window.__allySmoothPointerTrailReady) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || matchMedia('(pointer: coarse)').matches) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.className = 'pointer-trail pointer-trail-smooth';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.pointerEvents = 'none';

  const FADE_MS = 220;
  const spring = { x: 0, y: 0, vx: 0, vy: 0 };
  let target = null;
  let path = [];
  let raf = 0;
  let lastFrame = 0;
  let dpr = 1;
  let currentTone = 'dark';

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  function surfaceTone(x, y) {
    let element = document.elementFromPoint(x, y);
    while (element && element !== document.documentElement) {
      const color = getComputedStyle(element).backgroundColor;
      const match = color && color.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)(?:[, /]+([\d.]+))?\)/);
      if (match && Number(match[4] ?? 1) > .18) {
        const brightness = .2126 * Number(match[1]) + .7152 * Number(match[2]) + .0722 * Number(match[3]);
        return brightness < 135 ? 'light' : 'dark';
      }
      element = element.parentElement;
    }
    return 'dark';
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    lastFrame = 0;
    target = null;
    path = [];
    spring.vx = spring.vy = 0;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stop();
  }


  function stepSpring(dt) {
    // One spring only, with slow enough response to curl rather than copy
    // the direct pointer path. Integrate stably across dropped frames.
    const subdivisions = Math.max(1, Math.ceil(dt));
    const step = dt / subdivisions;
    for (let i = 0; i < subdivisions; i++) {
      spring.vx = (spring.vx + (target.x - spring.x) * .085 * step) * Math.pow(.80, step);
      spring.vy = (spring.vy + (target.y - spring.y) * .085 * step) * Math.pow(.80, step);
      spring.x += spring.vx * step;
      spring.y += spring.vy * step;
    }
  }


  function tangent(points, index) {
    const before = points[Math.max(0, index - 1)];
    const current = points[index];
    const after = points[Math.min(points.length - 1, index + 1)];
    const dx = after.x - before.x, dy = after.y - before.y;
    const length = Math.hypot(dx, dy);
    if (length < .001) return { x: 0, y: 0 };
    const previousLength = Math.hypot(current.x - before.x, current.y - before.y);
    const followingLength = Math.hypot(after.x - current.x, after.y - current.y);
    const short = index === 0 ? followingLength
      : index === points.length - 1 ? previousLength
      : Math.min(previousLength, followingLength);
    const scale = Math.min(.5, 1.25 * short / length);
    return { x: dx * scale, y: dy * scale };
  }

  function paint(now) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    const count = path.length;
    if (count < 2) return;
    const handles = path.map((_, i) => tangent(path, i));
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 1; i < count; i++) {
      const a = path[i - 1], b = path[i];
      if (Math.hypot(b.x - a.x, b.y - a.y) < .15) continue;

      const life = clamp(1 - (now - b.t) / FADE_MS, 0, 1);
      if (life <= 0) continue;
      const color = b.tone === 'light' ? '250,246,239' : '55,50,43';
      const alpha = (b.tone === 'light' ? .66 : .61) * life;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.bezierCurveTo(
        a.x + handles[i - 1].x / 3, a.y + handles[i - 1].y / 3,
        b.x - handles[i].x / 3, b.y - handles[i].y / 3,
        b.x, b.y
      );
      ctx.strokeStyle = 'rgba(' + color + ',' + alpha + ')';
      ctx.shadowColor = 'rgba(' + color + ',' + (.3 * alpha) + ')';
      ctx.shadowBlur = 1.5 * life;
      ctx.lineWidth = .3 + 2 * life;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }


  function draw(now) {
    raf = 0;
    if (!target || reducedMotion.matches) {
      stop();
      return;
    }
    const dt = clamp(lastFrame ? (now - lastFrame) / 16.667 : 1, .25, 2.25);
    lastFrame = now;

    // Mouse events can stop while the spring is still catching up.
    // Physics and ink lifetime are deliberately independent.
    const error = Math.hypot(target.x - spring.x, target.y - spring.y);
    const velocity = Math.hypot(spring.vx, spring.vy);
    const moving = error > .55 || velocity > .35;
    if (moving) {
      stepSpring(dt);
      const last = path[path.length - 1];
      if (!last || Math.hypot(spring.x - last.x, spring.y - last.y) > .45) {
        path.push({ x: spring.x, y: spring.y, t: now, tone: currentTone });
      }
    } else {
      spring.x = target.x;
      spring.y = target.y;
      spring.vx = spring.vy = 0;
    }
    while (path.length && now - path[0].t >= FADE_MS) path.shift();
    paint(now);

    if (moving || path.length) raf = requestAnimationFrame(draw);
    else lastFrame = 0; // Retain spring position for the next entry.
  }


  function onPointerMove(event) {
    if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
    const x = event.clientX, y = event.clientY;
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const now = performance.now();
    currentTone = surfaceTone(x, y);

    if (!target) {
      // Only the first event following a fresh load initializes position.
      spring.x = x;
      spring.y = y;
      spring.vx = spring.vy = 0;
      target = { x, y };
      return;
    }

    // Do not reset after inactivity or a large jump back into the viewport.
    // A fresh trail grows out of the previously parked virtual cursor.
    const distance = Math.hypot(x - spring.x, y - spring.y);
    if (!path.length && distance > .7) {
      path.push({ x: spring.x, y: spring.y, t: now, tone: currentTone });
    }
    target = { x, y };
    if (!raf && (path.length || distance > .55)) {
      raf = requestAnimationFrame(draw);
    }
  }

  function pauseInk() {
    // Changing tabs should drop stale drawn pixels, not the saved position.
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    lastFrame = 0;
    path = [];
    ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

  resize();
  document.body.appendChild(canvas);
  addEventListener('pointermove', onPointerMove, { passive: true });
  addEventListener('blur', () => { if (document.hidden) pauseInk(); }, { passive: true });
  addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseInk();
  });
  reducedMotion.addEventListener?.('change', () => {
    canvas.style.display = reducedMotion.matches ? 'none' : '';
    stop();
  });

  window.__allySmoothPointerTrailReady = true;
  document.documentElement.classList.add('portfolio-smooth-trail-ready');
})();
