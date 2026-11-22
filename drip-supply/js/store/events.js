/* ═══════════ EVENTS ═══════════ */
document.addEventListener('click', e => {
  const f = e.target.closest('[data-f]'); if (f) { filter = f.dataset.f; renderCats(); renderProducts(); if (f.classList.contains('cat')) $('#collection').scrollIntoView({ behavior: 'smooth' }); return; }
  const h = e.target.closest('[data-heart]'); if (h) { e.stopPropagation(); toggleWish(+h.dataset.heart); return; }
  const qk = e.target.closest('[data-quick]'); if (qk) { e.stopPropagation(); addItem(prod(+qk.dataset.quick), 'M', 0); return; }
  const op = e.target.closest('[data-open]'); if (op) { closeDrawers(); openProduct(+op.dataset.open); return; }
  const card = e.target.closest('.card'); if (card) openProduct(+card.dataset.id);
});
$('#q').oninput = e => { query = e.target.value.trim().toLowerCase(); renderProducts(); };
$('#sort').onchange = e => { sortBy = e.target.value; renderProducts(); };
$('#lang-btn').onclick = () => setLang(LANG === 'ar' ? 'en' : 'ar');
$('#theme-btn').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
addEventListener('keydown', e => { if (e.key === 'Escape') { ['pm', 'co'].forEach(closeModal); closeDrawers(); } });
document.addEventListener('langchange', () => { if (!S.products.length) return; renderStatic(); renderCats(); renderProducts(); renderReviews(); renderCart(); renderWish(); });
