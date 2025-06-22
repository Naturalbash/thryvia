import React from "react";
import { Info } from "lucide-react";

interface InfoMessageProps {
  message: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center space-x-2 tracking-tight text-sm text-gray-600 p-2 bg-gray-100 rounded-md">
      <Info size={22} className="text-blue-500" />
      <p>{message}</p>
    </div>
  );
};

export default InfoMessage;
