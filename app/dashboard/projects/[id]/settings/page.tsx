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
  ShieldAlert,
  Archive,
  Trash2,
  Save
} from "@/lib/icons";
import { projects } from "@/lib/mock-data";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import { Project } from "@/types";

export default function ProjectSettingsPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id) || projects[0];
  const [activeTab, setActiveTab] = useState("general");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  const projectTabs = [
    { name: "Kanban", href: `/dashboard/projects/${project.id}/kanban`, icon: Trello },
    { name: "Gantt", href: `/dashboard/projects/${project.id}/gantt`, icon: GanttChartSquare },
    { name: "Membres", href: `/dashboard/projects/${project.id}/members`, icon: Users },
    { name: "Paramètres", href: `/dashboard/projects/${project.id}/settings`, icon: Settings, active: true },
  ];

  const sidebarTabs = [
    { id: "general", label: "Général", icon: Settings },
    { id: "danger", label: "Zone de danger", icon: ShieldAlert, color: "text-red-500" },
  ];

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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Paramètres du projet</h1>
          <button className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2">
            <Save className="w-4 h-4" />
            Enregistrer
          </button>
        </div>

        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {projectTabs.map((tab) => (
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

      <main className="flex-1 flex overflow-hidden bg-[#f9fafb]">
        {/* Settings Sidebar */}
        <aside className="w-64 border-r border-gray-100 p-8 hidden md:block">
          <nav className="space-y-2">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-white shadow-sm text-green-600 ring-1 ring-gray-100" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                } ${tab.color || ""}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-3xl">
            {activeTab === "general" ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Informations de base</h3>
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nom du projet</label>
                        <input 
                          type="text" 
                          defaultValue={project.name}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Clé</label>
                        <input 
                          type="text" 
                          defaultValue={project.key}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all font-bold text-green-600 bg-gray-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                      <textarea 
                        defaultValue={project.description}
                        rows={4}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all font-medium resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Préférences d'affichage</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 cursor-pointer transition-all">
                      <div>
                        <p className="font-bold text-gray-900">Visibilité publique</p>
                        <p className="text-xs text-gray-400">Tout le monde dans l'organisation peut voir ce projet.</p>
                      </div>
                      <div className="w-12 h-6 bg-green-500 rounded-full relative p-1 shadow-inner">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-md" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-red-50/50 p-8 rounded-[2.5rem] border border-red-100 border-dashed">
                  <h3 className="text-xl font-black text-red-600 mb-8 tracking-tight">Actions irréversibles</h3>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-red-100 shadow-sm">
                      <div>
                        <p className="font-black text-gray-900">Archiver le projet</p>
                        <p className="text-xs text-gray-500">Le projet passera en lecture seule pour tous les membres.</p>
                      </div>
                      <button className="px-6 py-2.5 rounded-full border border-orange-200 text-orange-600 font-bold hover:bg-orange-50 transition-all text-sm flex items-center gap-2">
                        <Archive className="w-4 h-4" />
                        Archiver
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-red-100 shadow-sm">
                      <div>
                        <p className="font-black text-red-600">Supprimer définitivement</p>
                        <p className="text-xs text-gray-500">Toutes les tâches, membres et données seront supprimés.</p>
                      </div>
                      <button 
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-all text-sm shadow-md shadow-red-100 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Supprimer le projet ?"
        footer={
          <>
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2 rounded-full font-bold text-gray-500 hover:bg-gray-100 transition-all"
            >
              Annuler
            </button>
            <button 
              disabled={confirmName !== project.name}
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-red-600 text-white px-8 py-2 rounded-full font-bold shadow-md shadow-red-100 hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmer la suppression
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="p-4 bg-red-50 rounded-2xl flex gap-4 text-red-600">
            <ShieldAlert className="w-6 h-6 shrink-0" />
            <p className="text-sm font-medium leading-relaxed">
              Cette action est irréversible. Toutes les données associées à <strong>{project.name}</strong> seront définitivement supprimées de nos serveurs.
            </p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Veuillez saisir le nom du projet pour confirmer</label>
            <input 
              type="text" 
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder={project.name}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all font-bold text-center"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
