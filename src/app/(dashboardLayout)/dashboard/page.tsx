"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/auth.services";
import Loader from "@/components/Shared/loader";

const DashboardPage = () => {
  const router = useRouter();
  const userInfo = getUserInfo();
  //console.log(userInfo)
  useEffect(() => {
    router.push("dashboard/" + userInfo.role); // 🔁 Your target route
  }, [router]);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default DashboardPage;
