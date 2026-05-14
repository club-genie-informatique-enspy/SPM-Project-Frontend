import { User, Project, Task, Notification, TaskStatus, Priority } from "../types";

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

export const projects: Project[] = [
  {
    id: "project-1",
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
      { userId: "user-4", projectId: "project-1", role: "read", joinedAt: "2024-01-04T00:00:00Z", status: "active" },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "project-2",
    name: "App Mobile Banking",
    description: "Application mobile pour les opérations bancaires sécurisées.",
    key: "AMB",
    status: "active",
    visibility: "private",
    ownerId: "user-1",
    members: [
      { userId: "user-1", projectId: "project-2", role: "owner", joinedAt: "2024-01-01T00:00:00Z", status: "active" },
      { userId: "user-2", projectId: "project-2", role: "write", joinedAt: "2024-01-02T00:00:00Z", status: "active" },
      { userId: "user-5", projectId: "project-2", role: "read", joinedAt: "2024-01-05T00:00:00Z", status: "active" },
    ],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "project-3",
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

const generateTasks = (projectId: string, count: number): Task[] => {
  const tasks: Task[] = [];
  const statuses: TaskStatus[] = ["todo", "in_progress", "in_review", "done"];
  const priorities: Priority[] = ["low", "medium", "high", "critical"];

  for (let i = 1; i <= count; i++) {
    const status = i <= 3 ? "todo" : i <= 5 ? "in_progress" : i <= 7 ? "in_review" : "done";
    tasks.push({
      id: `task-${projectId}-${i}`,
      title: `Tâche ${i} pour ${projectId}`,
      description: `Description détaillée de la tâche ${i}.`,
      status: status as TaskStatus,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      projectId,
      assigneeId: users[Math.floor(Math.random() * users.length)].id,
      storyPoints: Math.floor(Math.random() * 8) + 1,
      dueDate: new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["Frontend", "API"].slice(0, Math.floor(Math.random() * 2) + 1),
      createdAt: "2024-02-01T00:00:00Z",
      updatedAt: "2024-02-01T00:00:00Z",
    });
  }
  return tasks;
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
    message: "**Iness Kamga** a commenté votre tâche 'Refonte du Header'.",
    isRead: false,
    link: "/dashboard/projects/project-1/tasks/task-project-1-1",
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "notif-2",
    userId: "user-1",
    type: "invite",
    message: "**Marie Ngo** vous a invité au projet 'App Mobile Banking'.",
    isRead: true,
    link: "/dashboard/projects/project-2",
    createdAt: "2024-02-14T09:00:00Z",
  },
  {
    id: "notif-3",
    userId: "user-1",
    type: "status",
    message: "Le statut de '**Site Vitrine ENSPY**' est passé à 'Brouillon'.",
    isRead: false,
    link: "/dashboard/projects/project-3",
    createdAt: "2024-02-13T08:00:00Z",
  },
  {
    id: "notif-4",
    userId: "user-1",
    type: "mention",
    message: "**Tagatsing Samuel** vous a mentionné dans une tâche.",
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
    message: "Tâche 'Validation API' terminée.",
    isRead: false,
    link: "/dashboard/projects/project-1/kanban",
    createdAt: "2024-02-10T05:00:00Z",
  },
];
