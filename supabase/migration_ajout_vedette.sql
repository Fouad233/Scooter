-- À exécuter dans Supabase > SQL Editor si la table scooters existait déjà
-- (ajoute la colonne permettant de choisir le scooter affiché sur la page d'accueil).
alter table scooters add column if not exists vedette boolean not null default false;
