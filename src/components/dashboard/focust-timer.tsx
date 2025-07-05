"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const defaultSession = 1 * 60;
const defaultBreak = 5 * 60;

export default function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(defaultSession);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  console.log(sessionsCompleted);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsRunning(false);
            setIsBreak((prevBreak) => !prevBreak);
            if (!isBreak) {
              setSessionsCompleted((prev) => prev + 1);
            }
            return isBreak ? defaultSession : defaultBreak;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isBreak]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="p-3 sm:p-4 bg-white rounded-lg shadow-md flex flex-col gap-3 sm:gap-4">
      <h2 className="text-lg sm:text-xl font-semibold text-center border-b border-gray-100 pb-2">
        Focus Timer
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-8">
        Use this timer to stay focused during your work sessions. Set your
        intention and start a focused session. When the timer ends, take a
        mindful break. Repeat to build momentum.
      </p>
      <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-8">
        <div className="text-3xl sm:text-4xl font-bold text-center">
          {formatTime(secondsLeft)}
        </div>
        <p className="text-center text-xs sm:text-sm text-gray-500">
          {isBreak ? "Break Time" : "Focus Session"}
        </p>
      </div>
      <Button
        onClick={() => setIsRunning((prev) => !prev)}
        className="w-full bg-slate-800 text-sm sm:text-base py-2 sm:py-3"
      >
        {isRunning ? "Pause" : "Start"}
      </Button>
      <p className="text-center text-xs sm:text-sm text-gray-500">
        Sessions Completed Today:{" "}
        <span className="font-medium">{sessionsCompleted}</span>
      </p>
    </div>
  );
}
