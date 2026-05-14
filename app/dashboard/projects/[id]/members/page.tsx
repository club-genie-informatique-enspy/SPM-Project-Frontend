"use client";

import React, { useState } from "react";
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

export default function MembersPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id) || projects[0];
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("read");

  const tabs = [
    { name: "Kanban", href: `/dashboard/projects/${project.id}/kanban`, icon: Trello },
    { name: "Gantt", href: `/dashboard/projects/${project.id}/gantt`, icon: GanttChartSquare },
    { name: "Membres", href: `/dashboard/projects/${project.id}/members`, icon: Users, active: true },
    { name: "Paramètres", href: `/dashboard/projects/${project.id}/settings`, icon: Settings },
  ];

  const members = project.members.map(m => {
    const user = allUsers.find(u => u.id === m.userId);
    return {
      ...m,
      user: user || allUsers[0]
    };
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Project Header */}
      <header className="bg-white border-b border-gray-100 px-8 pt-8 shrink-0">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-6">
          <Link href="/dashboard/projects" className="hover:text-green-600 transition-colors">Projets</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{project.name}</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Membres du projet</h1>
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Inviter un membre
          </button>
        </div>

        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex items-center gap-2 px-1 pb-4 text-sm font-bold transition-all border-b-2 relative ${
                tab.active 
                  ? "text-green-600 border-green-600" 
                  : "text-gray-500 border-transparent hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </Link>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 bg-[#f9fafb]">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher un membre..." 
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-green-500 transition-all"
              />
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {members.length} Membres au total
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
                {members.map((member) => (
                  <tr key={member.userId} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={member.user.name} />
                        <div>
                          <p className="text-sm font-bold text-gray-900">{member.user.name}</p>
                          <p className="text-xs text-gray-400">{member.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={member.role as any} />
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={(member.status === 'active' ? 'active' : 'pending') as any} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-400 hover:text-green-600 transition-all" title="Changer le rôle">
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                        {member.role !== 'owner' && (
                          <button className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-400 hover:text-red-500 transition-all" title="Retirer du projet">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-400">
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

      {/* Invite Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Inviter un nouveau membre"
        footer={
          <>
            <button 
              onClick={() => setIsInviteModalOpen(false)}
              className="px-6 py-2 rounded-full font-bold text-gray-500 hover:bg-gray-100 transition-all"
            >
              Annuler
            </button>
            <button 
              onClick={() => setIsInviteModalOpen(false)}
              className="btn-primary py-2 px-6"
            >
              Envoyer l'invitation
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email de l'invité</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="nom@exemple.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Rôle du membre</label>
            <select 
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full p-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all font-bold text-sm"
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
