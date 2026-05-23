"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Bell,
  CheckCheck,
  MessageSquare,
  UserPlus,
  RefreshCw,
  Info,
  ChevronRight,
  MoreVertical
} from "@/lib/icons";
import { NotificationResponse } from "@/types";
import { notificationsApi } from "@/lib/api/notifications";

function getTypeConfig(type: string) {
  switch (type) {
    case "COMMENT": return { icon: MessageSquare, color: "text-blue-600 bg-blue-50" };
    case "MENTION": return { icon: Info,          color: "text-violet-600 bg-violet-50" };
    case "INVITE":  return { icon: UserPlus,       color: "text-green-600 bg-green-50" };
    case "STATUS":  return { icon: RefreshCw,      color: "text-orange-600 bg-orange-50" };
    default:        return { icon: Bell,           color: "text-gray-600 bg-gray-50" };
  }
}

function formatRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1)  return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)   return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days}j`;
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab]     = useState("all");
  const [notifications, setNotifs]    = useState<NotificationResponse[]>([]);
  const [loading, setLoading]         = useState(true);

  const loadNotifications = useCallback(async (tab: string) => {
    setLoading(true);
    try {
      const onlyUnread = tab === "unread" ? true : undefined;
      const page = await notificationsApi.list(0, 50, onlyUnread);
      const data = tab === "mentions"
        ? page.content.filter((n) => n.type === "MENTION")
        : page.content;
      setNotifs(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadNotifications(activeTab); }, [activeTab, loadNotifications]);

  const handleMarkAsRead = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await notificationsApi.markAsRead(id);
      setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch { /* non-bloquant */ }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    } catch { /* non-bloquant */ }
  };

  const unreadCount     = notifications.filter(n => !n.read).length;
  const mentionsCount   = notifications.filter(n => n.type === "MENTION").length;

  const tabs = [
    { id: "all",      label: "Toutes",   count: notifications.length },
    { id: "unread",   label: "Non lues", count: unreadCount },
    { id: "mentions", label: "Mentions", count: mentionsCount },
  ];

  function buildLink(n: NotificationResponse) {
    if (n.relatedTaskId && n.relatedProjectId)
      return `/dashboard/projects/${n.relatedProjectId}/tasks/${n.relatedTaskId}`;
    if (n.relatedProjectId)
      return `/dashboard/projects/${n.relatedProjectId}/kanban`;
    return "#";
  }

  return (
    <div className="p-6 lg:p-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Notifications</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">Restez au courant des dernières activités sur vos projets.</p>
        </div>

        <button
          type="button"
          onClick={handleMarkAllAsRead}
          className="btn-outline py-2 px-5 text-sm flex items-center gap-2"
        >
          <CheckCheck className="w-4 h-4" />
          Tout marquer comme lu
        </button>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            title={tab.label}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none ${
                activeTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-2 max-w-3xl">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))
        ) : notifications.length > 0 ? (
          notifications.map((notif) => {
            const { icon: Icon, color } = getTypeConfig(notif.type);
            return (
              <a
                key={notif.id}
                href={buildLink(notif)}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-sm group ${
                  notif.read
                    ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    : "bg-blue-50/40 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {notif.title || notif.message}
                    </p>
                  </div>
                  {notif.title && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-0.5">{notif.message}</p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500">{formatRelativeTime(notif.createdAt)}</p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    type="button"
                    title="Options"
                    className="p-1.5 rounded-lg hover:bg-white text-gray-400 transition-all opacity-0 group-hover:opacity-100"
                    onClick={(e) => handleMarkAsRead(e, notif.id)}
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-all" />
                </div>
              </a>
            );
          })
        ) : (
          <div className="py-16 text-center bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-300 dark:text-gray-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">Tout est calme ici</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Vous n&apos;avez pas de nouvelles notifications pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
