"use client";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Clock,
  Briefcase,
  Server,
  FileText,
  HeartPulse,
  Shield,
  Rocket,
  ShoppingCart,
  ArrowUpRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth.services";
import { getFromLocalStorage } from "@/utils/local-storage";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Loader from "@/components/Shared/loader";
import { useGetUserBalanceQuery } from "@/redux/api/balanceApi";
import { toast } from "sonner";
const stats = [
  {
    label: "Total Deposit",
    value: "12,340",
    change: "+4.5%",
    positive: true,
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "Total Withdraw",
    value: "$34,500",
    change: "+2.1%",
    positive: true,
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    label: "Current Balance",
    value: "12.3%",
    change: "-0.9%",
    positive: false,
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: "currentCoinBalance",
    value: "1,028",
    change: "+8.6%",
    positive: true,
    icon: <Activity className="w-5 h-5" />,
  },
  // {
  //   label: "Todays Clicks",
  //   value: "99.9%",
  //   change: "+0.2%",
  //   positive: true,
  //   icon: <Clock className="w-5 h-5" />,
  // },
  // {
  //   label: "Remain clicks for today",
  //   value: "158",
  //   change: "+3.4%",
  //   positive: true,
  //   icon: <Briefcase className="w-5 h-5" />,
  // },
  {
    label: "Total Coin Deposit",
    value: "47",
    change: "-1.2%",
    positive: false,
    icon: <Server className="w-5 h-5" />,
  },
  {
    label: "Refferal Commissions",
    value: "30",
    change: "+0.9%",
    positive: true,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "Total Reffered",
    value: "98.6",
    change: "-0.3%",
    positive: false,
    icon: <HeartPulse className="w-5 h-5" />,
  },
  // {
  //   label: "Total Coin Withdraw",
  //   value: "2",
  //   change: "-4.0%",
  //   positive: true,
  //   icon: <Shield className="w-5 h-5" />,
  // },
  // {
  //   label: "Launches",
  //   value: "12",
  //   change: "+1.5%",
  //   positive: true,
  //   icon: <Rocket className="w-5 h-5" />,
  // },
  // {
  //   label: "Sales",
  //   value: "680",
  //   change: "+6.3%",
  //   positive: true,
  //   icon: <ShoppingCart className="w-5 h-5" />,
  // },
];

const dailyUsers = [
  { date: "06/26", value: 0.2 },
  { date: "06/27", value: 1.1 },
  { date: "06/28", value: 0.5 },
  { date: "06/29", value: 0.7 },
  { date: "06/30", value: 0.2 },
  { date: "07/01", value: 1.0 },
  { date: "07/02", value: 0.8 },
];

