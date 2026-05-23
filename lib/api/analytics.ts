import { apiClient } from "@/lib/api-client";
import type {
  ProjectSummaryResponse,
  BurndownResponse,
  VelocityResponse,
  ExportJobResponse,
  ExportFormat,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082";

export const analyticsApi = {
  summary: (projectId: string | number) =>
    apiClient.get<ProjectSummaryResponse>(
      `/api/projects/${projectId}/analytics/summary`
    ),

  burndown: (projectId: string | number, sprintStart: string, sprintEnd: string) =>
    apiClient.get<BurndownResponse>(
      `/api/projects/${projectId}/analytics/burndown`,
      { params: { sprintStart, sprintEnd } }
    ),

  velocity: (projectId: string | number) =>
    apiClient.get<VelocityResponse>(
      `/api/projects/${projectId}/analytics/velocity`
    ),

  export: {
    create: (projectId: string | number, format: ExportFormat = "CSV") =>
      apiClient.post<ExportJobResponse>(`/api/projects/${projectId}/export`, { format }),

    status: (jobId: number) =>
      apiClient.get<ExportJobResponse>(`/api/exports/${jobId}`),

    downloadUrl: (jobId: number) =>
      `${BASE_URL}/api/exports/${jobId}/download`,
  },
};
