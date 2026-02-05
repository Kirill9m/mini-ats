import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/candidates", label: "Candidates" },
  { href: "/jobs", label: "Jobs" },
  { href: "/analytics", label: "Analytics" },
  { href: "/users", label: "Users (Admin Only)" },
];

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-slate-900 text-slate-100">
      <div className="flex h-full flex-col">
        <div className="px-6 py-6 flex flex-col-reverse items-center border-b gap-1.5 border-slate-800">
          <div className="text-xl font-semibold">mini-ATS</div>
          <Image
            src="/icon.png"
            priority
            alt="RecruitFlow Logo"
            width={32}
            height={32}
            className="mt-4 rounded-2xl"
          />
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-slate-700" />
            <div>
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-slate-300">admin</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
