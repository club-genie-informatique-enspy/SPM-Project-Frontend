"use client";

import { useState } from "react";
import { Mail } from "@/lib/icons";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-sm font-semibold text-green-400">
        ✓ Merci ! Vous recevrez nos prochaines nouveautés.
      </p>
    );
  }

  return (
    <form className="flex items-center gap-2 w-full lg:w-auto" onSubmit={handleSubmit}>
      <div className="relative flex-1 lg:w-72">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap"
      >
        S&apos;abonner
      </button>
    </form>
  );
}
