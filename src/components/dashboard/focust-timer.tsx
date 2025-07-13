"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeInput {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function FocusTimer() {
  const [timeInput, setTimeInput] = useState<TimeInput>({
    hours: 0,
    minutes: 25,
    seconds: 0,
  });
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isSettingTime, setIsSettingTime] = useState(true);

  // Convert time input to total seconds
  const getTotalSeconds = (time: TimeInput) => {
    return time.hours * 3600 + time.minutes * 60 + time.seconds;
  };

  // Convert total seconds back to time format
  const getTimeFromSeconds = (totalSeconds: number): TimeInput => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  };

  // Format time for display
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Handle time input changes
  const handleTimeChange = (field: keyof TimeInput, value: string) => {
    const numValue = parseInt(value) || 0;
    setTimeInput(prev => ({
      ...prev,
      [field]: Math.max(0, numValue)
    }));
  };

  // Start the timer
  const startTimer = () => {
    const totalSeconds = getTotalSeconds(timeInput);
    if (totalSeconds > 0) {
      setSecondsLeft(totalSeconds);
      setIsRunning(true);
      setIsSettingTime(false);
    }
  };

  // Pause/Resume timer
  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setSecondsLeft(0);
    setIsSettingTime(true);
  };

  // Countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsRunning(false);
            setIsBreak((prevBreak) => !prevBreak);
            if (!isBreak) {
              setSessionsCompleted((prev) => prev + 1);
            }
            // Set break time (5 minutes) or return to time setting
            const breakTime = 5 * 60;
            setSecondsLeft(isBreak ? 0 : breakTime);
            if (isBreak) {
              setIsSettingTime(true);
            }
            return isBreak ? 0 : breakTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, isBreak]);

  // Update time input when timer is reset
  useEffect(() => {
    if (isSettingTime && secondsLeft === 0) {
      setTimeInput({ hours: 0, minutes: 25, seconds: 0 });
    }
  }, [isSettingTime, secondsLeft]);

  return (
    <div className="p-3 sm:p-4 bg-white rounded-lg shadow-md flex flex-col gap-3 sm:gap-4">
      <h2 className="text-lg sm:text-xl font-semibold text-center border-b border-gray-100 pb-2">
        Focus Timer
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-8">
        Set your focus time and start a productive session. Take mindful breaks to maintain momentum.
      </p>

      {/* Time Setting Interface */}
      {isSettingTime && (
        <div className="space-y-4 mb-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="hours" className="text-xs text-gray-600">Hours</Label>
              <Input
                id="hours"
                type="number"
                min="0"
                max="23"
                value={timeInput.hours}
                onChange={(e) => handleTimeChange('hours', e.target.value)}
                className="text-center"
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="minutes" className="text-xs text-gray-600">Minutes</Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={timeInput.minutes}
                onChange={(e) => handleTimeChange('minutes', e.target.value)}
                className="text-center"
                placeholder="25"
              />
            </div>
            <div>
              <Label htmlFor="seconds" className="text-xs text-gray-600">Seconds</Label>
              <Input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={timeInput.seconds}
                onChange={(e) => handleTimeChange('seconds', e.target.value)}
                className="text-center"
                placeholder="0"
              />
            </div>
          </div>
          <Button
            onClick={startTimer}
            disabled={getTotalSeconds(timeInput) === 0}
            className="w-full bg-slate-800 text-sm sm:text-base py-2 sm:py-3"
          >
            Start Focus Session
          </Button>
        </div>
      )}

      {/* Timer Display */}
      {!isSettingTime && (
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div className="text-3xl sm:text-4xl font-bold text-center">
            {formatTime(secondsLeft)}
          </div>
          <p className="text-center text-xs sm:text-sm text-gray-500">
            {isBreak ? "Break Time" : "Focus Session"}
          </p>
          
          {/* Timer Controls */}
          <div className="flex gap-2">
            <Button
              onClick={toggleTimer}
              className="flex-1 bg-slate-800 text-sm sm:text-base py-2 sm:py-3"
            >
              {isRunning ? "Pause" : "Resume"}
            </Button>
            <Button
              onClick={resetTimer}
              variant="outline"
              className="flex-1 text-sm sm:text-base py-2 sm:py-3"
            >
              Reset
            </Button>
          </div>
        </div>
      )}

      {/* Sessions Counter */}
      <p className="text-center text-xs sm:text-sm text-gray-500">
        Sessions Completed Today:{" "}
        <span className="font-medium">{sessionsCompleted}</span>
      </p>
    </div>
  );
}

// In your TypeScript model/interface
type FocusTimer = {
  id: string;
  user_id: string;
  focus_duration: string; // Format: "HH:MM:SS"
  // other fields...
};
