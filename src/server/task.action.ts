"use server";

import { ITask } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";

export async function fetchProjectTasks(project_id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", project_id);

  if (error) throw new Error(`Error fetching Project tasks`);

  return data as ITask[];
}
