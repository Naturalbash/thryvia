"use client";

import React from "react";
import { List, Award } from "lucide-react";
import DailyProgressIndicator from "./daily-progres-indicator";

type ProgressIndicatorProps = {
  overallProgress: number;
  habitsProgress: {
    completed: number;
    total: number;
  };
};

const ProgressIndicator = ({
  overallProgress,
  habitsProgress,
}: ProgressIndicatorProps) => {
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-semibold">Daily Progress</h2>
          </div>

          <DailyProgressIndicator progress={overallProgress} />

          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <List className="h-4 w-4 text-green-500" />
                <h3 className="font-medium">Habits</h3>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-gray-600">Daily habits</span>
                <span className="font-semibold">
                  {habitsProgress.completed}/{habitsProgress.total} completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
