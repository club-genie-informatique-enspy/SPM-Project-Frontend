"use client";

import React, { useState } from "react";
import { 
  Camera,
  Mail,
  User,
  Shield,
  Key,
  Github,
  Chrome,
  Save,
  CheckCircle2,
  Trash2
} from "@/lib/icons";
import { users } from "@/lib/mock-data";
import Avatar from "@/components/ui/Avatar";

export default function ProfilePage() {
  const currentUser = users[0];
  const [activeTab, setActiveTab] = useState("info");
  const [formData, setFormData] = useState({
    name: currentUser.name,
    bio: "Product Designer passionné par la création d'outils collaboratifs.",
  });

  const sidebarTabs = [
    { id: "info", label: "Informations", icon: User },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "accounts", label: "Comptes liés", icon: Key },
  ];

  return (
    <div className="p-8 lg:p-12 h-screen overflow-hidden flex flex-col">
      <header className="mb-12 shrink-0">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Mon Profil</h1>
        <p className="text-gray-500 font-medium mt-1">Gérez vos informations personnelles et vos préférences.</p>
      </header>

      <div className="flex-1 flex overflow-hidden bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
        {/* Profile Sidebar */}
        <aside className="w-64 border-r border-gray-50 p-8 hidden md:block">
          <nav className="space-y-2">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-green-50 text-green-600 shadow-sm" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 relative flex flex-col">
          <div className="max-w-2xl w-full">
            {activeTab === "info" && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="relative group">
                    <Avatar name={currentUser.name} size="lg" className="w-32 h-32 ring-4 ring-green-50 shadow-xl" />
                    <button className="absolute bottom-0 right-0 p-2.5 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transition-all">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-black text-gray-900 mb-1">{currentUser.name}</h2>
                    <p className="text-gray-500 font-medium mb-4">{currentUser.email}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest">
                      <Shield className="w-3 h-3" />
                      {currentUser.role}
                    </div>
                  </div>
                </div>

                <div className="grid gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom complet</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="email" 
                        value={currentUser.email}
                        readOnly
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 text-gray-400 font-medium cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                    <textarea 
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all font-medium resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                  <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Changer le mot de passe</h3>
                  <div className="space-y-6">
                    <input 
                      type="password" 
                      placeholder="Mot de passe actuel"
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                    />
                    <input 
                      type="password" 
                      placeholder="Nouveau mot de passe"
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                    />
                    <input 
                      type="password" 
                      placeholder="Confirmer le nouveau mot de passe"
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "accounts" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between p-6 rounded-[2rem] border border-gray-100 hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                      <Chrome className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Google</p>
                      <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Connecté
                      </p>
                    </div>
                  </div>
                  <button className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">Déconnecter</button>
                </div>

                <div className="flex items-center justify-between p-6 rounded-[2rem] border border-gray-100 hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">GitHub</p>
                      <p className="text-xs text-gray-400 font-bold">Non connecté</p>
                    </div>
                  </div>
                  <button className="text-xs font-black text-green-600 uppercase tracking-widest hover:text-green-700 transition-colors">Connecter</button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto pt-12 flex justify-end">
            <button className="btn-primary py-3 px-12 flex items-center gap-2 shadow-xl">
              <Save className="w-5 h-5" />
              Sauvegarder les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
