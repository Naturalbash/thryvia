import { IUser } from "@/interfaces";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";

interface MentorSidebarProps {
  mentors: IUser[];
  selectedMentor: IUser | null;
  onSelectMentor: (mentor: IUser) => void;
}

export const MentorSidebar = ({
  mentors,
  selectedMentor,
  onSelectMentor,
}: MentorSidebarProps) => {
  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Mentors</h1>
        <p className="text-sm text-gray-500 mt-1">Connect with your mentors</p>
      </div>

      {/* Mentor List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 w-full">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              onClick={() => onSelectMentor(mentor)}
              className={cn(
                "flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 w-full",
                selectedMentor?.id === mentor.id &&
                  "bg-blue-50 border border-blue-200"
              )}
            >
              <div className="relative">
                <Image
                  src={mentor.avatar_url}
                  alt={mentor.first_name + " " + mentor.last_name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div
                  className={cn(
                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                    mentor.status === "online" ? "bg-green-400" : "bg-gray-300"
                  )}
                />
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {mentor.first_name} {mentor.last_name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {mentor.occupation}
                </p>
                {mentor.status !== "online" && mentor.last_seen && (
                  <p className="text-xs text-gray-400">
                    Last seen {format(mentor.last_seen, "h:mm a")}
                  </p>
                )}
              </div>
              {mentor.status === "online" && (
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">You</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Your Account</p>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};
