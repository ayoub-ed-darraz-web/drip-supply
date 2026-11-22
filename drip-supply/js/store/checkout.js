/* ═══════════ CHECKOUT ═══════════ */
const PHONE_RE = DripCore.PHONE_RE;
$('#go-co').onclick = () => { if (!cart.length) return toast(t('err_empty'), 'err'); closeDrawers(); $('#co-form').hidden = false; $('#co-ok').hidden = true; renderCart(); $('#co').classList.add('on'); };
function fieldErr(id, input, msg) { $('#' + id).textContent = msg || ''; $('#' + input).classList.toggle('bad', !!msg); return !msg; }
['f-name', 'f-phone', 'f-addr'].forEach(id => $('#' + id).addEventListener('input', () => { $('#' + id).classList.remove('bad'); $('#e-' + id.slice(2)).textContent = ''; }));
$('#co-submit').onclick = async () => {
  const name = $('#f-name').value.trim(), phone = $('#f-phone').value.trim().replace(/[\s.-]/g, ''), addr = $('#f-addr').value.trim();
  const v = [fieldErr('e-name', 'f-name', name.length < 2 ? t('err_name') : ''), fieldErr('e-phone', 'f-phone', PHONE_RE.test(phone) ? '' : t('err_phone')), fieldErr('e-addr', 'f-addr', addr.length < 4 ? t('err_addr') : '')];
  if (v.includes(false)) return;
  const btn = $('#co-submit'); btn.disabled = true; $('#e-form').textContent = '';
  const r = await api('POST', '/api/orders', { name, phone, city: $('#f-city').value, address: addr, notes: $('#f-notes').value, coupon: coupon && coupon.code, items: cart.map(i => ({ id: i.id, qty: i.qty, size: i.size, color: i.color })) });
  btn.disabled = false;
  if (r.status !== 201) { const e = String(r.data.error || ''); $('#e-form').textContent = e.startsWith('stock:') ? t('err_stock', { n: e.slice(6) }) : t('err_net'); await loadStore(); return; }
  lastOrder = { id: r.data.id, text: `Salam DRIP SUPPLY! 🛍️\n${t('ok_no')}: ${r.data.id}\n${name} — ${phone}\n${$('#f-city').value}, ${addr}\n\n${cart.map(i => `• ${L(prod(i.id).name)} (${i.size}) x${i.qty}`).join('\n')}\n\nTotal: ${r.data.total} DH (COD)` };
  $('#ok-id').textContent = r.data.id; $('#co-form').hidden = true; $('#co-ok').hidden = false;
  cart = []; coupon = null; saveCart(); await loadStore();
};
$('#ok-wa').onclick = () => lastOrder && wa(lastOrder.text);
