"use client";

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
} from "@radix-ui/react-select";
import { Badge, Edit3, Trash2, Calendar, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Project, Task, Worker } from "./data";
import React from "react";
import { useAdminDashboard } from "./use-admin-dashboard";

export function ProjectCard({
  project,
  worker,
}: {
  project: Project;
  worker: Worker | undefined;
}) {
  const {
    isTaskModalOpen,
    taskForm,
    setIsTaskModalOpen,
    setSelectedProject,
    setTaskForm,
    handleTaskSubmit,
    resetTaskForm,
    handleEditProject,
    handleDeleteProject,
    handleTaskStatusUpdate,
    getStatusInfo,
    getTaskStatusInfo,
  } = useAdminDashboard();

  const [formattedDueDate, setFormattedDueDate] = React.useState("");
  React.useEffect(() => {
    if (project.dueDate) {
      setFormattedDueDate(
        new Date(project.dueDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [project.dueDate]);

  return (
    <Card
      key={project.id}
      className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">
              {project.title}
            </CardTitle>
            <Badge className={`${getStatusInfo(project.status).color} text-xs`}>
              {/* <getStatusInfo(project.status).icon className="w-3 h-3 mr-1" /> */}
              {getStatusInfo(project.status).label}
            </Badge>
          </div>
          <div className="flex gap-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditProject(project)}
              className="h-8 w-8 p-0 hover:bg-blue-50"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteProject(project.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-6 text-md line-clamp-2">
          {project.description}
        </CardDescription>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            Due: {formattedDueDate || project.dueDate}
          </div>

          {worker && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs">
                  {worker.avatar}
                </div>
                {worker.name}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Tasks:{" "}
              {project.tasks.filter((t) => t.status === "completed").length}/
              {project.tasks.length}
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProject(project)}
                  className="hover:bg-blue-50"
                >
                  View Tasks
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>{project.title} - Tasks</DialogTitle>
                  <DialogDescription>
                    Manage tasks for this project
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {project.tasks.map((task) => {
                      const taskStatusInfo = getTaskStatusInfo(task.status);
                      return (
                        <div
                          key={task.id}
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{task.title}</h4>
                            <Select
                              value={task.status}
                              onValueChange={(value: Task["status"]) =>
                                handleTaskStatusUpdate(
                                  project.id,
                                  task.id,
                                  value
                                )
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {task.description}
                          </p>
                          <Badge className={`${taskStatusInfo.color} text-xs`}>
                            {taskStatusInfo.label}
                          </Badge>
                        </div>
                      );
                    })}
                    {project.tasks.length === 0 && (
                      <p className="text-center text-gray-500 py-8">
                        No tasks yet
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Dialog
                    open={isTaskModalOpen}
                    onOpenChange={setIsTaskModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={resetTaskForm}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                        <DialogDescription>
                          Create a new task for {project.title}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleTaskSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="taskTitle">Task Title</Label>
                            <Input
                              id="taskTitle"
                              value={taskForm.title}
                              onChange={(e) =>
                                setTaskForm((prev) => ({
                                  ...prev,
                                  title: e.target.value,
                                }))
                              }
                              placeholder="Enter task title"
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="taskDescription">Description</Label>
                            <Textarea
                              id="taskDescription"
                              value={taskForm.description}
                              onChange={(e) =>
                                setTaskForm((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              placeholder="Task description"
                              rows={3}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="taskStatus">Status</Label>
                            <Select
                              value={taskForm.status}
                              onValueChange={(value: Task["status"]) =>
                                setTaskForm((prev) => ({
                                  ...prev,
                                  status: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsTaskModalOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          >
                            Add Task
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
