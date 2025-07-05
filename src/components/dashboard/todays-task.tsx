"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { TaskItem } from "../ui/task-item";
import { cn } from "@/lib/utils";
import { ITask } from "@/interfaces";
import { updateTaskCompletion } from "@/server/task.action";

interface TodaysTaskProps {
  tasks: ITask[];
}

/**
 * TodaysTask Component
 * 
 * Displays a list of today's tasks with the ability to toggle completion status.
 * Features:
 * - Real-time database updates when tasks are toggled
 * - Optimistic UI updates for better user experience
 * - Loading states during database operations
 * - Error handling with UI rollback on failure
 */
export function TodaysTask({ tasks: data }: TodaysTaskProps) {
  // Local state for tasks and updating status
  const [tasks, setTasks] = useState(data);
  const [updating, setUpdating] = useState<string | null>(null);

  /**
   * Toggle task completion status
   * @param id - Task ID to toggle
   */
  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newCompletedStatus = !task.completed;
    
    // Optimistically update UI for immediate feedback
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: newCompletedStatus } : task
      )
    );
    
    // Set loading state for this specific task
    setUpdating(id);

    try {
      // Persist changes to database
      await updateTaskCompletion(id, newCompletedStatus);
    } catch (error) {
      // Revert UI changes if database update fails
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !newCompletedStatus } : task
      )
    );
      console.error("Failed to update task:", error);
    } finally {
      // Clear loading state
      setUpdating(null);
    }
  };

  return (
    <div className={cn("w-full")}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-3 sm:p-4">
        <div className="border-b border-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Today&apos;s Task
            </h2>
            <button className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
              <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800" />
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 divide-y divide-gray-50">
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
              isUpdating={updating === task.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
