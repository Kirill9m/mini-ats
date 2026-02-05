import { Job } from "../lib/types/ats";

export default function KanbanFilters({
  jobs,
  selectedJobId,
  onJobChange,
  search,
  onSearchChange,
}: {
  jobs: Job[];
  selectedJobId: string;
  onJobChange: (jobId: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Filter by Job:
          </label>
          <select
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={selectedJobId}
            onChange={(e) => onJobChange(e.target.value)}
          >
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
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
