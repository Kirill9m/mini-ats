import { Candidate, Job } from "@/app/lib/types/ats";

export const mockJobs: Job[] = [
  { id: "job-1", title: "Frontend Engineer" },
  { id: "job-2", title: "Data Scientist" },
  { id: "job-3", title: "Product Manager" },
];

export const mockCandidates: Candidate[] = [
  {
    id: "cand-1",
    name: "John Smith",
    subtitle: "Software Engineer",
    linkedinUrl: "https://linkedin.com",
    jobId: "job-1",
    stage: "new",
    createdAt: "2024-07-26T10:00:00Z",
  },
  {
    id: "cand-2",
    name: "Jane Doe",
    subtitle: "Product Manager",
    linkedinUrl: "https://linkedin.com",
    jobId: "job-3",
    stage: "new",
    createdAt: "2024-07-26T09:00:00Z",
  },
  {
    id: "cand-3",
    name: "Mary Lee",
    subtitle: "DevOps Engineer",
    linkedinUrl: "https://linkedin.com",
    jobId: "job-1",
    stage: "screening",
    createdAt: "2024-07-24T12:00:00Z",
  },
  {
    id: "cand-4",
    name: "David Chen",
    subtitle: "Data Scientist",
    linkedinUrl: "https://linkedin.com",
    jobId: "job-2",
    stage: "screening",
    createdAt: "2024-07-24T11:00:00Z",
  },
  {
    id: "cand-5",
    name: "Sarah Kim",
    subtitle: "Data Scientist",
    linkedinUrl: "https://linkedin.com",
    jobId: "job-2",
    stage: "interview",
    createdAt: "2024-07-23T15:00:00Z",
  },
  {
    id: "cand-6",
    name: "Sarah Kim",
    subtitle: "Project Manager",
    linkedinUrl: "https://linkedin.com",
    jobId: "job-3",
    stage: "offered",
    createdAt: "2024-07-26T08:00:00Z",
  },
];
