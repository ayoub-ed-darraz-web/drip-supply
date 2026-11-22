function products() {
  return `<div class="panel"><div style="margin-bottom:14px"><button class="btn btn-p btn-sm" id="add-p">＋ ${t('a_add')}</button></div><div class="tw"><table><thead><tr><th></th><th>${t('fl_name_en')}</th><th>${t('fl_cat')}</th><th>${t('fl_price')}</th><th>${t('fl_stock')}</th><th>Tailles</th><th>👁 Vues</th><th>🟢 Live</th><th>${t('a_actions')}</th></tr></thead><tbody>` +
    D.products.map(p => `<tr><td><div class="pt">${p.image ? `<img src="${p.image}" alt="">` : teeSVG(p.colors[0], 32, 38)}</div></td><td><b>${esc(L(p.name))}</b></td><td>${esc(p.cat)}</td><td>${money(p.price)}${p.oldPrice ? ` <s style="color:var(--dim)">${p.oldPrice}</s>` : ''}</td>
      <td><b style="color:${p.stock <= 0 ? 'var(--danger)' : p.stock <= 5 ? '#e08a00' : 'inherit'}">${p.stock}</b></td><td class="fm" style="font-size:.75rem">${Object.keys(p.sizeStock).map(k => `${k}:${p.sizeStock[k]}`).join(' · ') || '—'}</td><td><b>${p.views}</b></td><td><b data-live="${p.id}">0</b></td>
      <td style="white-space:nowrap"><button class="btn btn-s btn-sm" data-edit="${p.id}">✎ ${t('a_edit')}</button> <button class="btn btn-s btn-sm" data-del="${p.id}">🗑</button></td></tr>`).join('') + `</tbody></table></div></div>`;
}
function bindProducts() {
  $('#add-p').onclick = () => openForm(null);
  $$('[data-edit]').forEach(b => b.onclick = () => openForm(+b.dataset.edit));
  $$('[data-del]').forEach(b => b.onclick = async () => { if (!confirm(t('a_sure'))) return; await call('DELETE', '/api/admin/products/' + b.dataset.del); await refresh(); render(); });
}
function openForm(id) {
  editId = id; const p = id ? D.products.find(x => x.id === id) : null; pImage = p ? p.image : '';
  $('#pf-title').textContent = t(p ? 'a_edit' : 'a_add'); $('#pf-err').textContent = '';
  $('#p-nen').value = p ? p.name.en : ''; $('#p-nar').value = p ? p.name.ar : ''; $('#p-den').value = p ? p.desc.en : ''; $('#p-dar').value = p ? p.desc.ar : '';
  $('#p-cat').value = p ? p.cat : D.categories[0] ? D.categories[0].id : ''; $('#p-badge').value = p ? p.badge : ''; $('#p-price').value = p ? p.price : ''; $('#p-old').value = p && p.oldPrice ? p.oldPrice : ''; ['S', 'M', 'L', 'XL'].forEach(k => $('#p-s-' + k).value = p ? (Object.keys(p.sizeStock).length ? (p.sizeStock[k] ?? '') : Math.floor(p.stock / 4)) : 10);
  const cols = p ? p.colors : ['#0f6b4a', '#f4f7f5', '#14181a']; ['pc1', 'pc2', 'pc3'].forEach((k, i) => $('#' + k).value = cols[i] || '#ffffff'); cImgs = [0, 1, 2].map(i => (p && p.colorImages[i]) || ''); paintCI();
  $('#cats-dl').innerHTML = D.categories.map(c => `<option value="${esc(c.id)}">${esc(L(c))}</option>`).join(''); paintPrev(); $('#pf').classList.add('on');
}
function paintPrev() { $('#p-prev').innerHTML = pImage ? `<img src="${pImage}" alt="">` : '—'; }
$('#p-file').onchange = async e => { if (e.target.files[0]) { pImage = await fileToDataURL(e.target.files[0], 800); paintPrev(); } };
$('#p-clr').onclick = () => { pImage = ''; $('#p-file').value = ''; paintPrev(); };
let cImgs = ['', '', ''];
const paintCI = () => [0, 1, 2].forEach(i => { $('#ci-prev-' + i).innerHTML = cImgs[i] ? `<img src="${cImgs[i]}" alt="">` : '—'; });
[0, 1, 2].forEach(i => {
  $('#ci-file-' + i).onchange = async e => { if (e.target.files[0]) { cImgs[i] = await fileToDataURL(e.target.files[0], 800); paintCI(); } };
  $('#ci-clr-' + i).onclick = () => { cImgs[i] = ''; $('#ci-file-' + i).value = ''; paintCI(); };
});
async function uploadColorImg(u) {
  if (!u || !u.startsWith('data:')) return u || '';
  const blob = await (await fetch(u)).blob();
  const path = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + (blob.type.split('/')[1] || 'jpg');
  const { error } = await sb.storage.from('product-images').upload(path, blob, { contentType: blob.type, cacheControl: '31536000' });
  if (error) throw error;
  return sb.storage.from('product-images').getPublicUrl(path).data.publicUrl;
}
$('#pf-save').onclick = async () => {
  const body = { name: { en: $('#p-nen').value, ar: $('#p-nar').value }, desc: { en: $('#p-den').value, ar: $('#p-dar').value }, cat: $('#p-cat').value, badge: $('#p-badge').value, price: $('#p-price').value, oldPrice: $('#p-old').value, sizeStock: Object.fromEntries(['S', 'M', 'L', 'XL'].map(k => [k, $('#p-s-' + k).value])), stock: 0, colors: ['pc1', 'pc2', 'pc3'].map(k => $('#' + k).value), image: pImage, colorImages: await Promise.all(cImgs.map(u => uploadColorImg(u).catch(() => { toast('✕ Storage', 'err'); return ''; }))) };
  if (!body.name.en.trim() && !body.name.ar.trim()) { $('#pf-err').textContent = t('fl_name_en'); return; }
  const r = editId ? await call('PUT', '/api/admin/products/' + editId, body) : await call('POST', '/api/admin/products', body);
  if (r.status >= 300) { $('#pf-err').textContent = String(r.data.error || 'error'); return; }
  $('#pf').classList.remove('on'); toast(t('a_saved')); await refresh(); render();
};
