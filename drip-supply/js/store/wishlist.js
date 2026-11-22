/* ═══════════ WISHLIST ═══════════ */
function toggleWish(id) {
  const on = wish.includes(id); wish = on ? wish.filter(x => x !== id) : [...wish, id]; LSset('drip_wish', wish);
  toast(t(on ? 't_unwish' : 't_wish')); renderProducts(); renderWish();
}
function renderWish() {
  const n = wish.filter(prod).length; $('#wish-cnt').textContent = n; $('#wish-cnt').classList.toggle('on', n > 0);
  $('#wish-list').innerHTML = n ? wish.map(prod).filter(Boolean).map(p => `<div class="ci"><div class="ci-th" data-open="${p.id}" style="cursor:pointer">${thumb(p, null, '70%')}</div><div><h4 style="font-size:.88rem">${esc(L(p.name))}</h4><div style="color:var(--g);font-weight:800">${money(p.price)}</div></div><button data-heart="${p.id}" aria-label="${t('remove')}">✕</button></div>`).join('') : `<div class="empty">${t('wish_empty')}</div>`;
}
