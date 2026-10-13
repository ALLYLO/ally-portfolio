/* Spring-driven ribbon trail: curved, fading strands bloom only on fast turns. */
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

  const LIFETIME = 220;
  const strands = [
    { spring: .50, drag: .58, offset: 0,  opacity: 1,   width: 1 },
    { spring: .32, drag: .67, offset: 12, opacity: .58, width: .82 },
    { spring: .19, drag: .73, offset: 23, opacity: .40, width: .72 },
    { spring: .115,drag: .78, offset: 35, opacity: .27, width: .62 },
    { spring: .075,drag: .82, offset: 46, opacity: .18, width: .54 }
  ].map(spec => ({ ...spec, x: 0, y: 0, vx: 0, vy: 0, history: [] }));

  let pointer = null, rawHistory = [], frame = 0, lastFrame = 0;
  let demand = 0, flare = 0, outwardX = 0, outwardY = 0, tone = 'dark';
  let dpr = 1;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const smoothstep = (a, b, v) => {
    const t = clamp((v - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  function fit() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    reset();
  }

  function reset() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    pointer = null;
    rawHistory = [];
    demand = flare = outwardX = outwardY = 0;
    lastFrame = 0;
    strands.forEach(s => { s.history = []; s.vx = s.vy = 0; });
    ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

  function surfaceTone(x, y) {
    let el = document.elementFromPoint(x, y);
    while (el && el !== document.documentElement) {
      const color = getComputedStyle(el).backgroundColor;
      const match = color && color.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)(?:[, /]+([\d.]+))?\)/);
      if (match && Number(match[4] ?? 1) > .18) {
        const lum = .2126 * Number(match[1]) + .7152 * Number(match[2]) + .0722 * Number(match[3]);
        return lum < 135 ? 'light' : 'dark';
      }
      el = el.parentElement;
    }
    return 'dark';
  }

  function pastPoint(age) {
    if (!rawHistory.length) return null;
    const t = rawHistory[rawHistory.length - 1].t - age;
    for (let i = rawHistory.length - 1; i >= 0; i--) {
      if (rawHistory[i].t <= t) return rawHistory[i];
    }
    return null;
  }

  function updateTurn() {
    const a = rawHistory[rawHistory.length - 1];
    const b = pastPoint(42);
    const c = pastPoint(84);
    if (!a || !b || !c || c === b) return;

    const dx0 = b.x - c.x, dy0 = b.y - c.y;
    const dx1 = a.x - b.x, dy1 = a.y - b.y;
    const mag0 = Math.hypot(dx0, dy0), mag1 = Math.hypot(dx1, dy1);
    if (mag0 < 3 || mag1 < 3) return;

    const angle = Math.atan2(dx0 * dy1 - dy0 * dx1, dx0 * dx1 + dy0 * dy1);
    const speed = mag1 * 1000 / Math.max(12, a.t - b.t);
    const energy = smoothstep(.12, .67, Math.abs(angle)) * smoothstep(190, 760, speed);
    demand = Math.max(demand * .77, energy);

    if (energy > .035) {
      const sign = Math.sign(angle);
      const nx = sign * dy1 / mag1;
      const ny = -sign * dx1 / mag1;
      outwardX += (nx - outwardX) * .36;
      outwardY += (ny - outwardY) * .36;
    }
  }

  function onPointerMove(event) {
    if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
    const now = performance.now();
    const x = event.clientX, y = event.clientY;
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

    const wasIdle = !pointer || now - pointer.t > 280;
    pointer = { x, y, t: now };
    tone = surfaceTone(x, y);

    if (wasIdle) {
      rawHistory = [];
      demand = flare = outwardX = outwardY = 0;
      for (const s of strands) {
        s.x = x; s.y = y; s.vx = s.vy = 0;
        s.history = [];
      }
    }

    const prev = rawHistory[rawHistory.length - 1];
    if (!prev || Math.hypot(x - prev.x, y - prev.y) >= 1.3 || now - prev.t > 15) {
      rawHistory.push({ x, y, t: now });
      while (rawHistory.length > 2 && rawHistory[0].t < now - 165) rawHistory.shift();
      updateTurn();
    }
    if (!frame) frame = requestAnimationFrame(draw);
  }

  function advance(strand, goalX, goalY, step) {
    const pieces = Math.max(1, Math.ceil(step));
    const dt = step / pieces;
    for (let j = 0; j < pieces; j++) {
      strand.vx = (strand.vx + (goalX - strand.x) * strand.spring * dt) * Math.pow(strand.drag, dt);
      strand.vy = (strand.vy + (goalY - strand.y) * strand.spring * dt) * Math.pow(strand.drag, dt);
      strand.x += strand.vx * dt;
      strand.y += strand.vy * dt;
    }
  }

  // Centripetal Catmull-Rom controls: both sides of each join share a tangent.
  function curve(ctx, p0, a, b, p3) {
    const d01 = Math.sqrt(Math.hypot(a.x - p0.x, a.y - p0.y));
    const d12 = Math.sqrt(Math.hypot(b.x - a.x, b.y - a.y));
    const d23 = Math.sqrt(Math.hypot(p3.x - b.x, p3.y - b.y));
    const c1 = .33 * d12 / Math.max(.001, d01 + d12);
    const c2 = .33 * d12 / Math.max(.001, d12 + d23);
    ctx.bezierCurveTo(
      a.x + (b.x - p0.x) * c1, a.y + (b.y - p0.y) * c1,
      b.x - (p3.x - a.x) * c2, b.y - (p3.y - a.y) * c2,
      b.x, b.y
    );
  }

  function renderStrand(s, now, index) {
    const points = s.history;
    if (points.length < 2) return;
    const light = tone === 'light';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i];
      const life = clamp(1 - (now - b.t) / LIFETIME, 0, 1);
      const strength = index === 0 ? 1 : Math.pow(b.flare, .8);
      const alpha = (b.tone === 'light' ? .66 : .61) * s.opacity * life * strength;
      if (alpha < .006 || Math.hypot(b.x - a.x, b.y - a.y) < .22) continue;

      const p0 = points[Math.max(0, i - 2)];
      const p3 = points[Math.min(points.length - 1, i + 1)];
      const color = b.tone === 'light' ? '250,246,239' : '55,50,43';

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      curve(ctx, p0, a, b, p3);
      ctx.strokeStyle = 'rgba(' + color + ',' + alpha + ')';
      ctx.shadowColor = 'rgba(' + color + ',' + (alpha * .3) + ')';
      ctx.shadowBlur = 1.5 * life;
      ctx.lineWidth = (.3 + 2 * life) * s.width;
      ctx.stroke();
    }
  }

  function draw(now) {
    frame = 0;
    if (reducedMotion.matches || !pointer) { reset(); return; }

    const step = clamp(lastFrame ? (now - lastFrame) / 16.667 : 1, .3, 2.2);
    lastFrame = now;
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    demand *= Math.pow(.88, step);
    flare += (demand - flare) * (1 - Math.pow(.77, step));

    const afterMove = now - pointer.t;
    const record = afterMove < 75;
    strands.forEach((s, index) => {
      const goalX = pointer.x + outwardX * flare * s.offset;
      const goalY = pointer.y + outwardY * flare * s.offset;
      advance(s, goalX, goalY, step);
      if (record) s.history.push({ x: s.x, y: s.y, t: now, tone, flare });
      while (s.history.length && now - s.history[0].t > LIFETIME) s.history.shift();
      renderStrand(s, now, index);
    });
    ctx.shadowBlur = 0;

    if (strands[0].history.length || (afterMove < 75 && pointer)) {
      frame = requestAnimationFrame(draw);
    } else {
      pointer = null;
      demand = flare = 0;
      lastFrame = 0;
    }
  }

  fit();
  document.body.appendChild(canvas);
  window.__allySmoothPointerTrailReady = true;
  document.documentElement.classList.add('portfolio-smooth-trail-ready');

  addEventListener('pointermove', onPointerMove, { passive: true });
  addEventListener('pointerleave', () => { demand = 0; }, { passive: true });
  addEventListener('blur', reset, { passive: true });
  addEventListener('resize', fit, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  reducedMotion.addEventListener?.('change', reset);
})();
