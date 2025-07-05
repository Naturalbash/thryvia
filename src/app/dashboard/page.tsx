import "../dashboard/thryvia.css";
import DashboardChartOverall from "@/components/dashboard/dashboard-chart/dashboard-overall-chart";
import FilterDays from "@/components/dashboard/Filter-days";
import FocusTimer from "@/components/dashboard/focust-timer";
import OngoingProject from "@/components/dashboard/project-ongoing";
import ProjectSummary from "@/components/dashboard/projectSummary";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import TimeTrackingCard from "@/components/dashboard/TimeTrackingCard";
import { TodaysTask } from "@/components/dashboard/todays-task";
import { ProjectsProvider } from "@/context/stats-context";
import { computeProjectStatusStats, filterOngoingProject } from "@/lib/utils";
import { fetchUserProjects } from "@/server/project.action";
import { fetchProjectTasks } from "@/server/task.action";
import { fetchProjectTimeTracking } from "@/server/time.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const projects = await fetchUserProjects();
  const ongoingProject = filterOngoingProject(projects);
  const time_tracking = await fetchProjectTimeTracking(ongoingProject.id);
  const tasks = await fetchProjectTasks(ongoingProject.id);
  console.log(computeProjectStatusStats(projects));

  return (
    <ProjectsProvider projects={projects}>
      <div className="py-2 px-2 sm:py-4 sm:px-4 font-sans space-y-4">
        <FilterDays />
        
        {/* Main cards grid - responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* First column - stacked on mobile, side by side on larger screens */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <TimeTrackingCard time_tracking={time_tracking} />
            <TodaysTask tasks={tasks} />
          </div>
          
          {/* Other cards */}
          <StatisticsCard />
          <OngoingProject />
          <FocusTimer />
        </div>
        
        {/* Bottom section - responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <ProjectSummary />
          <DashboardChartOverall />
        </div>
      </div>
    </ProjectsProvider>
  );
}
