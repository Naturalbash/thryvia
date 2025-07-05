"use client";

import MindfulnessTools from "@/components/mental-wellbeing/meditation-tools";
import MentalHealthLibrary from "@/components/mental-wellbeing/health-library";
import DailyCheckinCalendar from "@/components/mental-wellbeing/checkin";
import HabitTracker from "@/components/mental-wellbeing/HabitTracker/HabitTracker";
import ProgressIndicator from "@/components/mental-wellbeing/progress-indicator";
import { useProgressHook } from "@/hooks/use-progress-hook";

export default function Page() {
  const { handleHabitsUpdate, habitsProgress, overallProgress } =
    useProgressHook();
  return (
    <div className="p-2 sm:p-4 space-y-4">
      {/* Mobile layout - stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Left column */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <DailyCheckinCalendar />
          <HabitTracker onHabitsChange={handleHabitsUpdate} />
        </div>
        
        {/* Center column */}
        <div className="lg:col-span-1">
          <MentalHealthLibrary />
        </div>
        
        {/* Right column */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <ProgressIndicator
            habitsProgress={habitsProgress}
            overallProgress={overallProgress}
          />
          <MindfulnessTools />
        </div>
      </div>
    </div>
  );
}
