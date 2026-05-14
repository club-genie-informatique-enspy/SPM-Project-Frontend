"use client";

import React from "react";
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
import { Task, Project, User } from "@/types";

export default function GanttPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id) || projects[0];
  const projectTasks = allTasks.filter(t => t.projectId === project.id);

  const tabs = [
    { name: "Kanban", href: `/dashboard/projects/${project.id}/kanban`, icon: Trello },
    { name: "Gantt", href: `/dashboard/projects/${project.id}/gantt`, icon: GanttChartSquare, active: true },
    { name: "Membres", href: `/dashboard/projects/${project.id}/members`, icon: Users },
    { name: "Paramètres", href: `/dashboard/projects/${project.id}/settings`, icon: Settings },
  ];

  // Mock days for the timeline
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2026, 4, i + 1);
    return {
      day: date.getDate(),
      weekday: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
      isToday: i + 1 === 12 // Simulated today
    };
  });

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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Timeline Gantt</h1>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-gray-500 font-bold text-sm border border-gray-100">
            <Calendar className="w-4 h-4" />
            Mai 2026
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

      {/* Gantt View Content */}
      <main className="flex-1 overflow-hidden flex bg-white">
        {/* Left Side: Tasks List */}
        <div className="w-[350px] border-r border-gray-100 flex flex-col shrink-0">
          <div className="h-16 border-b border-gray-100 flex items-center px-6 shrink-0 bg-gray-50/50">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Tâches</span>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {projectTasks.map((task: Task) => (
              <div key={task.id} className="h-16 border-b border-gray-100 flex items-center px-6 gap-3 group hover:bg-gray-50 transition-colors">
                <div className={`w-1 h-8 rounded-full ${
                  task.status === 'done' ? 'bg-green-500' : 
                  task.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate group-hover:text-green-600 transition-colors">{task.title}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                    {users.find(u => u.id === task.assigneeId)?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Timeline */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar">
          <div className="min-w-max h-full flex flex-col">
            {/* Timeline Header */}
            <div className="h-16 border-b border-gray-100 flex shrink-0 bg-gray-50/50">
              {days.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`w-12 border-r border-gray-100 flex flex-col items-center justify-center relative ${day.isToday ? 'bg-green-50/50' : ''}`}
                >
                  <span className={`text-[10px] font-black ${day.isToday ? 'text-green-600' : 'text-gray-400'}`}>{day.weekday}</span>
                  <span className={`text-sm font-black ${day.isToday ? 'text-green-600' : 'text-gray-900'}`}>{day.day}</span>
                  {day.isToday && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-[1000px] bg-red-500 z-10 opacity-50" />}
                </div>
              ))}
            </div>

            {/* Timeline Bars */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
              {projectTasks.map((task: Task, taskIdx: number) => {
                // Simulated random start/end dates for the demo
                const startDay = (taskIdx * 2) % 20;
                const duration = 3 + (taskIdx % 5);
                
                return (
                  <div key={task.id} className="h-16 border-b border-gray-100 relative group hover:bg-gray-50/30 transition-colors">
                    <div 
                      className={`absolute top-1/2 -translate-y-1/2 h-8 rounded-full border shadow-sm cursor-pointer hover:scale-[1.02] transition-all flex items-center px-4 group/bar ${
                        task.status === 'done' ? 'bg-green-100 border-green-200 text-green-700' : 
                        task.status === 'in_progress' ? 'bg-blue-100 border-blue-200 text-blue-700' : 
                        'bg-gray-100 border-gray-200 text-gray-700'
                      }`}
                      style={{ 
                        left: `${startDay * 48 + 12}px`, 
                        width: `${duration * 48 - 24}px` 
                      }}
                    >
                      <span className="text-[10px] font-black truncate">{task.title}</span>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white p-3 rounded-2xl shadow-xl text-xs min-w-[200px] opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-all z-20">
                        <p className="font-bold mb-1">{task.title}</p>
                        <div className="flex justify-between items-center mb-2">
                           <Badge variant={task.status as any} className="scale-75 origin-left" />
                           <span className="text-gray-400 text-[10px]">6 - 12 Mai</span>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                           <Avatar name={users.find(u => u.id === task.assigneeId)?.name || ""} size="sm" />
                           <span className="font-medium text-gray-300">{users.find(u => u.id === task.assigneeId)?.name}</span>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
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
      <footer className="p-4 border-t border-gray-100 bg-white flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-[10px] font-bold text-gray-500 uppercase">Terminé</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-[10px] font-bold text-gray-500 uppercase">En cours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full" />
          <span className="text-[10px] font-bold text-gray-500 uppercase">À faire</span>
        </div>
      </footer>
    </div>
  );
}
