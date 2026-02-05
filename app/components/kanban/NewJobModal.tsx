"use client";

import { Job } from "@/app/lib/types/ats";
import { useState } from "react";
import Modal from "../ui/Modal";

export default function NewJobModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (job: Job) => void;
}) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const newJob: Job = {
      id: crypto.randomUUID(),
      title: title.trim(),
    };

    onCreate(newJob);
    onClose();
    setTitle("");
  }

  return (
    <Modal open={open} onClose={onClose} title="New Job">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          placeholder="Job title (e.g. Frontend Engineer)"
          className="w-full rounded border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="w-full rounded bg-slate-900 py-2 text-white">
          Create Job
        </button>
      </form>
    </Modal>
  );
}