// const investmentData = [
//   { month: "Jan", value: 120 },
//   { month: "Feb", value: 200 },
//   { month: "Mar", value: 220 },
//   { month: "Apr", value: 180 },
//   { month: "May", value: 120 },
//   { month: "Jun", value: 150 },
//   { month: "Jul", value: 280 },
// ];
export type WalletBalance = {
  _id: string;
  userId: string;
  totalDeposit: number;
  totalWithdraw: number;
  currentBalance: number;
  currentCoinBalance: number;
  totalCoinDeposit: number;
  totalCoinWithdraw: number;
  createdAt: string; // or Date if you convert it
  updatedAt: string; // or Date if you convert it
  __v: number;
};
type InvestmentStat = {
  key: string;
  label: string;
  value: number;
};
const gradients = [
  "from-pink-300/40 to-purple-300/40",
  "from-green-300/40 to-blue-300/40",
  "from-yellow-300/40 to-pink-300/40",
  "from-red-300/40 to-orange-300/40",
  "from-blue-300/40 to-indigo-300/40",
  "from-purple-300/40 to-pink-300/40",
  "from-sky-300/40 to-violet-300/40",
  "from-emerald-300/40 to-teal-300/40",
];
export default function UserDashboardPage() {
  const token = getFromLocalStorage("accessToken");
  const userInfo = getUserInfo();
  const [data, setData] = useState<WalletBalance | null>(null);
  const [investmentData, setInvestmentData] = useState<InvestmentStat[]>([]);
  const [loading, setLoading] = useState(true);
  const objectId = userInfo?.objectId;
  const [totalReferred, setTotalReferred] = useState(0);
  const [totalReferralRewardFromUsers, setTotalReferralRewardFromUsers] =
    useState(0);
  const {
    data: userBalance,
    isLoading,
    isError,
    refetch,
  } = useGetUserBalanceQuery(objectId, {
    skip: !objectId,
  });
  // console.log(userBalance?.data);
  useEffect(() => {
    if (userBalance?.data) {
      setInvestmentData([
        {
          key: "totalDeposit",
          label: "Total Deposit",
          value: userBalance.data.totalDeposit,
        },
        {
          key: "totalWithdraw",
          label: "Total Withdraw",
          value: userBalance.data.totalWithdraw,
        },
        {
          key: "currentBalance",
          label: "Current Balance",
          value: userBalance.data.currentBalance,
        },
        {
          key: "currentCoinBalance",
          label: "Current Coin Balance",
          value: userBalance.data.currentCoinBalance,
        },
        {
          key: "totalCoinDeposit",
          label: "Total Coin Deposit",
          value: userBalance.data.totalCoinDeposit,
        },
        {
          key: "totalCoinWithdraw",
          label: "Total Coin Withdraw",
          value: userBalance.data.totalCoinWithdraw,
        },
      ]);
    }
  }, [userBalance]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/referrals/dashboard?userId=${objectId}`
        );

        const json = await res.json();
        const bonuses = json?.referralBonuses || [];
        setTotalReferred(json?.totalReferred || 0);
        setTotalReferralRewardFromUsers(
          json?.totalReferralRewardFromUsers || 0
        );
      } catch (err) {
        toast.error("Failed to fetch referral data.");
      }
    };

    if (objectId) fetchReferrals();
  }, [objectId]);

  // ⬇ Optional: Refetch on tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refetch();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refetch]);

  // ⬇ Handle loading/error states
  if (isLoading) return <Loader />;
  const expiresAt = new Date(userBalance?.data?.subscriptionExpiresAt);
  const today = new Date();

  // Calculate the difference in time (ms), then convert to days
  const diffTime = expiresAt.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (isError)
    return <div className="text-red-500">Failed to load balance data.</div>;
  return (
    <div className="min-h-screen  py-6">
      {/* Header section */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Newsletter */}
        <div className="bg-blue-700 rounded-xl p-6 text-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div className="px-4 py-2 rounded-full bg-white text-cyan-950 text-xs font-bold inline-block mb-2">
                Plan:{" "}
                {userBalance?.data?.activeSubscriptionPlan?.name || "Free"}
              </div>
              <p className=" text-amber-400">
                {diffDays > 0 ? `${diffDays} days remaining` : "Expired"}
              </p>
            </div>
            <p className="text-xs text-green-400">My balance</p>
            <h3 className="text-3xl font-bold mb-2 text-white">
              {userBalance
                ? Number(userBalance?.data?.currentBalance).toFixed(2)
                : "0.00"}{" "}
              USD
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-5">
            <Link
              href="/dashboard/user/deposit"
              className="w-40 text-center bg-green-200 hover:bg-green-700 text-green-700 hover:text-white font-semibold py-2 px-4  border border-white rounded  transition"
            >
              Desposit
            </Link>
            <Link
              href="/dashboard/user/withdraw"
              className="w-40 text-center bg-white text-blue-700 font-semibold py-2 px-4 rounded border border-white  hover:bg-blue-700 hover:text-white transition"
            >
              Withdraw
            </Link>
          </div>
        </div>
      </div>
      {/* all stats  */}
      {/* Recent fills */}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map(({ label, value, change, positive, icon }, idx) => {
          const gradient = gradients[idx % gradients.length]; // rotates through gradient list

          return (
            <div
              key={label}
              className={`relative bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl shadow-sm w-full max-w-xs`}
            >
              {/* Top Right Icon */}
              <div
                className={`absolute top-12 md:top-4 right-4 md:right-4 bg-white/50 backdrop-blur-lg  w-10 h-10 rounded-md flex items-center justify-center text-purple-700 text-lg`}
              >
                {icon || "💰"}
              </div>

              {/* Balance Label */}
              <div className="text-xs md:text-lg text-gray-600 font-semibold mb-1">
                {label}
              </div>

              {/* ₹ Amount */}
              <div className="text-lg md:text-3xl text-black font-bold mb-4">
                {label === "Total Deposit"
                  ? "$" + userBalance?.data?.totalDeposit
                  : label === "Total Withdraw"
                  ? "$" + userBalance?.data?.totalWithdraw
                  : label === "Current Balance"
                  ? "$" + userBalance?.data?.currentBalance.toFixed(2)
                  : label === "currentCoinBalance"
                  ? "$" + userBalance?.data?.currentCoinBalance
                  : label === "Total Coin Deposit"
                  ? "$" + userBalance?.data?.totalCoinDeposit
                  : label === "Total Coin Withdraw"
                  ? userBalance?.data?.totalCoinWithdraw
                  : label === "Refferal Commissions"
                  ? "$" + totalReferralRewardFromUsers
                  : label === "Total Reffered"
                  ? totalReferred
                  : "-"}
              </div>

              {/* Plan Status Badge */}
              <div
                className={`inline-flex justify-center items-center w-8 md:w-12 h-8 md:h-12 gap-1 bg-purple-800 text-white text-sm font-semibold md:px-3 md:py-1 rounded-full`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* chart section  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6  text-white">
        {/* Registered Users */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Click and Earn Report
              </h3>
              <p className="text-sm text-gray-400">06/26/2019 - 07/02/2019</p>
              <div className="mt-2 text-3xl font-bold text-black">0.69k</div>
              <div className="text-sm text-green-400">Monthly ▲ 6.24%</div>
              <div className="text-sm text-red-400">Yearly ▼ 0.68%</div>
              <div className="text-sm mt-2 text-gray-400">
                Total: 4.97k | Avg: 0.71k
              </div>
            </div>
            <div className="px-2 py-1 text-xs bg-gray-800 rounded">Day</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={investmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="label" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Bar dataKey="value" fill="#A78BFA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Investment Amount */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Investment Amount
              </h3>
              <p className="text-sm text-gray-400">01/2019 - 07/2019</p>
              <div className="mt-2 text-3xl font-bold text-black">299.12k</div>
              <div className="text-sm text-green-400">Monthly ▲ 9.0%</div>
              <div className="text-sm text-red-400">Yearly ▼ 0.87%</div>
              <div className="text-sm mt-2 text-gray-400">
                Total: 2350k | Avg: 423.46k
              </div>
            </div>
            <div className="px-2 py-1 text-xs bg-gray-800 rounded">Week</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={investmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="label" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#F472B6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
