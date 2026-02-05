"use client";

import { Job, Candidate, CandidateStage } from "@/app/lib/types/ats";
import { useState } from "react";
import Modal from "../ui/Modal";

export default function NewCandidateModal({
  open,
  onClose,
  jobs,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  jobs: Job[];
  onCreate: (c: Candidate) => void;
}) {
  const [name, setName] = useState("");
  const [jobId, setJobId] = useState("");
  const [linkedin, setLinkedin] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newCandidate: Candidate = {
      id: crypto.randomUUID(),
      name,
      jobId,
      linkedinUrl: linkedin,
      stage: "new" as CandidateStage,
      createdAt: new Date().toISOString(),
    };

    onCreate(newCandidate);
    onClose();

    setName("");
    setJobId("");
    setLinkedin("");
  }

  return (
    <Modal open={open} onClose={onClose} title="New Candidate">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          placeholder="Candidate name"
          className="w-full rounded border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full rounded border px-3 py-2"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
        >
          <option value="">Select job</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </select>

        <input
          placeholder="LinkedIn URL"
          className="w-full rounded border px-3 py-2"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <button className="w-full rounded bg-slate-900 py-2 text-white">
          Create Candidate
        </button>
      </form>
    </Modal>
  );
}
