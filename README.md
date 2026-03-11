# TenderMoment

Générateur d’expériences romantiques **partageables via un lien**. L’expérience est encodée côté client et ne dépend pas d’une base de données.

![CI](https://img.shields.io/github/actions/workflow/status/Djochrist/TenderMoment/ci.yml?branch=main&label=CI)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Tailwind%20CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-0.39-2C2C2C)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8-4169E1?logo=postgresql&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.24-3E67B1?logo=zod&logoColor=white)
![TanStack%20Query](https://img.shields.io/badge/TanStack_Query-5.60-FF4154?logo=reactquery&logoColor=white)
![Radix%20UI](https://img.shields.io/badge/Radix_UI-1.x-161618?logo=radixui&logoColor=white)
![Framer%20Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-8-DD3A0A?logo=postcss&logoColor=white)
![esbuild](https://img.shields.io/badge/esbuild-0.25-FFCF00?logo=esbuild&logoColor=000)

## Aperçu
![Aperçu du site](assets/tenderMoment.gif)

## Fonctionnalités
- Création d’une expérience (noms, message, ambiance visuelle)
- Partage via URL (aucun compte requis)
- API minimale (healthcheck) + serveur dev intégré

## Stack
- Frontend : React, Vite, Tailwind CSS, Framer Motion, Radix UI
- Backend (dev/prod) : Express
- Données : Drizzle ORM
- Validation : Zod
- State/data : TanStack Query
- Build : TypeScript, tsx, Vite, esbuild, PostCSS

## Prérequis
- Node.js `>= 20` (voir `.nvmrc`)
- npm

## Installation
```bash
npm ci
```
Si vous n’avez pas encore de `package-lock.json` cohérent, utilisez `npm install`.

## Développement
```bash
npm run dev
```
Serveur par défaut : `http://localhost:5000`.

## Production
```bash
npm run build
npm run start
```

## Scripts
- `npm run dev` : serveur dev
- `npm run build` : build client + bundle serveur dans `dist/`
- `npm run start` : lance le serveur en mode production
- `npm run check` : typecheck TypeScript
- `npm run db:push` : Drizzle (uniquement si vous ajoutez une DB)

## Structure
- `client/` : app React
- `server/` : API + serveur statique
- `shared/` : schémas et routes partagés
- `assets/` : médias et previews
