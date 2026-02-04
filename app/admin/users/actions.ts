"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CreateUserState = {
  error?: string;
  success?: string;
};

export async function createUserAction(
  _prevState: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return { error: "You are not authorized to perform this action." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const role = String(formData.get("role") ?? "customer").trim();

  if (!email || !password || !fullName) {
    return { error: "All fields are required." };
  }

  if (!email.includes("@")) {
    return { error: "Please enter a valid email." };
  }

  if (role !== "admin" && role !== "customer") {
    return { error: "Invalid role selected." };
  }

  const admin = createSupabaseAdminClient();

  const { data: created, error: createError } = await admin.auth.admin.createUser(
    {
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    }
  );

  if (createError || !created?.user) {
    return { error: createError?.message ?? "Failed to create user." };
  }

  const { error: upsertError } = await admin.from("profiles").upsert(
    {
      id: created.user.id,
      full_name: fullName,
      role,
    },
    {
      onConflict: "id",
    }
  );

  if (upsertError) {
    return { error: upsertError.message };
  }

  revalidatePath("/admin/users");
  return { success: "User created successfully." };
}
