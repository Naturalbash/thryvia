export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  status: "online" | "offline";
  last_seen: Date;
  created_at: Date;
  role: "worker" | "mentor" | "admin";
  occupation?: string;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  due_date: Date;
  status: "Completed" | "Delayed" | "On going" | "At risk";
  color: string;
  user_id: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  project_id: number;
}

export interface ITimeTracking {
  id: number;
  hours_spent: number;
  hours_target: number;
  project_id: number;
}
