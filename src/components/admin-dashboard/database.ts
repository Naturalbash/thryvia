import { IProject } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";

export async function addProject(project: Partial<IProject>) {
  const supabase = createClient();

  const { error } = await supabase.from("projects").insert(project);

  if (error) throw new Error(`Error creating project`);
}

export async function fetchWorkers() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "worker");

  if (error) throw new Error(`Error fetching workers`);

  const shapedData = data.map((w) => ({
    id: w.id,
    name: `${w.first_name} ${w.last_name}`,
    email: w.email,
    avatar: `${w.first_name[0]} ${w.last_name[0]}`.toUpperCase(),
    skills: [],
  }));

  return shapedData;
}
