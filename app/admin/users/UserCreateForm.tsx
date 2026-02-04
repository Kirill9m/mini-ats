"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { CreateUserState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
    >
      {pending ? "Creating..." : "Create user"}
    </button>
  );
}

export default function UserCreateForm({
  action,
}: {
  action: (
    prevState: CreateUserState,
    formData: FormData
  ) => Promise<CreateUserState>;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            placeholder="user@example.com"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          Password
          <input
            name="password"
            type="password"
            required
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            placeholder="••••••••"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          Full name
          <input
            name="full_name"
            type="text"
            required
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            placeholder="Jane Doe"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          Role
          <select
            name="role"
            defaultValue="customer"
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </label>
      </div>

      {state?.error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          {state.success}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
