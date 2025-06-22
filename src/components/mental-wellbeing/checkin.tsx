"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

interface Day {
  date: string;
  dayName: string;
  isToday: boolean;
  isCheckedIn: boolean;
  fullDate: string;
}

interface DailyCheckinCalendarProps {
  onCheckInUpdate?: (isCheckedIn: boolean) => void;
}

const getWeekDays = (): Day[] => {
  const today = new Date();
  const week: Day[] = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() - today.getDay() + i);
    const isToday = date.toDateString() === today.toDateString();
    const fullDate = date.toISOString().split("T")[0];

    week.push({
      date: date.getDate().toString(),
      dayName: dayNames[date.getDay()],
      isToday,
      isCheckedIn: false,
      fullDate,
    });
  }

  return week;
};

const DailyCheckinCalendar: React.FC<DailyCheckinCalendarProps> = ({
  onCheckInUpdate,
}) => {
  const [days, setDays] = useState<Day[]>(getWeekDays());
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("dailyCheckins");
    if (savedData) {
      const checkedDates = JSON.parse(savedData) as string[];
      setDays((prev) =>
        prev.map((day) => ({
          ...day,
          isCheckedIn: checkedDates.includes(day.fullDate),
        }))
      );
    }
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayStatus =
      days.find((d) => d.fullDate === today)?.isCheckedIn || false;
    if (onCheckInUpdate) {
      onCheckInUpdate(todayStatus);
    }

    const allCheckedIn = days.every((day) => day.isCheckedIn);
    if (allCheckedIn) {
      setShowCongrats(true);

      setTimeout(() => {
        setShowCongrats(false);
        localStorage.removeItem("dailyCheckins");
        const reset = getWeekDays();
        setDays(reset);
        if (onCheckInUpdate) {
          onCheckInUpdate(false);
        }
      }, 3000); // Wait for 3s to show message before reset
    }
  }, [days, onCheckInUpdate]);

  const handleCheckIn = (index: number) => {
    setDays((prev) => {
      if (prev[index].isCheckedIn) return prev;

      const updated = prev.map((day, i) =>
        i === index ? { ...day, isCheckedIn: true } : day
      );

      const checkedDates = updated
        .filter((day) => day.isCheckedIn)
        .map((day) => day.fullDate);
      localStorage.setItem("dailyCheckins", JSON.stringify(checkedDates));

      return updated;
    });
  };

  const getDayStatusClass = (day: Day) => {
    if (day.isCheckedIn) {
      return day.isToday
        ? "bg-green-500 text-white"
        : "bg-gray-300 text-gray-600 opacity-70";
    } else {
      return day.isToday
        ? "bg-white border-2 border-green-500 text-green-600"
        : "bg-white border border-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="h-5 w-5 text-green-500" />
        <h2 className="text-xl font-semibold">Your Daily Check-ins</h2>
      </div>
      <p className="text-gray-500 text-md mb-6">
        Track your daily meditation activity
      </p>

      <div className="flex justify-between gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center w-12 h-20 rounded-full cursor-pointer transition-all duration-300 ${getDayStatusClass(
              day
            )} hover:shadow-md`}
            onClick={() => handleCheckIn(index)}
          >
            <span className="text-sm font-semibold">{day.date}</span>
            <span className="text-xs">{day.dayName}</span>
            {day.isCheckedIn && (
              <span className="mt-2 w-2 h-2 rounded-full bg-green-400"></span>
            )}
          </div>
        ))}
      </div>

      {showCongrats && (
        <div className="my-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center text-md font-semibold">
          🎉 Congratulations on completing all 7 check-ins this week!
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Weekly progress</span>
          <span className="text-green-500 font-md">
            {days.filter((d) => d.isCheckedIn).length}/7 days
          </span>
        </div>
        <div className="mt-2 bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full transition-all duration-500"
            style={{
              width: `${(days.filter((d) => d.isCheckedIn).length / 7) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckinCalendar;
