# WEB-Project-26-27 - Organisation & Répartition des Tâches

Bienvenue sur le dépôt GitHub du projet ! Ce document définit l'organisation de l'équipe, la répartition des rôles et le suivi des tâches pour mener à bien le développement de notre application web.

---

## 👥 Équipe et Rôles

Le projet est réparti entre 5 membres, avec des responsabilités croisées pour assurer la polyvalence et la communication :

| Membre | Rôle Principal | Domaines Secondaires / Support |
| :--- | :--- | :--- |
| **[Nom 1]** | **Lead Developer / DevOps** | Architecture technique, CI/CD, Base de données |
| **[Nom 2]** | **Lead Frontend (UI/UX)** | Intégration HTML/CSS/JS, Design System, Responsive |
| **[Nom 3]** | **Backend Developer (API)** | Logique métier, Sécurité, Gestion de la BDD |
| **[Nom 4]** | **Fullstack Developer** | Connexion Frontend/Backend, Fonctionnalités clés |
| **[Nom 5]** | **Product Owner / QA & Tests** | Gestion du backlog, Recette, Documentation, UX |

---

## 📋 Répartition Détaillée des Tâches par Phase

### Phase 1 : Initialisation & Conception (Semaine 1 - 2)
*Objectif : Poser les bases, valider l'architecture et créer les maquettes.*

* **[Nom 5] (PO/QA)** : 
  * Rédaction du cahier des charges et des user stories.
  * Création des wireframes et maquettes graphiques (Figma/Adobe XD).
* **[Nom 1] (Lead Tech)** : 
  * Initialisation du dépôt GitHub et configuration des branches (`main`, `dev`, `feature/*`).
  * Mise en place de l'environnement de développement et des outils de CI/CD.
* **[Nom 2], [Nom 3], [Nom 4]** :
  * Étude de faisabilité, choix des technologies (Stack technique) et validation de la base de données.

---

### Phase 2 : Développement - MVP (Minimum Viable Product) (Semaine 3 - 6)
*Objectif : Développer le cœur de l'application (Frontend + Backend).*

* **Pôle Backend ([Nom 3] & [Nom 1])** :
  * [ ] Conception et création de la base de données (Schéma, Migrations).
  * [ ] Développement des routes API REST / GraphQL.
  * [ ] Mise en place de l'authentification et de la sécurité (JWT, hachage des mots de passe).
* **Pôle Frontend ([Nom 2] & [Nom 4])** :
  * [ ] Intégration de la structure HTML/CSS (Framework CSS : Tailwind, Bootstrap, etc.).
  * [ ] Création des composants de l'interface utilisateur.
  * [ ] Routage des pages (React Router, Vue Router, ou structure MVC selon la stack).
* **Intégration & Connexion ([Nom 4])** :
  * [ ] Connexion des formulaires et des pages front aux routes de l'API backend.
  * [ ] Gestion des états globaux (Redux, Context API, etc.).

---

### Phase 3 : Fonctionnalités Avancées & Finitions (Semaine 7 - 8)
*Objectif : Ajouter les fonctionnalités secondaires, optimiser et tester.*

* **[Nom 2] (Frontend)** :
  * [ ] Optimisation Responsive (Mobile, Tablette, Desktop).
  * [ ] Accessibilité (a11y) et animations/transitions.
* **[Nom 3] (Backend)** :
  * [ ] Optimisation des requêtes SQL / performances de l'API.
  * [ ] Documentation de l'API (Swagger / Postman).
* **[Nom 5] (QA)** :
  * [ ] Campagne de tests fonctionnels (chasse aux bugs / Recette).
  * [ ] Rédaction de la documentation utilisateur.
* **[Nom 1] & [Nom 4]** :
  * [ ] Refactoring du code, correction des derniers bugs et déploiement en production.

---

## ⚙️ Méthodologie et Workflow de Travail

1. **Gestion de projet** : Utilisation d'un tableau Kanban (Trello, Jira ou GitHub Projects) pour suivre l'état des tâches (*To Do*, *In Progress*, *In Review*, *Done*).
2. **Branches Git** :
   * La branche `main` contient le code stable en production.
   * La branche `dev` sert à rassembler les fonctionnalités validées.
   * Chaque nouvelle fonctionnalité doit être développée sur une branche dédiée : `feature/nom-de-la-tache`.
3. **Validation (Pull Requests)** :
   * Toute modification de code doit faire l'objet d'une **Pull Request (PR)** vers `dev`.
   * Un minimum de **1 relecture (Review)** par un autre membre de l'équipe est requis avant fusion.

---

## 🛠️ Stack Technique du Projet
* **Frontend** : `[Ex: React / Vue.js / Tailwind CSS]`
* **Backend** : `[Ex: Node.js (Express) / PHP (Symfony) / Python (Django)]`
* **Base de données** : `[Ex: PostgreSQL / MySQL / MongoDB]`
* **Outils** : `[Ex: Docker, Git, Figma, Postman]`
