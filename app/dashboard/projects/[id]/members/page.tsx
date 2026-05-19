"use client";

import { useState, use } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  ChevronRight,
  GanttChartSquare,
  Trello,
  Users,
  Settings,
  Mail,
  ShieldCheck,
  Trash2
} from "@/lib/icons";
import { projects, users as allUsers } from "@/lib/mock-data";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { ProjectRole } from "@/types";

export default function MembersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find(p => p.id === id) || projects[0];
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("read");
  const [search, setSearch] = useState("");

  const tabs = [
    { name: "Kanban",     href: `/dashboard/projects/${project.id}/kanban`,   icon: Trello },
    { name: "Gantt",      href: `/dashboard/projects/${project.id}/gantt`,    icon: GanttChartSquare },
    { name: "Membres",    href: `/dashboard/projects/${project.id}/members`,  icon: Users, active: true },
    { name: "Paramètres", href: `/dashboard/projects/${project.id}/settings`, icon: Settings },
  ];

  const members = project.members
    .map(m => ({ ...m, user: allUsers.find(u => u.id === m.userId) ?? allUsers[0] }))
    .filter(m => m.user.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 pt-5 shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 mb-4">
          <Link href="/dashboard/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projets</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-700 dark:text-gray-300">{project.name}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-base font-black text-gray-900 dark:text-gray-100">Membres du projet</h1>
          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="btn-primary py-1.5 px-4 text-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Inviter un membre
          </button>
        </div>

        <div className="flex items-center gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
                tab.active
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </Link>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7] dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un membre..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-400"
              />
            </div>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{project.members.length} membre{project.members.length > 1 ? "s" : ""}</span>
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
                {members.map((member) => (
                  <tr key={member.userId} className="group hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={member.user.name} />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{member.user.name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{member.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={member.role as ProjectRole} />
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={member.status === "active" ? "active" : "pending"} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm text-gray-400 hover:text-blue-600 transition-all" title="Changer le rôle">
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                        {member.role !== "owner" && (
                          <button type="button" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm text-gray-400 hover:text-red-500 transition-all" title="Retirer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <button type="button" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm text-gray-400">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Inviter un nouveau membre"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="px-5 py-2 rounded-lg font-semibold text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="btn-primary py-2 px-5 text-sm"
            >
              Envoyer l&apos;invitation
            </button>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email de l&apos;invité</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="nom@exemple.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm placeholder:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Rôle du membre</label>
            <select
              aria-label="Rôle du membre"
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
            >
              <option value="read">Lecture (Consultation uniquement)</option>
              <option value="write">Écriture (Peut modifier les tâches)</option>
              <option value="admin">Administrateur (Gestion du projet)</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
