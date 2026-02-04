import { Candidate, CandidateStage, Job } from "@/app/lib/types/ats";
import CandidateCard from "./CandidateCard";

export default function KanbanColumn({
  title,
  candidates,
  jobs,
  onMove,
  stageKey,
}: {
  title: string;
  candidates: Candidate[];
  jobs: Job[];
  onMove: (id: string, dir: -1 | 1) => void;
  stageKey: CandidateStage;
}) {
  return (
    <div className="min-w-[280px] flex-1">
      <div className="mb-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
        {title}
      </div>

      <div className="space-y-3">
        {candidates.map((c) => (
          <CandidateCard
            key={c.id}
            candidate={c}
            jobs={jobs}
            onMove={onMove}
          />
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
