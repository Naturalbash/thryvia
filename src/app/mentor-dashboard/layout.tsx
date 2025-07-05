"use client";

import Sidebar from "@/components/mentor-dashboard/mentor-sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden">
      <Sidebar>
        <div className="flex flex-col h-full">
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </Sidebar>
    </div>
  );
}
