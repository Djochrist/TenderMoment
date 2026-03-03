# Documentation technique — TenderMoment

Ce document décrit l’architecture, le fonctionnement, les scripts et les options de déploiement du projet **TenderMoment**.

## 1) Vue d’ensemble
TenderMoment est une application web conçue pour générer une expérience romantique partageable via un lien. L’app privilégie une approche **stateless** :
- Les données de l’expérience sont encodées côté client et incluses dans le lien.
- Aucun stockage serveur n’est requis pour la fonctionnalité principale.

## 2) Architecture

### Frontend
- Répertoire : `client/`
- Stack : React + Vite + Tailwind CSS
- Logique de lien chiffré : `client/src/hooks/use-experience-url.ts`
  - Génération d’URL : `/experience#v=1&k=...&iv=...&c=...`
  - Déchiffrement/validation : lecture du `#hash` + WebCrypto (AES-GCM) + `experienceSchema`
  - Note : la clé est incluse dans le lien, donc toute personne qui possède le lien peut lire le contenu.

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

## 5.1) Observabilité (Vercel)
- `@vercel/speed-insights` est intégré côté client via `client/src/main.tsx` (activé uniquement en production).

## 6) Déploiement

### Option A — Déploiement statique (si aucune API)
- Build : `npm run build`
- Servir : `dist/public`

### Option B — Déploiement Node (API + statique)
- Build : `npm run build`
- Démarrage : `npm run start`
- Artefacts : `dist/index.cjs` + `dist/public/`

## 7) Migration Replit → GitHub (nettoyage)
Ne commitez pas (ou supprimez) les fichiers/dossiers spécifiques à Replit :
- `.replit`
- `replit.nix`
- `.local/`

## 8) Sécurité & confidentialité du lien
- Le payload est **chiffré** et stocké dans le `#hash` : il n’est pas envoyé au serveur dans la requête HTTP.
- La **clé est incluse dans le lien** : toute personne qui possède le lien peut déchiffrer et lire le message.
- Après ouverture, l’app retire le `#hash` (et `?data=` legacy) de la barre d’adresse via `history.replaceState` et conserve l’expérience en `sessionStorage` pour permettre un refresh sans ré-exposer le lien.
- Compatibilité : les anciens liens `?data=...` restent lisibles, mais les nouveaux liens générés utilisent le format chiffré `#v=1...`.

## 9) Dépannage (npm)

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
