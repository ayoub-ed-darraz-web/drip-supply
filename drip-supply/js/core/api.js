/* ───────── Supabase data layer (replaces the old Node/localStorage backend) ───────── */
const DripCore = { PHONE_RE: /^(?:\+212|00212|0)[5-7]\d{8}$/, STATUSES: ['new', 'confirmed', 'shipped', 'delivered', 'cancelled'] };
let sb = null, BACKEND = 'local';
async function initBackend() {
  if (!window.supabase || SUPABASE_ANON_KEY.startsWith('PASTE')) {
    console.error('Supabase not configured: set SUPABASE_ANON_KEY in js/config.js.');
    setTimeout(() => toast('⚠ Supabase anon key missing', 'err'), 600);
    return;
  }
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  BACKEND = 'remote';
}
const numv = (v, d = 0) => { const n = Number(v); return Number.isFinite(n) ? n : d; };
const numU = v => (v === '' || v == null) ? undefined : Math.max(0, numv(v));
const strv = (v, max = 300) => String(v == null ? '' : v).trim().slice(0, max);
const sOk = (status, data) => ({ status, data });
const sErr = (status, error) => ({ status, data: { error } });

const mapProduct = r => ({ id: r.id, name: { en: r.name_en, ar: r.name_ar }, desc: { en: r.desc_en, ar: r.desc_ar }, cat: r.cat, price: Number(r.price), oldPrice: r.old_price == null ? null : Number(r.old_price), image: r.image || '', stock: r.stock, sizeStock: r.size_stock || {}, views: r.views || 0, colorImages: Array.isArray(r.color_images) ? r.color_images : [], badge: r.badge || '', colors: r.colors && r.colors.length ? r.colors : ['#0f6b4a'], created: new Date(r.created_at).getTime() });
const mapCat = r => ({ id: r.id, en: r.name_en, ar: r.name_ar, sort: r.sort || 0, desc: { en: r.desc_en || '', ar: r.desc_ar || '' }, image: r.image || '' });
const mapReview = r => ({ id: r.id, name: r.name, city: r.city, rating: r.rating, text: { en: r.text_en, ar: r.text_ar } });
const mapSettings = r => ({ brand: r.brand, whatsapp: r.whatsapp, freeShipping: Number(r.free_shipping), shippingFee: Number(r.shipping_fee), announcement: { en: r.announcement_en, ar: r.announcement_ar }, heroSub: { en: r.hero_sub_en, ar: r.hero_sub_ar } });
const mapOrder = o => ({ id: o.id, date: new Date(o.created_at).getTime(), status: o.status, customer: { name: o.customer_name, phone: o.phone, city: o.city, address: o.address, notes: o.notes || '' }, items: (o.order_items || []).map(i => ({ id: i.product_id, name: i.name, nameAr: i.name_ar, price: Number(i.price), qty: i.qty, size: i.size, color: i.color })), subtotal: Number(o.subtotal), discount: Number(o.discount), shipping: Number(o.shipping), coupon: o.coupon || '', total: Number(o.total) });

function productRow(b) {
  const en = strv(b.name && b.name.en, 120), ar = strv(b.name && b.name.ar, 120);
  if (!en && !ar) return null;
  let colors = (Array.isArray(b.colors) ? b.colors : []).filter(c => /^#[0-9a-f]{6}$/i.test(c)).slice(0, 6);
  if (!colors.length) colors = ['#0f6b4a'];
  const ss = {}; ['S', 'M', 'L', 'XL'].forEach(k => { const v = b.sizeStock && b.sizeStock[k]; if (v !== '' && v != null) ss[k] = Math.max(0, Math.floor(numv(v))); });
  const tracked = Object.keys(ss).length > 0;
  const row = {
    name_en: en || ar, name_ar: ar || en,
    desc_en: strv(b.desc && b.desc.en, 600), desc_ar: strv(b.desc && b.desc.ar, 600),
    cat: strv(b.cat, 40).toLowerCase().replace(/[^a-z0-9_-]+/g, '-') || 'streetwear',
    price: Math.max(0, numv(b.price)), old_price: b.oldPrice ? Math.max(0, numv(b.oldPrice)) : null,
    stock: tracked ? Object.values(ss).reduce((a, n) => a + n, 0) : Math.max(0, Math.floor(numv(b.stock))), size_stock: ss, color_images: Array.isArray(b.colorImages) ? b.colorImages.slice(0, 3).map(u => (typeof u === 'string' && /^https:\/\//.test(u) && u.length < 600) ? u : '') : [], badge: ['new', 'sale'].includes(b.badge) ? b.badge : '', colors
  };
  if (typeof b.image === 'string' && b.image.length < 2500000) row.image = b.image;
  return row;
}
async function ensureCat(id) { await sb.from('categories').upsert({ id, name_en: id, name_ar: id }, { onConflict: 'id', ignoreDuplicates: true }); }
async function sbIsAdmin() { const { data } = await sb.rpc('is_admin'); return data === true; }

function sbStats(orders, products) {
  const live = orders.filter(o => o.status !== 'cancelled'), days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
    const from = d.getTime(), to = from + 86400000;
    days.push({ label: d.toISOString().slice(5, 10), revenue: live.filter(o => o.date >= from && o.date < to).reduce((a, o) => a + o.total, 0) });
  }
  const top = {}; live.forEach(o => o.items.forEach(i => { top[i.name] = (top[i.name] || 0) + i.qty; }));
  return {
    revenue: live.reduce((a, o) => a + o.total, 0), orders: orders.length,
    pending: orders.filter(o => o.status === 'new').length, lowStock: products.filter(p => p.stock <= 5).length, days,
    top: Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, qty]) => ({ name, qty }))
  };
}

