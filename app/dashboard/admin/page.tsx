"use client";

import { useState, useMemo } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Folder,
  Layers,
  Plus,
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
  Globe,
  Info,
  Key,
  Lock,
  Mail
} from "@/lib/icons";
import { projects, users as allUsers, workspaces } from "@/lib/mock-data";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { User } from "@/types";

const LOG_BASE = new Date("2026-05-19T12:00:00Z").getTime();

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("workspaces");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: "workspaces", label: "Workspaces", icon: Layers },
    { id: "users",  label: "Accès au compte", icon: Users },
    { id: "logs",   label: "Audit du compte", icon: ScrollText },
    { id: "config", label: "Paramètres du compte", icon: Settings2 },
  ];

  const mockLogs = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: `log-${i}`,
    timestamp: new Date(LOG_BASE - i * 1000 * 60 * 60).toLocaleString("fr-FR"),
    user: allUsers[i % allUsers.length].name,
    action: i % 4 === 0 ? "Connexion" : i % 4 === 1 ? "Invitation compte" : i % 4 === 2 ? "Rôle global modifié" : "Paramètres compte",
    ip: `192.168.1.${10 + i}`,
  })), []);

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-10">
      <header className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Compte SPM</p>
            <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Administration du compte</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
              Gérez les accès globaux, la sécurité et les paramètres de votre espace de travail.
            </p>
          </div>
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Administrer un projet
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <div className="mb-6 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/30 p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Cette page concerne le compte, pas un projet.</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Les rôles ci-dessous sont globaux. Les membres, permissions, paramètres et suppressions d&apos;un projet se gèrent depuis la page du projet concerné.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit max-w-full overflow-x-auto">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
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
        {activeTab === "workspaces" && (
          <div>
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Espaces de travail du compte</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Chaque workspace regroupe ses projets, ses membres et ses règles de travail.
                </p>
              </div>
              <button type="button" className="btn-primary py-2 px-4 text-sm flex items-center gap-1.5 w-fit">
                <Plus className="w-3.5 h-3.5" />
                Nouveau workspace
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 p-4">
              {workspaces.map((workspace) => {
                const workspaceProjects = projects.filter((project) => project.workspaceId === workspace.id);
                const owner = allUsers.find((user) => user.id === workspace.ownerId);

                return (
                  <div key={workspace.id} className="rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                            {workspace.name.slice(0, 1)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-black text-gray-900 dark:text-gray-100 truncate">{workspace.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{workspace.domain}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{workspace.description}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-[10px] font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest">
                        {workspace.plan}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3">
                        <Folder className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-2" />
                        <p className="text-lg font-black text-gray-900 dark:text-gray-100">{workspaceProjects.length}</p>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Projets</p>
                      </div>
                      <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-2" />
                        <p className="text-lg font-black text-gray-900 dark:text-gray-100">{workspace.members.length}</p>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Membres</p>
                      </div>
                      <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3">
                        <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-2" />
                        <p className="text-sm font-black text-gray-900 dark:text-gray-100 truncate">{owner?.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Owner</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur du compte..."
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
                    <th className="px-5 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Rôle global</th>
                    <th className="px-5 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Accès compte</th>
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
                          <button type="button" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm text-gray-400 hover:text-blue-600 transition-all" title="Changer le rôle global">
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm text-gray-400 hover:text-orange-500 transition-all" title="Suspendre l'accès au compte">
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
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Journal d&apos;activités du compte</h3>
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
                          log.action === "Connexion"             ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" :
                          log.action === "Invitation compte"     ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" :
                          log.action === "Rôle global modifié"   ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" :
                          "bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
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
          <div className="p-8 lg:p-12 max-w-3xl">
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-black text-gray-900 dark:text-gray-100">Identité du compte</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nom de l&apos;espace</label>
                    <input
                      type="text"
                      defaultValue="SPM Workspace"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Domaine autorisé</label>
                    <input
                      type="text"
                      defaultValue="example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Database className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-black text-gray-900 dark:text-gray-100">Limites du compte</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quota total du compte</label>
                      <span className="text-sm font-bold text-blue-600">25 GB</span>
                    </div>
                    <input type="range" className="w-full h-1.5 bg-gray-100 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Taille maximale d&apos;un fichier</label>
                      <span className="text-sm font-bold text-blue-600">25 MB</span>
                    </div>
                    <input type="range" className="w-full h-1.5 bg-gray-100 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-black text-gray-900 dark:text-gray-100">Sécurité globale</h3>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <Key className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Authentification forte</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Demander un second facteur pour les administrateurs globaux.</p>
                      </div>
                    </div>
                    <div className="w-10 h-5 rounded-full relative p-0.5 shadow-inner transition-colors bg-blue-500 shrink-0">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md transition-transform translate-x-5" />
                    </div>
                  </label>
                  <label className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Validation des invitations</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Un administrateur global valide les nouveaux comptes avant activation.</p>
                      </div>
                    </div>
                    <div className="w-10 h-5 rounded-full relative p-0.5 shadow-inner transition-colors bg-gray-200 dark:bg-gray-600 shrink-0">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md transition-transform" />
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-black text-gray-900 dark:text-gray-100">Emails du compte</h3>
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
                  Sauvegarder le compte
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
