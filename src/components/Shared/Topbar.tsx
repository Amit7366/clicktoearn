"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Users, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { getUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

export default function Topbar() {
  const AuthButton = dynamic(() => import('@/components/UI/AuthButton/AuthButton'), { ssr: false })
 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userInfo = getUserInfo();
  const router = useRouter();
  // console.log(userInfo);
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 bg-white sticky top-12 md:top-0 z-10">
      {/* Left side: Title & Path */}
      <div className="flex items-center gap-2 text-sm">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <span className="text-gray-400">/ {userInfo?.role}</span>
      </div>

      {/* Right side */}
      <div className="relative flex items-center gap-3 sm:gap-4">
        {/* Dropdown */}
        <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
          <Users className="w-4 h-4" />
          <span className="hidden sm:inline">Cloud CRM</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Notification Icon */}
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        {/* Profile Button with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-sm focus:outline-none"
          >
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
              width={0}
              height={0}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-xs text-gray-500">{userInfo?.email}</span>
              <span className="font-medium text-gray-800">Adam Smith</span>
            </div>
            <ChevronDown className="w-4 h-4 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg border rounded-md z-50">
              <button className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100 text-gray-700">
                <User className="w-4 h-4" />
                Profile
              </button>
              <button className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100 text-gray-700">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <AuthButton/>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
