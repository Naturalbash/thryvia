"use client";

import React, { ReactNode, useState } from "react";
import {
  LayoutDashboard,
  Brain,
  LineChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import SidebarHeader from "./sidebar-header";

// Navigation items data
const mainNavItems = [
  { id: "/dashboard", icon: LayoutDashboard, text: "Dashboard" },
  {
    id: "/dashboard/mental-wellbeing",
    icon: LineChart,
    text: "Mental Wellbeing",
  },
  { id: "/dashboard/mentorship", icon: Brain, text: "Mentorship" },
];

const bottomNavItems = [
  { id: "/dashboard/settings", icon: Settings, text: "Settings" },
  { id: "logout", icon: LogOut, text: "Logout" },
];

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setIsExpanded(false);
    }
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    // Close mobile menu on item click
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative h-full bg-slate-800 flex flex-col flex-shrink-0
          transition-all duration-300 ease-in-out z-40
          ${isExpanded ? "w-56" : "w-16"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarHeader isExpanded={isExpanded} />

        {/* Toggle Button - Desktop only */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:block p-2 m-2 bg-gray-200 rounded-lg hover:bg-gray-500 transition-colors flex justify-center"
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

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Content area */}
      <div className="flex-1 bg-slate-100 overflow-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
