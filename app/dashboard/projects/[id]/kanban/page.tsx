"use client";

import { useState, use } from "react";
import {
  Plus,
  Search,
  GanttChartSquare,
  Trello,
  Users,
  Settings,
  ChevronRight
} from "@/lib/icons";
import { projects, tasks as allTasks } from "@/lib/mock-data";
import TaskCard from "@/components/ui/TaskCard";
import TaskDetailModal from "@/components/ui/TaskDetailModal";
import Link from "next/link";
import { TaskStatus, Task } from "@/types";

const COLUMN_COLORS: Record<TaskStatus, string> = {
  todo:        "bg-gray-400",
  in_progress: "bg-blue-500",
  in_review:   "bg-violet-500",
  done:        "bg-green-500",
  blocked:     "bg-red-500",
};

export default function KanbanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find(p => p.id === id) || projects[0];
  const [tasks, setTasks] = useState<Task[]>(allTasks.filter(t => t.projectId === project.id));
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const columns: { title: string; status: TaskStatus }[] = [
    { title: "À faire",  status: "todo" },
    { title: "En cours", status: "in_progress" },
    { title: "En revue", status: "in_review" },
    { title: "Terminé",  status: "done" },
  ];

  const onDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = (e: React.DragEvent, status: TaskStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const tabs = [
    { name: "Kanban",     href: `/dashboard/projects/${project.id}/kanban`,   icon: Trello,          active: true },
    { name: "Gantt",      href: `/dashboard/projects/${project.id}/gantt`,    icon: GanttChartSquare },
    { name: "Membres",    href: `/dashboard/projects/${project.id}/members`,  icon: Users },
    { name: "Paramètres", href: `/dashboard/projects/${project.id}/settings`, icon: Settings },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Project Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 pt-5 shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 mb-4">
          <Link href="/dashboard/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projets</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-700 dark:text-gray-300">{project.name}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
              {project.key[0]}
            </div>
            <div>
              <h1 className="text-base font-black text-gray-900 dark:text-gray-100">{project.name}</h1>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{project.key} · {project.visibility === "public" ? "Public" : "Privé"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" aria-label="Rechercher" className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all">
              <Search className="w-4 h-4" />
            </button>
            <button type="button" className="btn-primary py-1.5 px-4 text-sm flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Nouvelle tâche
            </button>
          </div>
        </div>

        {/* Tabs */}
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

      {/* Kanban Board */}
      <main className="flex-1 overflow-x-auto bg-[#f4f5f7] dark:bg-gray-900 p-6">
        <div className="flex gap-4 h-full min-w-max">
          {columns.map((column) => {
            const columnTasks = tasks.filter(t => t.status === column.status);
            return (
              <div
                key={column.status}
                className="w-72 flex flex-col"
                onDrop={(e) => onDrop(e, column.status)}
                onDragOver={onDragOver}
              >
                {/* Column header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${COLUMN_COLORS[column.status]}`} />
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">{column.title}</span>
                    <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button type="button" aria-label="Ajouter une tâche" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Column body */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5 pb-4">
                  {columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDragStart={onDragStart}
                      onClick={setSelectedTask}
                    />
                  ))}

                  <button
                    type="button"
                    className="w-full py-2.5 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 text-xs font-semibold hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Ajouter une tâche
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}
