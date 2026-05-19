"use client";

import { useState, useEffect } from "react";
import {
  X,
  MessageSquare,
  Plus,
  Send,
  MoreVertical,
  CheckCircle2,
  Calendar,
  Zap,
  Tag,
} from "@/lib/icons";
import { projects, users } from "@/lib/mock-data";
import Avatar from "./Avatar";
import Badge from "./Badge";
import { Task, TaskStatus, Priority } from "@/types";

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

const mockSubtasks = [
  { title: "Préparer les mockups Figma", done: true },
  { title: "Valider les flux utilisateurs", done: true },
  { title: "Développement du prototype", done: false },
];

const mockComments = [
  { author: "Marie Ngo",        time: "Il y a 2h",  text: "Est-ce que l'API est déjà prête pour cette partie ?" },
  { author: "Tagatsing Samuel", time: "Il y a 45m", text: "Oui, la doc est disponible dans les pièces jointes." },
];

export default function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  const project    = projects.find((p) => p.id === task.projectId) || projects[0];
  const assignee   = users.find((u) => u.id === task.assigneeId)   || users[0];
  const taskNumber = task.id.split("-").pop();
  const taskDisplayId = `${project.key}-${taskNumber}`;

  const [title,       setTitle]    = useState(task.title);
  const [description, setDesc]     = useState(task.description);
  const [status,      setStatus]   = useState<TaskStatus>(task.status);
  const [priority,    setPriority] = useState<Priority>(task.priority);

  /* close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-100 dark:border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-2">
            <Badge variant={status} />
            <Badge variant={priority} />
            <span className="text-xs font-bold text-gray-300 dark:text-gray-600 ml-2">{taskDisplayId}</span>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Plus d'options" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal body — scrollable two-column layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

          {/* Left: main content */}
          <div className="lg:w-[62%] p-6 border-r border-gray-100 dark:border-gray-700 overflow-y-auto">
            {/* Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight w-full border-none focus:ring-0 mb-5 p-0 bg-transparent"
              placeholder="Titre de la tâche..."
            />

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Description</h3>
              <textarea
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full text-sm text-gray-600 dark:text-gray-300 leading-relaxed border border-gray-100 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 bg-gray-50 dark:bg-gray-700 resize-none min-h-[100px]"
                placeholder="Ajoutez une description détaillée..."
              />
            </div>

            {/* Subtasks */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  Sous-tâches ({mockSubtasks.filter((s) => s.done).length}/{mockSubtasks.length})
                </h3>
                <button type="button" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2 py-1 rounded-lg transition-all flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Ajouter
                </button>
              </div>
              <div className="space-y-2">
                {mockSubtasks.map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all cursor-pointer">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${sub.done ? "bg-blue-500 border-blue-500" : "border-gray-300 dark:border-gray-600"}`}>
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
                <MessageSquare className="w-3.5 h-3.5" /> Commentaires
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
                  className="flex-1 border-none focus:ring-0 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                />
                <button type="button" aria-label="Envoyer le commentaire" className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 transition-all">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="lg:w-[38%] bg-gray-50/50 dark:bg-gray-900/30 p-6 border-t lg:border-t-0 border-gray-100 dark:border-gray-700 overflow-y-auto">
            <div className="space-y-6">
              {/* Status */}
              <div>
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">Statut</label>
                <select
                  aria-label="Statut"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  aria-label="Priorité"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              {/* Details card */}
              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm divide-y divide-gray-50 dark:divide-gray-600">
                <div className="flex items-center gap-3 p-3">
                  <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-500 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase">Échéance</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
                        : "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3">
                  <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/30 rounded-lg flex items-center justify-center text-violet-500 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase">Story Points</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{task.storyPoints ?? "—"} pts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3">
                  <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-500 shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-1">Étiquettes</p>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((t) => (
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
    </div>
  );
}
