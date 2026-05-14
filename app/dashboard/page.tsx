"use client";

import React from "react";
import { 
  Folder, 
  Clock, 
  CheckCircle, 
  Users,
  Search,
  Plus
} from "@/lib/icons";
import ProjectCard from "@/components/ui/ProjectCard";
import TaskCard from "@/components/ui/TaskCard";
import { projects, tasks, users } from "@/lib/mock-data";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Task } from "@/types";

export default function DashboardPage() {
  const stats = [
    { label: "Projets actifs", value: "2", icon: Folder, color: "bg-green-50 text-green-600" },
    { label: "Tâches en cours", value: "5", icon: Clock, color: "bg-orange-50 text-orange-600" },
    { label: "Tâches terminées", value: "8", icon: CheckCircle, color: "bg-blue-50 text-blue-600" },
    { label: "Membres d'équipe", value: "5", icon: Users, color: "bg-purple-50 text-purple-600" },
  ];

  const recentProjects = projects.slice(0, 3);
  const recentTasks = tasks.filter(t => t.assigneeId === "user-1").slice(0, 4);

  return (
    <div className="p-8 lg:p-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <p className="text-gray-400 font-bold mb-1 uppercase tracking-widest text-xs">Tableau de bord</p>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Bonjour, Azangue Delmat 👋</h1>
          <p className="text-gray-500 font-medium">Mardi 12 Mai 2026</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher une tâche..." 
              className="bg-white border border-gray-100 rounded-2xl py-2.5 pl-11 pr-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <Link href="/dashboard/projects/new" className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nouveau projet
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Projets récents</h2>
            <Link href="/dashboard/projects" className="text-sm font-bold text-green-600 hover:underline">Voir tout</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Mes tâches</h2>
            <Link href="/dashboard/tasks" className="text-sm font-bold text-green-600 hover:underline">Voir tout</Link>
          </div>
          <div className="space-y-4">
            {recentTasks.map((task: Task) => (
              <div 
                key={task.id} 
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={task.priority} className="scale-75 origin-left" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{projects.find(p => p.id === task.projectId)?.key}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{task.title}</h4>
                <div className="flex items-center justify-between">
                   <Badge variant={task.status} />
                   <span className="text-[10px] text-gray-400 font-medium">
                     {new Date(task.dueDate || "").toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' })}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
