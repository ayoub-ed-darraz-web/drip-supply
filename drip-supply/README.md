<div align="center">

# DRIP SUPPLY

**Streetwear e-commerce for Morocco** · bilingual (العربية / English) · cash on delivery · WhatsApp orders

![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20Vanilla%20JS-0f6b4a)
![Backend](https://img.shields.io/badge/backend-Supabase-3ecf8e)
![Build](https://img.shields.io/badge/build%20step-none-lightgrey)

</div>

A fast, build-free online store for oversized heavyweight tees, with a full admin panel on the same page (`#admin`). No framework, no bundler: open it, deploy it.

## Features

**Store**
- Arabic (RTL) and English, light and dark theme
- Product grid with search, category filters and sorting
- Product modal: sizes with **per-size stock**, colors with **one image per color**, "only N left" hints
- **Live viewers** ("N viewing now") using Supabase Realtime Presence
- Wishlist, cart drawer, promo codes, free-delivery progress bar
- Checkout with Moroccan phone validation, cash on delivery, optional WhatsApp order message
- Customer reviews and an editable "Shop by style" catalog

**Admin panel** (`/#admin`)
- Dashboard: revenue, orders, low stock, 7-day chart, best sellers
- Orders: status workflow, WhatsApp the customer, CSV export
- Products: CRUD, stock per size, image per color, **view counter and live viewers per product**
- Styles: name, description, image and order of each catalog card
- Reviews, coupons, store settings, password change

## Project structure

```
drip-supply/
├── index.html            page markup (store + admin)
├── css/
│   ├── style.css         theme, layout, store components
│   ├── admin.css         admin panel
│   └── responsive.css    mobile / tablet rules
├── js/
│   ├── config.js         Supabase URL + publishable key  <-- edit this
│   ├── core/             helpers, i18n, theme, particles, data layer (api.js), utils
│   ├── store/            state, render, modal, cart, wishlist, checkout, live viewers
│   └── admin/            auth, dashboard, orders, products, styles, reviews, coupons, settings, router
└── sql/                  database migrations (run in order)
```

Scripts are plain classic scripts loaded in the order listed in `index.html` (they share one global scope), so order matters.

## Getting started

1. **Create a Supabase project** and apply the base schema (tables `products`, `categories`, `reviews`, `orders`, `order_items`, `coupons`, `settings`, `admins`, the RPCs `create_order`, `check_coupon`, `admin_set_order_status`, `is_admin`, and their RLS policies).
2. **Run the migrations** in `sql/` in order (`01` → `03`) from the Supabase SQL Editor.
3. **Configure** `js/config.js` with your project URL and `anon` (publishable) key (Dashboard → Project Settings → API).
4. **Create the admin**: add a user in Authentication → Users, then:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com';
   ```
5. In Authentication, **disable public sign-ups**. In Realtime → Settings, keep **public access** enabled (needed for live viewers).
6. **Run it** with any static server:
   ```bash
   npx serve .
   ```
   Open `http://localhost:3000` for the store and `http://localhost:3000/#admin` for the admin panel.

## Deploy

It is a static site: drag the folder to **Netlify**, **Vercel**, **Cloudflare Pages**, or push to **GitHub Pages**. No build command, output directory is the repo root.

## Security notes

- The publishable key in `js/config.js` is designed to be public. **Row Level Security is what protects your data**: orders and coupons are not readable by visitors, and only users listed in `admins` can write.
- Prices, stock, coupons and shipping are computed **server-side** in `create_order` (never trusted from the browser). Triggers enforce per-size stock and limit orders to 3 per phone per hour.
- Never commit the `service_role` key or database password.

## Roadmap

- [ ] Order tracking page for customers
- [ ] Size guide in the product modal
- [ ] Related products
- [ ] Admin notification on new order (WhatsApp / email)
- [ ] Newsletter / promo code capture
- [ ] Customer-submitted reviews with moderation
- [ ] Main product images in Supabase Storage (currently base64)

## License

All rights reserved. Add a `LICENSE` file if you want to open-source it.
