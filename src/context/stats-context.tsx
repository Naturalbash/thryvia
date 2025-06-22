"use client";
import { IProject } from "@/interfaces";
import { createContext, ReactNode, useContext } from "react";

interface IStatContext {
  projects: IProject[];
}

const StatContext = createContext<IStatContext>({ projects: [] });

interface StatsProviderProps {
  children: ReactNode;
  projects: IProject[];
}

export function ProjectsProvider({ children, projects }: StatsProviderProps) {
  return (
    <StatContext.Provider value={{ projects }}>{children}</StatContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(StatContext);

  if (!context)
    throw new Error(`StatsContext is used outside of StatsProvider`);

  return context;
}
