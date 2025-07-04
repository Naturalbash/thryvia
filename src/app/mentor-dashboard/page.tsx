import { MentorDashboard } from "@/components/mentor-dashboard/mentor-dashboard";
import { Metadata } from "next";
import "../dashboard/thryvia.css";
import { getCurrentUser } from "@/server/auth.action";

export const metadata: Metadata = {
  title: "Mentor Dashboard",
};

export default async function Page() {
  const user = await getCurrentUser();
  console.log("Current User:", user);
  return (
    <div>
      <MentorDashboard currentMentor={user} />
    </div>
  );
}
