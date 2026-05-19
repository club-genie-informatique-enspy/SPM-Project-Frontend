"use client";

import { useState, use } from "react";
import {
  ChevronRight,
  MessageSquare,
  Plus,
  Send,
  MoreVertical,
  CheckCircle2,
  Calendar,
  Zap,
  Tag,
  ArrowLeft
} from "@/lib/icons";
import { projects, tasks as allTasks, users } from "@/lib/mock-data";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { useRouter } from "next/navigation";
import { TaskStatus, Priority } from "@/types";

export default function TaskDetailPage({ params }: { params: Promise<{ id: string; taskId: string }> }) {
  const router = useRouter();
  const { id, taskId } = use(params);
  const project = projects.find(p => p.id === id) || projects[0];
  const task = allTasks.find(t => t.id === taskId) || allTasks[0];
  const assignee = users.find(u => u.id === task.assigneeId) || users[0];

  const taskNumber = task.id.split("-").pop();
  const taskDisplayId = `${project.key}-${taskNumber}`;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [priority, setPriority] = useState<Priority>(task.priority);

  const mockSubtasks = [
    { title: "Préparer les mockups Figma", done: true },
    { title: "Valider les flux utilisateurs", done: true },
    { title: "Développement du prototype", done: false },
  ];

  const mockComments = [
    { author: "Marie Ngo",        time: "Il y a 2h",  text: "Est-ce que l'API est déjà prête pour cette partie ?" },
    { author: "Tagatsing Samuel", time: "Il y a 45m", text: "Oui, la doc est disponible dans les pièces jointes." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">
      {/* Breadcrumb */}
      <header className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Retour"
            className="hover:text-blue-600 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-1 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <Link href="/dashboard/projects" className="hover:text-blue-600 transition-colors">Projets</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/dashboard/projects/${project.id}/kanban`} className="hover:text-blue-600 transition-colors">{project.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-blue-600 font-bold">{taskDisplayId}</span>
        </div>
        <button type="button" aria-label="Plus d'options" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
          <MoreVertical className="w-4 h-4" />
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main content */}
        <div className="lg:w-[65%] p-6 lg:p-8 border-r border-gray-100 dark:border-gray-700 overflow-y-auto">
          {/* Status + Priority */}
          <div className="flex items-center gap-2 mb-5">
            <Badge variant={status} />
            <Badge variant={priority} />
            <span className="text-xs font-bold text-gray-300 dark:text-gray-600 ml-auto">{taskDisplayId}</span>
          </div>

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight w-full border-none focus:ring-0 mb-5 p-0 bg-transparent"
            placeholder="Titre de la tâche..."
          />

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Description</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-sm text-gray-600 dark:text-gray-300 leading-relaxed border border-gray-100 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 bg-gray-50 dark:bg-gray-700 resize-none min-h-[100px]"
              placeholder="Ajoutez une description détaillée..."
            />
          </div>

          {/* Subtasks */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Sous-tâches ({mockSubtasks.filter(s => s.done).length}/{mockSubtasks.length})
              </h3>
              <button type="button" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2 py-1 rounded-lg transition-all flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {mockSubtasks.map((sub, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all group cursor-pointer">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${sub.done ? "bg-blue-500 border-blue-500" : "border-gray-300 dark:border-gray-600 group-hover:border-blue-400"}`}>
                    {sub.done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-sm font-medium ${sub.done ? "text-gray-400 dark:text-gray-600 line-through" : "text-gray-800 dark:text-gray-200"}`}>{sub.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" />
              Commentaires
            </h3>
            <div className="space-y-5 mb-5">
              {mockComments.map((comment, idx) => (
                <div key={idx} className="flex gap-3">
                  <Avatar name={comment.author} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{comment.author}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">{comment.time}</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 p-3 rounded-xl rounded-tl-none text-sm text-gray-600 dark:text-gray-300">
                      {comment.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm">
              <Avatar name="Azangue Delmat" size="sm" />
              <input
                type="text"
                placeholder="Écrivez un commentaire..."
                className="flex-1 border-none focus:ring-0 text-sm bg-transparent"
              />
              <button type="button" aria-label="Envoyer le commentaire" className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 transition-all">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-[35%] bg-gray-50/50 dark:bg-gray-900/30 p-6 lg:p-8 border-t lg:border-t-0 border-gray-100 dark:border-gray-700">
          <div className="space-y-6">
            {/* Status */}
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">Statut</label>
              <select
                aria-label="Statut de la tâche"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="todo">À faire</option>
                <option value="in_progress">En cours</option>
                <option value="in_review">En revue</option>
                <option value="done">Terminé</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">Priorité</label>
              <select
                aria-label="Priorité de la tâche"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
                <option value="critical">Critique</option>
              </select>
            </div>

            {/* Assignee */}
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">Assigné à</label>
              <div className="flex items-center gap-2.5 p-2.5 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                <Avatar name={assignee.name} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{assignee.name}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">{assignee.email}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm divide-y divide-gray-50 dark:divide-gray-600">
              <div className="flex items-center gap-3 p-3">
                <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase">Échéance</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3">
                <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/30 rounded-lg flex items-center justify-center text-violet-500 dark:text-violet-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase">Story Points</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{task.storyPoints ?? "—"} pts</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3">
                <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-500 dark:text-orange-400 shrink-0">
                  <Tag className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-1">Étiquettes</p>
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map(t => (
                      <span key={t} className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded text-[10px] font-semibold">#{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="space-y-1.5 text-xs text-gray-400 dark:text-gray-500 px-1">
              <div className="flex justify-between">
                <span>Créé le</span>
                <span className="font-medium">{new Date(task.createdAt).toLocaleDateString("fr-FR")}</span>
              </div>
              <div className="flex justify-between">
                <span>Modifié le</span>
                <span className="font-medium">{new Date(task.updatedAt).toLocaleDateString("fr-FR")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
