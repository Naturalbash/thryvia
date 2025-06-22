"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DashboardChart from "./dashboard-chart";

export default function DashboardChartOverall() {
  const [status, setStatus] = useState("");
  return (
    <div className="flex flex-col justify-between p-4 bg-white shadow-md rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
        <h2 className="text-lg font-semibold self-center">Overall progress</h2>
        <Select value={status} onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-[120px] bg-white text-sm font-normal">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Ongoing">Ongoing</SelectItem>
            <SelectItem value="At risk">At risk</SelectItem>
            <SelectItem value="Delayed">Delayed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DashboardChart />
    </div>
  );
}
