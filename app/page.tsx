import React from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { 
  Trello, 
  BarChart3, 
  Calendar, 
  Layout, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Layers
} from "@/lib/icons";
import Avatar from "@/components/ui/Avatar";

export const metadata = {
  title: "SPM - Accueil",
};

export default function LandingPage() {
  const features = [
    {
      title: "Tableaux Kanban",
      desc: "Organiser vos tâches par statuts, priorités et gérez le flux de travail visuellement.",
      icon: Trello,
    },
    {
      title: "Tableaux Gantt",
      desc: "Planifier vos projets dans le temps et visualisez les dépendances entre les tâches.",
      icon: BarChart3,
    },
    {
      title: "Calendrier Partagé",
      desc: "Visualiser les deadlines, les sprints et les évènements importants de votre équipe.",
      icon: Calendar,
    },
    {
      title: "Tableau de bord",
      desc: "Suivez la charge de travail, l'avancement des projets et les métriques clés.",
      icon: Layout,
    },
  ];

  const testimonials = [
    {
      quote: "SPM a radicalement simplifié notre suivi de projet. On gagne au moins 2 heures par semaine sur la coordination.",
      author: "Azangue Delmat",
      role: "Chef de Projet",
      avatar: "AD",
    },
    {
      quote: "SPM allie la simplicité du Kanban au quotidien de l'équipe et la puissance du Gantt pour le comité de direction.",
      author: "Negou Donald",
      role: "Lead Developer",
      avatar: "ND",
    },
    {
      quote: "La vue Gantt est interactive, on ajuste les durées par glisser-déposer, et le Kanban se met à jour automatiquement.",
      author: "Tagatsing Samuel",
      role: "Product Owner",
      avatar: "TS",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-600 text-sm font-bold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Nouvelle génération
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-tight animate-fade-in delay-100">
            La gestion de projet plus <br />
            <span className="text-green-600">fluide et collaborative</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 animate-fade-in delay-200">
            SPM vous aide à organiser vos tâches, suivre l'avancement et fédérer vos équipes - le tout dans une interface pensée pour l'efficacité.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in delay-300">
            <Link href="/auth/register" className="btn-primary w-full sm:w-auto">
              Commencer maintenant
            </Link>
            <Link href="#features" className="btn-outline w-full sm:w-auto">
              Voir les fonctionnalités
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 text-gray-400 animate-fade-in delay-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-bold">+10k Équipes actives</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-bold">98% Clients satisfaits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-bold">4.9 Sur G2</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#f9fafb]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-black text-green-600 mb-6 tracking-tight">
              Des outils pensés pour une équipe agile
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour livrer plus vite, sans chaos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="card p-8 group hover:-translate-y-2">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-black text-green-600 mb-6 tracking-tight">
              Ils font confiance à SPM
            </h2>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="card p-8 relative">
                <div className="text-6xl text-green-100 font-serif absolute top-6 left-6 -z-0">"</div>
                <p className="text-gray-600 mb-8 relative z-10 italic leading-relaxed">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  <Avatar name={t.author} />
                  <div>
                    <h4 className="font-bold text-gray-900">{t.author}</h4>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="container mx-auto bg-gray-900 rounded-[3rem] p-12 lg:p-24 text-center overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 blur-[120px] rounded-full" />
          </div>

          <h2 className="text-3xl lg:text-6xl font-black text-white mb-8 tracking-tight relative z-10">
            Prêt à piloter vos projets <br /> sereinement ?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 relative z-10">
            Rejoignez des milliers d'équipes qui livrent plus vite avec SPM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/auth/register" className="btn-primary w-full sm:w-auto">
              S'inscrire gratuitement
            </Link>
            <Link href="#features" className="text-white font-bold px-8 py-3 rounded-full border-2 border-white/20 hover:bg-white/10 transition-all flex items-center gap-2 group">
              Voir la démo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-1 rounded-lg">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tighter">SPM</span>
            <span className="text-sm text-gray-400 ml-4">© 2026 - Tous droits réservés</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="#features" className="text-sm font-bold text-gray-500 hover:text-green-600 transition-colors">
              Fonctionnalités
            </Link>
            <Link href="/privacy" className="text-sm font-bold text-gray-500 hover:text-green-600 transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms" className="text-sm font-bold text-gray-500 hover:text-green-600 transition-colors">
              CGU
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
