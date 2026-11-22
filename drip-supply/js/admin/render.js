/* ───── views ───── */
function render() {
  if (!D) return;
  $$('.nv').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  $('#title').textContent = t(TITLES[tab]);
  const n = $('#bd-orders'); n.hidden = !D.stats.pending; n.textContent = D.stats.pending;
  const note = $('#mode-note'); note.textContent = BACKEND === 'remote' ? '● ' + t('a_online') : '⚠ ' + t('a_local'); note.className = 'note' + (BACKEND === 'remote' ? ' on' : '');
  $('#view').innerHTML = ({ overview, orders, products, reviews, coupons, settings, styles: stylesView })[tab]();
  if (tab === 'products') { bindProducts(); paintLive(); }
  if (tab === 'styles') bindStyles();
}
