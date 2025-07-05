import { Check, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ITask } from "@/interfaces";

interface TaskItemProps {
  task: ITask;
  onToggle: (id: string) => void;
  isUpdating?: boolean;
}

export function TaskItem({ task, onToggle, isUpdating = false }: TaskItemProps) {
  return (
    <div
      className="flex items-center gap-2 sm:gap-3 py-2 group cursor-pointer"
      onClick={() => !isUpdating && onToggle(task.id)}
    >
      <div className="flex-shrink-0">
        {isUpdating ? (
          <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center border border-slate-400">
            <Loader2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-spin text-slate-600" />
          </div>
        ) : task.completed ? (
          <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center bg-slate-800 text-white transition-all duration-200">
            <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </div>
        ) : (
          <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border border-slate-400 flex items-center justify-center group-hover:border-red-400 transition-all duration-200">
            <Circle className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-0 group-hover:opacity-30 text-red-500 transition-opacity duration-200" />
          </div>
        )}
      </div>
      <span
        className={cn(
          "text-xs sm:text-sm transition-all duration-200 flex-1 min-w-0",
          task.completed ? "text-gray-300 line-through" : "text-gray-700"
        )}
      >
        {task.title}
      </span>
    </div>
  );
}
