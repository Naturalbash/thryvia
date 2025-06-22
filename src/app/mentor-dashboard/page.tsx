import { MentorDashboard } from "@/components/mentor-dashboard/mentor-dashboard";
import { Metadata } from "next";
import "../dashboard/thryvia.css";

const mockMentor = {
  id: "m1",
  name: "Dr. Lisa Raymond",
  avatar: "/dave.jpg",
  title: "Senior Career Coach",
  isOnline: true,
  lastSeen: "two weeks ago",
};

export const metadata: Metadata = {
  title: "Mentor Dashboard",
};

export default function Page() {
  return (
    <div>
      <MentorDashboard currentMentor={mockMentor} />
    </div>
  );
}
