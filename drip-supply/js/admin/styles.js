function stylesView() {
  return `<div><p style="color:var(--muted);font-size:.85rem;margin-bottom:14px">كل نمط = بطاقة في الصفحة الرئيسية، الترتيب تصاعدي وأول 4 تظهر · Chaque style = une carte, ordre croissant (4 premières affichées).</p>` +
  D.categories.map(c => `<div class="panel" style="margin-bottom:12px" data-cat="${esc(c.id)}"><div style="display:flex;gap:14px;flex-wrap:wrap"><div class="imgprev" data-cimg="${esc(c.id)}" style="flex:0 0 90px;height:120px">${c.image ? `<img src="${c.image}" alt="">` : '—'}</div><div style="flex:1;min-width:240px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
    <div><label class="lbl">Name EN</label><input class="inp" data-k="en" value="${esc(c.en)}"></div>
    <div><label class="lbl">الاسم AR</label><input class="inp" data-k="ar" dir="rtl" value="${esc(c.ar)}"></div>
    <div><label class="lbl">Description EN</label><input class="inp" data-k="den" value="${esc(c.desc.en)}"></div>
    <div><label class="lbl">الوصف AR</label><input class="inp" data-k="dar" dir="rtl" value="${esc(c.desc.ar)}"></div>
    <div><label class="lbl">Ordre</label><input class="inp" data-k="sort" type="number" value="${c.sort || 0}"></div>
    <div><label class="lbl">Image</label><input type="file" accept="image/*" data-cfile="${esc(c.id)}"></div></div></div>
    <div style="text-align:end;margin-top:10px"><button class="btn btn-p btn-sm" data-csave="${esc(c.id)}">${t('a_save')}</button></div></div>`).join('') + `</div>`;
}
const catImg = {};
function bindStyles() {
  $$('[data-cfile]').forEach(f => f.onchange = async e => { if (!e.target.files[0]) return; const id = f.dataset.cfile; catImg[id] = await fileToDataURL(e.target.files[0], 800); $(`[data-cimg="${id}"]`).innerHTML = `<img src="${catImg[id]}" alt="">`; });
  $$('[data-csave]').forEach(b => b.onclick = async () => {
    const id = b.dataset.csave, box = b.closest('[data-cat]'), g = k => $(`[data-k="${k}"]`, box).value;
    const body = { en: g('en'), ar: g('ar'), desc: { en: g('den'), ar: g('dar') }, sort: g('sort') };
    if (id in catImg) body.image = catImg[id];
    const r = await call('PUT', '/api/admin/categories/' + encodeURIComponent(id), body);
    if (r.status === 200) { delete catImg[id]; toast(t('a_saved')); await refresh(); render(); } else toast('✕', 'err');
  });
}
