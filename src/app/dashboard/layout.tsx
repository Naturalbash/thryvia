"use client";

import DashboardHeader from "@/components/dashboard/header";
import Sidebar from "@/components/sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden">
      <Sidebar>
        <div className="flex flex-col h-full">
          <DashboardHeader />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </Sidebar>
    </div>
  );
}
