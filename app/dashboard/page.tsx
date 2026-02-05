"use client";

import { useState } from "react";
import TopHeader from "../components/app-shell/TopHeader";
import NewCandidateModal from "../components/kanban/NewCandidateModal";
import { Candidate, CandidateStage, Job } from "../lib/types/ats";
import { mockCandidates, mockJobs } from "../lib/types/mock/kanban";
import KanbanBoard from "./KanbanBoard";
import NewJobModal from "../components/kanban/NewJobModal";

export default function KanbanPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const [newCandidateOpen, setNewCandidateOpen] = useState(false);
  const [newJobOpen, setNewJobOpen] = useState(false);

  function addCandidate(c: Candidate) {
    setCandidates((prev) => [c, ...prev]);
  }

  function addJob(job: Job) {
    setJobs((prev) => [job, ...prev]);
  }

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

            <button
              onClick={() => setNewJobOpen(true)}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              New Job +
            </button>
          </div>
        }
      />

      <div className="mt-4">
        <KanbanBoard
          jobs={jobs}
          initialCandidates={candidates}
          onCreateCandidate={addCandidate}
          onMoveCandidate={handleMoveCandidate}
        />
      </div>

      <NewCandidateModal
        open={newCandidateOpen}
        onClose={() => setNewCandidateOpen(false)}
        jobs={jobs}
        onCreate={addCandidate}
      />

      <NewJobModal
        open={newJobOpen}
        onClose={() => setNewJobOpen(false)}
        onCreate={addJob}
      />
    </div>
  );
}
