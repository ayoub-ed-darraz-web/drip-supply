/* ═══════════ STATE ═══════════ */
let S = { settings: {}, categories: [], products: [], reviews: [] };
let cart = LS('drip_cart', []), wish = LS('drip_wish', []);
let filter = 'all', query = '', sortBy = 'new', coupon = null, cur = null, curSize = 'M', curColor = 0, lastOrder = null;
const CITIES = [['Casablanca','الدار البيضاء'],['Rabat','الرباط'],['Marrakech','مراكش'],['Tangier','طنجة'],['Fes','فاس'],['Agadir','أكادير'],['Meknes','مكناس'],['Oujda','وجدة'],['Tetouan','تطوان'],['Kenitra','القنيطرة'],['Other','أخرى']];
const prod = id => S.products.find(p => p.id === id);
const catLabel = id => { const c = S.categories.find(x => x.id === id); return c ? L(c) : id; };
const thumb = (p, color, w = '62%') => { const ci = color ? p.colors.indexOf(color) : -1, im = (ci >= 0 && p.colorImages && p.colorImages[ci]) || p.image; return im ? `<img class="pimg" src="${im}" alt="${esc(L(p.name))}" loading="lazy">` : teeSVG(color || p.colors[0], w, w); };
const saveCart = () => { LSset('drip_cart', cart); renderCart(); };
