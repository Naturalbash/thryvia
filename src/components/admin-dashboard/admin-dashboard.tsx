"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  Pause,
  Edit3,
  Trash2,
  Users,
  FolderOpen,
  //   Heart,
  BookOpen,
  Video,
  Headphones,
  Target,
  Link,
  Activity,
  Brain,
  //   Smile,
} from "lucide-react";

// Types
interface Worker {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skills: string[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "not-started" | "on going" | "completed" | "delayed";
  workerId: string;
  tasks: Task[];
  createdAt: string;
}

interface Habit {
  id: string;
  title: string;
  description: string;
  category: "physical" | "mental" | "social" | "productivity";
  frequency: "daily" | "weekly" | "monthly";
  createdAt: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "podcast";
  url: string;
  category:
    | "stress-management"
    | "productivity"
    | "mindfulness"
    | "work-life-balance"
    | "communication";
  createdAt: string;
}

// Sample data
const initialWorkers: Worker[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    avatar: "SJ",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@company.com",
    avatar: "MC",
    skills: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@company.com",
    avatar: "ER",
    skills: ["UI/UX", "Figma", "Frontend"],
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@company.com",
    avatar: "DK",
    skills: ["DevOps", "AWS", "Docker"],
  },
];

const initialProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    description:
      "Complete redesign of the company e-commerce platform with modern UI/UX",
    dueDate: "2024-02-15",
    status: "on going",
    workerId: "1",
    createdAt: "2024-01-01",
    tasks: [
      {
        id: "1",
        title: "Create wireframes",
        description: "Design low-fidelity wireframes for main pages",
        status: "completed",
        createdAt: "2024-01-02",
      },
      {
        id: "2",
        title: "Implement responsive header",
        description: "Build responsive navigation header component",
        status: "in-progress",
        createdAt: "2024-01-05",
      },
      {
        id: "3",
        title: "Product catalog page",
        description: "Develop product listing and filtering functionality",
        status: "pending",
        createdAt: "2024-01-08",
      },
    ],
  },
  {
    id: "2",
    title: "API Integration Service",
    description: "Build microservice for third-party API integrations",
    dueDate: "2024-01-30",
    status: "completed",
    workerId: "2",
    createdAt: "2024-01-01",
    tasks: [
      {
        id: "4",
        title: "API documentation",
        description: "Document all API endpoints and responses",
        status: "completed",
        createdAt: "2024-01-03",
      },
      {
        id: "5",
        title: "Authentication middleware",
        description: "Implement JWT authentication for API access",
        status: "completed",
        createdAt: "2024-01-10",
      },
    ],
  },
];

const initialHabits: Habit[] = [
  {
    id: "1",
    title: "Morning Meditation",
    description: "10 minutes of mindfulness meditation to start the day",
    category: "mental",
    frequency: "daily",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Daily Exercise",
    description: "30 minutes of physical activity (walking, yoga, or workout)",
    category: "physical",
    frequency: "daily",
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    title: "Team Check-in",
    description:
      "Connect with at least one team member for non-work conversation",
    category: "social",
    frequency: "daily",
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    title: "Deep Work Session",
    description: "2-hour focused work session without distractions",
    category: "productivity",
    frequency: "daily",
    createdAt: "2024-01-01",
  },
];

