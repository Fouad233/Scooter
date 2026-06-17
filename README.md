# Scooter — Location de scooters à Tétouan

Site web pour la location de scooters à Tétouan (Maroc) : catalogue, réservation en ligne avec calendrier de disponibilité, acompte payé via PayPal et solde réglé sur place.

## Stack technique

- [Next.js 15](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/) (base de données Postgres)
- [PayPal](https://developer.paypal.com/) (`@paypal/react-paypal-js`) pour l'acompte
- Déploiement sur [Vercel](https://vercel.com/)

## Prérequis

- Node.js 20+
- Un compte [Supabase](https://supabase.com/) (gratuit)
- Un compte [PayPal Developer](https://developer.paypal.com/) (gratuit, mode Sandbox pour les tests)
- Un compte [Vercel](https://vercel.com/) (gratuit) pour le déploiement

## Installation locale

```bash
npm install
cp .env.example .env.local
```

Remplis `.env.local` avec tes propres clés (voir les sections Configuration Supabase et Configuration PayPal ci-dessous).

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

## Configuration PayPal

1. Crée une app sur [developer.paypal.com](https://developer.paypal.com/) en mode **Sandbox** pour développer/tester.
2. Récupère le **Client ID** → `NEXT_PUBLIC_PAYPAL_CLIENT_ID` et le **Secret** → `PAYPAL_CLIENT_SECRET`.
3. Une fois prêt à encaisser réellement, bascule en mode **Live** et remplace les clés.

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
- **Route API** (`app/api/.../route.ts`) : équivalent d'un petit serveur backend, appelé depuis le navigateur ou un service externe (ex. PayPal).
