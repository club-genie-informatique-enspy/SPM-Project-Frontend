import { User, Project, Task, Notification, TaskStatus, Priority, Workspace } from "../types";

export const users: User[] = [
  {
    id: "user-1",
    name: "Azangue Delmat",
    email: "azangue.delmat@example.com",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    name: "Negou Donald",
    email: "negou.donald@example.com",
    role: "user",
    isActive: true,
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "user-3",
    name: "Tagatsing Samuel",
    email: "tagatsing.samuel@example.com",
    role: "user",
    isActive: true,
    createdAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "user-4",
    name: "Iness Kamga",
    email: "iness.kamga@example.com",
    role: "user",
    isActive: true,
    createdAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "user-5",
    name: "Marie Ngo",
    email: "marie.ngo@example.com",
    role: "user",
    isActive: true,
    createdAt: "2024-01-05T00:00:00Z",
  },
];

export const workspaces: Workspace[] = [
  {
    id: "workspace-1",
    name: "SPM Studio",
    slug: "spm-studio",
    description: "Espace principal pour les projets produit, design et livraison agile.",
    domain: "example.com",
    plan: "team",
    ownerId: "user-1",
    members: [
      { userId: "user-1", workspaceId: "workspace-1", role: "owner", joinedAt: "2024-01-01T00:00:00Z", status: "active" },
      { userId: "user-2", workspaceId: "workspace-1", role: "admin", joinedAt: "2024-01-02T00:00:00Z", status: "active" },
      { userId: "user-3", workspaceId: "workspace-1", role: "member", joinedAt: "2024-01-03T00:00:00Z", status: "active" },
      { userId: "user-4", workspaceId: "workspace-1", role: "member", joinedAt: "2024-01-04T00:00:00Z", status: "active" },
    ],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "workspace-2",
    name: "Clients externes",
    slug: "clients-externes",
    description: "Espace réservé aux projets client, recettes et livrables contractuels.",
    domain: "clients.example.com",
    plan: "free",
    ownerId: "user-1",
    members: [
      { userId: "user-1", workspaceId: "workspace-2", role: "owner", joinedAt: "2024-02-01T00:00:00Z", status: "active" },
      { userId: "user-5", workspaceId: "workspace-2", role: "member", joinedAt: "2024-02-03T00:00:00Z", status: "active" },
    ],
    createdAt: "2024-02-01T00:00:00Z",
  },
];

export const activeWorkspace = workspaces[0];

