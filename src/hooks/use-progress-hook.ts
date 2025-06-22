"use client";
import { useState, useEffect } from "react";

export function useProgressHook() {
  const [overallProgress, setOverallProgress] = useState(0);
  const [habitsProgress, setHabitsProgress] = useState({
    completed: 0,
    total: 0,
  });

  // Calculate progress based ONLY on habits
  useEffect(() => {
    if (habitsProgress.total > 0) {
      const progress = (habitsProgress.completed / habitsProgress.total) * 100;
      setOverallProgress(progress);
    } else {
      setOverallProgress(0);
    }
  }, [habitsProgress]);

  const handleHabitsUpdate = (completedCount: number, totalCount: number) => {
    setHabitsProgress((prev) => {
      if (prev.completed === completedCount && prev.total === totalCount) {
        return prev; // Prevent unnecessary state update
      }
      return { completed: completedCount, total: totalCount };
    });
  };

  return {
    overallProgress,
    habitsProgress,
    handleHabitsUpdate,
  };
}
