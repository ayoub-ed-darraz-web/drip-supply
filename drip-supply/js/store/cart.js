/* ═══════════ CART ═══════════ */
function addItem(p, size, ci) {
  const color = p.colors[ci] || p.colors[0], ex = cart.find(i => i.id === p.id && i.size === size && i.color === color);
  const inCart = cart.filter(i => i.id === p.id).reduce((a, i) => a + i.qty, 0);
  const ssq = Object.keys(p.sizeStock || {}).length ? (p.sizeStock[size] || 0) : undefined;
  if (ssq !== undefined && cart.filter(i => i.id === p.id && i.size === size).reduce((a, i) => a + i.qty, 0) >= ssq) { toast(t('err_stock', { n: L(p.name) }), 'err'); return; }
  if (inCart >= p.stock) { toast(t('err_stock', { n: L(p.name) }), 'err'); return; }
  if (ex) ex.qty++; else cart.push({ id: p.id, size, color, qty: 1 });
  saveCart(); toast(t('t_cart')); openDrawer('cart');
}
function calc() {
  const sub = cart.reduce((a, i) => { const p = prod(i.id); return a + (p ? p.price * i.qty : 0); }, 0);
  const disc = coupon ? Math.round(sub * coupon.percent / 100) : 0, after = sub - disc;
  const ship = !cart.length ? 0 : after >= S.settings.freeShipping ? 0 : S.settings.shippingFee;
  return { sub, disc, ship, total: after + ship, after };
}
function renderCart() {
  cart = cart.filter(i => prod(i.id));
  const n = cart.reduce((a, i) => a + i.qty, 0); $('#cart-cnt').textContent = n; $('#cart-cnt').classList.toggle('on', n > 0); $('#cart-n').textContent = n;
  const c = calc(); $('#cart-ft').hidden = !cart.length;
  $('#cart-list').innerHTML = cart.length ? cart.map((it, i) => { const p = prod(it.id); return `<div class="ci"><div class="ci-th">${thumb(p, it.color, '80%')}</div><div><h4 style="font-size:.88rem">${esc(L(p.name))}</h4><div style="font-size:.75rem;color:var(--dim)">${it.size} • <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${it.color};border:1px solid var(--b)"></span></div><div class="qty"><button class="qb" data-q="${i}" data-d="-1">−</button><strong style="font-size:.85rem">${it.qty}</strong><button class="qb" data-q="${i}" data-d="1">+</button><span style="font-size:.85rem;color:var(--g);font-weight:800;margin-inline-start:6px">${money(p.price * it.qty)}</span></div></div><button data-rm="${i}" aria-label="${t('remove')}" style="color:var(--dim)">✕</button></div>`; }).join('') : `<div class="empty">${t('cart_empty')}</div>`;
  $('#t-sub').textContent = money(c.sub); $('#t-disc-row').hidden = !c.disc; $('#t-disc').textContent = '-' + money(c.disc);
  $('#t-ship').textContent = c.ship ? money(c.ship) : t('free'); $('#t-tot').textContent = money(c.total); $('#co-total').textContent = money(c.total);
  const left = S.settings.freeShipping - c.after;
  $('#ship-msg').textContent = left > 0 ? t('free_left', { n: left }) : t('free_got'); $('#ship-fill').style.width = Math.min(100, c.after / S.settings.freeShipping * 100) + '%';
}
$('#cart-list').addEventListener('click', e => {
  const q = e.target.closest('[data-q]'), rm = e.target.closest('[data-rm]');
  if (q) { const it = cart[+q.dataset.q], p = prod(it.id), total = cart.filter(x => x.id === it.id).reduce((a, x) => a + x.qty, 0), d = +q.dataset.d;
    if (d > 0 && total >= p.stock) return toast(t('err_stock', { n: L(p.name) }), 'err');
    it.qty += d; if (it.qty <= 0) cart.splice(+q.dataset.q, 1); saveCart(); }
  if (rm) { cart.splice(+rm.dataset.rm, 1); saveCart(); }
});
$('#promo-btn').onclick = async () => {
  const code = $('#promo').value.trim(); if (!code) return;
  const r = await api('POST', '/api/coupon', { code });
  if (r.status === 200) { coupon = r.data; toast(t('t_coupon', { n: coupon.percent })); } else { coupon = null; toast(t('t_badcoupon'), 'err'); }
  renderCart();
};
function waCartText() {
  const lines = cart.map(i => { const p = prod(i.id); return `• ${L(p.name)} (${i.size}, ${i.color}) x${i.qty} - ${p.price * i.qty} DH`; }).join('\n');
  return `Salam! ${LANG === 'ar' ? 'أريد طلب:' : 'I would like to order:'}\n\n${lines}\n\nTotal: ${calc().total} DH`;
}
const wa = text => window.open(`https://wa.me/${S.settings.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
$('#cart-wa').onclick = () => cart.length && wa(waCartText());

/* drawers */
function openDrawer(id) { $('#' + id).classList.add('on'); $('#back').classList.add('on'); if (id === 'wish') renderWish(); }
function closeDrawers() { $$('.drawer').forEach(d => d.classList.remove('on')); $('#back').classList.remove('on'); }
$('#back').onclick = closeDrawers;
$$('[data-drawer-close]').forEach(b => b.onclick = closeDrawers);
$('#cart-btn').onclick = () => openDrawer('cart'); $('#wish-btn').onclick = () => openDrawer('wish');
