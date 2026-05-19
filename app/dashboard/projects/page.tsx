"use client";

import { useState } from "react";
import { Plus, Search } from "@/lib/icons";
import ProjectCard from "@/components/ui/ProjectCard";
import EmptyState from "@/components/ui/EmptyState";
import { projects as allProjects } from "@/lib/mock-data";
import Link from "next/link";
import { FolderOpen } from "@/lib/icons";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 lg:p-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Mes Projets</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">Gérez et suivez l&apos;avancement de vos travaux.</p>
        </div>

        <Link href="/dashboard/projects/new" className="btn-primary py-2 px-5 flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Créer un projet
        </Link>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative flex-1 w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg py-2 pl-9 pr-4 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm placeholder:text-gray-400"
          />
        </div>
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {[
            { value: "all",      label: "Tous" },
            { value: "active",   label: "Actifs" },
            { value: "draft",    label: "Brouillons" },
            { value: "archived", label: "Archivés" },
          ].map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                statusFilter === opt.value
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          onAction={() => { window.location.href = "/dashboard/projects/new"; }}
        />
      )}
    </div>
  );
}
