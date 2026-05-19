"use client";

import React from "react";
import { MessageSquare, Clock } from "@/lib/icons";
import { Task } from "@/types";
import Badge from "./Badge";
import Avatar from "./Avatar";
import { users, projects } from "@/lib/mock-data";

interface TaskCardProps {
  task: Task;
  onDragStart?: (e: React.DragEvent, taskId: string) => void;
  onClick?: (task: Task) => void;
}

const priorityBorder: Record<string, string> = {
  critical: "border-l-red-500",
  high:     "border-l-orange-400",
  medium:   "border-l-blue-400",
  low:      "border-l-gray-300",
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, onClick }) => {
  const assignee = users.find((u) => u.id === task.assigneeId);
  const project = projects.find((p) => p.id === task.projectId);
  const taskNumber = task.id.split("-").pop();
  const taskId = project ? `${project.key}-${taskNumber}` : taskNumber;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  const handleClick = () => onClick?.(task);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, task.id)}
      onClick={handleClick}
      className={`group bg-white dark:bg-gray-800 p-3.5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 ${priorityBorder[task.priority] ?? "border-l-gray-300"} hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer`}
    >
      <div className="flex flex-wrap gap-1 mb-2">
        {task.tags.map((tag) => (
          <span key={tag} className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-[10px] font-semibold">
            {tag}
          </span>
        ))}
      </div>

      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
        {task.title}
      </h4>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={task.priority} />
          {task.dueDate && (
            <div className={`flex items-center gap-1 text-[10px] font-medium ${isOverdue ? "text-red-500" : "text-gray-400"}`}>
              <Clock className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 uppercase">{taskId}</span>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
            <MessageSquare className="w-3 h-3" />
            <span>2</span>
          </div>
          {assignee && <Avatar name={assignee.name} size="sm" />}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
