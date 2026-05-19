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
  Layers,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Zap,
} from "@/lib/icons";
import Avatar from "@/components/ui/Avatar";

export const metadata = {
  title: "SPM - Accueil",
};

export default function LandingPage() {
  const features = [
    {
      title: "Tableaux Kanban",
      desc: "Organisez vos tâches par statuts, priorités et gérez le flux de travail visuellement.",
      icon: Trello,
    },
    {
      title: "Tableaux Gantt",
      desc: "Planifiez vos projets dans le temps et visualisez les dépendances entre les tâches.",
      icon: BarChart3,
    },
    {
      title: "Calendrier Partagé",
      desc: "Visualisez les deadlines, les sprints et les évènements importants de votre équipe.",
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
    },
    {
      quote: "SPM allie la simplicité du Kanban au quotidien de l'équipe et la puissance du Gantt pour le comité de direction.",
      author: "Negou Donald",
      role: "Lead Developer",
    },
    {
      quote: "La vue Gantt est interactive, on ajuste les durées par glisser-déposer, et le Kanban se met à jour automatiquement.",
      author: "Tagatsing Samuel",
      role: "Product Owner",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 text-sm font-bold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Nouvelle génération
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 mb-8 tracking-tighter leading-tight animate-fade-in delay-100">
            La gestion de projet plus <br />
            <span className="text-green-600 dark:text-green-400">fluide et collaborative</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in delay-200">
            SPM vous aide à organiser vos tâches, suivre l&apos;avancement et fédérer vos équipes — le tout dans une interface pensée pour l&apos;efficacité.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in delay-300">
            <Link href="/auth/register" className="btn-primary w-full sm:w-auto">
              Commencer maintenant
            </Link>
            <Link href="#features" className="btn-outline w-full sm:w-auto">
              Voir les fonctionnalités
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 text-gray-400 dark:text-gray-500 animate-fade-in delay-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-bold text-gray-600 dark:text-gray-400">+10k Équipes actives</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-bold text-gray-600 dark:text-gray-400">98% Clients satisfaits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-bold text-gray-600 dark:text-gray-400">4.9 Sur G2</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-[#f9fafb] dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-black text-green-600 dark:text-green-400 mb-6 tracking-tight">
              Des outils pensés pour une équipe agile
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour livrer plus vite, sans chaos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="card p-8 group hover:-translate-y-2">
                <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-black text-green-600 dark:text-green-400 mb-6 tracking-tight">
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
                <div className="text-6xl text-green-100 dark:text-green-900/50 font-serif absolute top-6 left-6 -z-0">&quot;</div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 relative z-10 italic leading-relaxed">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  <Avatar name={t.author} />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">{t.author}</h4>
                    <p className="text-sm text-gray-400 dark:text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto bg-gray-900 dark:bg-gray-800 rounded-[3rem] p-12 lg:p-24 text-center overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 blur-[120px] rounded-full" />
          </div>

          <h2 className="text-3xl lg:text-6xl font-black text-white mb-8 tracking-tight relative z-10">
            Prêt à piloter vos projets <br /> sereinement ?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 relative z-10">
            Rejoignez des milliers d&apos;équipes qui livrent plus vite avec SPM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/auth/register" className="btn-primary w-full sm:w-auto">
              S&apos;inscrire gratuitement
            </Link>
            <Link href="#features" className="text-white font-bold px-8 py-3 rounded-full border-2 border-white/20 hover:bg-white/10 transition-all flex items-center gap-2 group">
              Voir la démo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 dark:bg-gray-950 text-gray-400">
        {/* Main grid */}
        <div className="container mx-auto px-6 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

            {/* Brand column — takes 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="bg-green-600 p-1.5 rounded-xl group-hover:bg-green-500 transition-colors">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black text-white tracking-tighter">SPM</span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                La plateforme de gestion de projet agile pensée pour les équipes qui livrent vite, sans chaos.
              </p>
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold text-green-400">Tous les systèmes opérationnels</span>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/club-genie-informatique-enspy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="mailto:contact@spm-enspy.cm"
                  aria-label="Email"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Produit */}
            <div className="space-y-5">
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Produit</h3>
              <ul className="space-y-3">
                {[
                  { label: "Tableaux Kanban", href: "#features" },
                  { label: "Diagrammes Gantt", href: "#features" },
                  { label: "Calendrier partagé", href: "#features" },
                  { label: "Tableau de bord", href: "#features" },
                  { label: "Notifications", href: "/dashboard/notifications" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors font-medium">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ressources */}
            <div className="space-y-5">
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Ressources</h3>
              <ul className="space-y-3">
                {[
                  { label: "Documentation", href: "#" },
                  { label: "Centre d'aide", href: "#" },
                  { label: "Changelog", href: "#" },
                  { label: "Roadmap", href: "#" },
                  { label: "API", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors font-medium">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entreprise */}
            <div className="space-y-5">
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Entreprise</h3>
              <ul className="space-y-3">
                {[
                  { label: "À propos", href: "#" },
                  { label: "Blog", href: "#" },
                  { label: "Carrières", href: "#" },
                  { label: "Contact", href: "#" },
                  { label: "Presse", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors font-medium">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-16 pt-10 border-t border-white/5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h3 className="text-sm font-black text-white mb-1">Restez informé</h3>
                <p className="text-xs text-gray-500">Recevez les nouveautés SPM directement dans votre boîte.</p>
              </div>
              <form className="flex items-center gap-2 w-full lg:w-auto" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1 lg:w-72">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    placeholder="votre@email.com"
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
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <Zap className="w-3.5 h-3.5 text-green-600" />
              <span>Conçu avec passion par le</span>
              <span className="font-bold text-gray-400">Club Génie Informatique — ENSPY</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-xs text-gray-600 hover:text-gray-400 transition-colors font-medium">
                CGU
              </Link>
              <Link href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors font-medium">
                Confidentialité
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Globe className="w-3.5 h-3.5" />
                <span>Français</span>
              </div>
              <span className="text-xs text-gray-600">© 2026 SPM</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
