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
                className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 lg:gap-4 p-2 sm:p-3 text-xs sm:text-sm lg:text-base min-h-[56px]"
              >
                <FolderOpen className="h-5 w-5 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-base font-medium mt-1 sm:mt-0">Projects</span>
              </TabsTrigger>
              <TabsTrigger 
                value="habits" 
                className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm lg:text-base min-h-[56px]"
              >
                <Target className="h-5 w-5 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-base font-medium mt-1 sm:mt-0">Habits</span>
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm lg:text-base min-h-[56px]"
              >
                <BookOpen className="h-5 w-5 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-base font-medium mt-1 sm:mt-0">Resources</span>
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
