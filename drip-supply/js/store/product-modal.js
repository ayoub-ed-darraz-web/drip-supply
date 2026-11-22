/* ═══════════ PRODUCT MODAL ═══════════ */
function openProduct(id) {
  cur = prod(id); if (!cur) return; curSize = 'M'; curColor = 0;
  $('#pm-cat').textContent = catLabel(cur.cat); $('#pm-title').textContent = L(cur.name);
  $('#pm-price').innerHTML = money(cur.price) + (cur.oldPrice ? `<span class="pold" style="font-size:.9rem">${money(cur.oldPrice)}</span>` : '');
  $('#pm-desc').textContent = L(cur.desc);
  const st = $('#pm-stock'); st.className = 'stk ' + (cur.stock <= 0 ? 'no' : cur.stock <= 5 ? 'low' : 'ok');
  st.textContent = cur.stock <= 0 ? t('sold_out') : cur.stock <= 5 ? t('m_left', { n: cur.stock }) : t('m_in');
  $('#pm-add').disabled = cur.stock <= 0;
  const ss = cur.sizeStock || {}, tr = Object.keys(ss).length > 0, av = s => !tr || (ss[s] || 0) > 0;
  curSize = av('M') ? 'M' : (['S', 'L', 'XL'].find(av) || 'M');
  $('#pm-sizes').innerHTML = ['S', 'M', 'L', 'XL'].map(s => `<button class="sz ${s === curSize ? 'on' : ''}" data-sz="${s}" ${av(s) ? '' : 'disabled'}>${s}${tr && av(s) && ss[s] <= 3 ? `<sup style="font-size:.6rem;margin-inline-start:3px">${ss[s]}</sup>` : ''}</button>`).join('');
  $('#pm-colors').innerHTML = cur.colors.map((c, i) => `<button class="cd ${i === 0 ? 'on' : ''}" data-cd="${i}" style="background:${c}" aria-label="${c}"></button>`).join('');
  paintModalImg(); $('#pm').classList.add('on');
  trackLive(cur.id); paintLive(); if (sb) sb.rpc('track_view', { p_id: cur.id, p_visitor: VID }).then(() => {});
}
function paintModalImg() { const im = (cur.colorImages && cur.colorImages[curColor]) || cur.image; $('#pm-img').innerHTML = im ? `<img src="${im}" alt="">` : teeSVG(cur.colors[curColor], 250, 300); }
const closeModal = id => { $('#' + id).classList.remove('on'); if (id === 'pm') trackLive(null); };
$('#pm').addEventListener('click', e => {
  const sz = e.target.closest('[data-sz]'), cd = e.target.closest('[data-cd]');
  if (sz) { curSize = sz.dataset.sz; $$('.sz').forEach(b => b.classList.toggle('on', b === sz)); }
  if (cd) { curColor = +cd.dataset.cd; $$('.cd').forEach(b => b.classList.toggle('on', b === cd)); paintModalImg(); }
  if (e.target === $('#pm')) closeModal('pm');
});
$('#pm-add').onclick = () => { addItem(cur, curSize, curColor); closeModal('pm'); };
$('#pm-wa').onclick = () => wa(`Salam! ${L(cur.name)}\n${curSize} / ${cur.colors[curColor]}\n${cur.price} DH`);
document.addEventListener('click', e => { const c = e.target.closest('[data-close]'); if (c) closeModal(c.dataset.close); });
