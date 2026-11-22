/* ───────── theme ───────── */
function setTheme(th) {
  LSset('drip_theme', th); document.documentElement.dataset.theme = th;
  $$('.theme-btn').forEach(b => { b.textContent = th === 'dark' ? '☀' : '☾'; });
  document.dispatchEvent(new Event('themechange'));
}
