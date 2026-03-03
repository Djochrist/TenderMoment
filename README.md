# TenderMoment

Générateur d’expériences romantiques **partageables via un lien**. L’application est conçue pour rester **stateless** : l’expérience est encodée dans l’URL, sans dépendre d’une base de données.

## Fonctionnalités
- Création d’une expérience (noms, message, ambiance visuelle)
- Partage via URL (aucun compte requis)
- API minimale (healthcheck) + serveur dev intégré

## Stack
- Frontend : React + Vite + Tailwind CSS
- Backend (dev/prod) : Express (API minimale + static en prod)
- Build : `tsx` + Vite + esbuild
- Partagé : `shared/` (schémas, routes)

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

## Variables d’environnement
- `PORT` : port d’écoute du serveur (défaut `5000`)

## Structure du projet
- `client/` : application React
- `server/` : serveur Express (API + intégration Vite en dev)
- `shared/` : code et types partagés
- `script/build.ts` : pipeline de build

## CI (GitHub Actions)
Le workflow exécute : `npm ci` → `npm run check` → `npm run build`.

## Déploiement (Vercel)
Deux options :
- **Statique** : servir uniquement `dist/public` après `npm run build` (recommandé si vous n’avez pas besoin d’API).
- **Node server** : déployer le serveur (sortie `dist/index.cjs`) sur une plateforme qui supporte Node.

## Documentation technique
Voir `documentation/DOCUMENTATION_TECHNIQUE.md`.
