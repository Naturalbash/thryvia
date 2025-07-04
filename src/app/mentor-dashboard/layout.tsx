"use client";

import Sidebar from "@/components/mentor-dashboard/mentor-sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar>
        <div>{children}</div>
      </Sidebar>
    </div>
  );
}
