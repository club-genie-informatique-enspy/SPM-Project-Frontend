import React from "react";

type BadgeVariant =
  | "todo" | "in_progress" | "in_review" | "done" | "blocked"
  | "critical" | "high" | "medium" | "low"
  | "owner" | "admin" | "write" | "read" | "user"
  | "active" | "draft" | "archived"
  | "pending";

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant, label, className = "" }) => {
  const variants: Record<BadgeVariant, string> = {
    todo:        "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600",
    in_progress: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    in_review:   "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800",
    done:        "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
    blocked:     "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
    critical:    "bg-red-500 text-white border-red-600",
    high:        "bg-orange-500 text-white border-orange-600",
    medium:      "bg-blue-500 text-white border-blue-600",
    low:         "bg-slate-400 text-white border-slate-500",
    owner:       "bg-violet-600 text-white border-violet-700",
    admin:       "bg-red-600 text-white border-red-700",
    write:       "bg-blue-600 text-white border-blue-700",
    read:        "bg-slate-500 text-white border-slate-600",
    user:        "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600",
    active:      "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
    draft:       "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600",
    archived:    "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    pending:     "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  };

  const labels: Partial<Record<BadgeVariant, string>> = {
    todo:        "À faire",
    in_progress: "En cours",
    in_review:   "En revue",
    done:        "Terminé",
    blocked:     "Bloqué",
    active:      "Actif",
    draft:       "Brouillon",
    archived:    "Archivé",
    pending:     "En attente",
    owner:       "Propriétaire",
    admin:       "Admin",
    write:       "Écriture",
    read:        "Lecture",
    user:        "Utilisateur",
    critical:    "Critique",
    high:        "Haute",
    medium:      "Moyenne",
    low:         "Basse",
  };

  const displayText = label || labels[variant] || variant.replace("_", " ").toUpperCase();

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${variants[variant]} ${className}`}>
      {displayText}
    </span>
  );
};

export default Badge;
