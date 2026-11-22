/* ═══════════ RENDER: static texts ═══════════ */
function renderStatic() {
  const s = S.settings, brand = esc(s.brand || 'DRIP.SUPPLY'), i = brand.indexOf('.');
  const logo = i > 0 ? brand.slice(0, i) + '<span>.</span>' + brand.slice(i + 1) : brand;
  $('#logo').innerHTML = logo; $('#flogo').innerHTML = logo;
  $('#ann').textContent = L(s.announcement).replace('{n}', s.freeShipping);
  $('#hero-sub').textContent = L(s.heroSub);
  const wa = 'https://wa.me/' + s.whatsapp;
  ['wa-foot', 'wa-float'].forEach(id => $('#' + id).href = wa);
  $('#wa-foot').textContent = 'WhatsApp: +' + s.whatsapp;
  const items = ['mq1', 'mq2', 'mq3', 'mq4'].map(k => `<div class="marq-item"><i></i>${t(k)}</div>`).join('');
  $('#marq').innerHTML = items + items + items + items;
  paintHeroTee();
  $('#f-city').innerHTML = CITIES.map(c => `<option value="${c[0]}">${LANG === 'ar' ? c[1] : c[0]}</option>`).join('');
}

/* hero tee v2: realistic shaded tee, cycles colorways (Forest / Bone / Onyx) */
const HERO = [{ n: 'Forest', f: '#0f6b4a' }, { n: 'Bone', f: '#e9e6dc' }, { n: 'Onyx', f: '#15181a' }];
let hi = 0, heroTimer;
function heroTeeSVG(fill) {
  const light = isLight(fill), ink = light ? '#0b2a20' : '#ffffff', acc = light ? 'var(--g)' : 'var(--g3)', edge = light ? 'rgba(0,0,0,.28)' : 'rgba(255,255,255,.22)';
  const body = 'M96 44 L132 30 Q150 60 168 30 L204 44 L282 96 L254 150 L224 130 L224 318 Q150 332 76 318 L76 130 L46 150 L18 96 Z';
  return `<svg class="hero-tee" width="300" height="350" viewBox="0 0 300 350" fill="none" aria-hidden="true">
  <defs>
    <clipPath id="ht-clip"><path d="${body}"/></clipPath>
    <linearGradient id="ht-shade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".42"/><stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".6" stop-color="#fff" stop-opacity=".1"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>
    <linearGradient id="ht-vert" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></linearGradient>
    <linearGradient id="ht-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <radialGradient id="ht-sun" cx=".5" cy=".3" r=".8"><stop offset="0" style="stop-color:var(--g3)"/><stop offset="1" style="stop-color:var(--g)"/></radialGradient>
    <filter id="ht-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="ht-fabric" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .6 0 0 0 -.2"/></filter>
  </defs>
  <path d="${body}" fill="${fill}"/>
  <g clip-path="url(#ht-clip)">
    <rect width="300" height="350" fill="url(#ht-shade)"/>
    <rect width="300" height="350" fill="url(#ht-vert)"/>
    <g filter="url(#ht-blur)" opacity=".85">
      <path d="M92 140 Q120 200 100 320 L128 322 Q150 230 130 150 Z" fill="#000" opacity=".16"/>
      <path d="M208 140 Q184 210 200 320 L172 322 Q158 240 176 150 Z" fill="#000" opacity=".18"/>
      <path d="M90 292 Q150 272 212 294" stroke="#000" stroke-opacity=".16" stroke-width="12" stroke-linecap="round"/>
      <path d="M76 130 L46 150 L36 116 Z" fill="#000" opacity=".25"/><path d="M224 130 L254 150 L264 116 Z" fill="#000" opacity=".25"/>
    </g>
    <path d="M132 30 Q150 46 168 30 Q150 74 132 30Z" fill="#000" opacity=".5"/>
    <rect width="300" height="350" filter="url(#ht-fabric)" opacity=".55" style="mix-blend-mode:multiply"/>
    <g transform="rotate(18 150 175)"><rect class="sheen" x="-30" y="-60" width="70" height="470" fill="url(#ht-sheen)"/></g>
  </g>
  <path d="M130 31 Q150 68 170 31" stroke="${fill}" stroke-width="8" stroke-linecap="round"/>
  <path d="M130 31 Q150 68 170 31" stroke="#000" stroke-opacity=".22" stroke-width="8" stroke-linecap="round"/>
  <path d="M134 40 Q150 72 166 40" stroke="${edge}" stroke-width="1.2" stroke-dasharray="2 3"/>
  <path d="M70 66 Q82 100 76 130" stroke="${edge}" stroke-width="1.2" stroke-dasharray="3 3"/><path d="M230 66 Q218 100 224 130" stroke="${edge}" stroke-width="1.2" stroke-dasharray="3 3"/>
  <path d="M26 104 L53 150" stroke="${edge}" stroke-width="1.2" stroke-dasharray="3 3"/><path d="M274 104 L247 150" stroke="${edge}" stroke-width="1.2" stroke-dasharray="3 3"/>
  <path d="M80 306 Q150 320 220 306" stroke="${edge}" stroke-width="1.2" stroke-dasharray="3 3"/>
  <path d="${body}" stroke="${edge}" stroke-width="1.2" stroke-linejoin="round"/>
  <circle cx="150" cy="140" r="46" stroke="${acc}" stroke-width="2.2" opacity=".9"/>
  <circle cx="150" cy="140" r="31" fill="url(#ht-sun)"/>
  <rect x="116" y="141" width="68" height="2.5" fill="${fill}"/><rect x="116" y="149" width="68" height="3.5" fill="${fill}"/><rect x="116" y="158" width="68" height="5" fill="${fill}"/>
  <text x="150" y="216" fill="${ink}" font-family="'Clash Display','Cairo',sans-serif" font-weight="700" font-size="34" text-anchor="middle" letter-spacing="7">DRIP</text>
  <text x="150" y="234" style="fill:${light ? 'var(--g)' : 'var(--g3)'}" font-family="'Space Grotesk',monospace" font-size="9" text-anchor="middle" letter-spacing="4.5">SUPPLY // 04</text>
</svg>`;
}
function paintHeroTee(anim) {
  const inner = $('#tee-inner'), h = HERO[hi];
  const set = () => {
    inner.innerHTML = heroTeeSVG(h.f); $('#stage-sub').textContent = h.n + ' • Boxy';
    $('#hdots').innerHTML = HERO.map((x, i) => `<button class="${i === hi ? 'on' : ''}" data-hi="${i}" style="background:${x.f}" aria-label="${x.n}"></button>`).join('');
  };
  if (anim === true) { inner.classList.remove('flip'); void inner.offsetWidth; inner.classList.add('flip'); setTimeout(set, 380); } else set();
}
function restartHeroTimer() {
  clearInterval(heroTimer);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  heroTimer = setInterval(() => { if (document.hidden) return; hi = (hi + 1) % HERO.length; paintHeroTee(true); }, 4800);
}
$('#hdots').addEventListener('click', e => { const b = e.target.closest('[data-hi]'); if (b) { hi = +b.dataset.hi; paintHeroTee(true); restartHeroTimer(); } });
document.addEventListener('themechange', () => paintHeroTee(false));
paintHeroTee(false); restartHeroTimer();

