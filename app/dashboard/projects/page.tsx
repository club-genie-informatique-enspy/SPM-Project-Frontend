"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter,
  FolderOpen
} from "@/lib/icons";
import ProjectCard from "@/components/ui/ProjectCard";
import EmptyState from "@/components/ui/EmptyState";
import { projects as allProjects } from "@/lib/mock-data";
import Link from "next/link";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 lg:p-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Mes Projets</h1>
          <p className="text-gray-500 font-medium mt-1">Gérez et suivez l'avancement de vos travaux.</p>
        </div>
        
        <Link href="/dashboard/projects/new" className="btn-primary py-3 px-8 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Créer un projet
        </Link>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher un projet..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border border-gray-100 rounded-2xl py-3 pl-11 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="bg-white border border-gray-100 rounded-2xl p-1 flex shadow-sm">
            <button 
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${statusFilter === "all" ? "bg-green-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}
            >
              Tous
            </button>
            <button 
              onClick={() => setStatusFilter("active")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${statusFilter === "active" ? "bg-green-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}
            >
              Actifs
            </button>
            <button 
              onClick={() => setStatusFilter("draft")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${statusFilter === "draft" ? "bg-green-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}
            >
              Brouillons
            </button>
          </div>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={FolderOpen}
          title="Aucun projet trouvé"
          description="Il semble que vous n'ayez aucun projet correspondant à vos critères de recherche."
          actionLabel="Créer un nouveau projet"
          onAction={() => window.location.href = "/dashboard/projects/new"}
        />
      )}
    </div>
  );
}
