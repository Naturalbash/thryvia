"use client";
import React, { createContext, useContext } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "Completed";
  created_at: string;
  project_id: number;
}

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

export interface Worker {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skills: string[];
}

interface IAdminDashboardContext {
  projects: Project[];
  workers: Worker[];
}

const AdminDashboardContext = createContext<IAdminDashboardContext>({
  projects: [],
  workers: [],
});

interface AdminDashboardProviderProps {
  children: React.ReactNode;
  projects: Project[];
  workers: Worker[];
}

function AdminDashboardProvider({
  children,
  projects,
  workers,
}: AdminDashboardProviderProps) {
  return (
    <AdminDashboardContext.Provider value={{ projects, workers }}>
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
