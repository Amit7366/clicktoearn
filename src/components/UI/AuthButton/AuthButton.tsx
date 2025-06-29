"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const userInfo = useUserInfo();
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
  };
  return (
    <>
      {userInfo?.email ? (
        <button
          onClick={handleLogOut}
          className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-red-50 text-red-600"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      ) : (<></>)}
    </>
  );
};

export default AuthButton;
