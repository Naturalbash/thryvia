"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { TaskItem } from "../ui/task-item";
import { cn } from "@/lib/utils";
import { ITask } from "@/interfaces";

interface TodaysTaskProps {
  tasks: ITask[];
}

export function TodaysTask({ tasks: data }: TodaysTaskProps) {
  const [tasks, setTasks] = useState(data);
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, Completed: !task.Completed } : task
      )
    );
  };

  return (
    <div className={cn("w-full max-w-md")}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
        <div className="border-b border-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Today&apos;s Task
            </h2>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
              <MoreHorizontal className="h-5 w-5 text-gray-800" />
            </button>
          </div>
        </div>

        <div className="p-4 divide-y divide-gray-50">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </div>
      </div>
    </div>
  );
}
