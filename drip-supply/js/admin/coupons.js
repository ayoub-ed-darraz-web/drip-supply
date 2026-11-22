function coupons() {
  return `<div class="panel"><div class="addrow"><div><label class="lbl">${t('c_code')}</label><input class="inp" id="cp-c" style="text-transform:uppercase"></div><div><label class="lbl">${t('c_percent')}</label><input class="inp" id="cp-p" type="number" min="1" max="90" value="10"></div><button class="btn btn-p btn-sm" onclick="addCoupon()">＋</button></div></div>
  <div class="panel">${D.coupons.map(c => `<div class="lrow"><span><b class="fm">${esc(c.code)}</b> — ${c.percent}%</span><button class="btn btn-s btn-sm" onclick="delCoupon('${esc(c.code)}')">🗑</button></div>`).join('') || '—'}</div>`;
}
async function addCoupon() { const r = await call('POST', '/api/admin/coupons', { code: $('#cp-c').value, percent: $('#cp-p').value }); if (r.status === 201) { toast(t('a_saved')); await refresh(); render(); } }
async function delCoupon(c) { await call('DELETE', '/api/admin/coupons/' + c); await refresh(); render(); }
