"use client";

import * as React from "react";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LineChart,
  Linkedin,
  ShieldCheck,
  Users,
  UserCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Stage = "new" | "screening" | "interview" | "offered";

type Candidate = {
  id: string;
  name: string;
  role: string;
  stage: Stage;
  added: string;
  linkedin: string;
};

const stageOrder: Stage[] = ["new", "screening", "interview", "offered"];

const stageLabels: Record<Stage, string> = {
  new: "New Applicants",
  screening: "Screening",
  interview: "Interview",
  offered: "Offered",
};

const initialCandidates: Candidate[] = [
  {
    id: "c-1",
    name: "Alyssa Parker",
    role: "Senior Product Designer",
    stage: "new",
    added: "2026-02-01",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: "c-2",
    name: "Marco Silva",
    role: "Frontend Engineer",
    stage: "new",
    added: "2026-01-30",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: "c-3",
    name: "Grace Lin",
    role: "Recruiting Coordinator",
    stage: "screening",
    added: "2026-01-29",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: "c-4",
    name: "Jordan Miles",
    role: "Data Analyst",
    stage: "screening",
    added: "2026-01-28",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: "c-5",
    name: "Priya Nair",
    role: "Account Executive",
    stage: "interview",
    added: "2026-01-25",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: "c-6",
    name: "Ethan Cole",
    role: "DevOps Engineer",
    stage: "interview",
    added: "2026-01-24",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: "c-7",
    name: "Sofia Ivanova",
    role: "Customer Success Manager",
    stage: "offered",
    added: "2026-01-20",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: "c-8",
    name: "Liam Brooks",
    role: "Engineering Manager",
    stage: "offered",
    added: "2026-01-18",
    linkedin: "https://www.linkedin.com",
  },
];

const jobOptions = [
  "All Open Roles",
  "Senior Product Designer",
  "Frontend Engineer",
  "Data Analyst",
  "Account Executive",
  "DevOps Engineer",
  "Customer Success Manager",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="flex w-64 flex-col bg-slate-950 text-slate-100">
          <div className="border-b border-slate-800 px-6 py-5">
            <div className="text-lg font-semibold">RecruitFlow ATS</div>
            <p className="text-xs text-slate-400">Talent operations suite</p>
          </div>
          <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
            <Button
              variant="ghost"
              className="justify-start gap-3 text-slate-200 hover:text-white"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-3 text-slate-200 hover:text-white"
            >
              <Users className="h-4 w-4" />
              Candidates
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-3 text-slate-200 hover:text-white"
            >
              <Briefcase className="h-4 w-4" />
              Jobs
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-3 text-slate-200 hover:text-white"
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-3 text-slate-200 hover:text-white"
            >
              <ShieldCheck className="h-4 w-4" />
              Users
              <span className="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                Admin Only
              </span>
            </Button>
          </nav>
          <div className="border-t border-slate-800 px-4 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold">
                RF
              </div>
              <div>
                <div className="text-sm font-medium">Jordan Recruiter</div>
                <div className="text-xs text-slate-400">
                  jordan@recruitflow.io
                </div>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function KanbanColumn({
  title,
  candidates,
  onMove,
}: {
  title: string;
  candidates: Candidate[];
  onMove: (id: string, direction: "left" | "right") => void;
}) {
  return (
    <div className="flex w-72 shrink-0 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600">
          {candidates.length}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="shadow-sm">
            <CardHeader className="flex flex-row items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {getInitials(candidate.name)}
              </div>
              <div className="flex-1">
                <CardTitle className="text-sm">{candidate.name}</CardTitle>
                <CardDescription>{candidate.role}</CardDescription>
              </div>
              <a
                href={candidate.linkedin}
                aria-label="LinkedIn profile"
                className="rounded-full border border-slate-200 p-1 text-slate-500 transition hover:text-slate-700"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-xs text-slate-500">
              <span>Added: {candidate.added}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onMove(candidate.id, "left")}
                  disabled={candidate.stage === stageOrder[0]}
                  aria-label="Move left"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onMove(candidate.id, "right")}
                  disabled={candidate.stage === stageOrder[stageOrder.length - 1]}
                  aria-label="Move right"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function KanbanPage() {
  const [candidates, setCandidates] = React.useState(initialCandidates);

  const handleMove = (id: string, direction: "left" | "right") => {
    setCandidates((prev) =>
      prev.map((candidate) => {
        if (candidate.id !== id) return candidate;
        const currentIndex = stageOrder.indexOf(candidate.stage);
        const nextIndex =
          direction === "left" ? currentIndex - 1 : currentIndex + 1;
        const nextStage = stageOrder[nextIndex];
        if (!nextStage) return candidate;
        return { ...candidate, stage: nextStage };
      })
    );
  };

  return (
    <AppShell>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Recruiting
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Applications Kanban Board
          </h1>
        </div>
        <Button className="gap-2">
          <UserCircle className="h-4 w-4" />
          New Job +
        </Button>
      </header>

      <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="text-xs font-semibold text-slate-500">
            Filter by Job:
          </label>
          <Select className="mt-2">
            {jobOptions.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold text-slate-500">
            Search
          </label>
          <Input
            className="mt-2"
            placeholder="Search by Candidate Name..."
          />
        </div>
      </section>

      <section
        className={cn(
          "flex gap-4 overflow-x-auto pb-4",
          "-mx-2 px-2 sm:mx-0 sm:px-0"
        )}
      >
        {stageOrder.map((stage) => (
          <KanbanColumn
            key={stage}
            title={stageLabels[stage]}
            candidates={candidates.filter(
              (candidate) => candidate.stage === stage
            )}
            onMove={handleMove}
          />
        ))}
      </section>
    </AppShell>
  );
}
