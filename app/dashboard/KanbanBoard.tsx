"use client";

import { useMemo, useState } from "react";
import { Candidate, CandidateStage, Job, STAGES } from "@/app/lib/types/ats";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard({
  jobs,
  initialCandidates,
}: {
  jobs: Job[];
  initialCandidates: Candidate[];
}) {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  const byStage = useMemo(() => {
    const map = new Map<CandidateStage, Candidate[]>();
    for (const s of STAGES) map.set(s.key, []);
    for (const c of candidates) map.get(c.stage)?.push(c);
    return map;
  }, [candidates]);

  function moveCandidate(id: string, dir: -1 | 1) {
    setCandidates((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;

      const current = prev[idx];
      const stageIndex = STAGES.findIndex((s) => s.key === current.stage);
      const nextIndex = stageIndex + dir;
      if (nextIndex < 0 || nextIndex >= STAGES.length) return prev;

      const nextStage = STAGES[nextIndex].key;
      const copy = [...prev];
      copy[idx] = { ...current, stage: nextStage };
      return copy;
    });
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {STAGES.map((s) => (
        <KanbanColumn
          key={s.key}
          title={s.title}
          candidates={byStage.get(s.key) ?? []}
          jobs={jobs}
          onMove={moveCandidate}
          stageKey={s.key}
        />
      ))}
    </div>
  );
}
