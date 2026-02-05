"use client";

import { useMemo, useState } from "react";
import { Candidate, CandidateStage, Job, STAGES } from "@/app/lib/types/ats";
import KanbanColumn from "./KanbanColumn";
import KanbanFilters from "./KanbanFilters";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export default function KanbanBoard({
  jobs,
  initialCandidates,
}: {
  jobs: Job[];
  initialCandidates: Candidate[];
}) {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const filteredCandidates = useMemo(() => {
    const q = normalize(search);
    return candidates.filter((c) => {
      const jobOk = !selectedJobId || c.jobId === selectedJobId;
      const nameOk = !q || normalize(c.name).includes(q);
      return jobOk && nameOk;
    });
  }, [candidates, selectedJobId, search]);

  const byStage = useMemo(() => {
    const map = new Map<CandidateStage, Candidate[]>();
    for (const s of STAGES) map.set(s.key, []);
    for (const c of filteredCandidates) map.get(c.stage)?.push(c);

    // Сортировка внутри колонки: новые сверху
    for (const s of STAGES) {
      const arr = map.get(s.key) ?? [];
      arr.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      map.set(s.key, arr);
    }

    return map;
  }, [filteredCandidates]);

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

  const totalVisible = filteredCandidates.length;

  return (
    <div>
      <KanbanFilters
        jobs={jobs}
        selectedJobId={selectedJobId}
        onJobChange={setSelectedJobId}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-medium text-slate-900">{totalVisible}</span>{" "}
          candidates
        </div>

        {(selectedJobId || search) && (
          <button
            onClick={() => {
              setSelectedJobId("");
              setSearch("");
            }}
            className="text-sm text-slate-700 underline hover:text-slate-900"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-3 flex gap-4 overflow-x-auto pb-2">
        {STAGES.map((s) => {
          const list = byStage.get(s.key) ?? [];
          return (
            <KanbanColumn
              key={s.key}
              title={s.title}
              count={list.length}
              candidates={list}
              jobs={jobs}
              onMove={moveCandidate}
              stageKey={s.key}
            />
          );
        })}
      </div>
    </div>
  );
}
