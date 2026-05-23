"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers, Eye, EyeOff, Github } from "@/lib/icons";
import { Google } from "@/lib/icons";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

function getStrength(pwd: string): number {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8)             score++;
  if (pwd.length >= 12)            score++;
  if (/[A-Z]/.test(pwd))          score++;
  if (/[0-9]/.test(pwd))          score++;
  if (/[^A-Za-z0-9]/.test(pwd))   score++;
  return score;
}

const STRENGTH_LABELS = ["", "Très faible", "Faible", "Moyen", "Fort", "Très fort"];
const STRENGTH_COLORS = [
  "",
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-green-600",
];
const STRENGTH_TEXT = [
  "",
  "text-red-500",
  "text-orange-500",
  "text-yellow-600",
  "text-green-500",
  "text-green-600",
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const strength = getStrength(formData.password);
  const confirmTouched = formData.confirmPassword.length > 0;
  const matches = formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!matches) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.post("/api/auth/register", {
        email: formData.email,
        password: formData.password,
        nom: formData.name,
      });

      router.push(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (err: unknown) {
      console.error("Register error:", err);
      setError(err instanceof Error ? err.message : "Échec de l'inscription. L'utilisateur existe peut-être déjà.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-gray-900 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="bg-green-600 p-1.5 rounded-xl">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tighter">SPM</span>
        </Link>
        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Créer un compte</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Rejoignez des milliers d&apos;équipes agiles
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-10 px-8 shadow-2xl shadow-gray-200/50 dark:shadow-none rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
                placeholder="Ex: Azangue Delmat"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
                placeholder="nom@exemple.com"
              />
            </div>

            {/* Password with strength meter */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  placeholder="••••••••"
                  minLength={8}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Strength bar */}
              {formData.password && (
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

            {/* Confirm password with match indicator */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`block w-full px-4 py-3 pr-12 rounded-2xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    confirmTouched
                      ? matches
                        ? "border-green-400 focus:ring-green-500"
                        : "border-red-400 focus:ring-red-400"
                      : "border-gray-200 dark:border-gray-600 focus:ring-green-500"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  aria-label={showConfirm ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowConfirm(!showConfirm)}
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

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-500 dark:text-gray-400">
                  J&apos;accepte les{" "}
                  <Link href="/terms" className="font-bold text-green-600 hover:text-green-700">
                    conditions d&apos;utilisation
                  </Link>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Création..." : "Créer mon compte"}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-400 font-medium">ou s&apos;inscrire avec</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button type="button" className="flex justify-center items-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <Google className="w-5 h-5" />
                Google
              </button>
              <button type="button" className="flex justify-center items-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <Github className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                GitHub
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Déjà un compte ?{" "}
          <Link href="/auth/login" className="font-bold text-green-600 hover:text-green-700">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
