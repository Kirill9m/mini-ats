"use client";

import { useState } from "react";
import TopHeader from "../components/app-shell/TopHeader";
import NewCandidateModal from "../components/kanban/NewCandidateModal";
import { Candidate, CandidateStage } from "../lib/types/ats";
import { mockCandidates, mockJobs } from "../lib/types/mock/kanban";
import KanbanBoard from "./KanbanBoard";

export default function KanbanPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [newCandidateOpen, setNewCandidateOpen] = useState(false);

  const handleMoveCandidate = (id: string, newStage: CandidateStage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage: newStage } : c))
    );
  };

  return (
    <div>
      <TopHeader
        title="Applications Kanban Board"
        action={
          <div className="flex gap-2">
            <button
              onClick={() => setNewCandidateOpen(true)}
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              New Candidate
            </button>

            <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              New Job +
            </button>
          </div>
        }
      />

      <div className="mt-4">
        <KanbanBoard
          jobs={mockJobs}
          initialCandidates={candidates}
          onCreateCandidate={(c: Candidate) =>
            setCandidates((prev) => [c, ...prev])
          }
          onMoveCandidate={handleMoveCandidate}
        />
      </div>

      <NewCandidateModal
        open={newCandidateOpen}
        onClose={() => setNewCandidateOpen(false)}
        jobs={mockJobs}
        onCreate={(c) => setCandidates((prev) => [c, ...prev])}
      />
    </div>
  );
}
