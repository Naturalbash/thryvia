import { User } from "lucide-react";
import React from "react";

export default function AdminDashboardHeader() {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-3 sm:gap-0">
          {/* Mobile: Icon on top, all centered; Desktop: icon right, content left */}
          <div className="flex flex-col w-full sm:w-auto items-center sm:items-start text-center sm:text-left">
            <div className="flex justify-center sm:hidden mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-800 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage remote work projects and team wellbeing
            </p>
          </div>
          <div className="hidden sm:flex items-center justify-end mt-2 sm:mt-0">
            <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-800 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
