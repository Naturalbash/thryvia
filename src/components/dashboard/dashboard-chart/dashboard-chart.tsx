"use client";
import { useProjects } from "@/context/stats-context";
import { computeProjectStatusStats } from "@/lib/utils";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardChart() {
  const { projects } = useProjects();
  const stats = computeProjectStatusStats(projects);

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={stats}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          barSize={80}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 50, right: 10 }}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip formatter={(value) => `${value}`} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="percentage"
            fill="#334155"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
