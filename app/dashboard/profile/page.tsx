"use client";

import React, { useState } from "react";
import {
  Camera,
  Mail,
  User,
  Shield,
  Key,
  Github,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
} from "@/lib/icons";
import { Google } from "@/lib/icons";
import { users } from "@/lib/mock-data";
import Avatar from "@/components/ui/Avatar";

function getStrength(pwd: string): number {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8)            score++;
  if (pwd.length >= 12)           score++;
  if (/[A-Z]/.test(pwd))         score++;
  if (/[0-9]/.test(pwd))         score++;
  if (/[^A-Za-z0-9]/.test(pwd))  score++;
  return score;
}

const STRENGTH_COLORS = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-green-600"];
const STRENGTH_TEXT   = ["", "text-red-500", "text-orange-500", "text-yellow-600", "text-green-500", "text-green-600"];
const STRENGTH_LABELS = ["", "Très faible", "Faible", "Moyen", "Fort", "Très fort"];

export default function ProfilePage() {
  const currentUser = users[0];
  const [activeTab, setActiveTab] = useState("info");
  const [formData, setFormData] = useState({
    name: currentUser.name,
    bio: "Product Designer passionné par la création d'outils collaboratifs.",
  });
  const [showCurrent, setShowCurrent]   = useState(false);
  const [showNew, setShowNew]           = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [currentPwd, setCurrentPwd]     = useState("");
  const [newPwd, setNewPwd]             = useState("");
  const [confirmPwd, setConfirmPwd]     = useState("");

  const strength = getStrength(newPwd);
  const confirmTouched = confirmPwd.length > 0;
  const matches = newPwd === confirmPwd;

  const sidebarTabs = [
    { id: "info", label: "Informations", icon: User },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "accounts", label: "Comptes liés", icon: Key },
  ];

  return (
    <div className="p-8 lg:p-12 h-screen overflow-hidden flex flex-col">
      <header className="mb-12 shrink-0">
        <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Mon Profil</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Gérez vos informations personnelles et vos préférences.</p>
      </header>

      <div className="flex-1 flex overflow-hidden bg-white dark:bg-gray-800 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none">
        {/* Profile Sidebar */}
        <aside className="w-64 border-r border-gray-50 dark:border-gray-700 p-8 hidden md:block">
          <nav className="space-y-2">
            {sidebarTabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
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
                    <Avatar name={currentUser.name} size="lg" className="w-32 h-32 ring-4 ring-green-50 dark:ring-green-900/30 shadow-xl" />
                    <button type="button" aria-label="Changer la photo de profil" className="absolute bottom-0 right-0 p-2.5 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transition-all">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-1">{currentUser.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">{currentUser.email}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest">
                      <Shield className="w-3 h-3" />
                      {currentUser.role}
                    </div>
                  </div>
                </div>

                <div className="grid gap-8">
                  <div>
                    <label htmlFor="profile-name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nom complet</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="profile-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="profile-email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="profile-email"
                        type="email"
                        value={currentUser.email}
                        readOnly
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-400 dark:text-gray-500 font-medium cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="profile-bio" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                    <textarea
                      id="profile-bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="w-full p-4 rounded-2xl border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all font-medium resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-600">
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">Changer le mot de passe</h3>
                  <div className="space-y-5">

                    {/* Current password */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Mot de passe actuel</label>
                      <div className="relative">
                        <input
                          type={showCurrent ? "text" : "password"}
                          value={currentPwd}
                          onChange={(e) => setCurrentPwd(e.target.value)}
                          placeholder="••••••••"
                          aria-label="Mot de passe actuel"
                          className="w-full px-4 py-3.5 pr-12 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                        />
                        <button
                          type="button"
                          aria-label={showCurrent ? "Masquer" : "Afficher"}
                          onClick={() => setShowCurrent(!showCurrent)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* New password + strength */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Nouveau mot de passe</label>
                      <div className="relative">
                        <input
                          type={showNew ? "text" : "password"}
                          value={newPwd}
                          onChange={(e) => setNewPwd(e.target.value)}
                          placeholder="••••••••"
                          aria-label="Nouveau mot de passe"
                          className="w-full px-4 py-3.5 pr-12 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                        />
                        <button
                          type="button"
                          aria-label={showNew ? "Masquer" : "Afficher"}
                          onClick={() => setShowNew(!showNew)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {newPwd && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((lvl) => (
                              <div
                                key={lvl}
                                className={`h-1 flex-1 rounded-full transition-all ${lvl <= strength ? STRENGTH_COLORS[strength] : "bg-gray-200 dark:bg-gray-600"}`}
                              />
                            ))}
                          </div>
                          <p className={`text-xs font-semibold ${STRENGTH_TEXT[strength]}`}>
                            {STRENGTH_LABELS[strength]}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Confirm password + match indicator */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Confirmer le nouveau mot de passe</label>
                      <div className="relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          value={confirmPwd}
                          onChange={(e) => setConfirmPwd(e.target.value)}
                          placeholder="••••••••"
                          aria-label="Confirmer le nouveau mot de passe"
                          className={`w-full px-4 py-3.5 pr-12 rounded-2xl border focus:outline-none transition-all placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                            confirmTouched
                              ? matches
                                ? "border-green-400 focus:ring-2 focus:ring-green-500"
                                : "border-red-400 focus:ring-2 focus:ring-red-400"
                              : "border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500"
                          }`}
                        />
                        <button
                          type="button"
                          aria-label={showConfirm ? "Masquer" : "Afficher"}
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {confirmTouched && (
                        <p className={`mt-1.5 text-xs font-semibold ${matches ? "text-green-500" : "text-red-500"}`}>
                          {matches ? "✓ Les mots de passe correspondent" : "✗ Les mots de passe ne correspondent pas"}
                        </p>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            )}

            {activeTab === "accounts" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <Google className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-gray-100">Google</p>
                      <p className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Connecté
                      </p>
                    </div>
                  </div>
                  <button type="button" className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest hover:text-red-500 transition-colors">Déconnecter</button>
                </div>

                <div className="flex items-center justify-between p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 dark:bg-gray-600 text-white rounded-2xl flex items-center justify-center">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-gray-100">GitHub</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-bold">Non connecté</p>
                    </div>
                  </div>
                  <button type="button" className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-widest hover:text-green-700 dark:hover:text-green-300 transition-colors">Connecter</button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto pt-12 flex justify-end">
            <button type="button" className="btn-primary py-3 px-12 flex items-center gap-2 shadow-xl">
              <Save className="w-5 h-5" />
              Sauvegarder les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