export const projects: Project[] = [
  {
    id: "project-1",
    workspaceId: "workspace-1",
    name: "Plateforme E-learning",
    description: "Une solution complète pour la gestion des cours en ligne.",
    key: "PEL",
    status: "active",
    visibility: "public",
    ownerId: "user-1",
    members: [
      { userId: "user-1", projectId: "project-1", role: "owner", joinedAt: "2024-01-01T00:00:00Z", status: "active" },
      { userId: "user-2", projectId: "project-1", role: "admin", joinedAt: "2024-01-02T00:00:00Z", status: "active" },
      { userId: "user-3", projectId: "project-1", role: "write", joinedAt: "2024-01-03T00:00:00Z", status: "active" },
      { userId: "user-4", projectId: "project-1", role: "read",  joinedAt: "2024-01-04T00:00:00Z", status: "active" },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "project-2",
    workspaceId: "workspace-1",
    name: "App Mobile Banking",
    description: "Application mobile pour les opérations bancaires sécurisées.",
    key: "AMB",
    status: "active",
    visibility: "private",
    ownerId: "user-1",
    members: [
      { userId: "user-1", projectId: "project-2", role: "owner", joinedAt: "2024-01-01T00:00:00Z", status: "active" },
      { userId: "user-2", projectId: "project-2", role: "write", joinedAt: "2024-01-02T00:00:00Z", status: "active" },
      { userId: "user-5", projectId: "project-2", role: "read",  joinedAt: "2024-01-05T00:00:00Z", status: "active" },
    ],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "project-3",
    workspaceId: "workspace-2",
    name: "Site Vitrine ENSPY",
    description: "Refonte du site web officiel de l'ENSPY.",
    key: "ENSPY",
    status: "draft",
    visibility: "public",
    ownerId: "user-1",
    members: [
      { userId: "user-1", projectId: "project-3", role: "owner", joinedAt: "2024-01-01T00:00:00Z", status: "active" },
      { userId: "user-3", projectId: "project-3", role: "write", joinedAt: "2024-01-03T00:00:00Z", status: "active" },
    ],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
];

const taskTitles: Record<string, string[]> = {
  "project-1": [
    "Refonte de la page d'accueil",
    "Intégration du lecteur vidéo",
    "Système de quiz interactif",
    "Gestion des certificats",
    "Tableau de bord étudiant",
    "API d'authentification SSO",
    "Notifications par email",
    "Module de paiement en ligne",
    "Système de recommandations",
    "Tests de performance",
    "Accessibilité WCAG 2.1",
    "Internationalisation i18n",
  ],
  "project-2": [
    "Écran de connexion biométrique",
    "Virement bancaire inter-comptes",
    "Historique des transactions",
    "Notifications push temps réel",
    "Scanner de QR code paiement",
    "Rapport mensuel PDF",
    "Sécurité 2FA",
    "Onboarding utilisateur",
  ],
  "project-3": [
    "Maquettes Figma v2",
    "Architecture des pages",
    "Optimisation SEO",
    "Galerie photo campus",
    "Formulaire de contact",
  ],
};

const generateTasks = (projectId: string, count: number): Task[] => {
  const priorities: Priority[] = ["low", "medium", "high", "critical"];
  const assignees = ["user-1", "user-2", "user-3", "user-4", "user-5"];
  const tagSets = [["Frontend"], ["API"], ["Frontend", "API"], ["Tests"], ["Design"]];

  return Array.from({ length: count }, (_, i) => {
    const idx = i + 1;
    const statusIndex = i < 3 ? 0 : i < 5 ? 1 : i < 7 ? 2 : 3;
    const statuses: TaskStatus[] = ["todo", "in_progress", "in_review", "done"];
    const titles = taskTitles[projectId];
    const due = new Date(2026, 4, 15 + (i * 3) % 20);

    return {
      id: `task-${projectId}-${idx}`,
      title: titles?.[i] ?? `Tâche ${idx}`,
      description: `Description détaillée de cette tâche. Elle couvre les aspects techniques et fonctionnels nécessaires à la livraison.`,
      status: statuses[statusIndex],
      priority: priorities[i % priorities.length],
      projectId,
      assigneeId: assignees[i % assignees.length],
      storyPoints: [1, 2, 3, 5, 8][i % 5],
      dueDate: due.toISOString(),
      tags: tagSets[i % tagSets.length],
      createdAt: "2024-02-01T00:00:00Z",
      updatedAt: "2024-02-01T00:00:00Z",
    };
  });
};

export const tasks: Task[] = [
  ...generateTasks("project-1", 12),
  ...generateTasks("project-2", 8),
  ...generateTasks("project-3", 5),
];

export const notifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-1",
    type: "comment",
    message: "Iness Kamga a commenté votre tâche « Refonte de la page d'accueil ».",
    isRead: false,
    link: "/dashboard/projects/project-1/tasks/task-project-1-1",
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "notif-2",
    userId: "user-1",
    type: "invite",
    message: "Marie Ngo vous a invité au projet « App Mobile Banking ».",
    isRead: true,
    link: "/dashboard/projects/project-2",
    createdAt: "2024-02-14T09:00:00Z",
  },
  {
    id: "notif-3",
    userId: "user-1",
    type: "status",
    message: "Le statut de « Site Vitrine ENSPY » est passé à Brouillon.",
    isRead: false,
    link: "/dashboard/projects/project-3",
    createdAt: "2024-02-13T08:00:00Z",
  },
  {
    id: "notif-4",
    userId: "user-1",
    type: "mention",
    message: "Tagatsing Samuel vous a mentionné dans une tâche.",
    isRead: false,
    link: "/dashboard/projects/project-1",
    createdAt: "2024-02-12T07:00:00Z",
  },
  {
    id: "notif-5",
    userId: "user-1",
    type: "system",
    message: "Votre mot de passe a été modifié avec succès.",
    isRead: true,
    link: "/dashboard/profile",
    createdAt: "2024-02-11T06:00:00Z",
  },
  {
    id: "notif-6",
    userId: "user-1",
    type: "status",
    message: "Tâche « Validation API » marquée comme terminée.",
    isRead: false,
    link: "/dashboard/projects/project-1/kanban",
    createdAt: "2024-02-10T05:00:00Z",
  },
];