async function sbRoute(method, path, body, token) {
  let m;
  if (method === 'GET' && path === '/api/ping') return sOk(200, { ok: true });

  if (method === 'GET' && path === '/api/store') {
    const [s, c, p, r] = await Promise.all([
      sb.from('settings').select('*').eq('id', 1).single(),
      sb.from('categories').select('*').order('sort'),
      sb.from('products').select('*').order('created_at', { ascending: false }),
      sb.from('reviews').select('*').order('created_at', { ascending: false })]);
    if (s.error || c.error || p.error || r.error) { console.error(s.error || c.error || p.error || r.error); return sErr(500, 'db'); }
    return sOk(200, { settings: mapSettings(s.data), categories: c.data.map(mapCat), products: p.data.map(mapProduct), reviews: r.data.map(mapReview) });
  }
  if (method === 'POST' && path === '/api/coupon') {
    const { data, error } = await sb.rpc('check_coupon', { p_code: strv(body.code, 30) });
    return (!error && data) ? sOk(200, data) : sErr(404, 'invalid_coupon');
  }
  if (method === 'POST' && path === '/api/orders') {
    const { data, error } = await sb.rpc('create_order', { payload: body });
    if (error) {
      const msg = error.message || '';
      if (msg.startsWith('stock:')) return sErr(409, msg);
      if (['name', 'phone', 'address', 'empty'].includes(msg)) return sErr(400, msg);
      console.error(error); return sErr(500, msg);
    }
    return sOk(201, data);
  }
  if (method === 'POST' && path === '/api/admin/login') {
    const { error } = await sb.auth.signInWithPassword({ email: strv(body.email, 120), password: String(body.code || '') });
    if (error) return sErr(401, 'bad_code');
    if (!(await sbIsAdmin())) { await sb.auth.signOut(); return sErr(401, 'not_admin'); }
    return sOk(200, { token: 'sb' });
  }

  if (!path.startsWith('/api/admin/')) return sErr(404, 'not_found');
  if (!token) return sErr(401, 'unauthorized');
  const { data: sess } = await sb.auth.getSession();
  if (!sess.session) return sErr(401, 'unauthorized');

  if (method === 'GET' && path === '/api/admin/data') {
    const res = await Promise.all([
      sb.from('orders').select('*, order_items(*)').order('created_at', { ascending: false }),
      sb.from('products').select('*').order('created_at', { ascending: false }),
      sb.from('reviews').select('*').order('created_at', { ascending: false }),
      sb.from('coupons').select('*').order('code'),
      sb.from('categories').select('*').order('sort'),
      sb.from('settings').select('*').eq('id', 1).single()]);
    const bad = res.find(x => x.error); if (bad) { console.error(bad.error); return sErr(401, 'unauthorized'); }
    const [o, p, rv, cp, c, s] = res, orders = o.data.map(mapOrder), products = p.data.map(mapProduct);
    return sOk(200, { orders, products, reviews: rv.data.map(mapReview), coupons: cp.data.map(x => ({ code: x.code, percent: x.percent, active: x.active })), categories: c.data.map(mapCat), settings: mapSettings(s.data), stats: sbStats(orders, products) });
  }

  if ((m = path.match(/^\/api\/admin\/orders\/([^/]+)$/))) {
    if (method === 'PUT') {
      const { data, error } = await sb.rpc('admin_set_order_status', { p_id: m[1], p_status: body.status });
      return error ? sErr(400, error.message) : sOk(200, data);
    }
    if (method === 'DELETE') { const { error } = await sb.from('orders').delete().eq('id', m[1]); return error ? sErr(500, error.message) : sOk(200, { ok: true }); }
  }

  if (method === 'PUT' && (m = path.match(/^\/api\/admin\/categories\/([^/]+)$/))) {
    const u = { name_en: strv(body.en, 60), name_ar: strv(body.ar, 60), desc_en: strv(body.desc && body.desc.en, 200), desc_ar: strv(body.desc && body.desc.ar, 200), sort: Math.floor(numv(body.sort)) };
    if (!u.name_en && !u.name_ar) return sErr(400, 'name');
    u.name_en = u.name_en || u.name_ar; u.name_ar = u.name_ar || u.name_en;
    if (typeof body.image === 'string' && body.image.length < 2500000) u.image = body.image;
    const { data, error } = await sb.from('categories').update(u).eq('id', decodeURIComponent(m[1])).select().single();
    return error ? sErr(500, error.message) : sOk(200, mapCat(data));
  }
  if (method === 'POST' && path === '/api/admin/products') {
    const row = productRow(body); if (!row) return sErr(400, 'name');
    await ensureCat(row.cat);
    const { data, error } = await sb.from('products').insert(row).select().single();
    return error ? sErr(500, error.message) : sOk(201, mapProduct(data));
  }
  if ((m = path.match(/^\/api\/admin\/products\/(\d+)$/))) {
    if (method === 'PUT') {
      const row = productRow(body); if (!row) return sErr(400, 'name');
      await ensureCat(row.cat);
      const { data, error } = await sb.from('products').update(row).eq('id', Number(m[1])).select().single();
      return error ? sErr(500, error.message) : sOk(200, mapProduct(data));
    }
    if (method === 'DELETE') { const { error } = await sb.from('products').delete().eq('id', Number(m[1])); return error ? sErr(500, error.message) : sOk(200, { ok: true }); }
  }

  if (method === 'POST' && path === '/api/admin/reviews') {
    const en = strv(body.text && body.text.en, 400), ar = strv(body.text && body.text.ar, 400), name = strv(body.name, 60);
    if (!name || (!en && !ar)) return sErr(400, 'review');
    const { data, error } = await sb.from('reviews').insert({ name, city: strv(body.city, 40), rating: Math.min(5, Math.max(1, numv(body.rating, 5))), text_en: en || ar, text_ar: ar || en }).select().single();
    return error ? sErr(500, error.message) : sOk(201, mapReview(data));
  }
  if (method === 'DELETE' && (m = path.match(/^\/api\/admin\/reviews\/([^/]+)$/))) {
    const { error } = await sb.from('reviews').delete().eq('id', m[1]); return error ? sErr(500, error.message) : sOk(200, { ok: true });
  }

  if (method === 'POST' && path === '/api/admin/coupons') {
    const code = strv(body.code, 30).toUpperCase().replace(/[^A-Z0-9_-]/g, ''), percent = Math.min(90, Math.max(1, Math.floor(numv(body.percent))));
    if (!code) return sErr(400, 'coupon');
    const { error } = await sb.from('coupons').upsert({ code, percent, active: true }, { onConflict: 'code' });
    return error ? sErr(500, error.message) : sOk(201, []);
  }
  if (method === 'DELETE' && (m = path.match(/^\/api\/admin\/coupons\/([^/]+)$/))) {
    const { error } = await sb.from('coupons').delete().eq('code', decodeURIComponent(m[1])); return error ? sErr(500, error.message) : sOk(200, []);
  }

  if (method === 'PUT' && path === '/api/admin/settings') {
    const u = {
      brand: strv(body.brand, 40) || undefined, whatsapp: strv(body.whatsapp, 20).replace(/\D/g, '') || undefined,
      free_shipping: numU(body.freeShipping), shipping_fee: numU(body.shippingFee)
    };
    if (body.announcement) { u.announcement_en = strv(body.announcement.en, 200); u.announcement_ar = strv(body.announcement.ar, 200); }
    if (body.heroSub) { u.hero_sub_en = strv(body.heroSub.en, 400); u.hero_sub_ar = strv(body.heroSub.ar, 400); }
    const { data, error } = await sb.from('settings').update(u).eq('id', 1).select().single();
    return error ? sErr(500, error.message) : sOk(200, mapSettings(data));
  }
  if (method === 'POST' && path === '/api/admin/password') {
    const pw = String(body.code || ''); if (pw.length < 6) return sErr(400, 'short');
    const { error } = await sb.auth.updateUser({ password: pw });
    return error ? sErr(400, error.message) : sOk(200, { ok: true });
  }
  return sErr(404, 'not_found');
}
async function api(method, path, body, token) {
  body = body || {}; path = String(path).split('?')[0];
  if (!sb) return sErr(0, 'config');
  try { return await sbRoute(method, path, body, token); } catch (e) { console.error(e); return sErr(0, 'network'); }
}
