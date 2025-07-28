"use client";

import { useGetUserBalanceQuery } from "@/redux/api/balanceApi";
import { getUserInfo } from "@/services/auth.services";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const WithdrawPage = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [gateway, setGateway] = useState("");
  const chargeRate = 2 // 2% charge
  const charge = typeof amount === "number" ? chargeRate : 0;
  const receivable = typeof amount === "number" ? amount - charge : 0;
  const router = useRouter();
  const userInfo = getUserInfo();
  const authToken = getFromLocalStorage("accessToken");
  const objectId = userInfo?.objectId;
  const [form, setForm] = useState({
    userId: "",
    amount: "",
    paymentMethod: gateway,
    walletNumber: "",
  });
  const {
    data: userBalance,
    isLoading,
    isError,
    refetch,
  } = useGetUserBalanceQuery(objectId, {
    skip: !objectId,
  });
  //console.log(userBalance?.data);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const balance = userBalance?.data?.currentBalance ?? 0;

    if (balance < 10) {
      toast.error("Withdraw not available: Minimum $10 balance required.");
      return;
    }

    const payload = {
      userId: userInfo.objectId,
      amount: amount,
      paymentMethod: gateway,
      walletNumber: form.walletNumber,
      transactionId: "bkash-20250622-01",
    };

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/transaction/withdraw`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Failed to withdraw");

      setTimeout(() => {
        router.push("/dashboard/user");
      }, 1000);

      return res.json();
    });

    toast.promise(promise, {
      loading: "Submitting Withdraw...",
      success: (data) => `Withdraw successful: ${data?.message || "Success"}`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Withdraw Form */}
        <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4 flex items-center gap-2">
            <span>💸</span> Withdraw Money
          </h2>

          {/* Method Select */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Method</label>
            <select
              name="paymentMethod"
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
              className="w-full border border-gray-200 rounded px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gateway</option>
              <option value="bkash">Bkash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
              <option value="crypto">Crypto Wallet</option>
            </select>
          </div>

          {/* Amount Input */}
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Amount</label>
            <div className="flex rounded overflow-hidden border border-gray-200">
              <input
                name="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="w-full px-4 py-2 focus:outline-none bg-white"
              />
              <span className="bg-gray-100 px-4 py-2 text-sm text-gray-600">
                USD
              </span>
            </div>
          </div>
          {/* Limit Info */}
          <p className="text-xs text-gray-500 mt-1">
            <span className="text-gray-400">ⓘ</span> Limit : 0 ~ 0 USD
          </p>
          {/* Amount Input */}
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">
              Wallet Number
            </label>
            <div className="flex rounded overflow-hidden border border-gray-200">
              <input
                name="walletNumber"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="+880"
                className="w-full px-4 py-2 focus:outline-none bg-white"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white shadow rounded-lg p-6 relative">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4 flex items-center gap-2">
            <span>📄</span> Summary
          </h2>

          <div className="bg-green-50 p-4 rounded text-sm text-gray-700 mb-4">
            <div className="flex justify-between mb-2">
              <span>Charge</span>
              <span>{charge.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Receivable</span>
              <span>{receivable.toFixed(2)} USD</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={(userBalance?.data?.currentBalance ?? 0) < 10}
            className={`w-full py-2 rounded transition-all ${
              (userBalance?.data?.currentBalance ?? 0) < 10
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WithdrawPage;
