import { IProject, IUser } from "@/interfaces";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterOngoingProject(projects: IProject[]) {
  return projects.filter((project) => project.status === "On going")[0];
}

interface StatusStat {
  name: string;
  percentage: number;
}

export function computeProjectStatusStats(projects: IProject[]): StatusStat[] {
  const total = projects.length;

  const statusCounts: Record<string, number> = {
    Completed: 0,
    "On going": 0,
    "At risk": 0,
    Delayed: 0,
  };

  for (const project of projects) {
    if (statusCounts.hasOwnProperty(project.status)) {
      statusCounts[project.status]++;
    }
  }

  const result: StatusStat[] = Object.entries(statusCounts).map(
    ([status, count]) => ({
      name: status,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    })
  );

  return result;
}

export function getUserDashboardUrl(user: IUser) {
  if (user.role === "mentor") {
    return "/mentor-dashboard";
  } else if (user.role === "worker") {
    return "/dashboard";
  } else if (user.role === "admin") {
    return "/admin-dashboard";
  }
  return "/";
}