const initialResources: Resource[] = [
  {
    id: "1",
    title: "Managing Remote Work Stress",
    description:
      "Comprehensive guide on identifying and managing stress in remote work environments",
    type: "article",
    url: "https://example.com/remote-stress-management",
    category: "stress-management",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Productivity Techniques for Remote Workers",
    description:
      "Video series covering Pomodoro, time-blocking, and other productivity methods",
    type: "video",
    url: "https://example.com/productivity-techniques",
    category: "productivity",
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    title: "Mindful Remote Work Podcast",
    description:
      "Weekly podcast discussing mindfulness practices for remote professionals",
    type: "podcast",
    url: "https://example.com/mindful-remote-podcast",
    category: "mindfulness",
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    title: "Work-Life Balance in Digital Age",
    description:
      "Research-based article on maintaining healthy boundaries while working remotely",
    type: "article",
    url: "https://example.com/work-life-balance",
    category: "work-life-balance",
    createdAt: "2024-01-01",
  },
];

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [workers] = useState<Worker[]>(initialWorkers);
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [resources, setResources] = useState<Resource[]>(initialResources);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [habitSearchTerm, setHabitSearchTerm] = useState("");
  const [resourceSearchTerm, setResourceSearchTerm] = useState("");
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string>("all");

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "not-started" as Project["status"],
    workerId: "",
  });

  // Task form state
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "pending" as Task["status"],
  });

  // Habit form state
  const [habitForm, setHabitForm] = useState({
    title: "",
    description: "",
    category: "mental" as Habit["category"],
    frequency: "daily" as Habit["frequency"],
  });

  // Resource form state
  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    type: "article" as Resource["type"],
    url: "",
    category: "stress-management" as Resource["category"],
  });

  // Filter functions
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredHabits = habits.filter(
    (habit) =>
      habit.title.toLowerCase().includes(habitSearchTerm.toLowerCase()) ||
      habit.description.toLowerCase().includes(habitSearchTerm.toLowerCase())
  );

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(resourceSearchTerm.toLowerCase()) ||
      resource.description
        .toLowerCase()
        .includes(resourceSearchTerm.toLowerCase());
    const matchesType =
      resourceTypeFilter === "all" || resource.type === resourceTypeFilter;
    return matchesSearch && matchesType;
  });

  // Reset forms
  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      description: "",
      dueDate: "",
      status: "not-started",
      workerId: "",
    });
    setEditingProject(null);
  };

  const resetTaskForm = () => {
    setTaskForm({
      title: "",
      description: "",
      status: "pending",
    });
  };

  const resetHabitForm = () => {
    setHabitForm({
      title: "",
      description: "",
      category: "mental",
      frequency: "daily",
    });
    setEditingHabit(null);
  };

  const resetResourceForm = () => {
    setResourceForm({
      title: "",
      description: "",
      type: "article",
      url: "",
      category: "stress-management",
    });
    setEditingResource(null);
  };

  // Handle submissions
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id ? { ...p, ...projectForm } : p
        )
      );
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        ...projectForm,
        tasks: [],
        createdAt: new Date().toISOString(),
      };
      setProjects((prev) => [...prev, newProject]);
    }

    setIsProjectModalOpen(false);
    resetProjectForm();
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedProject) {
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskForm,
        createdAt: new Date().toISOString(),
      };

      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id
            ? { ...p, tasks: [...p.tasks, newTask] }
            : p
        )
      );
    }

    setIsTaskModalOpen(false);
    resetTaskForm();
  };

  const handleHabitSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingHabit) {
      setHabits((prev) =>
        prev.map((h) => (h.id === editingHabit.id ? { ...h, ...habitForm } : h))
      );
    } else {
      const newHabit: Habit = {
        id: Date.now().toString(),
        ...habitForm,
        createdAt: new Date().toISOString(),
      };
      setHabits((prev) => [...prev, newHabit]);
    }

    setIsHabitModalOpen(false);
    resetHabitForm();
  };

  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingResource) {
      setResources((prev) =>
        prev.map((r) =>
          r.id === editingResource.id ? { ...r, ...resourceForm } : r
        )
      );
    } else {
      const newResource: Resource = {
        id: Date.now().toString(),
        ...resourceForm,
        createdAt: new Date().toISOString(),
      };
      setResources((prev) => [...prev, newResource]);
    }

    setIsResourceModalOpen(false);
    resetResourceForm();
  };

  // Handle edits
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      dueDate: project.dueDate,
      status: project.status,
      workerId: project.workerId,
    });
    setIsProjectModalOpen(true);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setHabitForm({
      title: habit.title,
      description: habit.description,
      category: habit.category,
      frequency: habit.frequency,
    });
    setIsHabitModalOpen(true);
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setResourceForm({
      title: resource.title,
      description: resource.description,
      type: resource.type,
      url: resource.url,
      category: resource.category,
    });
    setIsResourceModalOpen(true);
  };

  // Handle deletes
  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  const handleDeleteResource = (resourceId: string) => {
    setResources((prev) => prev.filter((r) => r.id !== resourceId));
  };

  // Handle task status update
  const handleTaskStatusUpdate = (
    projectId: string,
    taskId: string,
    newStatus: Task["status"]
  ) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === taskId ? { ...t, status: newStatus } : t
              ),
            }
          : p
      )
    );
  };

  // Utility functions
  const getStatusInfo = (status: Project["status"]) => {
    switch (status) {
      case "not-started":
        return {
          color: "bg-gray-100 text-gray-800",
          icon: Clock,
          label: "Not Started",
        };
      case "on going":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: AlertCircle,
          label: "In Progress",
        };
      case "completed":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
          label: "Completed",
        };
      case "delayed":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: Pause,
          label: "On Hold",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: Clock,
          label: "Unknown",
        };
    }
  };

  const getTaskStatusInfo = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return { color: "bg-gray-100 text-gray-800", label: "Pending" };
      case "in-progress":
        return { color: "bg-blue-100 text-blue-800", label: "In Progress" };
      case "completed":
        return { color: "bg-green-100 text-green-800", label: "Completed" };
      default:
        return { color: "bg-gray-100 text-gray-800", label: "Unknown" };
    }
  };

  const getCategoryInfo = (category: Habit["category"]) => {
    switch (category) {
      case "physical":
        return {
          color: "bg-green-100 text-green-800",
          icon: Activity,
          label: "Physical",
        };
      case "mental":
        return {
          color: "bg-purple-100 text-purple-800",
          icon: Brain,
          label: "Mental",
        };
      case "social":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: Users,
          label: "Social",
        };
      case "productivity":
        return {
          color: "bg-orange-100 text-orange-800",
          icon: Target,
          label: "Productivity",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: Activity,
          label: "Unknown",
        };
    }
  };

  const getResourceTypeInfo = (type: Resource["type"]) => {
    switch (type) {
      case "article":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: BookOpen,
          label: "Article",
        };
      case "video":
        return {
          color: "bg-red-100 text-red-800",
          icon: Video,
          label: "Video",
        };
      case "podcast":
        return {
          color: "bg-green-100 text-green-800",
          icon: Headphones,
          label: "Podcast",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: BookOpen,
          label: "Unknown",
        };
    }
  };

  const getWorkerById = (workerId: string) => {
    return workers.find((w) => w.id === workerId);
  };

  // Calculate stats
  const projectStats = {
    total: projects.length,
    completed: projects.filter((p) => p.status === "completed").length,
    inProgress: projects.filter((p) => p.status === "on going").length,
    onHold: projects.filter((p) => p.status === "delayed").length,
  };

  const wellbeingStats = {
    totalHabits: habits.length,
    totalResources: resources.length,
    dailyHabits: habits.filter((h) => h.frequency === "daily").length,
    articles: resources.filter((r) => r.type === "article").length,
  };

  function ProjectCard({ project, worker }: { project: Project; worker: Worker | undefined }) {
    const [formattedDueDate, setFormattedDueDate] = React.useState("");
    React.useEffect(() => {
      if (project.dueDate) {
        setFormattedDueDate(new Date(project.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
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
                <getStatusInfo(project.status).icon className="w-3 h-3 mr-1" />
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
            <div className="flex items-center items-center gap-2 text-sm text-gray-600">
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
                {
                  project.tasks.filter(
                    (t) => t.status === "completed"
                  ).length
                }
                /{project.tasks.length}
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
                    <DialogTitle>
                      {project.title} - Tasks
                    </DialogTitle>
                    <DialogDescription>
                      Manage tasks for this project
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="space-y-3">
                      {project.tasks.map((task) => {
                        const taskStatusInfo = getTaskStatusInfo(
                          task.status
                        );
                        return (
                          <div
                            key={task.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">
                                {task.title}
                              </h4>
                              <Select
                                value={task.status}
                                onValueChange={(
                                  value: Task["status"]
                                ) =>
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
                                  <SelectItem value="pending">
                                    Pending
                                  </SelectItem>
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
                            <Badge
                              className={`${taskStatusInfo.color} text-xs`}
                            >
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
                              <Label htmlFor="taskTitle">
                                Task Title
                              </Label>
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
                              <Label htmlFor="taskDescription">
                                Description
                              </Label>
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
                              <Label htmlFor="taskStatus">
                                Status
                              </Label>
                              <Select
                                value={taskForm.status}
                                onValueChange={(
                                  value: Task["status"]
                                ) =>
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
                                  <SelectItem value="pending">
                                    Pending
                                  </SelectItem>
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
                              onClick={() =>
                                setIsTaskModalOpen(false)
                              }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage remote work projects and team wellbeing
              </p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-800 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
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
                      <p className="text-sm font-medium text-gray-600">
                        In Progress
                      </p>
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
                      <p className="text-sm font-medium text-gray-600">
                        Completed
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {projectStats.completed}
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
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog
                open={isProjectModalOpen}
                onOpenChange={setIsProjectModalOpen}
              >
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
                          <Label htmlFor="dueDate">Due Date</Label>
                          <Input
                            id="dueDate"
                            type="date"
                            value={projectForm.dueDate}
                            onChange={(e) =>
                              setProjectForm((prev) => ({
                                ...prev,
                                dueDate: e.target.value,
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
                              <SelectItem value="not-started">
                                Not Started
                              </SelectItem>
                              <SelectItem value="in-progress">
                                In Progress
                              </SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
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
                const statusInfo = getStatusInfo(project.status);
                const worker = getWorkerById(project.workerId);
                const StatusIcon = statusInfo.icon;

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

          {/* Habits Tab */}
          <TabsContent value="habits" className="space-y-6">
            {/* Wellbeing Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Habits
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {wellbeingStats.totalHabits}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Daily Habits
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {wellbeingStats.dailyHabits}
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Resources
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {wellbeingStats.totalResources}
                      </p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Articles
                      </p>
                      <p className="text-3xl font-bold text-purple-600">
                        {wellbeingStats.articles}
                      </p>
                    </div>
                    <BookOpen className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Habit Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                <Input
                  placeholder="Search habits..."
                  value={habitSearchTerm}
                  onChange={(e) => setHabitSearchTerm(e.target.value)}
                  className="pl-10 py-6 border-green-500"
                />
              </div>
              <Dialog
                open={isHabitModalOpen}
                onOpenChange={setIsHabitModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                    onClick={resetHabitForm}
                  >
                    <Plus className="h-4 w-4" />
                    New Habit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingHabit ? "Edit Habit" : "Create New Habit"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingHabit
                        ? "Update habit details below."
                        : "Add a new habit for team wellbeing."}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleHabitSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="habitTitle">Habit Title</Label>
                        <Input
                          id="habitTitle"
                          value={habitForm.title}
                          onChange={(e) =>
                            setHabitForm((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="Enter habit title"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="habitDescription">Description</Label>
                        <Textarea
                          id="habitDescription"
                          value={habitForm.description}
                          onChange={(e) =>
                            setHabitForm((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Habit description"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="habitCategory">Category</Label>
                          <Select
                            value={habitForm.category}
                            onValueChange={(value: Habit["category"]) =>
                              setHabitForm((prev) => ({
                                ...prev,
                                category: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="physical">Physical</SelectItem>
                              <SelectItem value="mental">Mental</SelectItem>
                              <SelectItem value="social">Social</SelectItem>
                              <SelectItem value="productivity">
                                Productivity
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="habitFrequency">Frequency</Label>
                          <Select
                            value={habitForm.frequency}
                            onValueChange={(value: Habit["frequency"]) =>
                              setHabitForm((prev) => ({
                                ...prev,
                                frequency: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsHabitModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                      >
                        {editingHabit ? "Update Habit" : "Create Habit"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Habits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHabits.map((habit) => {
                const categoryInfo = getCategoryInfo(habit.category);
                const CategoryIcon = categoryInfo.icon;

                return (
                  <Card
                    key={habit.id}
                    className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold mb-2">
                            {habit.title}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Badge className={`${categoryInfo.color} text-xs`}>
                              <CategoryIcon className="w-3 h-3 mr-1" />
                              {categoryInfo.label}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {habit.frequency}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditHabit(habit)}
                            className="h-8 w-8 p-0 hover:bg-green-50"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteHabit(habit.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {habit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredHabits.length === 0 && (
              <div className="text-center py-12">
                <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No habits found
                </h3>
                <p className="text-gray-600">
                  Create habits to help your team maintain wellbeing.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            {/* Resource Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-col items-center sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 h-4 w-4" />
                  <Input
                    placeholder="Search resources..."
                    value={resourceSearchTerm}
                    onChange={(e) => setResourceSearchTerm(e.target.value)}
                    className="pl-10 py-6 border-purple-500"
                  />
                </div>
                <Select
                  value={resourceTypeFilter}
                  onValueChange={setResourceTypeFilter}
                >
                  <SelectTrigger className="w-full sm:w-48 bg-white">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="article">Articles</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="podcast">Podcasts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog
                open={isResourceModalOpen}
                onOpenChange={setIsResourceModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    onClick={resetResourceForm}
                  >
                    <Plus className="h-4 w-4" />
                    New Resource
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingResource ? "Edit Resource" : "Add New Resource"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingResource
                        ? "Update resource details below."
                        : "Add a new wellbeing resource for your team."}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleResourceSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="resourceTitle">Resource Title</Label>
                        <Input
                          id="resourceTitle"
                          value={resourceForm.title}
                          onChange={(e) =>
                            setResourceForm((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="Enter resource title"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="resourceDescription">Description</Label>
                        <Textarea
                          id="resourceDescription"
                          value={resourceForm.description}
                          onChange={(e) =>
                            setResourceForm((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Resource description"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="resourceUrl">URL</Label>
                        <Input
                          id="resourceUrl"
                          type="url"
                          value={resourceForm.url}
                          onChange={(e) =>
                            setResourceForm((prev) => ({
                              ...prev,
                              url: e.target.value,
                            }))
                          }
                          placeholder="https://example.com"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="resourceType">Type</Label>
                          <Select
                            value={resourceForm.type}
                            onValueChange={(value: Resource["type"]) =>
                              setResourceForm((prev) => ({
                                ...prev,
                                type: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="article">Article</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="podcast">Podcast</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="resourceCategory">Category</Label>
                          <Select
                            value={resourceForm.category}
                            onValueChange={(value: Resource["category"]) =>
                              setResourceForm((prev) => ({
                                ...prev,
                                category: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="stress-management">
                                Stress Management
                              </SelectItem>
                              <SelectItem value="productivity">
                                Productivity
                              </SelectItem>
                              <SelectItem value="mindfulness">
                                Mindfulness
                              </SelectItem>
                              <SelectItem value="work-life-balance">
                                Work-Life Balance
                              </SelectItem>
                              <SelectItem value="communication">
                                Communication
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsResourceModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      >
                        {editingResource ? "Update Resource" : "Add Resource"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const typeInfo = getResourceTypeInfo(resource.type);
                const TypeIcon = typeInfo.icon;

                return (
                  <Card
                    key={resource.id}
                    className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold mb-2">
                            {resource.title}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Badge className={`${typeInfo.color} text-xs`}>
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {typeInfo.label}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {resource.category.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditResource(resource)}
                            className="h-8 w-8 p-0 hover:bg-purple-50"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteResource(resource.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 text-gray-600">
                        {resource.description}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(resource.url, "_blank")}
                          className="flex items-center gap-2 hover:bg-purple-50"
                        >
                          <Link className="h-4 w-4" />
                          View Resource
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No resources found
                </h3>
                <p className="text-gray-600">
                  Add resources to support your team&#39;s wellbeing.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
