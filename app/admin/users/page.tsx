import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import UserCreateForm from "./UserCreateForm";
import { createUserAction } from "./actions";

export default async function AdminUsersPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", "user.id")
    .single();


  const adminClient = createSupabaseAdminClient();
  const { data: profiles, error: profilesError } = await adminClient
    .from("profiles")
    .select("id, full_name, role")
    .order("full_name", { ascending: true });

  const { data: users, error: usersError } = await adminClient.auth.admin.listUsers(
    {
      perPage: 1000,
      page: 1,
    }
  );

  if (profilesError || usersError) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">Admin users</h1>
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load users. Please try again.
        </p>
      </div>
    );
  }

  const emailById = new Map(
    users?.users.map((authUser) => [authUser.id, authUser.email ?? ""]) ?? []
  );

  const rows =
    profiles?.map((profileRow) => ({
      id: profileRow.id,
      fullName: profileRow.full_name ?? "—",
      role: profileRow.role,
      email: emailById.get(profileRow.id) ?? "—",
    })) ?? [];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
          Admin dashboard
        </p>
        <h1 className="text-3xl font-semibold text-gray-900">Manage users</h1>
        <p className="text-sm text-gray-600">
          Create new users and review existing roles.
        </p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Create user</h2>
        <p className="mt-1 text-sm text-gray-500">
          Users are created immediately with the selected role.
        </p>
        <div className="mt-6">
          <UserCreateForm action={createUserAction} />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-900">All users</h2>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {rows.length} total
          </span>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wider text-gray-400">
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Full name</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-sm text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100">
                    <td className="px-4 py-4 text-gray-900">{row.email}</td>
                    <td className="px-4 py-4 text-gray-700">{row.fullName}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        {row.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
