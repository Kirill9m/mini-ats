import TopHeader from "@/app/components/app-shell/TopHeader";
import KanbanFilters from "./KanbanFilters";
import KanbanBoard from "./KanbanBoard";
import { mockCandidates, mockJobs } from "../lib/types/mock/kanban";

export default function KanbanPage() {
  return (
    <div>
      <TopHeader
        title="Applications Kanban Board"
        action={
          <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            New Job +
          </button>
        }
      />

      <KanbanFilters jobs={mockJobs} />

      <div className="mt-4">
        <KanbanBoard jobs={mockJobs} initialCandidates={mockCandidates} />
      </div>
    </div>
  );
}
