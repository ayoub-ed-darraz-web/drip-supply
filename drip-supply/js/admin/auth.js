let TOKEN = '', D = null, tab = 'overview', editId = null, pImage = '';
const TITLES = { styles: 'a_styles', overview: 'a_overview', orders: 'a_orders', products: 'a_products', reviews: 'a_reviews', coupons: 'a_coupons', settings: 'a_settings' };
const call = (m, p, b) => api(m, p, b, TOKEN);
const fmtDate = ts => new Date(ts).toLocaleString(LANG === 'ar' ? 'ar-MA' : 'en-GB', { dateStyle: 'short', timeStyle: 'short' });
const pill = s => `<span class="pill s-${s}">${t('st_' + s)}</span>`;

/* ───── auth ───── */
$('#login-form').onsubmit = async e => {
  e.preventDefault();
  const r = await api('POST', '/api/admin/login', { email: $('#email').value, code: $('#code').value });
  if (r.status === 200) { TOKEN = r.data.token; sessionStorage.setItem('drip_admin', TOKEN); await enter(); }
  else { $('#login-err').textContent = t('a_bad'); $('#login-form').classList.remove('shake'); void $('#login-form').offsetWidth; $('#login-form').classList.add('shake'); $('#code').value = ''; }
};
$('#logout').onclick = async () => { try { await sb.auth.signOut(); } catch (e) {} TOKEN = ''; D = null; location.hash = ''; location.reload(); };
async function enter() {
  const ok = await refresh(); if (!ok) { TOKEN = ''; sessionStorage.removeItem('drip_admin'); return; }
  $('#login').hidden = true; $('#app').hidden = false; render();
}
async function refresh() { const r = await call('GET', '/api/admin/data'); if (r.status !== 200) return false; D = r.data; return true; }
