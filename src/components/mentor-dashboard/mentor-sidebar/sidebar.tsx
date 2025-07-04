"use client";

import React, { ReactNode, useState } from "react";
import {
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import SidebarHeader from "./sidebar-header";

// Navigation items data
const mainNavItems = [
  { id: "/mentor-dashboard", icon: LayoutDashboard, text: "Dashboard" },
];

const bottomNavItems = [
  { id: "/mentor-dashboard/settings", icon: Settings, text: "Settings" },
  { id: "logout", icon: LogOut, text: "Logout" },
];

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          h-full bg-slate-800 flex flex-col flex-shrink-0
          transition-all duration-300 ease-in-out
          ${isExpanded ? "w-56" : "w-16"}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarHeader isExpanded={isExpanded} />

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 m-2 bg-gray-200 rounded-lg hover:bg-gray-500 transition-colors flex justify-center"
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        <nav className="flex flex-col flex-1 px-2">
          {/* Main navigation items */}
          <div className="py-2">
            {mainNavItems.map((item) => (
              <SidebarItem
                id={item.id}
                key={item.id}
                icon={item.icon}
                text={item.text}
                isActive={activeItem === item.id}
                onClick={() => handleItemClick(item.id)}
              />
            ))}
          </div>

          {/* Bottom navigation items */}
          <div className="mt-auto mb-5">
            {bottomNavItems.map((item) => (
              <SidebarItem
                id={item.id}
                key={item.id}
                icon={item.icon}
                text={item.text}
                isActive={activeItem === item.id}
                onClick={() => handleItemClick(item.id)}
                isBottom
              />
            ))}
          </div>
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-slate-100 overflow-auto">{children}</div>
    </div>
  );
};

export default Sidebar;
