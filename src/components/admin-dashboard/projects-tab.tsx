"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  FolderOpen,
  CheckCircle,
  Users,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Project } from "./data";
import { useAdminDashboard } from "./use-admin-dashboard";
import { Label } from "../ui/label";
import { ProjectCard } from "./project-card";

export default function ProjectsTab() {
  const {
    projectStats,
    workers,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    isProjectModalOpen,
    setIsProjectModalOpen,
    editingProject,
    projectForm,
    setProjectForm,
    handleProjectSubmit,
    resetProjectForm,
    filteredProjects,
    getWorkerById,
  } = useAdminDashboard();
  return (
    <TabsContent value="projects" className="space-y-6">
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Projects
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {projectStats.total}
                </p>
              </div>
              <FolderOpen className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">
                  {projectStats.inProgress}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {projectStats.Completed}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Workers
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {workers.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col items-center sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 border-blue-500"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-none shadow-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="At risk">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={resetProjectForm}
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Create New Project"}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? "Update project details below."
                  : "Fill in the project details below."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleProjectSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Project description"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={projectForm.due_date}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          due_date: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={projectForm.status}
                      onValueChange={(value: Project["status"]) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          status: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="At risk">Not Started</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="worker">Assign Worker</Label>
                  <Select
                    value={projectForm.workerId}
                    onValueChange={(value) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        workerId: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a worker" />
                    </SelectTrigger>
                    <SelectContent>
                      {workers.map((worker) => (
                        <SelectItem key={worker.id} value={worker.id}>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs">
                              {worker.avatar}
                            </div>
                            {worker.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsProjectModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {editingProject ? "Update Project" : "Create Project"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const worker = getWorkerById(project.workerId);

          return (
            <ProjectCard key={project.id} project={project} worker={worker} />
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-gray-600">
            Get started by creating your first project.
          </p>
        </div>
      )}
    </TabsContent>
  );
}
