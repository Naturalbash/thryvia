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

/**
 * Update task completion status in the database
 * @param taskId - The ID of the task to update
 * @param completed - The new completion status (true/false)
 * @returns Updated task data
 */
export async function updateTaskCompletion(taskId: string, completed: boolean) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .update({ completed: completed })
    .eq("id", taskId)
    .select();

  if (error) throw new Error(`Error updating task completion status`);

  return data[0] as ITask;
}
