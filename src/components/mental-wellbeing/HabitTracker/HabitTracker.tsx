"use client";

import React, { useState, useEffect } from "react";
import { Clock, Heart, Droplets, Brain, Users, Book, Moon } from "lucide-react";
import HabitItem from "./HabitItem";
import { Habit, HabitCategory } from "./habit";
import "./HabitTracker.css";

interface HabitTrackerProps {
  onHabitsChange?: (completedCount: number, totalCount: number) => void;
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
    completed: false,
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
    completed: false,
  },
  {
    id: "3",
    name: "Meditation session",
    time: "08:30 am",
    duration: "15min",
    category: HabitCategory.MINDFULNESS,
    icon: "brain",
    tags: ["mindfulness", "stress-relief"],
    completed: false,
  },
  {
    id: "4",
    name: "Virtual coffee with team",
    time: "10:30 am",
    duration: "30min",
    category: HabitCategory.SOCIAL,
    icon: "users",
    tags: ["connection", "team-building"],
    completed: false,
  },
  {
    id: "5",
    name: "Desk stretching",
    time: "12:00 pm",
    duration: "10min",
    category: HabitCategory.PHYSICAL,
    icon: "activity",
    tags: ["flexibility", "posture"],
    completed: false,
  },
  {
    id: "6",
    name: "Read a book",
    time: "07:00 pm",
    duration: "30min",
    category: HabitCategory.GROWTH,
    icon: "book",
    tags: ["learning", "relaxation"],
    completed: false,
  },
  {
    id: "7",
    name: "Screen-free time",
    time: "09:00 pm",
    duration: "60min",
    category: HabitCategory.MINDFULNESS,
    icon: "eye",
    tags: ["digital-detox", "relaxation"],
    completed: false,
  },
  {
    id: "8",
    name: "Quality sleep",
    time: "10:30 pm",
    duration: "8h",
    category: HabitCategory.REST,
    icon: "moon",
    tags: ["recovery", "energy"],
    completed: false,
  },
];

const HabitTracker: React.FC<HabitTrackerProps> = ({ onHabitsChange }) => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [activeTab, setActiveTab] = useState<"Habits" | "Completed">("Habits");

  const toggleHabitCompletion = (id: string) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
  };

  useEffect(() => {
    if (onHabitsChange) {
      const completedCount = habits.filter((h) => h.completed).length;
      onHabitsChange(completedCount, habits.length);
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
    activeTab === "Habits" ? !habit.completed : habit.completed
  );

  const completedCount = habits.filter((habit) => habit.completed).length;

  return (
    <div className="habit-tracker bg-white rounded-lg shadow-md overflow-hidden w-full">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Habit tracker</h2>

        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "Habits"
                ? "text-[#8B5CF6] border-b-2 border-[#8B5CF6]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Habits")}
          >
            Habits
          </button>
          <button
            className={`py-2 px-4 font-medium flex items-center ${
              activeTab === "Completed"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Completed")}
          >
            Completed
            {completedCount > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                {completedCount}
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
                ? "All habits completed! 🎉"
                : "No completed habits yet"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
