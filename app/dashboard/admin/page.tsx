"use client";

import React, { useState } from "react";
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
  UploadCloud,
  Mail
} from "@/lib/icons";
import { users as allUsers } from "@/lib/mock-data";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { User } from "@/types";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: "users", label: "Utilisateurs", icon: Users },
    { id: "logs", label: "Logs système", icon: ScrollText },
    { id: "config", label: "Configuration", icon: Settings2 },
  ];

  const mockLogs = Array.from({ length: 15 }, (_, i) => ({
    id: `log-${i}`,
    timestamp: new Date(Date.now() - i * 1000 * 60 * 60).toLocaleString('fr-FR'),
    user: allUsers[i % allUsers.length].name,
    action: i % 3 === 0 ? "Connexion" : i % 3 === 1 ? "Suppression Projet" : "Mise à jour Tâche",
    ip: `192.168.1.${10 + i}`,
    details: "Détails de l'action effectuée..."
  }));

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Administration</h1>
        <p className="text-gray-500 font-medium mt-1">Gérez la plateforme, les utilisateurs et la configuration globale.</p>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl w-fit shadow-sm border border-gray-100">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === tab.id 
                ? "bg-green-600 text-white shadow-lg shadow-green-100" 
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {activeTab === "users" && (
          <div className="animate-in fade-in duration-500">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between gap-4">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher par nom ou email..." 
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-green-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 rounded-xl border border-gray-100 text-gray-500 hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Utilisateur</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Rôle</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Statut</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {allUsers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user: User) => (
                    <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={user.name} />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={user.role as any} label={user.role} />
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={(user.isActive ? 'active' : 'draft') as any} label={user.isActive ? "ACTIF" : "INACTIF"} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-400 hover:text-green-600 transition-all" title="Changer le rôle">
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-400 hover:text-orange-500 transition-all" title="Désactiver">
                            <Ban className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-400">
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
          <div className="animate-in fade-in duration-500">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Journal d'activités</h3>
              <button className="text-xs font-black text-green-600 uppercase tracking-widest flex items-center gap-2 hover:underline">
                <Download className="w-4 h-4" />
                Exporter CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Timestamp</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Utilisateur</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-xs font-medium text-gray-500">{log.timestamp}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{log.user}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          log.action === 'Connexion' ? 'bg-blue-50 text-blue-600' : 
                          log.action === 'Suppression Projet' ? 'bg-red-50 text-red-600' : 
                          'bg-orange-50 text-orange-600'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-gray-400">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div className="p-8 lg:p-12 animate-in fade-in duration-500 max-w-2xl mx-auto w-full">
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-black text-gray-900">Stockage</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-gray-700">Quota max par projet</label>
                      <span className="text-sm font-bold text-green-600">500 MB</span>
                    </div>
                    <input type="range" className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-600" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-gray-700">Limite upload fichier</label>
                      <span className="text-sm font-bold text-green-600">25 MB</span>
                    </div>
                    <input type="range" className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-600" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-black text-gray-900">Emails</h3>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email expéditeur</label>
                  <input 
                    type="email" 
                    defaultValue="noreply@spm-platform.com"
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50 flex justify-end">
                <button className="btn-primary py-3 px-10 shadow-xl shadow-green-100">
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
