import { Candidate, Job, STAGES } from "@/app/lib/types/ats";

function formatDate(iso: string) {
  // ISO -> YYYY-MM-DD (как в макете)
  return iso.slice(0, 10);
}

export default function CandidateCard({
  candidate,
  jobs,
  onMove,
}: {
  candidate: Candidate;
  jobs: Job[];
  onMove: (id: string, dir: -1 | 1) => void;
}) {
  const jobTitle = jobs.find((j) => j.id === candidate.jobId)?.title;

  const stageIndex = STAGES.findIndex((s) => s.key === candidate.stage);
  const canLeft = stageIndex > 0;
  const canRight = stageIndex < STAGES.length - 1;

  return (
    <div className="rounded-lg border bg-white p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-200" />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="truncate text-sm font-semibold text-slate-900">
              {candidate.name}
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={!canLeft}
                onClick={() => onMove(candidate.id, -1)}
                className="rounded border px-2 py-1 text-xs disabled:opacity-40"
                title="Move left"
              >
                ←
              </button>
              <button
                disabled={!canRight}
                onClick={() => onMove(candidate.id, 1)}
                className="rounded border px-2 py-1 text-xs disabled:opacity-40"
                title="Move right"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
            <span className="truncate">{candidate.subtitle ?? jobTitle ?? ""}</span>
            {candidate.linkedinUrl && (
              <a
                href={candidate.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 underline"
              >
                LinkedIn
              </a>
            )}
          </div>

          <div className="mt-2 text-[11px] text-slate-500">
            Added: {formatDate(candidate.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
