"use client";

import React, { useState, useEffect } from "react";
import { Clock, Heart, Droplets, Brain, Users, Book, Moon } from "lucide-react";
import HabitItem from "./HabitItem";
import { Habit, HabitCategory } from "./habit";
import "./HabitTracker.css";

interface HabitTrackerProps {
  onHabitsChange?: (CompletedCount: number, totalCount: number) => void;
}

const initialHabits: Habit[] = [
  {
    id: "1",
    name: "Morning run",
    time: "07:00 am",
    duration: "45min",
    category: HabitCategory.PHYSICAL,
    icon: "activity",
    tags: ["cardio", "outdoor"],
    Completed: false,
    location: "park",
    heartRate: "140bpm",
  },
  {
    id: "2",
    name: "1.5L of water daily",
    time: "All day",
    duration: "ongoing",
    category: HabitCategory.NUTRITION,
    icon: "droplet",
    tags: ["hydration"],
    Completed: false,
  },
  {
    id: "3",
    name: "Meditation session",
    time: "08:30 am",
    duration: "15min",
    category: HabitCategory.MINDFULNESS,
    icon: "brain",
    tags: ["mindfulness", "stress-relief"],
    Completed: false,
  },
  {
    id: "4",
    name: "Virtual coffee with team",
    time: "10:30 am",
    duration: "30min",
    category: HabitCategory.SOCIAL,
    icon: "users",
    tags: ["connection", "team-building"],
    Completed: false,
  },
  {
    id: "5",
    name: "Desk stretching",
    time: "12:00 pm",
    duration: "10min",
    category: HabitCategory.PHYSICAL,
    icon: "activity",
    tags: ["flexibility", "posture"],
    Completed: false,
  },
  {
    id: "6",
    name: "Read a book",
    time: "07:00 pm",
    duration: "30min",
    category: HabitCategory.GROWTH,
    icon: "book",
    tags: ["learning", "relaxation"],
    Completed: false,
  },
  {
    id: "7",
    name: "Screen-free time",
    time: "09:00 pm",
    duration: "60min",
    category: HabitCategory.MINDFULNESS,
    icon: "eye",
    tags: ["digital-detox", "relaxation"],
    Completed: false,
  },
  {
    id: "8",
    name: "Quality sleep",
    time: "10:30 pm",
    duration: "8h",
    category: HabitCategory.REST,
    icon: "moon",
    tags: ["recovery", "energy"],
    Completed: false,
  },
];

const HabitTracker: React.FC<HabitTrackerProps> = ({ onHabitsChange }) => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [activeTab, setActiveTab] = useState<"Habits" | "Completed">("Habits");

  const toggleHabitCompletion = (id: string) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, Completed: !habit.Completed } : habit
    );
    setHabits(updatedHabits);
  };

  useEffect(() => {
    if (onHabitsChange) {
      const CompletedCount = habits.filter((h) => h.Completed).length;
      onHabitsChange(CompletedCount, habits.length);
    }
  }, [habits, onHabitsChange]);

  const getCategoryIcon = (category: HabitCategory) => {
    switch (category) {
      case HabitCategory.PHYSICAL:
        return <Heart className="text-rose-500" size={18} />;
      case HabitCategory.NUTRITION:
        return <Droplets className="text-blue-500" size={18} />;
      case HabitCategory.MINDFULNESS:
        return <Brain className="text-purple-500" size={18} />;
      case HabitCategory.SOCIAL:
        return <Users className="text-green-500" size={18} />;
      case HabitCategory.GROWTH:
        return <Book className="text-amber-500" size={18} />;
      case HabitCategory.REST:
        return <Moon className="text-indigo-500" size={18} />;
      default:
        return <Clock className="text-gray-500" size={18} />;
    }
  };

  const filteredHabits = habits.filter((habit) =>
    activeTab === "Habits" ? !habit.Completed : habit.Completed
  );

  const CompletedCount = habits.filter((habit) => habit.Completed).length;

  return (
    <div className="habit-tracker bg-white rounded-lg shadow-md overflow-hidden w-full">
      <div className="p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Habit tracker</h2>

        <div className="flex border-b mb-3 sm:mb-4">
          <button
            className={`py-2 px-3 sm:px-4 text-sm sm:text-base font-semibold ${
              activeTab === "Habits"
                ? "text-[#8B5CF6] border-b-2 border-[#8B5CF6]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Habits")}
          >
            Habits
          </button>
          <button
            className={`py-2 px-3 sm:px-4 text-sm sm:text-base font-medium flex items-center ${
              activeTab === "Completed"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Completed")}
          >
            Completed
            {CompletedCount > 0 && (
              <span className="ml-1 sm:ml-2 bg-blue-100 text-blue-600 text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                {CompletedCount}
              </span>
            )}
          </button>
        </div>

        <div className="space-y-3">
          {filteredHabits.length > 0 ? (
            filteredHabits.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                icon={getCategoryIcon(habit.category)}
                onToggle={() => toggleHabitCompletion(habit.id)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {activeTab === "Habits"
                ? "All habits Completed! 🎉"
                : "No Completed habits yet"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
