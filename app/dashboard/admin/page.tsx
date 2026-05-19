"use client";

import { useState, useMemo } from "react";
import {
  Users,
  ScrollText,
  Settings2,
  Search,
  Filter,
  MoreVertical,
  ShieldCheck,
  Ban,
  Download,
  Database,
  Mail
} from "@/lib/icons";
import { users as allUsers } from "@/lib/mock-data";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { User } from "@/types";

const LOG_BASE = new Date("2026-05-19T12:00:00Z").getTime();

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: "users",  label: "Utilisateurs", icon: Users },
    { id: "logs",   label: "Logs système", icon: ScrollText },
    { id: "config", label: "Configuration", icon: Settings2 },
  ];

  const mockLogs = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: `log-${i}`,
    timestamp: new Date(LOG_BASE - i * 1000 * 60 * 60).toLocaleString("fr-FR"),
    user: allUsers[i % allUsers.length].name,
    action: i % 3 === 0 ? "Connexion" : i % 3 === 1 ? "Suppression Projet" : "Mise à jour Tâche",
    ip: `192.168.1.${10 + i}`,
  })), []);

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-10">
      <header className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Administration</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">Gérez la plateforme, les utilisateurs et la configuration globale.</p>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {activeTab === "users" && (
          <div>
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou email..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button type="button" className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Filter className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                    <th className="px-5 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Utilisateur</th>
                    <th className="px-5 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Rôle</th>
                    <th className="px-5 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Statut</th>
                    <th className="px-5 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {filteredUsers.map((user: User) => (
                    <tr key={user.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={user.name} />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={user.role === "admin" ? "admin" : "user"} />
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={user.isActive ? "active" : "draft"} label={user.isActive ? "Actif" : "Inactif"} />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button type="button" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm text-gray-400 hover:text-blue-600 transition-all" title="Changer le rôle">
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm text-gray-400 hover:text-orange-500 transition-all" title="Désactiver">
                            <Ban className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm text-gray-400">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <div>
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Journal d&apos;activités</h3>
              <button type="button" className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:underline">
                <Download className="w-4 h-4" />
                Exporter CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                    <th className="px-5 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Timestamp</th>
                    <th className="px-5 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Utilisateur</th>
                    <th className="px-5 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Action</th>
                    <th className="px-5 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {mockLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">{log.timestamp}</td>
                      <td className="px-5 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{log.user}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          log.action === "Connexion"           ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" :
                          log.action === "Suppression Projet"  ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" :
                          "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs font-mono text-gray-400 dark:text-gray-500">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div className="p-8 lg:p-12 max-w-2xl">
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Database className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-black text-gray-900 dark:text-gray-100">Stockage</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quota max par projet</label>
                      <span className="text-sm font-bold text-blue-600">500 MB</span>
                    </div>
                    <input type="range" className="w-full h-1.5 bg-gray-100 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Limite upload fichier</label>
                      <span className="text-sm font-bold text-blue-600">25 MB</span>
                    </div>
                    <input type="range" className="w-full h-1.5 bg-gray-100 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-black text-gray-900 dark:text-gray-100">Emails</h3>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email expéditeur</label>
                  <input
                    type="email"
                    defaultValue="noreply@spm-platform.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button type="button" className="btn-primary py-2.5 px-8">
                  Sauvegarder la configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
