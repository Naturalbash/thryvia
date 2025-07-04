import React from "react";
import { Clock, MapPin, Heart } from "lucide-react";
import { Habit } from "./habit";

interface HabitItemProps {
  habit: Habit;
  icon: React.ReactNode;
  onToggle: () => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, icon, onToggle }) => {
  return (
    <div
      className={`habit-item bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:shadow-sm ${
        habit.Completed ? "Completed border-l-4" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="icon-wrapper">{icon}</div>
          <div>
            <h3 className="text-gray-800 font-medium">{habit.name}</h3>
            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{habit.time}</span>
              </div>

              {habit.location && (
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  <span>{habit.location}</span>
                </div>
              )}

              {habit.heartRate && (
                <div className="flex items-center">
                  <Heart size={14} className="mr-1" />
                  <span>{habit.heartRate}</span>
                </div>
              )}

              <div className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                {habit.duration}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`h-5 w-5 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-200 ${
            habit.Completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-400"
          }`}
          onClick={onToggle}
        >
          {habit.Completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
