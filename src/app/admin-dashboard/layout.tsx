"use client";

import Sidebar from "@/components/admin-dashboard/admin-sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar>
        <div>{children}</div>
      </Sidebar>
    </div>
  );
}
