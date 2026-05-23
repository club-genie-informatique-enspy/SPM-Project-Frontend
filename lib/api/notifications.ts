import { apiClient } from "@/lib/api-client";
import type { NotificationResponse, PageResponse } from "@/types";

export const notificationsApi = {
  list: (page = 0, size = 30, onlyUnread?: boolean) => {
    const params: Record<string, string> = {
      page: String(page),
      size: String(size),
    };
    if (onlyUnread !== undefined) params.read = String(!onlyUnread);
    return apiClient.get<PageResponse<NotificationResponse>>("/api/notifications", { params });
  },

  markAsRead: (id: number) =>
    apiClient.patch<NotificationResponse>(`/api/notifications/${id}/read`),

  markAllAsRead: () =>
    apiClient.patch<{ message: string; count: number }>("/api/notifications/read-all"),
};
