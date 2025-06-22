"use client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProject } from "@/interfaces";
import { useProjects } from "@/context/stats-context";

export default function ProjectSummary() {
  const [status, setStatus] = useState("All");
  const { projects } = useProjects();
  const filteredProjects = projects.filter(
    (projects) => projects.status === status
  );

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-6">
        <h2 className="text-lg font-semibold">Project Summary</h2>
        <div className="flex justify-center self-center gap-2">
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-[120px] bg-gray-50 text-sm font-normal">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Delayed">Delayed</SelectItem>
              <SelectItem value="At risk">At risk</SelectItem>
              <SelectItem value="Ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1fr_1fr] gap-8 mb-4 text-base font-medium">
        <span>Name</span>
        <span>Due date</span>
        <span>Status</span>
      </div>
      <ul>
        {status === "All"
          ? projects.map((proj) => <Project key={proj.id} project={proj} />)
          : filteredProjects.map((proj) => (
              <Project key={proj.id} project={proj} />
            ))}
      </ul>
    </div>
  );
}

type ProjectProps = {
  project: IProject;
};

function formatProjectDate(due_date: unknown): string {
  if (!due_date) return "No due date";
  let dateObj: Date;
  if (typeof due_date === "string" || typeof due_date === "number") {
    dateObj = new Date(due_date);
  } else {
    dateObj = due_date as Date;
  }
  if (isNaN(dateObj.getTime())) return "Invalid date";
  return dateObj.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function Project({ project }: ProjectProps) {
  return (
    <li className="grid grid-cols-[2fr_1fr_1fr] gap-8 items-center mb-4 text-sm font-normal">
      <span className={project.color}>{project.title}</span>
      <span>{formatProjectDate(project.due_date)}</span>
      <span
        className={`bg-gray-100 p-1 rounded-sm font-normal ${project.color} w-20`}
      >
        {project.status}
      </span>
    </li>
  );
}
