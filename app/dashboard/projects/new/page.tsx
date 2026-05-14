"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Layout,
  Lock,
  Globe,
  ArrowLeft
} from "@/lib/icons";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    key: "",
    description: "",
    visibility: "private" as "public" | "private",
  });

  // Auto-generate key from name
  useEffect(() => {
    if (formData.name) {
      const generatedKey = formData.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 4);
      setFormData(prev => ({ ...prev, key: generatedKey }));
    }
  }, [formData.name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate creation
    router.push("/dashboard/projects");
  };

  return (
    <div className="p-8 lg:p-12 max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-8">
        <Link href="/dashboard/projects" className="hover:text-green-600 transition-colors">Projets</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Nouveau projet</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Créer un projet</h1>
        <p className="text-gray-500 font-medium">Définissez les bases de votre nouvelle collaboration.</p>
      </header>

      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                Nom du projet *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
                placeholder="Ex: Refonte du Site Web"
              />
            </div>
            <div>
              <label htmlFor="key" className="block text-sm font-bold text-gray-700 mb-2">
                Clé
              </label>
              <input
                id="key"
                type="text"
                required
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value.toUpperCase() })}
                className="block w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-bold text-green-600 bg-green-50/30"
                placeholder="Ex: RSW"
                maxLength={5}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="block w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium resize-none"
              placeholder="Décrivez brièvement l'objectif de ce projet..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4">Visibilité</label>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, visibility: "private" })}
                className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                  formData.visibility === "private" 
                    ? "border-green-500 bg-green-50/50" 
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`p-2 rounded-xl ${formData.visibility === "private" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Privé</p>
                  <p className="text-xs text-gray-500 mt-1">Seuls les membres invités peuvent voir ce projet.</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, visibility: "public" })}
                className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                  formData.visibility === "public" 
                    ? "border-green-500 bg-green-50/50" 
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`p-2 rounded-xl ${formData.visibility === "public" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Public</p>
                  <p className="text-xs text-gray-500 mt-1">Tous les membres de l'organisation peuvent voir ce projet.</p>
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
            <Link 
              href="/dashboard/projects"
              className="px-8 py-3 rounded-full font-bold text-gray-500 hover:bg-gray-50 transition-all"
            >
              Annuler
            </Link>
            <button
              type="submit"
              className="btn-primary"
            >
              Créer le projet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
