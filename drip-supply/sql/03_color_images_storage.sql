-- Image par couleur (Supabase Storage). Run once in Supabase SQL Editor.
alter table public.products add column if not exists color_images jsonb not null default '[]'::jsonb;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 2097152, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 2097152, allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "pi_read" on storage.objects;
drop policy if exists "pi_admin_insert" on storage.objects;
drop policy if exists "pi_admin_update" on storage.objects;
drop policy if exists "pi_admin_delete" on storage.objects;
create policy "pi_read" on storage.objects for select using (bucket_id = 'product-images');
create policy "pi_admin_insert" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());
create policy "pi_admin_update" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.is_admin());
create policy "pi_admin_delete" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());
