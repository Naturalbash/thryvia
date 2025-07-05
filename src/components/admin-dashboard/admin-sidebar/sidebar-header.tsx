import React from "react";
import { Workflow } from "lucide-react";

interface SidebarHeaderProps {
  isExpanded: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isExpanded }) => {
  return (
    <div className="px-4 py-5 flex items-center ml-10 lg:ml-0">
      <Workflow size={28} className="text-blue-400 min-w-7" />
      <h1
        className={`
          ml-2 font-bold text-white text-2xl whitespace-nowrap overflow-hidden
          transition-all duration-300 ease-in-out
          ${isExpanded ? "opacity-100" : "opacity-0"}
        `}
      >
        Thryvia
      </h1>
    </div>
  );
};

export default SidebarHeader;
