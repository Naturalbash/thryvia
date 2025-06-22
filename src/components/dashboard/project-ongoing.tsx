"use client";

import { useProjects } from "@/context/stats-context";
import { filterOngoingProject } from "@/lib/utils";
import { format } from "date-fns";
import { ChartPie, Accessibility, History } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function OngoingProject() {
  const { projects } = useProjects();
  const project = filterOngoingProject(projects);
  const [formattedDueDate, setFormattedDueDate] = React.useState("");
  React.useEffect(() => {
    if (project && project.due_date) {
      setFormattedDueDate(new Date(project.due_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
    }
  }, [project]);

  return (
    <div className="p-4 bg-white shadow-md flex flex-col rounded-lg">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
        <h2 className="text-lg font-semibold">Ongoing Project</h2>
        <span className="text-xs text-gray-600 font-semibold bg-slate-100 p-2  rounded-full">
          🔥 High Fidelity
        </span>
      </div>
      <h1 className="text-2xl font-semibold text-center mb-3">
        {project.title}
      </h1>
      <p className="text-sm tracking-tight text-center text-gray-600 mb-[auto]">
        {project.description}
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="flex gap-2 items-center">
            <ChartPie size={16} />
            <p className="text-sm font-semibold text-[#333]">Status</p>
          </span>
          <span className="text-xs font-normal bg-slate-300 py-1 px-4 rounded-full">
            In progress
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex gap-2 items-center">
            <Accessibility size={16} />
            <p className="text-sm font-semibold text-[#333]">Assignee</p>
          </span>
          <span className="flex ">
            <Image
              src="/customer-3.jpg"
              className="rounded-full"
              alt="customer-3"
              width={32}
              height={32}
            />
            <Image
              src="/dave.jpg"
              className="rounded-full border-2 border-white ml-[-10px]"
              alt="customer-1"
              width={32}
              height={32}
            />
            <Image
              src="/customer-6.jpg"
              className="rounded-full border-2 border-white ml-[-10px]"
              alt="customer-6"
              width={32}
              height={32}
            />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex gap-2 items-center">
            <History size={16} />
            <p className="text-sm font-semibold text-[#333]">Due Date</p>
          </span>
          <span className="text-xs font-semibold py-1 px-4">
            {formattedDueDate || (project && project.due_date)}
          </span>
        </div>
      </div>
    </div>
  );
}
