/* Continuous cubic pointer trail. Matches the original portfolio trail's visual properties. */
(() => {
  'use strict';
  if (window.__allySmoothPointerTrailReady) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches ||
      matchMedia('(pointer: coarse)').matches) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.className = 'pointer-trail pointer-trail-smooth';
  canvas.setAttribute('aria-hidden', 'true');

  let points = [], raf = 0, dpr = 1;
  const fit = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const surfaceTone = (x, y) => {
    let el = document.elementFromPoint(x, y);
    while (el && el !== document.documentElement) {
      const c = getComputedStyle(el).backgroundColor;
      const m = c && c.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)(?:[, /]+([\d.]+))?\)/);
      if (m && Number(m[4] ?? 1) > .18) {
        const lum = .2126 * Number(m[1]) + .7152 * Number(m[2]) + .0722 * Number(m[3]);
        return lum < 135 ? 'light' : 'dark';
      }
      el = el.parentElement;
    }
    return 'dark';
  };
  // Keep the existing two-pass motion smoothing, hue transitions and sample timing.
  const soften = source => {
    let line = source;
    for (let pass = 0; pass < 2; pass++) {
      if (line.length < 3) break;
      const next = [line[0]];
      for (let i = 0; i < line.length - 1; i++) {
        const a = line[i], b = line[i + 1];
        next.push({ x: a.x * .75 + b.x * .25, y: a.y * .75 + b.y * .25,
                    t: a.t * .75 + b.t * .25, tone: a.tone });
        next.push({ x: a.x * .25 + b.x * .75, y: a.y * .25 + b.y * .75,
                    t: a.t * .25 + b.t * .75, tone: b.tone });
      }
      next.push(line[line.length - 1]);
      line = next;
    }
    return line;
  };
  const draw = now => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    points = points.filter(p => now - p.t < 220);
    const line = soften(points);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let i = 1; i < line.length; i++) {
      const a = line[i - 1], b = line[i], age = (now - b.t) / 220;
      const life = Math.max(0, 1 - age);
      if (a.tone !== b.tone) continue;

      // Catmull-Rom-to-Bézier conversion: neighboring segments share tangents.
      const p0 = line[Math.max(0, i - 2)];
      const p3 = line[Math.min(line.length - 1, i + 1)];
      const c1x = a.x + (b.x - p0.x) / 6;
      const c1y = a.y + (b.y - p0.y) / 6;
      const c2x = b.x - (p3.x - a.x) / 6;
      const c2y = b.y - (p3.y - a.y) / 6;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.bezierCurveTo(c1x, c1y, c2x, c2y, b.x, b.y);
      ctx.strokeStyle = b.tone === 'light'
        ? `rgba(250,246,239,${.66 * life})`
        : `rgba(55,50,43,${.61 * life})`;
      ctx.shadowColor = b.tone === 'light'
        ? `rgba(250,246,239,${.2 * life})`
        : `rgba(55,50,43,${.17 * life})`;
      ctx.shadowBlur = 1.5 * life;
      ctx.lineWidth = .3 + 2 * life;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    if (points.length) raf = requestAnimationFrame(draw);
    else raf = 0;
  };
  const add = e => {
    const now = performance.now();
    const tone = surfaceTone(e.clientX, e.clientY);
    const last = points.at(-1);
    if (!last || Math.hypot(e.clientX - last.x, e.clientY - last.y) > 3) {
      points.push({ x: e.clientX, y: e.clientY, t: now, tone });
    }
    if (!raf) raf = requestAnimationFrame(draw);
  };

  fit();
  document.body.appendChild(canvas);
  window.__allySmoothPointerTrailReady = true;
  document.documentElement.classList.add('portfolio-smooth-trail-ready');
  addEventListener('pointermove', e => {
    if (e.pointerType === 'mouse') add(e);
  }, { passive: true });
  addEventListener('pointerleave', () => {
    if (!raf && points.length) raf = requestAnimationFrame(draw);
  }, { passive: true });
  addEventListener('blur', () => { points = []; }, { passive: true });
  addEventListener('resize', fit, { passive: true });
})();
