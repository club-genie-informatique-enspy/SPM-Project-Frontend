"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers, ArrowLeft, Send, CheckCircle2, Eye, EyeOff } from "@/lib/icons";

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="bg-green-600 p-1.5 rounded-xl">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-black text-gray-900 tracking-tighter">SPM</span>
        </Link>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          {step === 1 ? "Réinitialiser" : step === 2 ? "Nouveau mot de passe" : "Succès"}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {step === 1 
            ? "Saisissez votre email pour recevoir un lien" 
            : step === 2 
            ? "Choisissez un mot de passe sécurisé" 
            : "Votre mot de passe a été réinitialisé"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl shadow-gray-200/50 rounded-[2.5rem] border border-gray-100">
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleStep1}>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="nom@exemple.com"
                />
              </div>

              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                Envoyer le lien
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleStep2}>
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Réinitialiser le mot de passe
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>
              <p className="text-gray-600 mb-8 font-medium">
                Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </p>
              <Link href="/auth/login" className="w-full btn-primary inline-block">
                Retour à la connexion
              </Link>
            </div>
          )}

          {step < 3 && (
            <div className="mt-8 flex justify-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à la connexion
              </Link>
            </div>
          )}
        </div>
        
        {/* Step Indicator */}
        {step < 3 && (
          <div className="mt-8 flex justify-center gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? "w-8 bg-green-600" : "w-4 bg-gray-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
