"use client";

import { use } from "react";
import {
  ChevronRight,
  GanttChartSquare,
  Trello,
  Users,
  Settings,
  Calendar
} from "@/lib/icons";
import { projects, tasks as allTasks, users } from "@/lib/mock-data";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { Task } from "@/types";

export default function GanttPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find(p => p.id === id) || projects[0];
  const projectTasks = allTasks.filter(t => t.projectId === project.id);

  const tabs = [
    { name: "Kanban",     href: `/dashboard/projects/${project.id}/kanban`,   icon: Trello },
    { name: "Gantt",      href: `/dashboard/projects/${project.id}/gantt`,    icon: GanttChartSquare, active: true },
    { name: "Membres",    href: `/dashboard/projects/${project.id}/members`,  icon: Users },
    { name: "Paramètres", href: `/dashboard/projects/${project.id}/settings`, icon: Settings },
  ];

  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2026, 4, i + 1);
    return {
      day: date.getDate(),
      weekday: date.toLocaleDateString("fr-FR", { weekday: "short" }),
      isToday: i + 1 === 19,
    };
  });

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
          <h1 className="text-base font-black text-gray-900 dark:text-gray-100">Timeline · {project.name}</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 font-semibold text-xs border border-gray-200 dark:border-gray-600">
            <Calendar className="w-3.5 h-3.5" />
            Mai 2026
          </div>
        </div>

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

      {/* Gantt Content */}
      <main className="flex-1 overflow-hidden flex bg-white dark:bg-gray-800">
        {/* Left: Task list */}
        <div className="w-72 border-r border-gray-200 dark:border-gray-700 flex flex-col shrink-0">
          <div className="h-12 border-b border-gray-100 dark:border-gray-700 flex items-center px-5 shrink-0 bg-gray-50 dark:bg-gray-700/50">
            <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Tâches</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {projectTasks.map((task: Task) => (
              <div key={task.id} className="h-12 border-b border-gray-100 dark:border-gray-700 flex items-center px-4 gap-2.5 group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className={`w-1 h-6 rounded-full shrink-0 ${
                  task.status === "done"        ? "bg-green-500" :
                  task.status === "in_progress" ? "bg-blue-500"  :
                  task.status === "in_review"   ? "bg-violet-500" : "bg-gray-300"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{task.title}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                    {users.find(u => u.id === task.assigneeId)?.name ?? "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="min-w-max h-full flex flex-col">
            {/* Timeline header */}
            <div className="h-12 border-b border-gray-100 dark:border-gray-700 flex shrink-0 bg-gray-50 dark:bg-gray-700/50">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className={`w-10 border-r border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center relative ${day.isToday ? "bg-blue-50 dark:bg-blue-900/30" : ""}`}
                >
                  <span className={`text-[9px] font-bold ${day.isToday ? "text-blue-600" : "text-gray-400 dark:text-gray-500"}`}>{day.weekday}</span>
                  <span className={`text-xs font-black ${day.isToday ? "text-blue-600" : "text-gray-700 dark:text-gray-300"}`}>{day.day}</span>
                  {day.isToday && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[2000px] bg-blue-400 z-10 opacity-40" />}
                </div>
              ))}
            </div>

            {/* Bars */}
            <div className="flex-1 overflow-y-auto relative">
              {projectTasks.map((task: Task, taskIdx: number) => {
                const startDay = (taskIdx * 2) % 20;
                const duration = 3 + (taskIdx % 5);
                const assignee = users.find(u => u.id === task.assigneeId);

                return (
                  <div key={task.id} className="h-12 border-b border-gray-100 dark:border-gray-700 relative group hover:bg-gray-50/30 dark:hover:bg-gray-700/30 transition-colors">
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 h-6 rounded cursor-pointer hover:brightness-95 transition-all flex items-center px-2.5 gap-1.5 group/bar ${
                        task.status === "done"        ? "bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400" :
                        task.status === "in_progress" ? "bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400"   :
                        task.status === "in_review"   ? "bg-violet-100 dark:bg-violet-900/40 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400" :
                        "bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                      }`}
                      style={{ left: `${startDay * 40 + 8}px`, width: `${duration * 40 - 16}px` }}
                    >
                      {assignee && <Avatar name={assignee.name} size="sm" className="w-4 h-4 text-[8px] shrink-0" />}
                      <span className="text-[10px] font-bold truncate">{task.title}</span>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white p-3 rounded-xl shadow-xl text-xs min-w-[180px] opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-all z-20">
                        <p className="font-bold mb-1.5">{task.title}</p>
                        <div className="flex items-center justify-between mb-1.5">
                          <Badge variant={task.status} />
                          <Badge variant={task.priority} />
                        </div>
                        {assignee && (
                          <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/10">
                            <Avatar name={assignee.name} size="sm" />
                            <span className="text-gray-300 text-[10px]">{assignee.name}</span>
                          </div>
                        )}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Legend */}
      <footer className="px-6 py-3 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-6">
        {[
          { color: "bg-green-500",  label: "Terminé" },
          { color: "bg-blue-500",   label: "En cours" },
          { color: "bg-violet-500", label: "En revue" },
          { color: "bg-gray-300",   label: "À faire" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 ${color} rounded-sm`} />
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">{label}</span>
          </div>
        ))}
      </footer>
    </div>
  );
}