function renderCats() {
  const so = id => (S.categories.find(x => x.id === id) || {}).sort || 0;
  const cats = [...new Set(S.products.map(p => p.cat))].sort((a, b) => so(a) - so(b));
  $('#filters').innerHTML = `<button class="fbtn ${filter === 'all' ? 'on' : ''}" data-f="all">${t('cat_all')}</button>` +
    cats.map(c => `<button class="fbtn ${filter === c ? 'on' : ''}" data-f="${esc(c)}">${esc(catLabel(c))}</button>`).join('');
  const tiles = cats.slice(0, 4);
  $('#cats').innerHTML = tiles.map((c, i) => { const cc = S.categories.find(x => x.id === c) || {}, d = cc.desc ? L(cc.desc) : '', im = cc.image; return `<button class="cat ${im ? 'has-img' : ''}" data-f="${esc(c)}"${im ? ` style="background:linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.78)),url('${im}') center/cover"` : ''}><div class="n fm">0${i + 1} / 0${tiles.length} <span>${t('collection')}</span></div><div><h3 class="fd">${esc(catLabel(c))}</h3>${d ? `<p style="margin-bottom:4px">${esc(d)}</p>` : ''}<p>${S.products.filter(p => p.cat === c).length} ${LANG === 'ar' ? 'منتج' : 'items'}</p></div></button>`; }).join('');
  bindTilt($('#cats'));
}

function renderProducts() {
  let list = S.products.filter(p => (filter === 'all' || p.cat === filter) &&
    (!query || (L(p.name) + ' ' + p.name.en + ' ' + p.name.ar + ' ' + catLabel(p.cat)).toLowerCase().includes(query)));
  if (sortBy === 'asc') list.sort((a, b) => a.price - b.price); else if (sortBy === 'desc') list.sort((a, b) => b.price - a.price); else list.sort((a, b) => b.created - a.created);
  $('#grid').innerHTML = list.length ? list.map(p => {
    const out = p.stock <= 0, badge = out ? `<span class="badge out">${t('sold_out')}</span>` : p.badge ? `<span class="badge ${p.badge}">${t(p.badge === 'sale' ? 'b_sale' : 'b_new')}</span>` : '';
    return `<article class="card" data-id="${p.id}">
      <div class="thumb">${thumb(p)}<span class="tag fm">${esc(catLabel(p.cat))}</span>${badge}
        <button class="heart ${wish.includes(p.id) ? 'on' : ''}" data-heart="${p.id}" aria-label="Wishlist">${wish.includes(p.id) ? '♥' : '♡'}</button>
        ${out ? '' : `<button class="btn btn-p btn-sm quick" data-quick="${p.id}">${t('add')}</button>`}</div>
      <div class="pinfo"><div><div class="pcat">${esc(catLabel(p.cat))}</div><div class="pname fd">${esc(L(p.name))}</div></div>
        <div class="pprice"><div class="pnow fd">${money(p.price)}${p.oldPrice ? `<span class="pold">${money(p.oldPrice)}</span>` : ''}</div><span style="font-size:.72rem;color:var(--dim)">240 GSM</span></div></div></article>`;
  }).join('') : `<div class="empty">${t('no_results')}</div>`;
  bindTilt($('#grid'));
}

function renderReviews() {
  $('#rv').innerHTML = S.reviews.map(r => `<div class="rv reveal in"><div><div class="st">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div><q>${esc(L(r.text))}</q></div><div class="rv-by"><div class="av">${esc(r.name[0])}</div><div><strong>${esc(r.name)}</strong><span>${esc(r.city)}</span></div></div></div>`).join('');
  $('#reviews').hidden = !S.reviews.length;
}
