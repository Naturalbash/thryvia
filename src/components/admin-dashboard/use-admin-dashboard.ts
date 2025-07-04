"use client";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Pause,
  Activity,
  Brain,
  Users,
  Target,
  BookOpen,
  Video,
  Headphones,
} from "lucide-react";
import React, { useState } from "react";
import {
  Worker,
  Project,
  Habit,
  initialHabits,
  initialResources,
  Resource,
  Task,
} from "./data";
import { useAdminDashboardContext } from "./admin-dashboard-context";
import { addProject } from "./database";

export function useAdminDashboard() {
  const context = useAdminDashboardContext();
  const [projects, setProjects] = useState<Project[]>(context.projects);
  const [workers] = useState<Worker[]>(context.workers);
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
    due_date: "",
    status: "At risk" as Project["status"],
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
      due_date: "",
      status: "At risk",
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
        id: Math.random(),
        ...projectForm,
        tasks: [],
        created_at: new Date().toISOString(),
      };
      setProjects((prev) => [...prev, newProject]);

      addProject({
        title: projectForm.title,
        status: projectForm.status,
        description: projectForm.description,
        due_date: new Date(projectForm.due_date),
        user_id: projectForm.workerId,
      });
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
        created_at: new Date().toISOString(),
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
        created_at: new Date().toISOString(),
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
        created_at: new Date().toISOString(),
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
      due_date: project.due_date,
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
  const handleDeleteProject = (projectId: number) => {
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
    projectId: number,
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
      case "At risk":
        return {
          color: "bg-gray-100 text-gray-800",
          icon: Clock,
          label: "At Risk",
        };
      case "On going":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: AlertCircle,
          label: "On Going",
        };
      case "Completed":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
          label: "Completed",
        };
      case "Delayed":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: Pause,
          label: "Delayed",
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
      case "Completed":
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
    Completed: projects.filter((p) => p.status === "Completed").length,
    inProgress: projects.filter((p) => p.status === "On going").length,
    onHold: projects.filter((p) => p.status === "Delayed").length,
  };

  const wellbeingStats = {
    totalHabits: habits.length,
    totalResources: resources.length,
    dailyHabits: habits.filter((h) => h.frequency === "daily").length,
    articles: resources.filter((r) => r.type === "article").length,
  };

  return {
    // State
    projects,
    workers,
    habits,
    resources,

    searchTerm,
    filterStatus,
    habitSearchTerm,
    resourceSearchTerm,
    resourceTypeFilter,

    isProjectModalOpen,
    isTaskModalOpen,
    isHabitModalOpen,
    isResourceModalOpen,

    selectedProject,
    editingProject,
    editingHabit,
    editingResource,

    projectForm,
    taskForm,
    habitForm,
    resourceForm,

    filteredProjects,
    filteredHabits,
    filteredResources,

    projectStats,
    wellbeingStats,

    // Setters
    setProjects,
    setHabits,
    setResources,

    setSearchTerm,
    setFilterStatus,
    setHabitSearchTerm,
    setResourceSearchTerm,
    setResourceTypeFilter,

    setIsProjectModalOpen,
    setIsTaskModalOpen,
    setIsHabitModalOpen,
    setIsResourceModalOpen,

    setSelectedProject,
    setEditingProject,
    setEditingHabit,
    setEditingResource,

    setProjectForm,
    setTaskForm,
    setHabitForm,
    setResourceForm,

    // Form Handlers
    handleProjectSubmit,
    handleTaskSubmit,
    handleHabitSubmit,
    handleResourceSubmit,

    // Reset Handlers
    resetProjectForm,
    resetTaskForm,
    resetHabitForm,
    resetResourceForm,

    // Edit Handlers
    handleEditProject,
    handleEditHabit,
    handleEditResource,

    // Delete Handlers
    handleDeleteProject,
    handleDeleteHabit,
    handleDeleteResource,

    // Task Status Handler
    handleTaskStatusUpdate,

    // Utility Functions
    getStatusInfo,
    getTaskStatusInfo,
    getCategoryInfo,
    getResourceTypeInfo,
    getWorkerById,
  };
}
