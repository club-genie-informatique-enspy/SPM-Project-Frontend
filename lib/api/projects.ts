import { apiClient } from "@/lib/api-client";
import type { ProjectResponse, MemberResponse, PageResponse } from "@/types";

interface CreateProjectInput {
  name: string;
  description?: string;
  visibility?: "PUBLIC" | "PRIVATE";
}

interface UpdateProjectInput {
  name?: string;
  description?: string;
  visibility?: "PUBLIC" | "PRIVATE";
}

export const projectsApi = {
  list: (page = 0, size = 50) =>
    apiClient.get<PageResponse<ProjectResponse>>("/api/projects", {
      params: { page: String(page), size: String(size) },
    }),

  get: (id: string | number) =>
    apiClient.get<ProjectResponse>(`/api/projects/${id}`),

  create: (data: CreateProjectInput) =>
    apiClient.post<ProjectResponse>("/api/projects", data),

  update: (id: string | number, data: UpdateProjectInput) =>
    apiClient.patch<ProjectResponse>(`/api/projects/${id}`, data),

  delete: (id: string | number) =>
    apiClient.delete<void>(`/api/projects/${id}`),

  members: {
    list: (projectId: string | number) =>
      apiClient.get<MemberResponse[]>(`/api/projects/${projectId}/members`),

    invite: (projectId: string | number, email: string, role: string) =>
      apiClient.post(`/api/projects/${projectId}/members`, { email, role: role.toUpperCase() }),

    updateRole: (projectId: string | number, userId: number, role: string) =>
      apiClient.patch(`/api/projects/${projectId}/members/${userId}`, { role: role.toUpperCase() }),

    remove: (projectId: string | number, userId: number) =>
      apiClient.delete(`/api/projects/${projectId}/members/${userId}`),
  },
};
