import { Job } from "@/app/lib/types/ats";

export default function KanbanFilters({ jobs }: { jobs: Job[] }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Filter by Job:
          </label>
          <select className="w-full rounded-md border px-3 py-2 text-sm">
            <option value="">All jobs</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Search:
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Search by Candidate Name..."
          />
        </div>
      </div>
    </div>
  );
}
