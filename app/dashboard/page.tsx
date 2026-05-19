"use client";

import {
  Folder,
  Clock,
  CheckCircle,
  Users,
  Search,
  Plus
} from "@/lib/icons";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects, tasks, users } from "@/lib/mock-data";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Task } from "@/types";

export default function DashboardPage() {
  const activeProjects = projects.filter(p => p.status === "active").length;
  const inProgressTasks = tasks.filter(t => t.status === "in_progress").length;
  const doneTasks = tasks.filter(t => t.status === "done").length;
  const totalMembers = users.length;

  const stats = [
    { label: "Projets actifs",    value: String(activeProjects), icon: Folder,      color: "bg-blue-50 text-blue-600" },
    { label: "Tâches en cours",   value: String(inProgressTasks), icon: Clock,      color: "bg-orange-50 text-orange-600" },
    { label: "Tâches terminées",  value: String(doneTasks),       icon: CheckCircle, color: "bg-green-50 text-green-600" },
    { label: "Membres d'équipe",  value: String(totalMembers),    icon: Users,       color: "bg-purple-50 text-purple-600" },
  ];

  const recentProjects = projects.slice(0, 3);
  const myTasks = tasks.filter(t => t.assigneeId === "user-1").slice(0, 5);

  return (
    <div className="p-6 lg:p-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-gray-400 dark:text-gray-500 font-bold mb-0.5 uppercase tracking-widest text-[10px]">Tableau de bord</p>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Bonjour, Azangue Delmat 👋</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Lundi 19 Mai 2026</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une tâche..."
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg py-2 pl-9 pr-4 w-56 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>
          <Link href="/dashboard/projects/new" className="btn-primary py-2 px-4 text-sm flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            Nouveau projet
          </Link>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3 hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">{stat.label}</p>
              <p className="text-xl font-black text-gray-900 dark:text-gray-100">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-gray-900 dark:text-gray-100 uppercase tracking-wide">Projets récents</h2>
            <Link href="/dashboard/projects" className="text-xs font-bold text-blue-600 hover:underline">Voir tout</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* My tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-gray-900 dark:text-gray-100 uppercase tracking-wide">Mes tâches</h2>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500">{myTasks.length} tâches</span>
          </div>
          <div className="space-y-2">
            {myTasks.map((task: Task) => {
              const proj = projects.find(p => p.id === task.projectId);
              const taskNum = task.id.split("-").pop();
              const taskId = proj ? `${proj.key}-${taskNum}` : taskNum;
              return (
                <div
                  key={task.id}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 border-l-4 border-l-blue-400 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">{taskId}</span>
                    <Badge variant={task.priority} />
                  </div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {task.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant={task.status} />
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                      {new Date(task.dueDate || "").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
