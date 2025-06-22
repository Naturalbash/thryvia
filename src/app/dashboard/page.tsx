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
      <div className="py-4 px-4 font-sans grid grid-col-1 gap-4">
        <FilterDays />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <TimeTrackingCard time_tracking={time_tracking} />
            <TodaysTask tasks={tasks} />
          </div>
          <StatisticsCard />
          <OngoingProject />
          <FocusTimer />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ProjectSummary />
          <DashboardChartOverall />
        </div>
      </div>
    </ProjectsProvider>
  );
}
