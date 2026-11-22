/* ═══════════ ROUTER + INIT (one page: store  /  #admin) ═══════════ */
const isAdminRoute = () => /^#\/?admin/i.test(location.hash);
async function adminBoot() {
  if (TOKEN || !sb) return;
  const { data } = await sb.auth.getSession();
  if (data.session && await sbIsAdmin()) { TOKEN = 'sb'; await enter(); }
}
function route() {
  const a = isAdminRoute();
  $('#store').hidden = a; $('#admin').hidden = !a;
  if (a) adminBoot();
}
(async function init() {
  $('#grid').innerHTML = '<div class="skel"></div>'.repeat(4);
  setLang(LANG); setTheme(document.documentElement.dataset.theme);
  await initBackend(); initLive();
  addEventListener('hashchange', route);
  route();
  await loadStore();
})();
