"use client";
import React, { createContext, useContext } from "react";
import { Task } from "./data";

export interface Project {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: "At risk" | "On going" | "Completed" | "Delayed";
  workerId: string;
  tasks: Task[];
  created_at: string;
}

interface IAdminDashboardContext {
  projects: Project[];
}

const AdminDashboardContext = createContext<IAdminDashboardContext>({
  projects: [],
});

interface AdminDashboardProviderProps {
  children: React.ReactNode;
  projects: Project[];
}

function AdminDashboardProvider({
  children,
  projects,
}: AdminDashboardProviderProps) {
  return (
    <AdminDashboardContext.Provider value={{ projects }}>
      {children}
    </AdminDashboardContext.Provider>
  );
}

function useAdminDashboardContext() {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    throw new Error(
      "useAdminDashboardContext must be used within an AdminDashboardProvider"
    );
  }
  return context;
}
export { AdminDashboardProvider, useAdminDashboardContext };
