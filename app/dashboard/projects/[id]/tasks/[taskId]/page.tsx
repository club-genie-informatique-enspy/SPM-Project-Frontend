"use client";

import React, { useState } from "react";
import { 
  ChevronRight,
  Clock,
  MessageSquare,
  Paperclip,
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
import { Task, Project, User } from "@/types";

export default function TaskDetailPage({ params }: { params: { id: string, taskId: string } }) {
  const router = useRouter();
  const project = projects.find(p => p.id === params.id) || projects[0];
  const task = allTasks.find(t => t.id === params.taskId) || allTasks[0];
  const assignee = users.find(u => u.id === task.assigneeId) || users[0];

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Breadcrumb / Header */}
      <header className="p-8 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
          <button onClick={() => router.back()} className="hover:text-green-600 p-2 rounded-full hover:bg-gray-50 mr-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Link href="/dashboard/projects" className="hover:text-green-600 transition-colors">Projets</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/dashboard/projects/${project.id}/kanban`} className="hover:text-green-600 transition-colors">{project.name}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{task.id.split('-').pop()}</span>
        </div>
        <button className="p-2.5 rounded-full hover:bg-gray-50 text-gray-500">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main Content (65%) */}
        <div className="lg:w-[65%] p-8 lg:p-12 border-r border-gray-100 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
          <div className="flex items-center gap-3 mb-8">
            <Badge variant={status as any} />
            <Badge variant={priority as any} />
          </div>

          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight w-full border-none focus:ring-0 mb-8 p-0 bg-transparent placeholder:text-gray-200"
            placeholder="Titre de la tâche..."
          />

          <div className="mb-12">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Description</h3>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-lg text-gray-600 leading-relaxed border-none focus:ring-0 p-0 bg-transparent resize-none min-h-[150px] placeholder:text-gray-200"
              placeholder="Ajoutez une description détaillée..."
            />
          </div>

          {/* Subtasks */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Sous-tâches (2/3)</h3>
              <button className="text-sm font-bold text-green-600 hover:bg-green-50 px-3 py-1 rounded-lg transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>
            <div className="space-y-3">
              {[
                { title: "Préparer les mockups Figma", done: true },
                { title: "Valider les flux utilisateurs", done: true },
                { title: "Développement du prototype", done: false },
              ].map((sub, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all group">
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${sub.done ? 'bg-green-600 border-green-600' : 'border-gray-200 group-hover:border-green-400'}`}>
                    {sub.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`font-medium ${sub.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{sub.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="mb-12">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Commentaires</h3>
            <div className="space-y-8 mb-8">
              {[
                { author: "Marie Ngo", time: "Il y a 2h", text: "Est-ce que l'API est déjà prête pour cette partie ?" },
                { author: "Tagatsing Samuel", time: "Il y a 45m", text: "Oui, la doc est disponible dans les pièces jointes." },
              ].map((comment, idx) => (
                <div key={idx} className="flex gap-4">
                  <Avatar name={comment.author} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{comment.author}</span>
                      <span className="text-[10px] text-gray-400 font-bold">{comment.time}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none text-gray-600 text-sm">
                      {comment.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 p-4 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
               <Avatar name="Azangue Delmat" />
               <input 
                 type="text" 
                 placeholder="Écrivez un commentaire..." 
                 className="flex-1 border-none focus:ring-0 text-sm font-medium"
               />
               <button className="bg-green-600 p-2.5 rounded-full text-white shadow-md shadow-green-100 hover:bg-green-700 transition-all">
                 <Send className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>

        {/* Sidebar (35%) */}
        <div className="lg:w-[35%] bg-gray-50/50 p-8 lg:p-12 overflow-y-auto">
          <div className="space-y-8 sticky top-0">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-4">Statut</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              >
                <option value="todo">À faire</option>
                <option value="in_progress">En cours</option>
                <option value="in_review">En revue</option>
                <option value="done">Terminé</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-4">Priorité</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              >
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
                <option value="critical">Critique</option>
              </select>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Échéance</p>
                  <p className="text-sm font-bold text-gray-900">15 Mai 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Story Points</p>
                  <p className="text-sm font-bold text-gray-900">5 Points</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Tag className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Étiquettes</p>
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map(t => (
                      <span key={t} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px] font-bold">#{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-medium text-gray-400 px-2">
                <span>Créé le</span>
                <span>01 Jan 2026</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-gray-400 px-2">
                <span>Modifié le</span>
                <span>Il y a 2 heures</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
