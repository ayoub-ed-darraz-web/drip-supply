/* ───── nav + init ───── */
$$('.nv').forEach(b => b.onclick = () => { tab = b.dataset.tab; render(); });
document.addEventListener('click', e => { const c = e.target.closest('[data-close]'); if (c) $('#' + c.dataset.close).classList.remove('on'); });
$$('.lang-btn').forEach(b => b.onclick = () => setLang(LANG === 'ar' ? 'en' : 'ar'));
$$('.theme-btn').forEach(b => b.onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
document.addEventListener('langchange', () => { if (D) render(); });
