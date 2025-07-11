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
      {/* Mobile Menu Button - Fixed position, top left */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-lg"
        aria-label="Toggle mobile menu"
      >
        {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Desktop Sidebar - Always visible, hover expandable */}
      <div
        className={`
          hidden lg:block h-full bg-slate-800 flex flex-col flex-shrink-0
          transition-all duration-500 ease-in-out
          ${isExpanded ? "w-56" : "w-16"}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarHeader isExpanded={isExpanded} />

        {/* Toggle Button - Positioned at top right of sidebar */}
        <div className="flex justify-end px-2 py-1">
          <button
            onClick={toggleSidebar}
            className="p-1.5 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors flex justify-center"
            title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isExpanded ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        </div>

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

          {/* Bottom navigation items - Always at bottom with more spacing */}
          <div className="mt-auto py-2 mb-4">
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

      {/* Mobile Sidebar Overlay */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40 transition-transform duration-500 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile Sidebar Content */}
        <div className="h-full bg-slate-800 flex flex-col flex-shrink-0 w-64">
          <SidebarHeader isExpanded={true} />

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

            {/* Bottom navigation items - Always at bottom with more spacing */}
            <div className="mt-auto py-2 mb-4">
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

      {/* Mobile Overlay Background */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Content Area - Always visible and not covered */}
      <div className="flex-1 bg-slate-100 overflow-auto w-full">{children}</div>
    </div>
  );
};

export default Sidebar;
