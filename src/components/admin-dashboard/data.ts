export interface Worker {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skills: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "Completed";
  created_at: string;
  project_id: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: "At risk" | "On going" | "Completed" | "Delayed";
  workerId: string;
  tasks: Task[];
  created_at: string;
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  category: "physical" | "mental" | "social" | "productivity";
  frequency: "daily" | "weekly" | "monthly";
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "podcast";
  url: string;
  category:
    | "stress-management"
    | "productivity"
    | "mindfulness"
    | "work-life-balance"
    | "communication";
  created_at: string;
}

export const initialHabits: Habit[] = [
  {
    id: "1",
    title: "Morning Meditation",
    description: "10 minutes of mindfulness meditation to start the day",
    category: "mental",
    frequency: "daily",
    created_at: "2024-01-01",
  },
  {
    id: "2",
    title: "Daily Exercise",
    description: "30 minutes of physical activity (walking, yoga, or workout)",
    category: "physical",
    frequency: "daily",
    created_at: "2024-01-01",
  },
  {
    id: "3",
    title: "Team Check-in",
    description:
      "Connect with at least one team member for non-work conversation",
    category: "social",
    frequency: "daily",
    created_at: "2024-01-01",
  },
  {
    id: "4",
    title: "Deep Work Session",
    description: "2-hour focused work session without distractions",
    category: "productivity",
    frequency: "daily",
    created_at: "2024-01-01",
  },
];

export const initialResources: Resource[] = [
  {
    id: "1",
    title: "Managing Remote Work Stress",
    description:
      "Comprehensive guide on identifying and managing stress in remote work environments",
    type: "article",
    url: "https://example.com/remote-stress-management",
    category: "stress-management",
    created_at: "2024-01-01",
  },
  {
    id: "2",
    title: "Productivity Techniques for Remote Workers",
    description:
      "Video series covering Pomodoro, time-blocking, and other productivity methods",
    type: "video",
    url: "https://example.com/productivity-techniques",
    category: "productivity",
    created_at: "2024-01-01",
  },
  {
    id: "3",
    title: "Mindful Remote Work Podcast",
    description:
      "Weekly podcast discussing mindfulness practices for remote professionals",
    type: "podcast",
    url: "https://example.com/mindful-remote-podcast",
    category: "mindfulness",
    created_at: "2024-01-01",
  },
  {
    id: "4",
    title: "Work-Life Balance in Digital Age",
    description:
      "Research-based article on maintaining healthy boundaries while working remotely",
    type: "article",
    url: "https://example.com/work-life-balance",
    category: "work-life-balance",
    created_at: "2024-01-01",
  },
];
