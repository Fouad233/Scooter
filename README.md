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

Depuis l'espace admin (`/admin/scooters`), ouvre un scooter (ou crée-en un) et utilise le champ d'envoi de photos : les images sont automatiquement téléversées dans Supabase Storage. Plus besoin de passer par Supabase manuellement.

Prérequis (une seule fois) : dans Supabase, va dans **Storage** et crée un bucket nommé `scooters`, en mode **Public**. C'est dans ce bucket que les photos envoyées depuis l'admin seront stockées.

## Email automatique au client à la confirmation

Quand l'admin passe une réservation au statut "Confirmée" (`/admin`), un email de confirmation part automatiquement au client (dates, scooter, montant à régler sur place). L'envoi se fait via un compte Gmail (pas besoin de nom de domaine perso).

Configuration (une seule fois), avec le compte Gmail que tu veux utiliser comme expéditeur :
1. Active la validation en 2 étapes sur ce compte Google si ce n'est pas déjà fait (myaccount.google.com > Sécurité).
2. Va sur [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) et crée un "mot de passe d'application" (nom au choix, ex. "TetouanScoot").
3. Renseigne `GMAIL_USER` (ton adresse Gmail complète) et `GMAIL_APP_PASSWORD` (le mot de passe généré, 16 caractères sans espaces) dans `.env.local` (en local) et dans les variables d'environnement Vercel (en production).

Si `GMAIL_USER` / `GMAIL_APP_PASSWORD` ne sont pas configurés, la confirmation du statut fonctionne normalement mais aucun email n'est envoyé.

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
