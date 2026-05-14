"use client";

import React, { useState } from "react";
import { 
  Bell,
  CheckCheck,
  MessageSquare,
  UserPlus,
  RefreshCw,
  Info,
  ChevronRight,
  MoreVertical,
  Search
} from "@/lib/icons";
import { notifications as allNotifs } from "@/lib/mock-data";
import Link from "next/link";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(allNotifs);

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === "unread") return !n.isRead;
    if (activeTab === "mentions") return n.type === "mention";
    return true;
  });

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "comment": return { icon: MessageSquare, color: "text-blue-600 bg-blue-50" };
      case "mention": return { icon: Info, color: "text-purple-600 bg-purple-50" };
      case "invite": return { icon: UserPlus, color: "text-green-600 bg-green-50" };
      case "status": return { icon: RefreshCw, color: "text-orange-600 bg-orange-50" };
      default: return { icon: Bell, color: "text-gray-600 bg-gray-50" };
    }
  };

  return (
    <div className="p-8 lg:p-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Notifications</h1>
          <p className="text-gray-500 font-medium mt-1">Restez au courant des dernières activités sur vos projets.</p>
        </div>
        
        <button 
          onClick={markAllAsRead}
          className="btn-outline py-2.5 px-6 text-sm flex items-center gap-2"
        >
          <CheckCheck className="w-4 h-4" />
          Tout marquer comme lu
        </button>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab("all")}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "all" ? "bg-green-600 text-white shadow-md shadow-green-100" : "text-gray-500 hover:bg-gray-100"}`}
        >
          Toutes
        </button>
        <button 
          onClick={() => setActiveTab("unread")}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === "unread" ? "bg-green-600 text-white shadow-md shadow-green-100" : "text-gray-500 hover:bg-gray-100"}`}
        >
          Non lues
          <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">3</span>
        </button>
        <button 
          onClick={() => setActiveTab("mentions")}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "mentions" ? "bg-green-600 text-white shadow-md shadow-green-100" : "text-gray-500 hover:bg-gray-100"}`}
        >
          Mentions
        </button>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => {
            const typeConfig = getTypeIcon(notif.type);
            return (
              <Link 
                key={notif.id}
                href={notif.link}
                className={`flex items-start gap-4 p-6 rounded-3xl border transition-all hover:translate-x-1 group ${
                  notif.isRead 
                    ? "bg-white border-gray-100 opacity-75" 
                    : "bg-green-50/30 border-green-100 shadow-sm ring-1 ring-green-100"
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${typeConfig.color}`}>
                  <typeConfig.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-2 mb-1">
                      {!notif.isRead && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                      <span className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors" dangerouslySetInnerHTML={{ __html: notif.message }} />
                   </div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Il y a 2 heures • Projet Alpha</p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                   <button className="p-2 rounded-xl hover:bg-white text-gray-400 transition-all opacity-0 group-hover:opacity-100">
                     <MoreVertical className="w-4 h-4" />
                   </button>
                   <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-all" />
                </div>
              </Link>
            );
          })
        ) : (
          <div className="py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tout est calme ici</h3>
            <p className="text-gray-500 font-medium">Vous n'avez pas de nouvelles notifications pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
