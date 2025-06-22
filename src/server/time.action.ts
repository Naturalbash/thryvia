"use server";

import { ITimeTracking } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";

export async function fetchProjectTimeTracking(project_id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("time_trackings")
    .select("*")
    .eq("project_id", project_id)
    .maybeSingle();

  if (error) throw new Error(`Error fetching Project time tracking`);

  return data as ITimeTracking;
}
