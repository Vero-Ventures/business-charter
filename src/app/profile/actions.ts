"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  userId: string;
}

export async function saveProfile(profile: ProfileData) {
  const { name, title, email, phone, userId } = profile;
  const supabase = createClient();
  const { error } = await supabase
    .from("profiles")
    .upsert(
      [{ name, title, email, phone, user_id: userId }],
      { onConflict: "user_id" }
    );
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/profile");
}

export async function getProfile(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}