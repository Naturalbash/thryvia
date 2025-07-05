"use client";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import CircularProgress from "./CircularProgress";
import StatisticItem from "./StatisticItem";
import InfoMessage from "./InfoMessage";
import { useProjects } from "@/context/stats-context";

interface StatisticsCardProps {
  title?: string;
  className?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title = "Project Statistics",
  className = "",
}) => {
  const { projects } = useProjects();
  const totalProjects = projects.length;
  const CompletedCount = projects.filter(
    (p) => p.status === "Completed"
  ).length;
  const percentage =
    totalProjects > 0 ? (CompletedCount / totalProjects) * 100 : 0;
  const remainingPercentage = 100 - percentage;

  return (
    <div
      className={`flex flex-col justify-between bg-white rounded-lg shadow-md p-3 sm:p-4 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold text-center">{title}</h2>
        <button className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200">
          <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 cursor-pointer" />
        </button>
      </div>

      <div className="flex justify-center mb-4 sm:mb-6">
        <CircularProgr
          percentage={Math.round(percentage)}
          className="transform transition-transform hover:scale-110 sm:hover:scale-115 duration-300"
        />
      </div>

      <div>
        <h3 className="text-sm sm:text-md font-semibold text-gray-800 mb-2">
          Activity Record
        </h3>
        <div className="flex gap-3 sm:gap-6 mb-4 sm:mb-6">
          <StatisticItem
            label="Completed"
            value={`${Math.round(percentage)}%`}
            color="bg-gradient-to-r from-green-500 to-emerald-500"
          />
          <StatisticItem
            label="In Progress"
            value={`${Math.round(remainingPercentage)}%`}
            color="bg-gray-300"
          />
        </div>
      </div>

      <InfoMessage message="You're making good progress on your projects!" />
    </div>
  );
};

export default StatisticsCard;
