"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layers } from "@/lib/icons";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-green-600 p-1.5 rounded-xl group-hover:rotate-12 transition-transform">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tighter">SPM</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors">
            Fonctionnalités
          </Link>
          <Link href="#testimonials" className="text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors">
            Avis
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="hidden sm:block text-sm font-bold text-gray-900 px-6 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Se connecter
          </Link>
          <Link
            href="/auth/register"
            className="text-sm font-bold text-white bg-green-600 px-6 py-2.5 rounded-full hover:bg-green-700 shadow-md shadow-green-100 transition-all active:scale-95"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
