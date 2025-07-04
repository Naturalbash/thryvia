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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="projects" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[100%] bg-gray-100 h-full">
              <TabsTrigger
                value="projects"
                className="flex items-center gap-4 p-3"
              >
                <FolderOpen className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="habits" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Habits
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Resources
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
