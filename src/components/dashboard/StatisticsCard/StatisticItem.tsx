import React from "react";

interface StatisticItemProps {
  label: string;
  value: string;
  color: string;
}

const StatisticItem: React.FC<StatisticItemProps> = ({
  label,
  value,
  color,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-xs font-semibold text-gray-700">{label}: </span>
      <span className="text-xs font-semibold text-gray-700">{value}</span>
    </div>
  );
};

export default StatisticItem;
