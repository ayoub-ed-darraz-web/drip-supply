/* ───────── i18n ───────── */
const I18N = {
  en: {
    nav_shop: 'Shop', nav_styles: 'Styles', nav_quality: 'Quality', nav_reviews: 'Reviews',
    only_ma: 'MOROCCO ONLY', hero_tag: 'Heavyweight Drop 04 // 2026',
    hero_1: 'WEAR THE', hero_2: 'CULTURE.', hero_3: 'OVERSIZED.',
    btn_explore: 'Explore collection', btn_quality: 'Fabric guide', hint_move: 'Move your mouse ↗',
    sp1v: '240 GSM', sp1l: 'Heavy cotton', sp2v: 'BOXY FIT', sp2l: 'Straight cut', sp3v: '48H / 72H', sp3l: 'Delivery everywhere',
    mq1: '100% HEAVY COTTON 240 GSM', mq2: 'CASH ON DELIVERY ACROSS MOROCCO', mq3: 'OVERSIZED DROP SHOULDER FIT', mq4: 'EASY SIZE EXCHANGE WITHIN 7 DAYS',
    sec_lookbook: 'LOOKBOOK', sec_styles: 'Shop by style', sec_new: 'NEW ARRIVALS', sec_all: 'All T-shirts', collection: 'COLLECTION',
    cat_all: 'All', search_ph: 'Search products…', sort_new: 'Newest', sort_asc: 'Price: low to high', sort_desc: 'Price: high to low',
    no_results: 'No products found', add: '+ Cart', details: 'Details', sold_out: 'Sold out', b_sale: 'SALE', b_new: 'NEW',
    tr1h: 'Heavy 240 GSM cotton', tr1p: 'Thick fabric that holds its shape after months of wear.',
    tr2h: 'Cash on delivery', tr2p: 'Order in 30 seconds with no bank card and pay cash when it arrives.',
    tr3h: 'Fast 48H delivery', tr3p: 'Daily shipping to Casablanca, Rabat, Marrakech, Tangier and every city.',
    tr4h: 'Free exchange', tr4p: 'Wrong size? Quick and easy exchange with our support.',
    sec_reviews: 'REVIEWS', sec_reviews_t: 'What customers say',
    foot_about: 'Premium Moroccan streetwear. Built for urban culture, made with care.', foot_shop: 'Shop', foot_help: 'Help', foot_contact: 'Contact',
    foot_q: 'Questions about your order?', rights: 'All rights reserved.', wishlist: 'Wishlist', theme: 'Theme', lang: 'Language',
    cart_title: 'Your cart', cart_empty: 'Your cart is empty.', subtotal: 'Subtotal', discount: 'Discount', shipping: 'Delivery', free: 'FREE', total: 'Total',
    promo_ph: 'Promo code', apply: 'Apply', checkout: 'Order now (Cash on delivery)', wa_order: 'Order via WhatsApp 💬',
    free_left: 'Add {n} DH more for free delivery', free_got: '🎉 You unlocked free delivery',
    co_title: 'Complete your order', co_sub: 'You pay in cash when the order arrives.', f_name: 'Full name', f_phone: 'Phone (WhatsApp)', f_city: 'City', f_addr: 'Delivery address', f_notes: 'Notes (optional)',
    ph_name: 'e.g. Karim Benali', ph_phone: '06 12 34 56 78', ph_addr: 'District, street no. or residence…', confirm: 'Confirm my order →',
    err_name: 'Please enter your full name', err_phone: 'Enter a valid Moroccan number (06/07…)', err_addr: 'Please enter a delivery address',
    err_stock: 'Not enough stock for: {n}', err_net: 'Something went wrong, try again', err_empty: 'Your cart is empty',
    ok_title: 'Order confirmed!', ok_sub: 'Thank you! We will contact you on WhatsApp to confirm shipping.', ok_no: 'Order number', ok_wa: 'Send details on WhatsApp', ok_back: 'Continue shopping',
    m_size: 'Size (boxy oversized fit)', m_color: 'Color', m_add: 'Add to cart', m_wa: 'WhatsApp', m_left: 'Only {n} left', m_in: 'In stock',
    t_cart: 'Added to cart', t_wish: 'Saved to wishlist', t_unwish: 'Removed from wishlist', t_coupon: 'Promo applied: -{n}%', t_badcoupon: 'Invalid promo code',
    wish_empty: 'Your wishlist is empty.', remove: 'Remove', close: 'Close',
    /* admin */
    a_login: 'Admin access', a_code: 'Access code', a_enter: 'Enter', a_bad: 'Wrong code', a_logout: 'Log out', a_view: 'View store',
    a_overview: 'Overview', a_orders: 'Orders', a_products: 'Products', a_reviews: 'Reviews', a_coupons: 'Coupons', a_styles: 'Styles (catalog)', a_settings: 'Settings',
    a_revenue: 'Revenue', a_orders_n: 'Orders', a_pending: 'New orders', a_lowstock: 'Low stock', a_last7: 'Revenue — last 7 days', a_top: 'Best sellers',
    a_date: 'Date', a_customer: 'Customer', a_phone: 'Phone', a_city: 'City', a_total: 'Total', a_status: 'Status', a_items: 'Items', a_actions: 'Actions',
    st_new: 'New', st_confirmed: 'Confirmed', st_shipped: 'Shipped', st_delivered: 'Delivered', st_cancelled: 'Cancelled',
    a_export: 'Export CSV', a_add: 'Add product', a_edit: 'Edit', a_delete: 'Delete', a_sure: 'Delete this item?', a_save: 'Save', a_cancel: 'Cancel', a_saved: 'Saved ✓',
    a_no_orders: 'No orders yet', a_whatsapp: 'WhatsApp customer',
    fl_name_en: 'Name (English)', fl_name_ar: 'Name (Arabic)', fl_desc_en: 'Description (English)', fl_desc_ar: 'Description (Arabic)', fl_cat: 'Category', fl_price: 'Price (DH)', fl_old: 'Old price (DH)', fl_stock: 'Stock', fl_badge: 'Badge', fl_colors: 'Colors', fl_image: 'Product image', fl_none: 'None',
    s_brand: 'Brand name', s_wa: 'WhatsApp number (212…)', s_free: 'Free delivery from (DH)', s_fee: 'Delivery fee (DH)', s_ann_en: 'Top bar (English)', s_ann_ar: 'Top bar (Arabic)', s_hero_en: 'Hero text (English)', s_hero_ar: 'Hero text (Arabic)',
    s_pass: 'Change admin password', s_newcode: 'New password (min 6)', s_hint_ann: 'Use {n} for the free-delivery amount',
    c_code: 'Code', c_percent: 'Discount %', r_name: 'Customer name', r_city: 'City', r_en: 'Review (English)', r_ar: 'Review (Arabic)',
    a_local: 'Supabase not configured: set SUPABASE_ANON_KEY in the page script.', a_online: 'Connected to Supabase database'
  },
  ar: {
    nav_shop: 'المتجر', nav_styles: 'الأنماط', nav_quality: 'الجودة', nav_reviews: 'آراء الزبناء',
    only_ma: 'المغرب فقط', hero_tag: 'إصدار هيفي ويت 04 // 2026',
    hero_1: 'ارتدِ', hero_2: 'الثقافة.', hero_3: 'أوفرسايز.',
    btn_explore: 'اكتشف المجموعة', btn_quality: 'دليل الخامات', hint_move: 'حرّك الفأرة ↗',
    sp1v: '240 غرام', sp1l: 'قطن ثقيل', sp2v: 'قصّة بوكسي', sp2l: 'قصّة مستقيمة', sp3v: '48 / 72 ساعة', sp3l: 'التوصيل لكل المدن',
    mq1: 'قطن ثقيل 100% وزن 240 غرام', mq2: 'الدفع عند الاستلام في كل المغرب', mq3: 'قصّة أوفرسايز بأكتاف منخفضة', mq4: 'تبديل المقاس بسهولة خلال 7 أيام',
    sec_lookbook: 'كتالوج', sec_styles: 'تسوّق حسب النمط', sec_new: 'وصل حديثاً', sec_all: 'جميع التيشيرتات', collection: 'مجموعة',
    cat_all: 'الكل', search_ph: 'ابحث عن منتج…', sort_new: 'الأحدث', sort_asc: 'السعر: من الأقل', sort_desc: 'السعر: من الأعلى',
    no_results: 'لا توجد منتجات', add: '+ السلة', details: 'تفاصيل', sold_out: 'نفد المخزون', b_sale: 'تخفيض', b_new: 'جديد',
    tr1h: 'قطن ثقيل 240 غرام', tr1p: 'قماش سميك يحافظ على شكله بعد شهور من الاستعمال.',
    tr2h: 'الدفع عند الاستلام', tr2p: 'اطلب في 30 ثانية بدون بطاقة بنكية وادفع نقداً عند الاستلام.',
    tr3h: 'توصيل سريع 48 ساعة', tr3p: 'شحن يومي إلى الدار البيضاء والرباط ومراكش وطنجة وكل المدن.',
    tr4h: 'تبديل مجاني', tr4p: 'المقاس غير مناسب؟ تبديل سريع وسهل مع فريق الدعم.',
    sec_reviews: 'آراء الزبناء', sec_reviews_t: 'ماذا يقول زبناؤنا',
    foot_about: 'علامة مغربية راقية للستريت وير. مصممة للثقافة الحضرية ومصنوعة بعناية.', foot_shop: 'المتجر', foot_help: 'مساعدة', foot_contact: 'تواصل',
    foot_q: 'أسئلة حول طلبك؟', rights: 'جميع الحقوق محفوظة.', wishlist: 'المفضلة', theme: 'المظهر', lang: 'اللغة',
    cart_title: 'سلتك', cart_empty: 'سلتك فارغة.', subtotal: 'المجموع الفرعي', discount: 'الخصم', shipping: 'التوصيل', free: 'مجاني', total: 'الإجمالي',
    promo_ph: 'رمز الخصم', apply: 'تطبيق', checkout: 'اطلب الآن (الدفع عند الاستلام)', wa_order: 'اطلب عبر واتساب 💬',
    free_left: 'أضف {n} درهم للحصول على توصيل مجاني', free_got: '🎉 حصلت على توصيل مجاني',
    co_title: 'إتمام الطلب', co_sub: 'تدفع نقداً عند وصول الطلب.', f_name: 'الاسم الكامل', f_phone: 'الهاتف (واتساب)', f_city: 'المدينة', f_addr: 'عنوان التوصيل', f_notes: 'ملاحظات (اختياري)',
    ph_name: 'مثال: كريم بنعلي', ph_phone: '06 12 34 56 78', ph_addr: 'الحي، رقم الزنقة أو الإقامة…', confirm: '← تأكيد طلبي',
    err_name: 'المرجو إدخال الاسم الكامل', err_phone: 'أدخل رقماً مغربياً صحيحاً (06/07…)', err_addr: 'المرجو إدخال عنوان التوصيل',
    err_stock: 'المخزون غير كافٍ لـ: {n}', err_net: 'حدث خطأ، حاول مجدداً', err_empty: 'سلتك فارغة',
    ok_title: 'تم تأكيد الطلب!', ok_sub: 'شكراً لك! سنتواصل معك عبر واتساب لتأكيد الشحن.', ok_no: 'رقم الطلب', ok_wa: 'إرسال التفاصيل عبر واتساب', ok_back: 'متابعة التسوق',
    m_size: 'المقاس (قصّة بوكسي أوفرسايز)', m_color: 'اللون', m_add: 'أضف إلى السلة', m_wa: 'واتساب', m_left: 'باقي {n} فقط', m_in: 'متوفر',
    t_cart: 'تمت الإضافة إلى السلة', t_wish: 'تمت الإضافة إلى المفضلة', t_unwish: 'تمت الإزالة من المفضلة', t_coupon: 'تم تطبيق الخصم: -{n}%', t_badcoupon: 'رمز الخصم غير صالح',
    wish_empty: 'قائمة المفضلة فارغة.', remove: 'إزالة', close: 'إغلاق',
    a_login: 'دخول الإدارة', a_code: 'رمز الدخول', a_enter: 'دخول', a_bad: 'رمز خاطئ', a_logout: 'تسجيل الخروج', a_view: 'عرض المتجر',
    a_overview: 'نظرة عامة', a_orders: 'الطلبات', a_products: 'المنتجات', a_reviews: 'الآراء', a_coupons: 'الكوبونات', a_styles: 'الأنماط (الكتالوج)', a_settings: 'الإعدادات',
    a_revenue: 'المداخيل', a_orders_n: 'الطلبات', a_pending: 'طلبات جديدة', a_lowstock: 'مخزون منخفض', a_last7: 'المداخيل — آخر 7 أيام', a_top: 'الأكثر مبيعاً',
    a_date: 'التاريخ', a_customer: 'الزبون', a_phone: 'الهاتف', a_city: 'المدينة', a_total: 'الإجمالي', a_status: 'الحالة', a_items: 'المنتجات', a_actions: 'إجراءات',
    st_new: 'جديد', st_confirmed: 'مؤكد', st_shipped: 'تم الشحن', st_delivered: 'تم التسليم', st_cancelled: 'ملغى',
    a_export: 'تصدير CSV', a_add: 'إضافة منتج', a_edit: 'تعديل', a_delete: 'حذف', a_sure: 'حذف هذا العنصر؟', a_save: 'حفظ', a_cancel: 'إلغاء', a_saved: 'تم الحفظ ✓',
    a_no_orders: 'لا توجد طلبات بعد', a_whatsapp: 'مراسلة الزبون',
    fl_name_en: 'الاسم (إنجليزي)', fl_name_ar: 'الاسم (عربي)', fl_desc_en: 'الوصف (إنجليزي)', fl_desc_ar: 'الوصف (عربي)', fl_cat: 'الفئة', fl_price: 'الثمن (درهم)', fl_old: 'الثمن القديم (درهم)', fl_stock: 'المخزون', fl_badge: 'الشارة', fl_colors: 'الألوان', fl_image: 'صورة المنتج', fl_none: 'بدون',
    s_brand: 'اسم العلامة', s_wa: 'رقم واتساب (212…)', s_free: 'توصيل مجاني ابتداءً من (درهم)', s_fee: 'ثمن التوصيل (درهم)', s_ann_en: 'الشريط العلوي (إنجليزي)', s_ann_ar: 'الشريط العلوي (عربي)', s_hero_en: 'نص الواجهة (إنجليزي)', s_hero_ar: 'نص الواجهة (عربي)',
    s_pass: 'تغيير كلمة مرور الإدارة', s_newcode: 'كلمة المرور الجديدة (6 على الأقل)', s_hint_ann: 'استعمل {n} لمبلغ التوصيل المجاني',
    c_code: 'الرمز', c_percent: 'نسبة الخصم %', r_name: 'اسم الزبون', r_city: 'المدينة', r_en: 'الرأي (إنجليزي)', r_ar: 'الرأي (عربي)',
    a_local: 'Supabase غير مهيأ: ضع SUPABASE_ANON_KEY في سكريبت الصفحة.', a_online: 'متصل بقاعدة بيانات Supabase'
  }
};
let LANG = LS('drip_lang', 'ar');
const t = (k, v) => { let s = (I18N[LANG] && I18N[LANG][k]) || I18N.en[k] || k; if (v) for (const x in v) s = s.replace('{' + x + '}', v[x]); return s; };
const L = o => (o && typeof o === 'object') ? (o[LANG] || o.en || o.ar || '') : (o || '');
function applyI18n(root = document) {
  $$('[data-i18n]', root).forEach(e => { e.textContent = t(e.dataset.i18n); });
  $$('[data-i18n-ph]', root).forEach(e => { e.placeholder = t(e.dataset.i18nPh); });
}
function setLang(l) {
  LANG = l; LSset('drip_lang', l);
  document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  applyI18n(); $$('.lang-btn').forEach(b => { b.textContent = l === 'ar' ? 'EN' : 'عربي'; });
  document.dispatchEvent(new Event('langchange'));
}
