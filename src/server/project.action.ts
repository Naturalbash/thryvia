/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { IProject } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";

export async function fetchUserProjects(
  user_id: string = "0c4cd3cc-9f8c-4359-a77e-4695ba31927f"
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new Error(`Error getting user projects`);

  return data as IProject[];
}

export async function fetchALlProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").select("*, tasks(*)");

  if (error) throw new Error(`Error getting user projects`);

  const shapedData = data.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    due_date: p.due_date,
    status: p.status,
    workerId: p.user_id,
    tasks: p.tasks.map((t: any) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      created_at: t.created_at,
      status: t.completed ? "Completed" : "pending",
    })),
    created_at: p.created_at,
  }));

  return shapedData;
}
