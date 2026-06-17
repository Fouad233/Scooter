# Scooter — Location de scooters à Tétouan

Site web pour la location de scooters à Tétouan (Maroc) : catalogue, réservation en ligne avec calendrier de disponibilité, paiement total et caution réglés sur place.

## Stack technique

- [Next.js 15](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/) (base de données Postgres)
- Déploiement sur [Vercel](https://vercel.com/)

## Prérequis

- Node.js 20+
- Un compte [Supabase](https://supabase.com/) (gratuit)
- Un compte [Vercel](https://vercel.com/) (gratuit) pour le déploiement

## Installation locale

```bash
npm install
cp .env.example .env.local
```

Remplis `.env.local` avec tes propres clés (voir la section Configuration Supabase ci-dessous).

```bash
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

## Configuration Supabase

1. Crée un projet sur [supabase.com](https://supabase.com/) (choisis une région proche, ex. Europe de l'Ouest).
2. Va dans **SQL Editor** et exécute le contenu de `supabase/schema.sql` : il crée les tables `scooters`, `reservations`, `indisponibilites`, active la sécurité au niveau ligne (RLS) et expose une vue publique sans données personnelles pour le calendrier.
3. Dans **Project Settings > API**, récupère :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (secrète, jamais exposée au navigateur) → `SUPABASE_SERVICE_ROLE_KEY`
4. Si la table `reservations` existait déjà avec des colonnes liées à un ancien paiement en ligne (PayPal), exécute aussi `supabase/migration_suppression_paypal.sql` pour les supprimer.

## Ajouter des photos de scooters

1. Dans Supabase, va dans **Storage** et crée un bucket (ex. `scooters`), en mode **Public**.
2. Upload tes photos dans ce bucket.
3. Pour chaque photo, clique sur **Copy URL** pour récupérer son URL publique (ressemble à `https://xxxx.supabase.co/storage/v1/object/public/scooters/photo.jpg`).
4. Dans **Table Editor > scooters**, édite la colonne `photo_urls` du scooter concerné et colle l'URL dans le tableau (ex. `["https://...jpg"]`). La première URL du tableau est utilisée comme photo principale.

## Variables d'environnement

Voir `.env.example` pour la liste complète et leur description.

## Déploiement sur Vercel

1. Connecte ton repo GitHub à [Vercel](https://vercel.com/new).
2. Renseigne les mêmes variables d'environnement que dans `.env.local` (onglet **Settings > Environment Variables** du projet Vercel).
3. Vercel déploie automatiquement à chaque push sur la branche principale.

## Structure du projet

```
app/            pages et routes API (App Router)
components/     composants React (ui = shadcn, layout, scooters, reservation, home)
lib/            clients Supabase, types TypeScript, utilitaires
supabase/       schéma SQL de la base de données
public/         images et fichiers statiques
```

## Notions React utilisées (pour les non-initiés)

- **Composant** : une fonction qui retourne du HTML (JSX). Réutilisable, ex. `<ScooterCard />`.
- **Server Component** (par défaut dans `app/`) : rendu côté serveur, peut lire la base de données directement, pas de JavaScript envoyé au navigateur pour lui.
- **Client Component** (`"use client"` en haut du fichier) : nécessaire dès qu'il y a de l'interactivité (clic, formulaire, state).
- **Route API** (`app/api/.../route.ts`) : équivalent d'un petit serveur backend, appelé depuis le navigateur pour créer une réservation en toute sécurité.
