function overview() {
  const s = D.stats, max = Math.max(1, ...s.days.map(d => d.revenue));
  return `<div class="stats">
    <div class="stat"><span>${t('a_revenue')}</span><strong class="fd">${money(s.revenue)}</strong></div>
    <div class="stat"><span>${t('a_orders_n')}</span><strong class="fd">${s.orders}</strong></div>
    <div class="stat"><span>${t('a_pending')}</span><strong class="fd">${s.pending}</strong></div>
    <div class="stat"><span>${t('a_lowstock')}</span><strong class="fd">${s.lowStock}</strong></div></div>
  <div class="two"><div class="panel"><h3>${t('a_last7')}</h3><div class="bars">${s.days.map(d => `<div class="bar"><b>${d.revenue || ''}</b><i style="height:${Math.max(3, d.revenue / max * 100)}%"></i><span>${d.label}</span></div>`).join('')}</div></div>
  <div class="panel"><h3>${t('a_top')}</h3>${s.top.length ? s.top.map(x => `<div class="lrow"><span>${esc(x.name)}</span><strong>${x.qty}</strong></div>`).join('') : `<div style="color:var(--dim)">—</div>`}</div></div>`;
}
