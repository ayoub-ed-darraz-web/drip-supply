-- DRIP SUPPLY: stock par taille + vues + live + anti-spam. Run once in Supabase SQL Editor.
alter table public.products add column if not exists size_stock jsonb not null default '{}'::jsonb;
alter table public.products add column if not exists views int not null default 0;

create table if not exists public.product_views (
  product_id bigint references public.products(id) on delete cascade,
  visitor text, day date default current_date,
  primary key (product_id, visitor, day));
alter table public.product_views enable row level security;

create or replace function public.track_view(p_id bigint, p_visitor text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if length(coalesce(p_visitor, '')) not between 8 and 64 then return; end if;
  insert into product_views(product_id, visitor) values (p_id, p_visitor) on conflict do nothing;
  if found then update products set views = views + 1 where id = p_id; end if;
end $$;

-- per-size stock check + decrement on every order item
create or replace function public.trg_item_size() returns trigger
language plpgsql security definer set search_path = public as $$
declare ss jsonb; cur int;
begin
  select size_stock into ss from products where id = new.product_id for update;
  if ss is null or ss = '{}'::jsonb then return new; end if;
  cur := coalesce((ss ->> new.size)::int, 0);
  if cur < new.qty then raise exception 'stock:%', new.name; end if;
  update products set size_stock = jsonb_set(size_stock, array[new.size], to_jsonb(cur - new.qty)) where id = new.product_id;
  return new;
end $$;
drop trigger if exists item_size on public.order_items;
create trigger item_size after insert on public.order_items for each row execute function public.trg_item_size();

-- give back / take again per-size stock when an order is cancelled / reopened
create or replace function public.trg_status_sizes() returns trigger
language plpgsql security definer set search_path = public as $$
declare d int; r record;
begin
  if new.status = 'cancelled' and old.status <> 'cancelled' then d := 1;
  elsif old.status = 'cancelled' and new.status <> 'cancelled' then d := -1;
  else return new; end if;
  for r in select product_id, size, sum(qty)::int q from order_items where order_id = new.id group by 1, 2 loop
    update products set size_stock = jsonb_set(size_stock, array[r.size], to_jsonb(greatest(0, coalesce((size_stock ->> r.size)::int, 0) + d * r.q)))
    where id = r.product_id and size_stock ? r.size;
  end loop;
  return new;
end $$;
drop trigger if exists status_sizes on public.orders;
create trigger status_sizes after update of status on public.orders for each row execute function public.trg_status_sizes();

-- anti-spam: max 3 orders / hour / phone
create or replace function public.trg_orders_rate() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from orders where phone = new.phone and created_at > now() - interval '1 hour') >= 3 then raise exception 'rate'; end if;
  return new;
end $$;
drop trigger if exists orders_rate on public.orders;
create trigger orders_rate before insert on public.orders for each row execute function public.trg_orders_rate();
