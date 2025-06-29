import { FC } from "react";
import { Trash2, Edit } from "lucide-react";

interface PolicyEntry {
  name: string;
  title: string;
  policy: string;
  policyAmount: string;
  policyStatus: "Approved" | "Awaiting Approval" | "Rejected";
  destination: string;
  status: "Active" | "Waiting" | "Canceled" | "Rejected";
  progress: "On Track" | "Waiting" | "Canceled" | "Overdue";
  avatar: string;
}

const data: PolicyEntry[] = [
  {
    name: "Christin Ericsson",
    title: "CFO",
    policy: "Basic Policy",
    policyAmount: "$5,000",
    policyStatus: "Approved",
    destination: "Huston, US",
    status: "Active",
    progress: "On Track",
    avatar: "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Angie E. Swift",
    title: "VP of Sales",
    policy: "All Inclusive Policy",
    policyAmount: "$20,000",
    policyStatus: "Awaiting Approval",
    destination: "Huston, US",
    status: "Waiting",
    progress: "Waiting",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ronals Koeman",
    title: "Advisory board",
    policy: "Basic Policy",
    policyAmount: "$5,000",
    policyStatus: "Approved",
    destination: "Huston, US",
    status: "Canceled",
    progress: "Canceled",
    avatar: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "June Simmons",
    title: "Social content manager",
    policy: "Basic Policy",
    policyAmount: "$5,000",
    policyStatus: "Rejected",
    destination: "Huston, US",
    status: "Rejected",
    progress: "Overdue",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ben West",
    title: "Account manager",
    policy: "Basic Policy",
    policyAmount: "$25,000",
    policyStatus: "Awaiting Approval",
    destination: "Boston, US",
    status: "Active",
    progress: "On Track",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const statusColorMap: Record<string, string> = {
  Approved: "text-green-500",
  "Awaiting Approval": "text-yellow-500",
  Rejected: "text-red-500",
  Active: "text-green-500",
  Waiting: "text-gray-500",
  Canceled: "text-blue-500",
  "On Track": "text-blue-500",
  Overdue: "text-red-500",
};

const PolicyTable: FC = () => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3">NAME</th>
            <th className="px-4 py-3">POLICY</th>
            <th className="px-4 py-3">POLICY STATUS</th>
            <th className="px-4 py-3">DESTINATION</th>
            <th className="px-4 py-3">STATUS</th>
            <th className="px-4 py-3">PROGRESS</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr
              key={idx}
              className={`border-b ${
                entry.policyStatus === "Rejected" ? "bg-red-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-4 flex items-center gap-3">
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{entry.name}</div>
                  <div className="text-xs text-gray-500">{entry.title}</div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div>{entry.policyAmount}</div>
                <div className="text-xs text-gray-500">{entry.policy}</div>
              </td>
              <td className="px-4 py-4 font-medium">
                <span className={`${statusColorMap[entry.policyStatus]}`}>
                  ● {entry.policyStatus}
                </span>
              </td>
              <td className="px-4 py-4">{entry.destination}</td>
              <td className="px-4 py-4 font-medium">
                <span className={`${statusColorMap[entry.status]}`}>
                  ● {entry.status}
                </span>
              </td>
              <td className="px-4 py-4 font-medium">
                <span className={`${statusColorMap[entry.progress]}`}>
                  ● {entry.progress}
                </span>
              </td>
              <td className="px-4 py-4 flex gap-2">
                <button className="text-sky-500 hover:text-sky-600">
                  <Edit size={16} />
                </button>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyTable;
