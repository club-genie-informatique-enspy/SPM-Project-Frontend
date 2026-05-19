"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Lock, Globe } from "@/lib/icons";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    key: "",
    description: "",
    visibility: "private" as "public" | "private",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const key = name
      .split(" ")
      .map(word => word[0] ?? "")
      .join("")
      .toUpperCase()
      .slice(0, 4);
    setFormData(prev => ({ ...prev, name, key }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/projects");
  };

  return (
    <div className="p-6 lg:p-10 max-w-2xl">
      <nav className="flex items-center gap-2 text-sm font-semibold text-gray-400 dark:text-gray-500 mb-6">
        <Link href="/dashboard/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projets</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 dark:text-gray-100">Nouveau projet</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight mb-1">Créer un projet</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Définissez les bases de votre nouvelle collaboration.</p>
      </header>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Nom du projet <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm placeholder:text-gray-400"
                placeholder="Ex: Refonte du Site Web"
              />
            </div>
            <div>
              <label htmlFor="key" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Clé projet
              </label>
              <input
                id="key"
                type="text"
                required
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value.toUpperCase() })}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/20 text-sm"
                placeholder="RSW"
                maxLength={5}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="block w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm resize-none placeholder:text-gray-400"
              placeholder="Décrivez brièvement l'objectif de ce projet..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Visibilité</label>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, visibility: "private" })}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                  formData.visibility === "private"
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <div className={`p-1.5 rounded-lg mt-0.5 ${formData.visibility === "private" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}>
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Privé</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Seuls les membres invités peuvent voir ce projet.</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, visibility: "public" })}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                  formData.visibility === "public"
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <div className={`p-1.5 rounded-lg mt-0.5 ${formData.visibility === "public" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}>
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Public</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Tous les membres de l&apos;organisation peuvent voir ce projet.</p>
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <Link
              href="/dashboard/projects"
              className="px-5 py-2.5 rounded-lg font-semibold text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              Annuler
            </Link>
            <button type="submit" className="btn-primary py-2.5 px-6 text-sm">
              Créer le projet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
