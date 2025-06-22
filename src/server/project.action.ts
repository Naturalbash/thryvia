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
