# SPM - Scrum Project Manager

SPM est une application web de gestion de projet inspiree de Trello, orientee equipes agiles. Elle permet de centraliser les projets, les membres, les taches, les tableaux Kanban, la planification Gantt, les notifications et les vues d'administration dans une interface Next.js moderne.

Le projet est actuellement en phase prototype frontend. Les donnees metier visibles dans le tableau de bord viennent de mocks TypeScript, et l'authentification utilise temporairement un fichier JSON local avant l'integration du vrai backend.

## Fonctionnalites

- Page d'accueil presentant la plateforme et ses principaux modules.
- Connexion et inscription via une API locale Next.js.
- Persistance temporaire des utilisateurs dans `data/users.json`.
- Tableau de bord avec statistiques, projets recents et taches assignees.
- Vues projets, Kanban, Gantt, membres, parametres, profil, notifications et administration.
- Composants reutilisables pour cartes, badges, avatars, modales et layout dashboard.

## Stack technique

- Next.js 16 avec App Router
- React 19
- TypeScript
- Tailwind CSS 4
- API routes Next.js pour simuler le backend d'authentification
- Fichier JSON local pour les utilisateurs de test

## Authentification locale JSON

Pour le moment, l'inscription et la connexion passent par ces routes internes :

- `POST /api/auth/register`
- `POST /api/auth/login`

Les utilisateurs sont stockes dans :

```txt
data/users.json
```

Comptes de test disponibles :

```txt
azangue.delmat@example.com / password123
negou.donald@example.com / password123
```

Apres connexion, le frontend stocke un token local de demonstration et l'utilisateur courant dans `localStorage`.

Important : les mots de passe sont stockes en clair dans le JSON uniquement pour faciliter le prototype. Cette approche ne doit pas etre utilisee en production. Le futur backend devra gerer le hash des mots de passe, les sessions ou JWT reels, la validation serveur avancee et les permissions.

## Installation

Installer les dependances :

```bash
npm install
```

Lancer le serveur de developpement :

```bash
npm run dev
```

Ouvrir ensuite :

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev      # demarre Next.js en developpement
npm run build    # compile l'application pour la production
npm run start    # lance la version compilee
npm run lint     # execute ESLint
```

## Structure du projet

```txt
app/
  api/auth/              # routes API locales pour login/register
  auth/                  # pages connexion, inscription, reset password
  dashboard/             # vues principales de l'application
components/
  layout/                # navbar, sidebar, layout dashboard
  ui/                    # composants UI reutilisables
data/
  users.json             # stockage temporaire des utilisateurs
lib/
  mock-data.ts           # donnees de demonstration projets/taches
  icons.tsx              # exports centralises des icones
types/
  index.ts               # types metier TypeScript
```

## Prochaines etapes

- Remplacer `data/users.json` par le vrai backend.
- Synchroniser les utilisateurs authentifies avec les projets et les taches.
- Ajouter une protection des routes dashboard.
- Brancher les actions CRUD des projets et taches sur une API persistante.
- Ajouter des tests pour les routes d'authentification et les flux critiques.
