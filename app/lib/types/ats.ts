export type Role = "admin" | "customer";

export type CandidateStage = "new" | "screening" | "interview" | "offered";

export const STAGES: { key: CandidateStage; title: string }[] = [
  { key: "new", title: "New Applicants" },
  { key: "screening", title: "Screening" },
  { key: "interview", title: "Interview" },
  { key: "offered", title: "Offered" },
];

export type Job = {
  id: string;
  title: string;
};

export type Candidate = {
  id: string;
  name: string;
  subtitle?: string;
  linkedinUrl?: string;
  jobId?: string;
  stage: CandidateStage;
  createdAt: string;
};
