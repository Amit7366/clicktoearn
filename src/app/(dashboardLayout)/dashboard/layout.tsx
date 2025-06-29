"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Network,
  ArrowLeftRight,
  FileSearch,
  Newspaper,
  Users,
  Coins,
  UserCheck,
} from "lucide-react";
import Topbar from "@/components/shared/Topbar";

type MenuItem = {
  name: string;
  path?: string; // Optional if it has children
  icon?: ReactNode;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { name: "Home", path: "/dashboard", icon: <Home className="w-4 h-4" /> },
  {
    name: "Deposit",
    path: "/dashboard/user/deposit",
    icon: <ArrowLeftRight className="w-4 h-4" />,
  },
  {
    name: "Withdraw",
    icon: <FileSearch className="w-4 h-4" />,
    children: [
      { name: "Withdrawl", path: "/dashboard/user/withdraw" },
      { name: "Withdrawl History", path: "/dashboard/user/withdraw-history" },
    ],
  },
  
  {
    name: "PTC",
    icon: <Coins className="w-4 h-4" />,
    children: [
      { name: "Ads", path: "/dashboard/user/ads" },
      { name: "Clicks", path: "/dashboard//userclicks" },
    ],
  },
  {
    name: "Browse Fills",
    path: "/dashboard/fills",
    icon: <FileSearch className="w-4 h-4" />,
  },

  {
    name: "Network Insights",
    path: "/dashboard/insights",
    icon: <Network className="w-4 h-4" />,
  },
  {
    name: "News & Updates",
    path: "/dashboard/news",
    icon: <Newspaper className="w-4 h-4" />,
  },
  {
    name: "Relayers",
    path: "/dashboard/relayers",
    icon: <Users className="w-4 h-4" />,
  },

  {
    name: "Traders",
    path: "/dashboard/traders",
    icon: <UserCheck className="w-4 h-4" />,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // const router = useRouter();
  // if (!isLoggedIn()) {
  //   return router.push("/login");
  // }

  return (
    <div className="flex min-h-screen bg-[#F6F8FA] text-gray-900">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white border-b z-20 flex flex-row-reverse md:flex-row items-center justify-between px-4 py-3">
        <div className="font-bold text-xl">0x</div>
        <button onClick={toggleSidebar} aria-label="Toggle Menu">
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky md:top-0 h-full md:h-screen w-64 bg-white shadow-md z-30 transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="p-6 font-bold text-xl mt-14 md:mt-0">Click2Earn</div>
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map(({ name, path, icon, children }) => {
            const [open, setOpen] = useState(false);
            const hasChildren = !!children;

            return (
              <div key={name}>
                <Link
                  href={path || "#"}
                  onClick={() =>
                    hasChildren ? setOpen(!open) : setSidebarOpen(false)
                  }
                  className="w-full text-left px-3 py-2 rounded border border-transparent hover:border-violet-400 text-sm text-neutral-600 hover:bg-violet-200 hover:text-violet-700 flex items-center gap-2 duration-100"
                >
                  {icon} {name}
                  {hasChildren && (
                    <span className="ml-auto">{open ? "▲" : "▼"}</span>
                  )}
                </Link>

                {hasChildren && open && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.path || "#"}
                        onClick={() => setSidebarOpen(false)}
                        className="text-sm text-neutral-600 hover:bg-violet-100 rounded px-3 py-1"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-14 md:mt-0 md:ml-0 ">
        <Topbar />
        {children}
      </main>
    </div>
  );
}
