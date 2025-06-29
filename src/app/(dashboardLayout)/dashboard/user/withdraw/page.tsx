"use client";

import { useState } from "react";

const WithdrawPage = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [gateway, setGateway] = useState("");
  const chargeRate = 0.02; // 2% charge
  const charge = typeof amount === "number" ? amount * chargeRate : 0;
  const receivable = typeof amount === "number" ? amount - charge : 0;
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Withdraw Form */}
        <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4 flex items-center gap-2">
            <span>💸</span> Withdraw Money
          </h2>

          {/* Method Select */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Method</label>
            <select
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
              className="w-full border border-gray-200 rounded px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gateway</option>
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

          <button className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition-all">
            Submit
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
