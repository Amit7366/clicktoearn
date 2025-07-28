"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { getUserInfo } from "@/services/auth.services";
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
import Topbar from "@/components/Shared/Topbar";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const userInfo = getUserInfo();
  const userRole = userInfo?.role as UserRole;
  const menuItems = drawerItems(userRole);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-[#F6F8FA] text-gray-900">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white border-b z-20 flex flex-row-reverse items-center justify-between px-4 py-3">
        <div className="font-semibold text-base">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image
              src={"/logo.png"}
              width={150}
              height={100}
              alt="ClicktoEarn"
            />
            {/* <span className="text-xl font-bold text-pink-600">
              Click<span className="text-purple-600">to</span>Earn
            </span> */}
          </Link>
        </div>
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
        ref={sidebarRef}
        className={`fixed md:sticky md:top-0 h-full md:h-screen w-64 bg-white shadow-md z-30 transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="p-6 font-bold text-xl mt-14 md:mt-0">
          <Image src={"/logo.png"} width={150} height={100} alt="ClicktoEarn" />
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map(({ name, path, icon, children }) => {
            const hasChildren = !!children?.length;
            const isOpen = openDropdowns[name];

            return (
              <div key={name}>
                <Link
                  href={path || "#"}
                  onClick={() =>
                    hasChildren ? toggleDropdown(name) : setSidebarOpen(false)
                  }
                  className={`w-full text-left text-sm font-semibold px-3 py-2 rounded border border-transparent  text-neutral-600 hover:bg-violet-100 hover:text-violet-700 flex items-center gap-3 duration-100`}
                >
                  <span className="text-purple-500">{icon}</span> {name}
                  {hasChildren && (
                    <span className="ml-auto">{isOpen ? "▲" : "▼"}</span>
                  )}
                </Link>

                {hasChildren && isOpen && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.path || "#"}
                        onClick={() => setSidebarOpen(false)}
                        className="text-base text-neutral-700 hover:bg-violet-100 font-medium rounded px-5 py-2"
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
      <main className="w-full flex-1 p-6 mt-14 md:mt-0 md:ml-0">
        <Topbar />
        {children}
      </main>
    </div>
  );
}
