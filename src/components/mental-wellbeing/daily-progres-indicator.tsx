import React from "react";

interface DailyProgressIndicatorProps {
  progress: number; // 0 to 100
}

const DailyProgressIndicator: React.FC<DailyProgressIndicatorProps> = ({
  progress,
}) => {
  // Calculate the circumference of the circle
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  // Calculate the stroke dash offset based on progress
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-50 h-32 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#EDE9FE"
          strokeWidth="10"
        />

        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
      </svg>

      {/* Percentage text in the middle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default DailyProgressIndicator;
