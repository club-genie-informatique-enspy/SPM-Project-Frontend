"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Bell,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Layers,
  ShieldCheck,
} from "@/lib/icons";
import Avatar from "../ui/Avatar";
import { users } from "@/lib/mock-data";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentUser = users[0]; // Simulated current user

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Mes Projets", icon: FolderKanban, href: "/dashboard/projects" },
    { name: "Notifications", icon: Bell, href: "/dashboard/notifications", badge: 3 },
    { name: "Profil", icon: User, href: "/dashboard/profile" },
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
      className={`relative h-screen bg-white border-r border-gray-100 transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded-xl">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tighter">SPM</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="bg-green-600 p-1.5 rounded-xl mx-auto">
            <Layers className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white border border-gray-100 rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <nav className="flex-1 px-4 mt-6 space-y-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-2xl transition-all group ${
                active
                  ? "bg-green-50 text-green-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-400 group-hover:text-gray-900"}`} />
              {!isCollapsed && <span className="text-sm font-bold">{item.name}</span>}
              {!isCollapsed && item.badge && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {isCollapsed && item.badge && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Link>
          );
        })}

        {currentUser.role === "admin" && (
          <>
            <div className={`mt-8 mb-2 px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest ${isCollapsed ? "text-center" : ""}`}>
              {isCollapsed ? "•••" : "Admin"}
            </div>
            {adminItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-2xl transition-all group ${
                    active
                      ? "bg-green-50 text-green-600 shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-400 group-hover:text-gray-900"}`} />
                  {!isCollapsed && <span className="text-sm font-bold">{item.name}</span>}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className={`flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group ${isCollapsed ? "justify-center" : ""}`}>
          <Avatar name={currentUser.name} size="sm" />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-[10px] font-medium text-gray-400 truncate">{currentUser.email}</p>
            </div>
          )}
          {!isCollapsed && (
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
