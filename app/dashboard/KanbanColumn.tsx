import { Candidate, Job, CandidateStage } from "../lib/types/ats";
import CandidateCard from "./CandidateCard";

export default function KanbanColumn({
  title,
  count,
  candidates,
  jobs,
  onMove,
  stageKey,
}: {
  title: string;
  count: number;
  candidates: Candidate[];
  jobs: Job[];
  onMove: (id: string, dir: -1 | 1) => void;
  stageKey: CandidateStage;
}) {
  return (
    <div className="min-w-70 flex-1">
      <div className="mb-2 flex items-center justify-between rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
        <span>{title}</span>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600">
          {count}
        </span>
      </div>

      <div className="space-y-3">
        {candidates.map((c) => (
          <CandidateCard key={c.id} candidate={c} jobs={jobs} onMove={onMove} />
        ))}

        {candidates.length === 0 && (
          <div className="rounded-md border bg-white p-3 text-sm text-slate-500">
            No candidates
          </div>
        )}
      </div>
    </div>
  );
}
