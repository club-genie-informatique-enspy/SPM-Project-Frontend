"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { Layers, CheckCircle } from "@/lib/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/api-client";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  // Handle countdown for resending code
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    // Keep only the last character entered
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Automatically focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to focus previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp(newOtp);
    inputRefs.current[5]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const code = otp.join("");
    if (code.length < 6) {
      setError("Veuillez saisir le code complet à 6 chiffres.");
      return;
    }

    if (!email) {
      setError("Adresse e-mail manquante.");
      return;
    }

    setIsLoading(true);

    try {
      // POST /api/auth/verify-otp?email=...&code=...
      await apiClient.post("/api/auth/verify-otp", null, {
        params: {
          email,
          code,
        },
      });

      setSuccess("Votre compte a été activé avec succès ! Redirection vers la page de connexion...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err: unknown) {
      console.error("OTP verification error:", err);
      setError(err instanceof Error ? err.message : "Le code saisi est invalide ou expiré.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || isResending) return;
    setError("");
    setSuccess("");
    setIsResending(true);

    try {
      // POST /api/auth/resend-activation?email=...
      await apiClient.post("/api/auth/resend-activation", null, {
        params: { email },
      });

      setSuccess("Un nouveau code d'activation a été envoyé à votre adresse e-mail.");
      setResendTimer(60); // disable button for 60 seconds
    } catch (err: unknown) {
      console.error("OTP resend error:", err);
      setError(err instanceof Error ? err.message : "Impossible de renvoyer le code. Veuillez réessayer.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 py-10 px-8 shadow-2xl shadow-gray-200/50 dark:shadow-none rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-600 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {!email && (
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Confirmez votre adresse email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
              placeholder="nom@exemple.com"
            />
          </div>
        )}

        {email && (
          <div className="text-center text-sm text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-700">
            Un e-mail de validation a été envoyé à :<br />
            <strong className="text-gray-900 dark:text-white font-bold">{email}</strong>
          </div>
        )}

        <div>
          <label className="block text-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
            Saisissez le code à 6 chiffres
          </label>
          
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={idx === 0 ? handlePaste : undefined}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full btn-primary h-12 flex items-center justify-center font-bold text-base transition-all duration-200 hover:scale-[1.01]"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Vérification...
              </span>
            ) : (
              "Activer mon compte"
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Vous n&apos;avez pas reçu le code ?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendTimer > 0 || isResending}
            className={`font-bold text-green-600 hover:text-green-700 focus:outline-none transition-all ${
              (resendTimer > 0 || isResending) && "opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-500 hover:text-gray-400"
            }`}
          >
            {isResending ? "Renvoi..." : resendTimer > 0 ? `Renvoyer (${resendTimer}s)` : "Renvoyer un code"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-gray-900 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="bg-green-600 p-1.5 rounded-xl">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tighter">SPM</span>
        </Link>
        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Vérification du compte</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Entrez le code OTP reçu par e-mail pour finaliser votre inscription
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={
          <div className="bg-white dark:bg-gray-800 py-10 px-8 shadow-2xl rounded-[2.5rem] border border-gray-100 dark:border-gray-700 text-center text-gray-500">
            Chargement...
          </div>
        }>
          <VerifyOtpContent />
        </Suspense>
      </div>
    </div>
  );
}
