import TopHeader from "../components/app-shell/TopHeader";
import { mockJobs, mockCandidates } from "../lib/types/mock/kanban";
import KanbanBoard from "./KanbanBoard";

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

      <div className="mt-4">
        <KanbanBoard jobs={mockJobs} initialCandidates={mockCandidates} />
      </div>
    </div>
  );
}
