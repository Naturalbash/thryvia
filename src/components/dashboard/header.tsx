"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useRef } from "react";
import { Bell, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { UserInfo } from "@/hooks/user";

export default function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load user info from localStorage
  const getUserInfo = (): UserInfo => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("userInfo");
      return saved
        ? (JSON.parse(saved) as UserInfo)
        : {
            firstName: "Basheer",
            lastName: "Muhammed",
            username: "Naturalbash",
            email: "omogbolahanolaitan@gmail.com",
            bio: "",
            location: "",
            website: "",
            currentPassword: "",
            avatarUrl: "",
          };
    }
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      bio: "",
      location: "",
      website: "",
      currentPassword: "",
      avatarUrl: "",
    };
  };

  const userInfo = getUserInfo();

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="top-0 z-10 w-full bg-slate-300 border-b border-gray-200 shadow-sm px-4 md:px-6 py-3">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div
            className={cn(
              "relative w-320 max-w-[320px] transition-all duration-200",
              isSearchFocused && "max-w-[340px]"
            )}
          >
            <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="pl-9 pr-4 py-2 h-9 text-sm rounded-sm bg-gray-50 border-gray-200 focus:bg-white placeholder:text-gray-400"
            />
          </div>

          <button
            className="relative p-2 cursor-pointer rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center cursor-pointer h-8 w-8 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
              aria-label="User profile"
              aria-expanded={isDropdownOpen}
            >
              <Avatar>
                <AvatarImage src={userInfo.avatarUrl} />
                <AvatarFallback>
                  {userInfo.firstName[0] || "U"}
                  {userInfo.lastName[0] || ""}
                </AvatarFallback>
              </Avatar>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 rounded-lg shadow-xl py-2 z-20">
                <div className="px-4 py-3 border-b border-slate-800">
                  <p className="text-sm font-semibold text-white">
                    {userInfo.firstName} {userInfo.lastName}
                  </p>
                  <p className="text-xs text-gray-400">@{userInfo.username}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {userInfo.email}
                  </p>
                </div>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-slate-800 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings size={16} className="mr-2" />
                  Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
