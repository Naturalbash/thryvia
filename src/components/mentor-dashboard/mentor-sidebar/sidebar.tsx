"use client";

import React, { ReactNode, useState } from "react";
import {
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import SidebarHeader from "./sidebar-header";

// Navigation items data
const mainNavItems = [
  { id: "/mentor-dashboard", icon: LayoutDashboard, text: "Dashboard" },
];

const bottomNavItems = [
  { id: "/mentor-dashboard/settings", icon: Settings, text: "Settings" },
  { id: "/sign-in", icon: LogOut, text: "Logout" },
];

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Menu Button - Fixed position, top left */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-lg"
        aria-label="Open sidebar menu"
        style={{ display: isMobileOpen ? "none" : undefined }}
      >
        <Menu size={18} />
      </button>

      {/* Mobile Sidebar Overlay */}
      <div
        className={
          `lg:hidden fixed inset-0 z-40 transition-transform duration-500 ease-in-out ` +
          (isMobileOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="h-full bg-slate-800 flex flex-col flex-shrink-0 w-64 relative">
          {/* Back/Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 left-4 p-2 bg-gray-200 text-slate-800 rounded-lg hover:bg-gray-300 transition-colors z-50"
            aria-label="Close sidebar menu"
          >
            <X size={18} />
          </button>
          <SidebarHeader isExpanded={true} />
          <nav className="flex flex-col flex-1 px-2">
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
      </div>

      {/* Desktop Sidebar - Always visible, hover expandable */}
      <div
        className={`hidden lg:block h-full bg-slate-800 flex flex-col flex-shrink-0
          transition-all duration-500 ease-in-out
          ${isExpanded ? "w-56" : "w-16"}`}
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
