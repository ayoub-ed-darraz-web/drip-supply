function reviews() {
  return `<div class="panel"><h3>＋ ${t('a_reviews')}</h3><div class="addrow">
    <div><label class="lbl">${t('r_name')}</label><input class="inp" id="rv-n"></div><div><label class="lbl">${t('r_city')}</label><input class="inp" id="rv-c"></div>
    <div><label class="lbl">${t('r_en')}</label><input class="inp" id="rv-en"></div><div><label class="lbl">${t('r_ar')}</label><input class="inp" id="rv-ar" dir="rtl"></div>
    <button class="btn btn-p btn-sm" onclick="addReview()">${t('a_save')}</button></div></div>
  <div class="panel">${D.reviews.map(r => `<div class="lrow"><div><b>${esc(r.name)}</b> <span style="color:var(--dim)">${esc(r.city)}</span> <span style="color:#f5a623">${'★'.repeat(r.rating)}</span><br>${esc(L(r.text))}</div><button class="btn btn-s btn-sm" onclick="delReview('${r.id}')">🗑</button></div>`).join('') || '—'}</div>`;
}
async function addReview() {
  const r = await call('POST', '/api/admin/reviews', { name: $('#rv-n').value, city: $('#rv-c').value, rating: 5, text: { en: $('#rv-en').value, ar: $('#rv-ar').value } });
  if (r.status === 201) { toast(t('a_saved')); await refresh(); render(); } else toast('✕', 'err');
}
async function delReview(id) { if (!confirm(t('a_sure'))) return; await call('DELETE', '/api/admin/reviews/' + id); await refresh(); render(); }
