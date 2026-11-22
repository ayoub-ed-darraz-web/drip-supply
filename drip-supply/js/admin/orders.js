function orders() {
  if (!D.orders.length) return `<div class="panel" style="text-align:center;color:var(--dim)">${t('a_no_orders')}</div>`;
  return `<div class="panel"><div style="margin-bottom:14px"><button class="btn btn-s btn-sm" onclick="exportCSV()">⬇ ${t('a_export')}</button></div><div class="tw"><table><thead><tr><th>#</th><th>${t('a_date')}</th><th>${t('a_customer')}</th><th>${t('a_items')}</th><th>${t('a_total')}</th><th>${t('a_status')}</th><th>${t('a_actions')}</th></tr></thead><tbody>` +
    D.orders.map(o => `<tr><td class="fm"><b>${esc(o.id)}</b></td><td>${fmtDate(o.date)}</td>
      <td><b>${esc(o.customer.name)}</b><br><span dir="ltr" style="color:var(--dim)">${esc(o.customer.phone)}</span><br><span style="color:var(--dim)">${esc(o.customer.city)} — ${esc(o.customer.address)}</span>${o.customer.notes ? `<br><i style="color:var(--dim)">“${esc(o.customer.notes)}”</i>` : ''}</td>
      <td>${o.items.map(i => `${esc(LANG === 'ar' ? i.nameAr : i.name)} <span style="color:var(--dim)">(${esc(i.size)}) ×${i.qty}</span>`).join('<br>')}</td>
      <td><b>${money(o.total)}</b>${o.coupon ? `<br><span class="fm" style="font-size:.7rem;color:var(--g)">${esc(o.coupon)}</span>` : ''}</td>
      <td><select class="sel mini" onchange="setStatus('${o.id}', this.value)">${CoreStatuses().map(s => `<option value="${s}" ${s === o.status ? 'selected' : ''}>${t('st_' + s)}</option>`).join('')}</select></td>
      <td style="white-space:nowrap"><a class="btn btn-s btn-sm" target="_blank" rel="noopener" href="https://wa.me/${esc(o.customer.phone.replace(/^0/, '212').replace(/^\+/, ''))}">💬</a> <button class="btn btn-s btn-sm" onclick="delOrder('${o.id}')">🗑</button></td></tr>`).join('') + `</tbody></table></div></div>`;
}
const CoreStatuses = () => DripCore.STATUSES;
async function setStatus(id, status) { const r = await call('PUT', '/api/admin/orders/' + id, { status }); if (r.status === 200) { toast(t('a_saved')); await refresh(); render(); } }
async function delOrder(id) { if (!confirm(t('a_sure'))) return; await call('DELETE', '/api/admin/orders/' + id); await refresh(); render(); }
function exportCSV() {
  const q = v => '"' + String(v).replace(/"/g, '""') + '"';
  const rows = [['id', 'date', 'name', 'phone', 'city', 'address', 'items', 'subtotal', 'discount', 'shipping', 'total', 'status'].join(',')].concat(D.orders.map(o =>
    [o.id, new Date(o.date).toISOString(), o.customer.name, o.customer.phone, o.customer.city, o.customer.address, o.items.map(i => `${i.name} (${i.size}) x${i.qty}`).join(' | '), o.subtotal, o.discount, o.shipping, o.total, o.status].map(q).join(',')));
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\ufeff' + rows.join('\n')], { type: 'text/csv;charset=utf-8' })); a.download = 'orders.csv'; a.click();
}
