import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
  id: string;
  icon: LucideIcon;
  text: string;
  isActive: boolean;
  onClick: () => void;
  isBottom?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  icon: Icon,
  text,
  isActive,
  onClick,
  isBottom = false,
}) => {
  return (
    <Link
      href={id}
      className={`
        flex items-center w-full cursor-pointer
        ${isBottom ? "mt-auto" : "mt-2"}
        ${isActive ? "text-blue-400" : "text-gray-400 hover:text-gray-100"}
        transition-colors duration-200 ease-in-out
        group
      `}
      onClick={onClick}
    >
      <div
        className={`
          flex items-center p-3 rounded-lg
          ${isActive ? "bg-blue-500/10" : "hover:bg-slate-700/30"}
          transition-all duration-200 ease-in-out
          relative w-full
        `}
      >
        <div className="flex items-center justify-center min-w-10">
          <Icon
            size={20}
            className={`
              transition-all duration-200 ease-in-out
              ${
                isActive
                  ? "text-blue-400"
                  : "text-gray-400 group-hover:text-gray-100"
              }
            `}
          />
        </div>
        <span
          className={`
            ml-2 font-medium text-sm whitespace-nowrap overflow-hidden
            transition-all duration-200 ease-in-out
          `}
        >
          {text}
        </span>

        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-r-full" />
        )}
      </div>
    </Link>
  );
};

export default SidebarItem;
