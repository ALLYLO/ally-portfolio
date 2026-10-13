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
    // A single slightly underdamped follower can curl on sharp turns
    // without leaving multiple offset copies of the same circle.
    const subdivisions = Math.max(1, Math.ceil(dt));
    const substep = dt / subdivisions;
    for (let i = 0; i < subdivisions; i++) {
      spring.vx = (spring.vx + (target.x - spring.x) * .15 * substep) * Math.pow(.78, substep);
      spring.vy = (spring.vy + (target.y - spring.y) * .15 * substep) * Math.pow(.78, substep);
      spring.x += spring.vx * substep;
      spring.y += spring.vy * substep;
    }
  }

  function tangent(points, index) {
    if (index <= 0 || index >= points.length - 1) return { x: 0, y: 0 };
    const before = points[index - 1];
    const current = points[index];
    const after = points[index + 1];
    const beforeLength = Math.hypot(current.x - before.x, current.y - before.y);
    const afterLength = Math.hypot(after.x - current.x, after.y - current.y);
    const dx = after.x - before.x, dy = after.y - before.y;
    const length = Math.hypot(dx, dy);
    if (length < .001) return { x: 0, y: 0 };
    // One tangent per knot gives C1 continuity; limiting its length
    // prevents a sharp corner from turning into a Bézier overshoot.
    const scale = Math.min(.5, 1.2 * Math.min(beforeLength, afterLength) / length);
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

    // Stop generating new ink shortly after pointer activity ends.
    const active = now - target.t < 115;
    if (active) {
      stepSpring(dt);
      const last = path[path.length - 1];
      if (!last || Math.hypot(spring.x - last.x, spring.y - last.y) >= .65) {
        path.push({ x: spring.x, y: spring.y, t: now, tone: currentTone });
      }
    }

    while (path.length && now - path[0].t >= FADE_MS) path.shift();
    paint(now);

    if (active || path.length) {
      raf = requestAnimationFrame(draw);
    } else {
      target = null;
      lastFrame = 0;
    }
  }

  function onPointerMove(event) {
    if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
    const x = event.clientX, y = event.clientY;
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const now = performance.now();
    const idle = !target || now - target.t > 250;
    const teleported = target && Math.hypot(x - target.x, y - target.y) > 420;

    if (idle || teleported) {
      stop();
      spring.x = x;
      spring.y = y;
      path.push({ x, y, t: now, tone: surfaceTone(x, y) });
    }
    target = { x, y, t: now };
    currentTone = surfaceTone(x, y);
    if (!raf) raf = requestAnimationFrame(draw);
  }

  resize();
  document.body.appendChild(canvas);
  addEventListener('pointermove', onPointerMove, { passive: true });
  addEventListener('blur', stop, { passive: true });
  addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
  reducedMotion.addEventListener?.('change', () => {
    canvas.style.display = reducedMotion.matches ? 'none' : '';
    stop();
  });

  window.__allySmoothPointerTrailReady = true;
  document.documentElement.classList.add('portfolio-smooth-trail-ready');
})();
