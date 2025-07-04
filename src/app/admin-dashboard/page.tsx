import AdminDashboard from "@/components/admin-dashboard/admin-dashboard";
import { Metadata } from "next";
import "../dashboard/thryvia.css";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function Page() {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
