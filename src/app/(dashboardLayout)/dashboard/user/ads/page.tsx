"use client";
import { getUserInfo } from "@/services/auth.services";
import { dateFormatter } from "@/utils/dateFormatter";
import { getFromLocalStorage } from "@/utils/local-storage";
import { CheckCircle, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { balanceApi, useGetUserBalanceQuery } from "@/redux/api/balanceApi";
import Loader from "@/components/Shared/loader";
import { useUserBalance } from "@/hooks/useUserBalance";

// 🔄 Fetch today's available tasks excluding completed ones
const fetchTransactions = async ({
  userId,
  token,
  formatted,
  planInfo,
  setAds,
}: {
  userId: string;
  token: string;
  formatted: string;
  planInfo: string;
  setAds: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  try {
    const tasksRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/daily-tasks?date=${formatted}&userId=${userId}&plan=${planInfo}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    const historyRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/daily-tasks/history?userId=${userId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    const tasksData = await tasksRes.json();
    const historyData = await historyRes.json();

    if (tasksRes.ok && historyRes.ok) {
      const allTasks = tasksData?.data?.tasks || [];
      const completedTaskIds = new Set(
        (historyData?.data || []).map((entry: any) => entry.task._id)
      );

      const filteredTasks = allTasks.filter(
        (task: any) => !completedTaskIds.has(task._id)
      );

      setAds(filteredTasks);
    } else {
      toast.error(
        tasksData?.message ||
          historyData?.message ||
          "Failed to fetch tasks or history."
      );
    }
  } catch (error: any) {
    toast.error("Error fetching transactions.");
  }
};

const AdsPage = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [planInfo, setPlanInfo] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const dispatch = useDispatch();
  const [adsLoading, setAdsLoading] = useState(true);
  const {
    data: userBalance,
    isLoading: blanceLoading,
    refetch: refetchBalance,
  } = useUserBalance();
  const userInfo = getUserInfo();
  const userId = userInfo?.objectId;
  const objectId = userInfo?.objectId;
  const token = getFromLocalStorage("accessToken");
  const today = new Date();
  const formatted = dateFormatter(today);

  const convertAdDurationToSeconds = (adDuration: number): number => {
    return Math.round(adDuration * 60);
  };

  const {
    data: plan,
    isLoading,
    isError,
    refetch,
  } = useGetUserBalanceQuery(objectId, {
    skip: !objectId,
  });

  // 🪙 First check balance, then fetch ads
  useEffect(() => {
    const fetchBalanceAndTasks = async () => {
      if (!userId || !token) return;

      try {
        setAdsLoading(true);

        // Fetch balance
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/transaction/balance/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        const result = await res.json();
        const currentBalance = result?.data?.currentBalance ?? 0;
        setBalance(currentBalance);

        // if (currentBalance > 0) {
        const activePlan = plan?.data?.activeSubscriptionPlan?.name;

        if (!activePlan) {
          // 🛑 Only show error if plan is finished loading
          if (!isLoading) {
            toast.error("No active plan found.");
          }
          setAds([]);
          return;
        }

        setPlanInfo(activePlan);

        await fetchTransactions({
          userId,
          token,
          formatted,
          planInfo: activePlan,
          setAds,
        });
        // } else {
        //   setAds([]);
        // }
      } catch (error: any) {
        toast.error("Failed to fetch user balance or tasks.");
      } finally {
        setAdsLoading(false);
      }
    };

    fetchBalanceAndTasks();
  }, [userId, token, plan]);

  const runAds = ({
    _id,
    userId,
    videoUrl,
    adDuration,
    encodedData,
  }: {
    _id: string;
    userId: string;
    videoUrl: string;
    adDuration: string;
    encodedData: string;
  }) => {
    const launchURL = new URL("/ad/view", window.location.origin);
    launchURL.searchParams.set("userId", userId);
    launchURL.searchParams.set("taskId", _id);
    launchURL.searchParams.set("videoUrl", videoUrl);
    launchURL.searchParams.set("adDuration", adDuration);
    launchURL.searchParams.set("encodedData", encodedData);

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/click/track?userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          clickedOn: _id,
        }),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Failed to complete task");

      const data = await res.json();

      // ✅ Invalidate user balance so homepage will refetch
      dispatch(
        balanceApi.util.invalidateTags([{ type: "UserBalance", id: userId }])
      );
      window.open(launchURL.toString(), "_blank");
      return data;
    });

    toast.promise(promise, {
      loading: "Opening Your Ad...",
      success: (data) => `✅ ${data?.message || "Reward confirmed!"}`,
      error: (err) => `❌ ${err.message}`,
    });
  };

  // if (balance === 0) {
  //   return (
  //     <div className="py-10 text-center text-gray-400 font-semibold text-sm ">
  //       You have 0 balance. You need to add funds to your wallet to run ads.
  //     </div>
  //   );
  // }

  if (adsLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold inline-block my-2">
        Plan:{" "}
        {userBalance?.data?.activeSubscriptionPlan?.name || "NO PLAN ACTIVATED"}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
        {ads.map(
          ({
            _id,
            title,
            rewardAmount,
            adDuration,
            videoUrl,
            rewardVerification,
          }: any) => (
            <div
              key={title}
              className="max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md border border-blue-100 bg-blue-50 text-blue-600">
                  <DollarSign className="w-9 h-9" />
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  <h3 className="text-base font-semibold">{title}</h3>$
                  {rewardAmount}
                  <span className="text-sm font-normal text-gray-500">
                    /user
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">View ads to earn now</p>
              <div className="flex items-center justify-between gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-green-700" />
                  {convertAdDurationToSeconds(adDuration)}s
                </div>
                <button
                  onClick={() =>
                    runAds({
                      _id,
                      userId,
                      videoUrl,
                      adDuration,
                      encodedData: `${rewardVerification.a}_${rewardVerification.b}_${rewardVerification.answer}`,
                    })
                  }
                  className="px-5 py-2 rounded-md text-white bg-cyan-700 cursor-pointer"
                >
                  View Ad
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AdsPage;
