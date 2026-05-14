# Etat d'avancement du projet SPM

## Resume

SPM est aujourd'hui un prototype Next.js de gestion de projet agile. L'application possede deja une interface complete pour presenter le produit, s'authentifier, acceder au tableau de bord et naviguer dans plusieurs vues metier comme les projets, le Kanban, le Gantt, les membres, les notifications, le profil et l'administration.

Le projet utilise encore des donnees locales et des mocks. L'objectif actuel est de stabiliser l'interface et les parcours principaux avant de connecter un vrai backend.

## Ce qui a ete fait

### Structure du projet

- Mise en place d'une application Next.js avec App Router.
- Organisation du code autour des dossiers `app`, `components`, `lib`, `types` et `data`.
- Utilisation de TypeScript pour definir les entites principales du domaine.
- Mise en place de Tailwind CSS pour le style de l'interface.

### Interface utilisateur

- Page d'accueil de presentation de SPM.
- Layout dashboard avec navigation laterale et barre superieure.
- Pages d'authentification :
  - connexion ;
  - inscription ;
  - reinitialisation du mot de passe.
- Pages dashboard :
  - accueil du tableau de bord ;
  - liste des projets ;
  - creation d'un projet ;
  - administration ;
  - notifications ;
  - profil utilisateur ;
  - Kanban d'un projet ;
  - Gantt d'un projet ;
  - membres d'un projet ;
  - parametres d'un projet ;
  - detail d'une tache.
- Composants UI reutilisables :
  - cartes de projet ;
  - cartes de tache ;
  - badges ;
  - avatars ;
  - modales ;
  - etats vides.

### Donnees de demonstration

- Creation de donnees mockees dans `lib/mock-data.ts`.
- Presence d'utilisateurs, projets, membres, taches et notifications de demonstration.
- Utilisation de ces donnees dans plusieurs vues du dashboard.

### Authentification temporaire

- Ajout d'un fichier local `data/users.json` pour stocker les utilisateurs.
- Ajout d'une route API locale `POST /api/auth/register` pour inscrire un utilisateur.
- Ajout d'une route API locale `POST /api/auth/login` pour connecter un utilisateur.
- Adaptation de la page de connexion pour appeler l'API locale.
- Adaptation de la page d'inscription pour appeler l'API locale.
- Stockage temporaire du token local et de l'utilisateur courant dans `localStorage`.
- Ajout de messages d'erreur dans les formulaires d'authentification.

### Documentation

- Remplacement du README generique Next.js par une documentation propre au projet.
- Description de la stack technique.
- Description du fonctionnement de l'authentification JSON temporaire.
- Ajout des comptes de test.
- Ajout des commandes d'installation, de developpement, de build et de lint.
- Ajout d'une vue d'ensemble de la structure du projet.

### Verification

- Les fichiers lies a l'authentification passent ESLint individuellement.
- Le build de production `npm run build` passe.
- Le lint global detecte encore des erreurs existantes dans plusieurs fichiers du dashboard et de l'interface.

## Ce qui manque a faire

### Backend et persistance

- Remplacer `data/users.json` par un vrai backend.
- Ajouter une base de donnees.
- Creer les endpoints pour :
  - utilisateurs ;
  - projets ;
  - membres ;
  - taches ;
  - commentaires ;
  - pieces jointes ;
  - notifications.
- Remplacer les donnees mockees de `lib/mock-data.ts` par des appels API.

### Securite et authentification

- Hasher les mots de passe.
- Mettre en place des sessions ou JWT reels.
- Ajouter une gestion fiable de l'expiration de session.
- Proteger les routes du dashboard.
- Gerer les roles et permissions :
  - administrateur ;
  - proprietaire de projet ;
  - membre en lecture ;
  - membre en ecriture.
- Ajouter une vraie reinitialisation de mot de passe.

### Fonctionnalites metier

- Rendre la creation de projet persistante.
- Ajouter la modification et suppression de projets.
- Ajouter la creation, modification, deplacement et suppression de taches.
- Connecter le Kanban aux vraies donnees.
- Connecter le Gantt aux vraies donnees.
- Gerer les assignations de taches.
- Ajouter les commentaires sur les taches.
- Ajouter les pieces jointes.
- Ajouter les invitations de membres.
- Ajouter les notifications dynamiques.
- Ajouter la recherche et les filtres fonctionnels.

### Qualite du code

- Corriger les erreurs ESLint restantes dans le projet.
- Supprimer les imports inutilises.
- Remplacer les `any` par des types precis.
- Corriger les apostrophes non echappees dans le JSX.
- Corriger les avertissements React sur les effets et fonctions impures.
- Harmoniser certains composants et layouts.

### Tests

- Ajouter des tests unitaires pour les fonctions utilitaires.
- Ajouter des tests pour les routes API.
- Ajouter des tests de composants pour les formulaires critiques.
- Ajouter des tests end-to-end pour :
  - inscription ;
  - connexion ;
  - navigation dashboard ;
  - creation de projet ;
  - gestion de taches.

### Experience utilisateur

- Ajouter des loaders plus complets sur les actions longues.
- Ajouter des confirmations pour les actions sensibles.
- Ajouter des messages de succes apres inscription, creation ou modification.
- Rendre les boutons Google et GitHub inactifs ou les brancher reellement.
- Ameliorer la protection des pages lorsque l'utilisateur n'est pas connecte.

### Preparation production

- Configurer les variables d'environnement.
- Ajouter une strategie de deploiement.
- Ajouter une configuration de base de donnees.
- Ajouter une journalisation serveur.
- Ajouter une gestion centralisee des erreurs.
- Ajouter une documentation API.

## Priorites recommandees

1. Corriger les erreurs ESLint globales.
2. Proteger les routes du dashboard avec l'auth locale actuelle.
3. Rendre les projets et taches persistants, meme temporairement en JSON.
4. Remplacer progressivement les mocks par des appels API.
5. Integrer ensuite le vrai backend avec base de donnees et authentification securisee.
