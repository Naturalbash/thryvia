"use client";

import React from "react";
import { Clock } from "lucide-react";
import { ITimeTracking } from "@/interfaces";

type TimeTrackingCardProps = {
  time_tracking: ITimeTracking;
};

function TimeTrackingCard({ time_tracking }: TimeTrackingCardProps) {
  if (!time_tracking) {
    return <div>No time tracking data available.</div>;
  }
  const { hours_spent, hours_target } = time_tracking;
  const growthPercentage = 90;
  console.log(time_tracking);

  return (
    <div className="flex flex-col gap-12 bg-white w-full rounded-lg shadow-md p-4 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Clock className="h-5 w-5 text-blue-500" />
        </div>

        <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
          <span className="mr-0.5">↑</span> {growthPercentage.toFixed(1)}%
        </div>
      </div>

      <div>
        <p className="text-md font-medium text-gray-500">Time spent</p>

        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-bold text-gray-700">
            {hours_spent / 3600}
          </span>
          <span className="ml-1 text-xl font-medium text-gray-600">
            /{hours_target / 3600} hrs
          </span>
        </div>
      </div>
    </div>
  );
}

export default TimeTrackingCard;
