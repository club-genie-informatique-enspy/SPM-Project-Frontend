export type TaskStatus = "todo" | "in_progress" | "in_review" | "done" | "blocked";
export type Priority = "critical" | "high" | "medium" | "low";
export type ProjectStatus = "draft" | "active" | "archived";
export type ProjectRole = "owner" | "admin" | "write" | "read";
export type NotificationType = "comment" | "mention" | "invite" | "status" | "system";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  key: string;
  status: ProjectStatus;
  visibility: "public" | "private";
  ownerId: string;
  members: ProjectMember[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  userId: string;
  projectId: string;
  role: ProjectRole;
  joinedAt: string;
  status: "active" | "pending";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  assigneeId?: string;
  parentId?: string;
  storyPoints?: number;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  taskId: string;
  filename: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  uploadedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  link: string;
  createdAt: string;
}
