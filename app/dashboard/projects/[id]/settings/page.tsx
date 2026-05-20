"use client";

import { useState, use } from "react";
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  GanttChartSquare,
  Globe,
  Trello,
  Users,
  Settings,
  ShieldAlert,
  Archive,
  Trash2,
  Save,
  Tag
} from "@/lib/icons";
import { projects, tasks, users as allUsers } from "@/lib/mock-data";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";

export default function ProjectSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find(p => p.id === id) || projects[0];
  const [activeSection, setActiveSection] = useState("general");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  const projectTabs = [
    { name: "Kanban",     href: `/dashboard/projects/${project.id}/kanban`,   icon: Trello },
    { name: "Gantt",      href: `/dashboard/projects/${project.id}/gantt`,    icon: GanttChartSquare },
    { name: "Membres",    href: `/dashboard/projects/${project.id}/members`,  icon: Users },
    { name: "Paramètres", href: `/dashboard/projects/${project.id}/settings`, icon: Settings, active: true },
  ];

  const sections = [
    { id: "general", label: "Général",         icon: Settings },
    { id: "workflow", label: "Workflow",       icon: Trello },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "danger",  label: "Zone de danger",  icon: ShieldAlert },
  ];

  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  const completedTasks = projectTasks.filter((task) => task.status === "done").length;
  const owner = allUsers.find((user) => user.id === project.ownerId) ?? allUsers[0];
  const updatedAt = new Date(project.updatedAt).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const completion = projectTasks.length > 0
    ? Math.round((completedTasks / projectTasks.length) * 100)
    : 0;

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
          <h1 className="text-base font-black text-gray-900 dark:text-gray-100">Paramètres du projet</h1>
          <button type="button" className="btn-primary py-1.5 px-4 text-sm flex items-center gap-1.5">
            <Save className="w-3.5 h-3.5" />
            Enregistrer
          </button>
        </div>

        <div className="flex items-center gap-0 overflow-x-auto">
          {projectTabs.map((tab) => (
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

      <main className="flex-1 flex overflow-hidden bg-[#f4f5f7] dark:bg-gray-900">
        {/* Settings sidebar */}
        <aside className="w-52 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hidden md:block">
          <nav className="space-y-1">
            {sections.map((sec) => (
              <button
                type="button"
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeSection === sec.id
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200"
                } ${sec.id === "danger" ? "mt-4" : ""}`}
              >
                <sec.icon className="w-4 h-4" />
                {sec.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl grid xl:grid-cols-[minmax(0,1fr)_320px] gap-6">
            <div className="space-y-5">
            {activeSection === "general" ? (
              <>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-5 uppercase tracking-wide">Informations de base</h3>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Nom du projet</label>
                        <input
                          type="text"
                          defaultValue={project.name}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Clé</label>
                        <input
                          type="text"
                          defaultValue={project.key}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/20 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Description</label>
                      <textarea
                        defaultValue={project.description}
                        rows={3}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-5 uppercase tracking-wide">Préférences</h3>
                  <div className="space-y-3">
                  <label className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Visibilité publique</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Tout le monde dans l&apos;organisation peut voir ce projet.</p>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative p-0.5 shadow-inner transition-colors shrink-0 ${project.visibility === "public" ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-600"}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${project.visibility === "public" ? "translate-x-5" : "translate-x-0"}`} />
                    </div>
                  </label>
                  <label className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Autoriser les invitations membres</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Les administrateurs du projet peuvent inviter de nouveaux collaborateurs.</p>
                    </div>
                    <div className="w-10 h-5 rounded-full relative p-0.5 shadow-inner transition-colors bg-blue-500 shrink-0">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md transition-transform translate-x-5" />
                    </div>
                  </label>
                  </div>
                </div>
              </>
            ) : activeSection === "workflow" ? (
              <>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-5 uppercase tracking-wide">Colonnes du tableau</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      ["À faire", "Les tâches prêtes à être prises en charge."],
                      ["En cours", "Le travail actif de l'équipe."],
                      ["En revue", "Les tâches en validation."],
                      ["Terminé", "Les livraisons finalisées."],
                    ].map(([name, description]) => (
                      <div key={name} className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40">
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-5 uppercase tracking-wide">Règles de travail</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Limite tâches en cours</label>
                      <input
                        type="number"
                        defaultValue={5}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                      />
                    </div>
                    <label className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Bloquer les tâches sans responsable</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Empêche le passage en cours si personne n&apos;est assigné.</p>
                      </div>
                      <div className="w-10 h-5 rounded-full relative p-0.5 shadow-inner transition-colors bg-gray-200 dark:bg-gray-600 shrink-0">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transition-transform" />
                      </div>
                    </label>
                  </div>
                </div>
              </>
            ) : activeSection === "notifications" ? (
              <>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-5 uppercase tracking-wide">Notifications projet</h3>
                  <div className="space-y-3">
                    {[
                      ["Commentaires et mentions", "Prévenir les membres lorsqu'ils sont mentionnés."],
                      ["Changement de statut", "Notifier l'équipe quand une tâche change de colonne."],
                      ["Échéances proches", "Envoyer un rappel avant les dates limites."],
                    ].map(([name, description], index) => (
                      <label key={name} className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{description}</p>
                        </div>
                        <div className={`w-10 h-5 rounded-full relative p-0.5 shadow-inner transition-colors shrink-0 ${index < 2 ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-600"}`}>
                          <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${index < 2 ? "translate-x-5" : "translate-x-0"}`} />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-5 uppercase tracking-wide">Email de synthèse</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Fréquence</label>
                      <select className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm">
                        <option>Chaque semaine</option>
                        <option>Chaque jour</option>
                        <option>Désactivé</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Jour d&apos;envoi</label>
                      <select className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm">
                        <option>Lundi</option>
                        <option>Vendredi</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-red-50/50 p-6 rounded-xl border border-red-200 border-dashed">
                <h3 className="text-sm font-black text-red-600 mb-5 uppercase tracking-wide">Actions irréversibles</h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-red-100 dark:border-red-900/50 shadow-sm">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Archiver le projet</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Le projet passera en lecture seule pour tous les membres.</p>
                    </div>
                    <button type="button" className="px-4 py-2 rounded-lg border border-orange-200 text-orange-600 font-semibold hover:bg-orange-50 transition-all text-sm flex items-center gap-1.5 shrink-0">
                      <Archive className="w-4 h-4" />
                      Archiver
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-red-100 dark:border-red-900/50 shadow-sm">
                    <div>
                      <p className="text-sm font-bold text-red-600 dark:text-red-400">Supprimer définitivement</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Toutes les tâches, membres et données seront supprimés.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all text-sm shadow-sm flex items-center gap-1.5 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>

            <aside className="space-y-5">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Résumé</p>
                    <h3 className="text-base font-black text-gray-900 dark:text-gray-100 mt-1">{project.name}</h3>
                  </div>
                  <Badge variant={project.status} />
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Avancement</span>
                      <span className="text-xs font-black text-blue-600 dark:text-blue-400">{completion}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${completion}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-2" />
                      <p className="text-lg font-black text-gray-900 dark:text-gray-100">{projectTasks.length}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tâches</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-2" />
                      <p className="text-lg font-black text-gray-900 dark:text-gray-100">{project.members.length}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Membres</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400">Visibilité</span>
                      <span className="ml-auto font-semibold text-gray-900 dark:text-gray-100 capitalize">{project.visibility}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400">Responsable</span>
                      <span className="ml-auto font-semibold text-gray-900 dark:text-gray-100">{owner.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400">Mis à jour</span>
                      <span className="ml-auto font-semibold text-gray-900 dark:text-gray-100">{updatedAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wide">Accès rapides</h3>
                <div className="space-y-2">
                  {[
                    { label: "Tableau Kanban", href: `/dashboard/projects/${project.id}/kanban`, icon: Trello },
                    { label: "Planning Gantt", href: `/dashboard/projects/${project.id}/gantt`, icon: Clock },
                    { label: "Membres du projet", href: `/dashboard/projects/${project.id}/members`, icon: Users },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                    >
                      <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      {item.label}
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wide">Tags actifs</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(projectTasks.flatMap((task) => task.tags))).slice(0, 6).map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Supprimer le projet ?"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-5 py-2 rounded-lg font-semibold text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              Annuler
            </button>
            <button
              type="button"
              disabled={confirmName !== project.name}
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-red-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Confirmer la suppression
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg flex gap-3 text-red-600 dark:text-red-400">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">
              Cette action est irréversible. Toutes les données associées à <strong>{project.name}</strong> seront définitivement supprimées.
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Saisissez <strong>{project.name}</strong> pour confirmer</label>
            <input
              type="text"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder={project.name}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all text-sm font-semibold placeholder:text-gray-400"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
