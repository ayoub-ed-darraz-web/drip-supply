/* ───────── utils ───────── */
const money = n => Number(n).toLocaleString(LANG === 'ar' ? 'ar-MA' : 'en-US') + ' DH';
function isLight(hex) { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150; }
function teeSVG(fill, w, h) {
  const light = isLight(fill), txt = light ? '#0b3d2e' : '#ffffff', acc = light ? 'var(--g)' : 'var(--g3)';
  return `<svg class="tee" width="${w}" height="${h}" viewBox="0 0 200 240" fill="none" aria-hidden="true">
    <path d="M50 30 L80 18 Q100 34 120 18 L150 30 L184 82 L156 98 L146 72 L146 222 L54 222 L54 72 L44 98 L16 82 Z" fill="${fill}" stroke="${light ? '#c3d6ca' : 'rgba(255,255,255,.15)'}" stroke-width="1.5"/>
    <path d="M80 18 Q100 34 120 18 Q100 46 80 18Z" fill="${light ? '#dbe7df' : 'rgba(0,0,0,.25)'}"/>
    <text x="100" y="128" fill="${txt}" font-family="'Clash Display',sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="3">DRIP</text>
    <text x="100" y="144" style="fill:${acc}" font-family="'Space Grotesk',monospace" font-size="7" text-anchor="middle" letter-spacing="2">SUPPLY // 04</text></svg>`;
}
function toast(msg, type = 'ok') {
  let box = $('#toasts'); if (!box) { box = document.createElement('div'); box.id = 'toasts'; document.body.appendChild(box); }
  const el = document.createElement('div'); el.className = 'toast ' + type; el.textContent = msg; box.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 2400);
}
function fileToDataURL(file, max = 800) {
  return new Promise(res => {
    const r = new FileReader();
    r.onload = () => { const im = new Image(); im.onload = () => { const s = Math.min(1, max / Math.max(im.width, im.height)); const c = document.createElement('canvas'); c.width = im.width * s; c.height = im.height * s; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', .82)); }; im.src = r.result; };
    r.readAsDataURL(file);
  });
}
/* apply saved theme/lang immediately */
(function () { const th = LS('drip_theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.dataset.theme = th; document.documentElement.lang = LANG; document.documentElement.dir = LANG === 'ar' ? 'rtl' : 'ltr'; })();
