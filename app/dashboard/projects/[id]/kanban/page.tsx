"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  ChevronRight,
  GanttChartSquare,
  Trello,
  Users,
  Settings
} from "@/lib/icons";
import { projects, tasks as allTasks } from "@/lib/mock-data";
import TaskCard from "@/components/ui/TaskCard";
import Link from "next/link";
import { TaskStatus, Task, Project } from "@/types";

export default function KanbanPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id) || projects[0];
  const [tasks, setTasks] = useState<Task[]>(allTasks.filter(t => t.projectId === project.id));

  const columns: { title: string; status: TaskStatus }[] = [
    { title: "À faire", status: "todo" },
    { title: "En cours", status: "in_progress" },
    { title: "En revue", status: "in_review" },
    { title: "Terminé", status: "done" },
  ];

  const onDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = (e: React.DragEvent, status: TaskStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const tabs = [
    { name: "Kanban", href: `/dashboard/projects/${project.id}/kanban`, icon: Trello, active: true },
    { name: "Gantt", href: `/dashboard/projects/${project.id}/gantt`, icon: GanttChartSquare },
    { name: "Membres", href: `/dashboard/projects/${project.id}/members`, icon: Users },
    { name: "Paramètres", href: `/dashboard/projects/${project.id}/settings`, icon: Settings },
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
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">
              {project.key[0]}
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">{project.name}</h1>
              <p className="text-sm text-gray-500 font-medium">{project.key} • {project.visibility === 'public' ? 'Public' : 'Privé'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="p-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-all text-gray-500">
               <Search className="w-5 h-5" />
             </button>
             <button className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2">
               <Plus className="w-4 h-4" />
               Nouvelle tâche
             </button>
          </div>
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

      {/* Kanban Board */}
      <main className="flex-1 overflow-x-auto bg-[#f9fafb] p-8">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map((column) => {
            const columnTasks = tasks.filter(t => t.status === column.status);
            return (
              <div 
                key={column.status}
                className="w-80 flex flex-col h-full"
                onDrop={(e) => onDrop(e, column.status)}
                onDragOver={onDragOver}
              >
                <div className="flex items-center justify-between mb-6 shrink-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">{column.title}</h3>
                    <span className="bg-white border border-gray-100 px-2.5 py-0.5 rounded-full text-[10px] font-black text-gray-400 shadow-sm">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button className="p-1 rounded-md hover:bg-gray-200 text-gray-400 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                  {columnTasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onDragStart={onDragStart}
                    />
                  ))}
                  
                  <button className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 text-xs font-bold hover:border-green-300 hover:text-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2 group">
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    Ajouter une tâche
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
