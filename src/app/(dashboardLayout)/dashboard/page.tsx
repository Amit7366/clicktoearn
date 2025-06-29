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
import React from "react";
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
    label: "My Plan",
    value: "12.3%",
    change: "-0.9%",
    positive: false,
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: "Total Clicks",
    value: "1,028",
    change: "+8.6%",
    positive: true,
    icon: <Activity className="w-5 h-5" />,
  },
  {
    label: "Todays Clicks",
    value: "99.9%",
    change: "+0.2%",
    positive: true,
    icon: <Clock className="w-5 h-5" />,
  },
  {
    label: "Remain clicks for today",
    value: "158",
    change: "+3.4%",
    positive: true,
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    label: "Next Reminder",
    value: "47",
    change: "-1.2%",
    positive: false,
    icon: <Server className="w-5 h-5" />,
  },
  {
    label: "Refferal Commissions",
    value: "21",
    change: "+0.9%",
    positive: true,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "My active Ads",
    value: "98.6",
    change: "-0.3%",
    positive: false,
    icon: <HeartPulse className="w-5 h-5" />,
  },
  {
    label: "Security Alerts",
    value: "2",
    change: "-4.0%",
    positive: true,
    icon: <Shield className="w-5 h-5" />,
  },
  {
    label: "Launches",
    value: "12",
    change: "+1.5%",
    positive: true,
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    label: "Sales",
    value: "680",
    change: "+6.3%",
    positive: true,
    icon: <ShoppingCart className="w-5 h-5" />,
  },
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

const investmentData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 200 },
  { month: "Mar", value: 220 },
  { month: "Apr", value: 180 },
  { month: "May", value: 120 },
  { month: "Jun", value: 150 },
  { month: "Jul", value: 280 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen  py-6">
      {/* Header section */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Newsletter */}
        <div className="bg-blue-700 rounded-xl p-6 text-white shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs text-green-400">My balance</p>
            <h3 className="text-3xl font-bold mb-2 text-white">175 USD</h3>
          </div>
          <div className="flex flex-wrap items-center justify-start gap-5">
            <button className="w-40 bg-green-200 hover:bg-green-700 text-green-700 hover:text-white font-semibold py-2 px-4  border border-white rounded  transition">
              Desposit
            </button>
            <button className="w-40 bg-white text-blue-700 font-semibold py-2 px-4 rounded border border-white  hover:bg-blue-700 hover:text-white transition">
              Withdraw
            </button>
          </div>
        </div>
      </div>
      {/* all stats  */}
      {/* Recent fills */}
    
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map(({ label, value, change, positive, icon }) => (
            <div
              key={label}
              className="bg-white p-4 rounded-xl shadow-sm flex gap-4 justify-between items-center "
            >
              <div className="w-1/4">
                <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex justify-center items-center">
                  {icon}
                </div>
              </div>
              <div className="w-3/4">
                <div className="text-sm text-gray-500">{label}</div>
                <div className="text-xl font-semibold">{value}</div>
                <div
                  className={`text-sm text-right ${
                    positive ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {change}
                </div>
              </div>
            </div>
          ))}
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
            <BarChart data={dailyUsers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#999" />
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
              <XAxis dataKey="month" stroke="#999" />
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
