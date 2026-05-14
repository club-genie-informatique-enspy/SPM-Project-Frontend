"use client";

import React from "react";
import { Folder, Users, MoreHorizontal, ArrowRight } from "@/lib/icons";
import { Project } from "@/types";
import Badge from "./Badge";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import { users as allUsers } from "@/lib/mock-data";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();
  
  const members = project.members
    .map((m) => allUsers.find((u) => u.id === m.userId))
    .filter(Boolean)
    .slice(0, 4);

  const extraMembers = project.members.length > 4 ? project.members.length - 4 : 0;

  return (
    <div
      onClick={() => router.push(`/dashboard/projects/${project.id}/kanban`)}
      className="group bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-100 transition-all cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 rounded-full hover:bg-gray-50">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
          <Folder className="w-6 h-6" />
        </div>
        <div>
          <Badge variant={project.status} className="mb-1" />
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{project.name}</h3>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6 line-clamp-2 min-h-[40px]">
        {project.description}
      </p>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-medium text-gray-400">Progression</span>
          <span className="text-xs font-bold text-green-600">65%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-[65%] h-full bg-green-500 rounded-full" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-3">
          {members.map((user, idx) => (
            <Avatar key={user?.id || idx} name={user?.name || ""} size="sm" className="ring-2 ring-white" />
          ))}
          {extraMembers > 0 && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border-2 border-white text-[10px] font-bold text-gray-600">
              +{extraMembers}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-green-600 group-hover:translate-x-1 transition-transform">
          <span>Ouvrir</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
