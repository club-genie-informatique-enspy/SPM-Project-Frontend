"use client";

import React from "react";
import { MessageSquare, Clock, MoreVertical } from "@/lib/icons";
import { Task } from "@/types";
import Badge from "./Badge";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import { users } from "@/lib/mock-data";

interface TaskCardProps {
  task: Task;
  onDragStart?: (e: React.DragEvent, taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
  const router = useRouter();
  const assignee = users.find((u) => u.id === task.assigneeId);

  const handleClick = () => {
    router.push(`/dashboard/projects/${task.projectId}/tasks/${task.id}`);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, task.id)}
      onClick={handleClick}
      className="group bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-100 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <Badge variant={task.priority} />
        <button className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{task.title}</h4>

      <div className="flex flex-wrap gap-1 mb-4">
        {task.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full text-[10px] font-medium">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          {task.dueDate && (
            <div className={`flex items-center gap-1 text-[10px] ${isOverdue ? "text-red-500 font-semibold" : ""}`}>
              <Clock className="w-3 h-3" />
              <span>{new Date(task.dueDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-[10px]">
            <MessageSquare className="w-3 h-3" />
            <span>2</span>
          </div>
        </div>

        {assignee && <Avatar name={assignee.name} size="sm" />}
      </div>
    </div>
  );
};

export default TaskCard;
