-- À exécuter dans Supabase > SQL Editor si la table "reservations" existe déjà
-- avec les colonnes liées à l'acompte PayPal (paiement en ligne abandonné,
-- tout se règle désormais sur place).

alter table reservations drop column if exists acompte_montant;
alter table reservations drop column if exists acompte_paye;
alter table reservations drop column if exists paypal_order_id;
