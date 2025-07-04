import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ITask } from "@/interfaces";

interface TaskItemProps {
  task: ITask;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div
      className="flex items-center gap-3 py-2 group cursor-pointer"
      onClick={() => onToggle(task.id)}
    >
      <div className="flex-shrink-0">
        {task.Completed ? (
          <div className="h-5 w-5 rounded-full flex items-center justify-center bg-slate-800 text-white transition-all duration-200">
            <Check className="h-3.5 w-3.5" />
          </div>
        ) : (
          <div className="h-5 w-5 rounded-full border border-slate-400 flex items-center justify-center group-hover:border-red-400 transition-all duration-200">
            <Circle className="h-3.5 w-3.5 opacity-0 group-hover:opacity-30 text-red-500 transition-opacity duration-200" />
          </div>
        )}
      </div>
      <span
        className={cn(
          "text-sm transition-all duration-200",
          task.Completed ? "text-gray-300 line-through" : "text-gray-700"
        )}
      >
        {task.title}
      </span>
    </div>
  );
}
