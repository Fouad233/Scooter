-- À exécuter dans Supabase > SQL Editor

create table if not exists scooters (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  modele text not null,
  cylindree int,
  photo_urls text[] not null default '{}',
  prix_jour numeric not null,
  prix_semaine numeric,
  prix_mois numeric,
  caution numeric not null,
  description text,
  actif boolean not null default true,
  vedette boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  scooter_id uuid references scooters(id) not null,
  client_nom text not null,
  client_email text not null,
  client_telephone text not null,
  date_debut date not null,
  date_fin date not null,
  statut text not null default 'pending'
    check (statut in ('pending','confirmed','paid','cancelled','completed')),
  montant_total numeric not null,
  created_at timestamptz default now()
);

create table if not exists indisponibilites (
  id uuid primary key default gen_random_uuid(),
  scooter_id uuid references scooters(id) not null,
  date_debut date not null,
  date_fin date not null,
  raison text,
  created_at timestamptz default now()
);

-- Row Level Security : lecture publique des scooters actifs uniquement,
-- toute écriture passe par le serveur (clé service role qui contourne RLS).
alter table scooters enable row level security;
alter table reservations enable row level security;
alter table indisponibilites enable row level security;

create policy "Lecture publique scooters actifs"
  on scooters for select
  using (actif = true);

-- Pas de policy "select" publique sur reservations : elle contient des données
-- personnelles (nom, email, téléphone). Le calendrier public passe par la vue
-- ci-dessous qui n'expose que les dates bloquées.
create or replace view reservations_dates_bloquees as
select scooter_id, date_debut, date_fin
from reservations
where statut in ('pending', 'confirmed', 'paid');

grant select on reservations_dates_bloquees to anon;

create policy "Lecture publique indisponibilites"
  on indisponibilites for select
  using (true);
