/* ═══════════ 3D tilt + hero parallax + glow ═══════════ */
function bindTilt(root) {
  if (matchMedia('(hover: none)').matches) return;
  root.onpointermove = e => {
    const c = e.target.closest('.card, .cat'); if (!c) return;
    const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    c.style.setProperty('--rx', (-py * 10) + 'deg'); c.style.setProperty('--ry', (px * 12) + 'deg');
    if (c.classList.contains('cat')) c.style.transform = `rotateX(${-py * 10}deg) rotateY(${px * 12}deg)`;
  };
  root.onpointerout = e => { const c = e.target.closest('.card, .cat'); if (!c) return; c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); c.style.transform = ''; };
}
(function pointerFx() {
  const glow = $('#glow'), tee = $('#stage-tee'), stage = $('#stage');
  let gx = 0, gy = 0, tx = 0, ty = 0, raf = 0;
  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    const r = stage.getBoundingClientRect();
    if (e.clientY > r.top - 100 && e.clientY < r.bottom + 100) {
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      tee.style.transform = `rotateY(${px * 28}deg) rotateX(${-py * 22}deg)`;
    }
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  function loop() { gx += (tx - gx) * .14; gy += (ty - gy) * .14; glow.style.transform = `translate(${gx - 210}px,${gy - 210}px)`; raf = Math.abs(tx - gx) + Math.abs(ty - gy) > .5 ? requestAnimationFrame(loop) : 0; }
})();
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));
