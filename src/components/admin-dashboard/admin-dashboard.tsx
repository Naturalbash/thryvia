import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderOpen, BookOpen, Target } from "lucide-react";
import AdminDashboardHeader from "./admin-dashboard-header";
import HabitsTab from "./habits-tab";
import ProjectsTab from "./projects-tab";
import ResourcesTab from "./resources-tab";
import { AdminDashboardProvider } from "./admin-dashboard-context";
import { fetchALlProjects } from "@/server/project.action";
import { fetchWorkers } from "./database";

export default async function AdminDashboard() {
  const projects = await fetchALlProjects();
  const workers = await fetchWorkers();

  return (
    <AdminDashboardProvider projects={projects} workers={workers}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <AdminDashboardHeader />
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <Tabs defaultValue="projects" className="space-y-4 sm:space-y-6 lg:space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 h-auto p-1">
              <TabsTrigger
                value="projects"
                className="flex items-center gap-1 sm:gap-2 lg:gap-4 p-2 sm:p-3 text-xs sm:text-sm lg:text-base"
              >
                <FolderOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Projects</span>
                <span className="sm:hidden">Proj</span>
              </TabsTrigger>
              <TabsTrigger 
                value="habits" 
                className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm lg:text-base"
              >
                <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Habits</span>
                <span className="sm:hidden">Habits</span>
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm lg:text-base"
              >
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Resources</span>
                <span className="sm:hidden">Res</span>
              </TabsTrigger>
            </TabsList>
            <ProjectsTab />
            <HabitsTab />
            <ResourcesTab />
          </Tabs>
        </div>
      </div>
    </AdminDashboardProvider>
  );
}
