"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getFromLocalStorage } from "@/utils/local-storage";
import { getUserInfo } from "@/services/auth.services";
import { toast } from "sonner";

type ReferralUser = {
  name: string;
  email: string;
  avatar: string;
  amount: number;
};

type GroupedGeneration = {
  generation: string;
  commission: string;
  users: ReferralUser[];
};

const ReferralGenerationList = () => {
  const [groupedReferrals, setGroupedReferrals] = useState<GroupedGeneration[]>(
    []
  );
  const[totalReferred,setTotalReferred] = useState(0);
  const[totalReferralRewardFromUsers,setTotalReferralRewardFromUsers] = useState(0);
  const token = getFromLocalStorage("accessToken");
  const userInfo = getUserInfo();
  const userId = userInfo?.objectId;

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/referrals/dashboard?userId=${userId}`
        );

        const json = await res.json();
        const bonuses = json?.referralBonuses || [];
        setTotalReferred(json?.totalReferred || 0);
        setTotalReferralRewardFromUsers(json?.totalReferralRewardFromUsers || 0);
        const grouped = bonuses.reduce(
          (acc: Record<number, ReferralUser[]>, bonus: any) => {
            const gen = bonus.generation;
            if (!acc[gen]) acc[gen] = [];

            const from = bonus.fromUserId;
            acc[gen].push({
              name: from?.userName || "Unknown",
              email: from?.email || "N/A",
              avatar: `https://i.pravatar.cc/150?u=${from?._id}`,
              amount: bonus.amount || 0,
            });

            return acc;
          },
          {}
        );

        const genData: GroupedGeneration[] = Object.keys(grouped).map(
          (genKey) => {
            const gen = parseInt(genKey);
            const commissionMap = {
              1: "20%",
              2: "15%",
              3: "10%",
              4: "5%",
            };

            return {
              generation: `${gen}st Generation`,
              commission: commissionMap[gen as 1 | 2 | 3 | 4] || "0%",
              users: grouped[gen],
            };
          }
        );

        setGroupedReferrals(genData);
      } catch (err) {
        toast.error("Failed to fetch referral data.");
      }
    };

    if (userId) fetchReferrals();
  }, [userId]);

  return (
    <div className="max-w-6xl mx-auto px-0 md:px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Referrals</h2>
      <div className="flex flex-col md:flex-row justify-start md:justify-between items-center gap-3 md:gap-0">
        <h3 className="bg-orange-400 text-white px-4 py-1 rounded-full text-xs md:text-base">Total Refferals: {totalReferred}</h3>
        <h3 className="bg-cyan-400 text-white px-4 py-1 rounded-full text-xs md:text-base">Total Refferals Earnings: {totalReferralRewardFromUsers}</h3>
      </div>
      <div className="space-y-10 mt-4">
        {groupedReferrals.map((gen, index) => (
          <div key={index} className="">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">
              {gen.generation}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gen.users.map((user, idx) => (
                <div
                  key={idx}
                  className="relative bg-white rounded-xl shadow-sm border hover:shadow-md transition p-5 flex items-center gap-4"
                >
                  <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm z-10">
                    {gen.commission}
                  </div>

                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-800 text-xs md:text-sm mt-4 md:mt-0">{user.name}</p>
                    {/* <p className="text-sm text-gray-500">{user.email}</p> */}
                    <p className="text-sm text-green-500">
                      ${user.amount.toFixed(2)} earned
                    </p>

                    <span className="inline-block mt-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      Referred
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Referred Friends Table */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-10">
        <h2 className="text-xl font-bold mb-4">Referred Friends</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="px-4 py-2">Avatar</th>
                <th className="px-4 py-2">Name</th>
                {/* <th className="px-4 py-2">Email</th> */}
                <th className="px-4 py-2">Amount</th>

                <th className="px-4 py-2">Generation</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {groupedReferrals.length > 0 ? (
                groupedReferrals.flatMap((group, groupIndex) =>
                  group.users.map((user, userIndex) => (
                    <tr
                      key={`${groupIndex}-${userIndex}`}
                      className="text-sm border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-700">
                        {user.name}
                      </td>
                      {/* <td className="px-4 py-3 text-gray-600">{user.email}</td> */}
                      <td className="px-4 py-3 text-gray-600">
                        ${user.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-purple-600 font-medium">
                        {group.generation}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-4">
                    No referred friends yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferralGenerationList;
