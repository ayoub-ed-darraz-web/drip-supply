/* ───────── particles (green in light theme, gold in dark theme) ───────── */
function initParticles() {
  if (document.getElementById('fx')) return;
  const c = document.createElement('canvas'); c.id = 'fx'; c.setAttribute('aria-hidden', 'true'); document.body.prepend(c);
  const ctx = c.getContext('2d'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, rgb = '18,194,122', mx = -999, my = -999, P = [], running = false;
  const readColor = () => { rgb = (getComputedStyle(document.documentElement).getPropertyValue('--g-rgb') || rgb).trim(); if (reduce) draw(); };
  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, W * H / 16000));
    while (P.length < n) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .7, a: Math.random() * .5 + .4 });
    P.length = n; if (reduce) draw();
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of P) {
      if (!reduce) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < 140 && d > 0) { const f = (140 - d) / 140; p.x += dx / d * f * 2.4; p.y += dy / d * f * 2.4; }
      }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = `rgba(${rgb},${p.a})`; ctx.fill();
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
      const d = Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y);
      if (d < 115) { ctx.strokeStyle = `rgba(${rgb},${(1 - d / 115) * .2})`; ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.stroke(); }
    }
  }
  function loop() { if (document.hidden) { running = false; return; } draw(); requestAnimationFrame(loop); }
  function start() { if (!reduce && !running) { running = true; requestAnimationFrame(loop); } }
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  document.addEventListener('pointerleave', () => { mx = my = -999; });
  addEventListener('resize', size); document.addEventListener('visibilitychange', start);
  document.addEventListener('themechange', readColor);
  readColor(); size(); start();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initParticles); else initParticles();
