# Documentation technique — TenderMoment

Ce document décrit l’architecture, le fonctionnement, les scripts et les options de déploiement du projet **TenderMoment**.

## 1) Vue d’ensemble
TenderMoment est une application web conçue pour générer une expérience romantique partageable via un lien. L’app privilégie une approche **stateless** :
- Les données de l’expérience sont encodées dans l’URL (Base64 + validation Zod).
- Aucun stockage serveur n’est requis pour la fonctionnalité principale.

## 2) Architecture

### Frontend
- Répertoire : `client/`
- Stack : React + Vite + Tailwind CSS
- Logique “stateless URL” : `client/src/hooks/use-experience-url.ts`
  - Génération d’URL : `/experience?data=...`
  - Décodage/validation : lecture du paramètre `data` + `experienceSchema`

### Backend
- Répertoire : `server/`
- Rôle :
  - En **dev** : Express + intégration Vite (middleware) pour servir l’app.
  - En **prod** : Express sert le client compilé (statique) via `dist/public`.
- Entrée serveur : `server/index.ts`
- Routes API : `server/routes.ts`
  - Endpoint actuel : `GET /api/health`

### Partagé (types / schémas / routes)
- Répertoire : `shared/`
- Schéma d’expérience : `shared/schema.ts`
- Définition des routes API : `shared/routes.ts`

## 3) Structure du dépôt
- `client/` : application React
- `server/` : serveur Express (API + dev server Vite)
- `shared/` : schémas, types et routes partagés
- `script/build.ts` : build client + bundle serveur
- `dist/` : sortie de build (générée)

## 4) Scripts & pipeline de build
Scripts définis dans `package.json` :
- `npm run dev` : lance le serveur en mode développement (Vite via Express)
- `npm run build` : exécute `script/build.ts`
  - Build client via Vite → `dist/public`
  - Bundle serveur via esbuild → `dist/index.cjs`
- `npm run start` : lance `dist/index.cjs` en production
- `npm run check` : `tsc` (typecheck)

## 5) Variables d’environnement
- `PORT` : port d’écoute (défaut `5000`)

## ) Dépannage (npm)

### `npm install` → `ENOTEMPTY ... rename node_modules/...`
Cause fréquente : `node_modules` partiellement écrit (install interrompu) ou processus concurrent.
Solution recommandée :
```bash
rm -rf node_modules
npm ci
```
Si nécessaire :
```bash
rm -rf node_modules/.autoprefixer-*
npm install
```
