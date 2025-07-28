"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { getUserInfo } from "@/services/auth.services";
import { getFromLocalStorage } from "@/utils/local-storage";

const tabs = ["All", "deposit", "withdraw"];

type Transaction = {
  userName: string;
  id: string;
  date: Date;
  invoiceId: string;
  amount: number;
  status: string;
  type: string;
};

const TransactionTable = () => {
  const [filterTab, setFilterTab] = useState("All");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dateRange, setDateRange] = useState({
    from: new Date("2025-03-01"),
    to: new Date("2025-12-31"),
  });

  const userInfo = getUserInfo();
  const userId = userInfo?.objectId;
  const token = getFromLocalStorage("accessToken");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId || !token) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/transaction/alltransaction/user/${userId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          const parsedTransactions = data?.data.map((tx: any) => ({
            userName: tx.userId?.userName || "Unknown",
            id: tx._id,
            date: new Date(tx.createdAt),
            invoiceId: tx.transactionId || "-",
            amount: tx.amount,
            status: tx.status,
            type: tx.transactionType,
          }));
          setTransactions(parsedTransactions);
        } else {
          toast.error(data?.message || "Failed to fetch transactions.");
        }
      } catch (error: any) {
        toast.error("Error fetching transactions.");
      }
    };

    fetchTransactions();
  }, [userId, token]);

  const handleStatusChange = async (index: number, newStatus: string) => {
    const updatedTransaction = { ...transactions[index], status: newStatus };
    const promise = fetch(`/api/transaction/${updatedTransaction.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to update status");
      const newTx = [...transactions];
      newTx[index].status = newStatus;
      setTransactions(newTx);
      return res.json();
    });

    toast.promise(promise, {
      loading: "Updating status...",
      success: "Status updated successfully!",
      error: (err) => `Error: ${err.message}`,
    });
  };

  const filteredTransactions = transactions.filter((tx) => {
    const dateObj = new Date(tx.date);
    const inDateRange = dateObj >= dateRange.from && dateObj <= dateRange.to;
    const matchesTab = filterTab === "All" || tx.type === filterTab;
    return inDateRange && matchesTab;
  });

  return (
    <div className="p-4 bg-white mt-12">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full border text-sm font-medium capitalize ${
              filterTab === tab
                ? "bg-purple-600 text-white"
                : "text-gray-700 bg-gray-100"
            }`}
            onClick={() => setFilterTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">Name/Business</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Invoice ID</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredTransactions.map((tx, idx) => (
              <tr key={idx}>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{tx.userName}</div>
                  <div className="text-xs text-gray-500">ID: {tx.id}</div>
                </td>
                <td className="px-4 py-3">
                  <div>{format(tx.date, "dd MMM yyyy")}</div>
                  <div className="text-xs text-gray-500">
                    {format(tx.date, "p")}
                  </div>
                </td>
                <td className="px-4 py-3">{tx.invoiceId}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    tx.type === "deposit"
                      ? "text-green-600"
                      : tx.type === "withdraw"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {tx.type === "withdraw"
                    ? `-$${Math.abs(tx.amount)} USD`
                    : `$${tx.amount} USD`}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      tx.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : tx.status === "success"
                        ? "bg-green-100 text-green-700"
                        : tx.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tx.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-8">
                  No transactions found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
