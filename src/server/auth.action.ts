"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { IUser } from "@/interfaces";
import { getUserDashboardUrl } from "@/lib/utils";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  const user = await getCurrentUser();

  //   revalidatePath("/", "layout");
  redirect(getUserDashboardUrl(user));
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user?.id)
    .maybeSingle();

  if (!user || error) {
    redirect("/sign-in");
  }

  return user as IUser;
}

export async function getUserById(userId: string) {
  const supabase = await createClient();
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (!user || error) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return user as IUser;
}
