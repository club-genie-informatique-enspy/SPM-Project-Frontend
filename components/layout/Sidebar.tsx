"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Layers,
  ShieldCheck,
  Sun,
  Moon,
} from "@/lib/icons";
import Avatar from "../ui/Avatar";
import { users } from "@/lib/mock-data";
import { useTheme } from "@/components/ThemeProvider";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentUser = users[0];
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Mes Projets",     icon: FolderKanban,   href: "/dashboard/projects" },
    { name: "Notifications",   icon: Bell,            href: "/dashboard/notifications", badge: 3 },
    { name: "Profil",          icon: User,            href: "/dashboard/profile" },
  ];

  const adminItems = [
    { name: "Administration", icon: ShieldCheck, href: "/dashboard/admin" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`relative h-screen bg-[#1d2125] transition-all duration-300 flex flex-col shrink-0 ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10">
        <div className="bg-blue-500 p-1.5 rounded-lg shrink-0">
          <Layers className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="text-base font-black text-white tracking-tight">SPM</span>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-[52px] bg-[#1d2125] border border-white/20 rounded-full p-1 shadow-md hover:bg-[#282e33] transition-colors z-10"
      >
        {isCollapsed
          ? <ChevronRight className="w-3 h-3 text-gray-400" />
          : <ChevronLeft className="w-3 h-3 text-gray-400" />
        }
      </button>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {!isCollapsed && (
          <p className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Menu</p>
        )}
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                active
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${active ? "text-blue-400" : "text-gray-400 group-hover:text-gray-200"}`} />
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {isCollapsed && item.badge && (
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Link>
          );
        })}

        {currentUser.role === "admin" && (
          <>
            {!isCollapsed && (
              <p className="px-3 mt-6 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Admin</p>
            )}
            {isCollapsed && <div className="my-3 mx-2 border-t border-white/10" />}
            {adminItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                    active
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={`w-4 h-4 shrink-0 ${active ? "text-blue-400" : "text-gray-400 group-hover:text-gray-200"}`} />
                  {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Theme toggle */}
      <div className="px-2 pb-1">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Basculer le thème"
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors ${isCollapsed ? "justify-center" : ""}`}
        >
          {theme === "dark"
            ? <Sun className="w-4 h-4 shrink-0" />
            : <Moon className="w-4 h-4 shrink-0" />
          }
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {theme === "dark" ? "Mode clair" : "Mode sombre"}
            </span>
          )}
        </button>
      </div>

      {/* User */}
      <div className="px-2 py-3 border-t border-white/10">
        <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group ${isCollapsed ? "justify-center" : ""}`}>
          <Avatar name={currentUser.name} size="sm" className="shrink-0" />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-200 truncate">{currentUser.name}</p>
              <p className="text-[10px] font-medium text-gray-500 truncate">{currentUser.email}</p>
            </div>
          )}
          {!isCollapsed && (
            <button type="button" className="text-gray-500 hover:text-red-400 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
