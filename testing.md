# Testing Workflow - SPM Frontend

Ce document décrit le flux de test pour valider le bon fonctionnement de l'interface utilisateur de SPM et son intégration avec le backend d'authentification.

## Prérequis
- Backend TechWave (Spring Boot) lancé sur le port 8082 `http://localhost:8082`
- Node.js installé (v18+)

## Étape 1 : Lancement du Frontend
1. Ouvrez un terminal dans le répertoire du projet frontend (`SPM-Project-Frontend` ou `trello-SPM`).
2. Installez les dépendances si ce n'est pas déjà fait :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
4. Accédez à l'application via `http://localhost:3000`.

## Étape 2 : Vérification du Landing Page
1. Sur `http://localhost:3000`, naviguez à travers la page d'accueil.
2. Vérifiez que la page d'accueil suit un design épuré : vert, blanc, icônes Lucide.
3. Cliquez sur "Commencer maintenant" ou "S'inscrire". Cela devrait vous rediriger vers `/auth/register`.

## Étape 3 : Tests d'Authentification
*Note : Le frontend utilise actuellement des données simulées (mock), mais ils sont structurés pour appeler les vraies API Auth de TechWave une fois l'ajout des verbes (Axios) ajouté.*
1. **Inscription** (`/auth/register`) :
   - Saisissez un nom, un email, un mot de passe (min 8 caractères) et confirmez.
   - Acceptez les conditions d'utilisation et cliquez sur "Créer mon compte". La redirection devrait pointer sur `/dashboard`.
2. **Connexion** (`/auth/login`) :
   - Depuis la page `/auth/login`, entrez un compte mock et cliquez sur "Se connecter". La page devrait passer à `/dashboard`.
3. **SSO Google** :
   - Les boutons "Continuer avec Google" sur ces pages pointent vers l'intégration SSO future.

## Étape 4 : Gestion des Projets et Tableaux (Mock Data)
1. Dans le tableau de bord `/dashboard/projects`, vérifiez l'affichage de la carte des projets.
2. Cliquez sur un projet donné (e.g. `PROJ-1`). Vous atterrirez sur `/dashboard/projects/[id]/kanban`.
3. **Test Kanban Drag'n'Drop** :
   - Maintenez le clic sur une carte "À faire" et déplacez-la dans "En cours".
   - Le compteur au-dessus des colonnes devrait se mettre à jour localement.
4. **Détails des Tâches** :
   - Les cartes sur le tableau Kanban devraient ouvrir la vue de détails si nécessaire, ou rediriger vers `/dashboard/projects/[id]/tasks/[taskId]`. Modifiez visuellement des champs comme son Titre, son Statut, ou sa Priorité sur le côté droit.

## Étape 5 : Fonctionnalités additionnelles
- **Gantt et Membres** : Cliquez sur les onglets depuis le Kanban pour voir la page mockup du diagramme de Gantt `/dashboard/projects/[id]/gantt` et des membres `/dashboard/projects/[id]/members`.
- **Réactivité** : Réduisez la largeur de l'écran pour vous assurer du Responsive Design de la Sidebar et des cartes.

---
**Critères de Succès** :
- Transitions fluides, et aucune erreur en console.
- Cohérence des couleurs (blanc, vert) et design élégant respectant la maquette souhaitée.
