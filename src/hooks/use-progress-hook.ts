"use client";
import { useState, useEffect } from "react";

export function useProgressHook() {
  const [overallProgress, setOverallProgress] = useState(0);
  const [habitsProgress, setHabitsProgress] = useState({
    Completed: 0,
    total: 0,
  });

  // Calculate progress based ONLY on habits
  useEffect(() => {
    if (habitsProgress.total > 0) {
      const progress = (habitsProgress.Completed / habitsProgress.total) * 100;
      setOverallProgress(progress);
    } else {
      setOverallProgress(0);
    }
  }, [habitsProgress]);

  const handleHabitsUpdate = (CompletedCount: number, totalCount: number) => {
    setHabitsProgress((prev) => {
      if (prev.Completed === CompletedCount && prev.total === totalCount) {
        return prev; // Prevent unnecessary state update
      }
      return { Completed: CompletedCount, total: totalCount };
    });
  };

  return {
    overallProgress,
    habitsProgress,
    handleHabitsUpdate,
  };
}
