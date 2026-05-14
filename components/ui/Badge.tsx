import React from "react";

type BadgeVariant =
  | "todo" | "in_progress" | "in_review" | "done" | "blocked"
  | "critical" | "high" | "medium" | "low"
  | "owner" | "admin" | "write" | "read"
  | "active" | "draft" | "archived"
  | "pending";

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant, label, className = "" }) => {
  const variants: Record<BadgeVariant, string> = {
    todo: "bg-gray-100 text-gray-700 border-gray-200",
    in_progress: "bg-blue-100 text-blue-700 border-blue-200",
    in_review: "bg-purple-100 text-purple-700 border-purple-200",
    done: "bg-green-100 text-green-700 border-green-200",
    blocked: "bg-red-100 text-red-700 border-red-200",
    critical: "bg-red-500 text-white border-red-600",
    high: "bg-orange-500 text-white border-orange-600",
    medium: "bg-blue-500 text-white border-blue-600",
    low: "bg-gray-400 text-white border-gray-500",
    owner: "bg-purple-600 text-white border-purple-700",
    admin: "bg-red-600 text-white border-red-700",
    write: "bg-blue-600 text-white border-blue-700",
    read: "bg-gray-500 text-white border-gray-600",
    active: "bg-green-100 text-green-700 border-green-200",
    draft: "bg-gray-100 text-gray-600 border-gray-200",
    archived: "bg-orange-100 text-orange-700 border-orange-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  const displayText = label || variant.replace("_", " ").toUpperCase();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {displayText}
    </span>
  );
};

export default Badge;
