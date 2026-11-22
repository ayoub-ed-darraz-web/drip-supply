function settings() {
  const s = D.settings, v = x => esc(x == null ? '' : x);
  return `<div class="panel"><div class="forms2">
    <div class="fg"><label class="lbl">${t('s_brand')}</label><input class="inp" id="s-brand" value="${v(s.brand)}"></div>
    <div class="fg"><label class="lbl">${t('s_wa')}</label><input class="inp" id="s-wa" value="${v(s.whatsapp)}" dir="ltr"></div>
    <div class="fg"><label class="lbl">${t('s_free')}</label><input class="inp" id="s-free" type="number" value="${v(s.freeShipping)}"></div>
    <div class="fg"><label class="lbl">${t('s_fee')}</label><input class="inp" id="s-fee" type="number" value="${v(s.shippingFee)}"></div>
    <div class="fg"><label class="lbl">${t('s_ann_en')}</label><input class="inp" id="s-aen" value="${v(s.announcement.en)}"></div>
    <div class="fg"><label class="lbl">${t('s_ann_ar')}</label><input class="inp" id="s-aar" dir="rtl" value="${v(s.announcement.ar)}"></div>
    <div class="fg"><label class="lbl">${t('s_hero_en')}</label><textarea class="ta" id="s-hen">${v(s.heroSub.en)}</textarea></div>
    <div class="fg"><label class="lbl">${t('s_hero_ar')}</label><textarea class="ta" id="s-har" dir="rtl">${v(s.heroSub.ar)}</textarea></div></div>
    <p style="font-size:.75rem;color:var(--dim);margin-bottom:12px">${t('s_hint_ann')}</p><button class="btn btn-p" onclick="saveSettings()">${t('a_save')}</button></div>
  <div class="panel"><h3>🔐 ${t('s_pass')}</h3><div class="addrow"><div><label class="lbl">${t('s_newcode')}</label><input class="inp" id="s-pass" type="password" autocomplete="new-password"></div><button class="btn btn-p btn-sm" onclick="savePass()">${t('a_save')}</button></div></div>`;
}
async function saveSettings() {
  const r = await call('PUT', '/api/admin/settings', { brand: $('#s-brand').value, whatsapp: $('#s-wa').value, freeShipping: $('#s-free').value, shippingFee: $('#s-fee').value, announcement: { en: $('#s-aen').value, ar: $('#s-aar').value }, heroSub: { en: $('#s-hen').value, ar: $('#s-har').value } });
  if (r.status === 200) { toast(t('a_saved')); await refresh(); render(); }
}
async function savePass() { const r = await call('POST', '/api/admin/password', { code: $('#s-pass').value }); if (r.status === 200) { toast(t('a_saved')); $('#s-pass').value = ''; } else toast('✕ min 6', 'err'); }
