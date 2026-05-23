"use client";

import { useState, useEffect } from "react";
import { X } from "@/lib/icons";
import { Task, TaskStatus, Priority, MemberResponse, adaptTask } from "@/types";
import { tasksApi } from "@/lib/api/tasks";
import Avatar from "./Avatar";

interface CreateTaskModalProps {
  projectId: string;
  projectKey: string;
  defaultStatus?: TaskStatus;
  members?: MemberResponse[];
  onClose: () => void;
  onCreate: (task: Task) => void;
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo:        "À faire",
  in_progress: "En cours",
  in_review:   "En revue",
  done:        "Terminé",
  blocked:     "Bloqué",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  low:      "Basse",
  medium:   "Moyenne",
  high:     "Haute",
  critical: "Critique",
};

export default function CreateTaskModal({
  projectId,
  projectKey,
  defaultStatus = "todo",
  members = [],
  onClose,
  onCreate,
}: CreateTaskModalProps) {
  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [status,      setStatus]      = useState<TaskStatus>(defaultStatus);
  const [priority,    setPriority]    = useState<Priority>("medium");
  const [assigneeId,  setAssigneeId]  = useState<number | null>(null);
  const [dueDate,     setDueDate]     = useState("");
  const [error,       setError]       = useState("");
  const [loading,     setLoading]     = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError("Le titre est obligatoire."); return; }

    setLoading(true);
    setError("");
    try {
      const taskResponse = await tasksApi.create(projectId, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        assigneeId: assigneeId ?? undefined,
        dueDate: dueDate || undefined,
      });
      onCreate(adaptTask(taskResponse));
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la création.");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-base font-black text-gray-900 dark:text-gray-100">Nouvelle tâche</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-0.5">{projectKey}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <p className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>
          )}

          {/* Title */}
          <div>
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1.5">
              Titre <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(""); }}
              placeholder="Ex : Implémenter l'authentification SSO"
              autoFocus
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez la tâche..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="task-status" className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1.5">Statut</label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {(Object.keys(STATUS_LABELS) as TaskStatus[]).map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="task-priority" className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1.5">Priorité</label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
                  <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignee — real members from API */}
          {members.length > 0 && (
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1.5">Assigné à</label>
              <div className="grid grid-cols-3 gap-2">
                {members.map((m) => (
                  <button
                    key={m.userId}
                    type="button"
                    onClick={() => setAssigneeId(assigneeId === m.userId ? null : m.userId)}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      assigneeId === m.userId
                        ? "border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <Avatar name={m.fullName} size="sm" className="shrink-0" />
                    <span className="truncate">{m.fullName.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Due date */}
          <div>
            <label htmlFor="task-due-date" className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1.5">Échéance</label>
            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              title="Date d'échéance"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSubmit as unknown as React.MouseEventHandler}
            disabled={loading}
            className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Création…" : "Créer la tâche"}
          </button>
        </div>
      </div>
    </div>
  );
}
