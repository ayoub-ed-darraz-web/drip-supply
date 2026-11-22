/* ═══════════ INIT ═══════════ */
async function loadStore() {
  const r = await api('GET', '/api/store'); if (r.status !== 200) return;
  S = r.data; renderStatic(); renderCats(); renderProducts(); renderReviews(); renderCart(); renderWish(); applyI18n();
}
