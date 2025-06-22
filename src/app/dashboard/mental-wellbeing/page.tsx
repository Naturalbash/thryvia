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
    <div className="flex gap-4 p-4">
      <div className="flex flex-col gap-4">
        <DailyCheckinCalendar />
        <HabitTracker onHabitsChange={handleHabitsUpdate} />
      </div>
      <div>
        <MentalHealthLibrary />
      </div>
      <div className="flex flex-col gap-4">
        <ProgressIndicator
          habitsProgress={habitsProgress}
          overallProgress={overallProgress}
        />
        <MindfulnessTools />
      </div>
    </div>
  );
}
