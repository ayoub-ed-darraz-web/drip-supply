-- Catalogue des styles: description + image par categorie. Run once in Supabase SQL Editor.
alter table public.categories add column if not exists desc_en text default '';
alter table public.categories add column if not exists desc_ar text default '';
alter table public.categories add column if not exists image text default '';
