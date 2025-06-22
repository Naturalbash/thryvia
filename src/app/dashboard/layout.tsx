"use client";

import DashboardHeader from "@/components/dashboard/header";
import Sidebar from "@/components/sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar>
        <DashboardHeader />
        <div>{children}</div>
      </Sidebar>
    </div>
  );
}
