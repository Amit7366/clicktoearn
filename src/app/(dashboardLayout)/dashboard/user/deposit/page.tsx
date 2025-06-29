"use client";
import React, { useState } from "react";

const DepositPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("e-wallet");
  const [selectedProcessor, setSelectedProcessor] = useState("genkin");
  const [selectedBank, setSelectedBank] = useState("bkash");
  const [selectedPromotion, setSelectedPromotion] = useState("none");
  const [amount, setAmount] = useState(0);

  const methods = [
    { id: "e-wallet", label: "E-WALLET (GATEWAY)" },
    { id: "bank", label: "BANK TRANSFER" },
  ];

  const processors = ["genkin", "pepyala"];
  const banks = [
    "https://seeklogo.com/images/B/bkash-logo-0C1572FBB4-seeklogo.com.png",
    "https://seeklogo.com/images/N/nagad-logo-AA1B37DF1B-seeklogo.com.png",
    "https://images.seeklogo.com/logo-png/31/1/dutch-bangla-rocket-logo-png_seeklogo-317692.png",
  ];
  const quickAmounts = [1000, 5000, 10000, 15000, 20000, 25000];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background overflow-y-auto">
 

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto mt-4">
        <div className="max-w-4xl bg-graybg rounded">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <h1 className="text-2xl font-bold text-black">DEPOSIT</h1>
            <button className="border px-3 py-1 rounded shadow text-sm text-gray-600 whitespace-nowrap">
              Bank Maintenance Hours
            </button>
          </div>

          {/* Payment Method */}
          <div className="flex flex-wrap gap-3 mb-4">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`border py-2 rounded w-full sm:w-48 text-center font-semibold text-xs shadow-sm transition ${
                  selectedMethod === method.id
                    ? "bg-blue-500 border-blue-700 text-white"
                    : "bg-white"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>

          {/* E-WALLET Options */}
          {selectedMethod === "e-wallet" && (
            <>
              {/* Payment Processor */}
              <div className="flex flex-wrap gap-3 mb-4">
                {processors.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedProcessor(p)}
                    className={`border px-4 py-1 rounded shadow h-8 text-sm font-base ${
                      selectedProcessor === p
                        ? "border-blue-700 bg-yellow-500 text-white"
                        : "border-gray-300 text-white"
                    }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Bank */}
              <div className="flex flex-wrap gap-3 mb-4">
                {banks.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBank(b)}
                    className={`block relative border rounded shadow w-16 h-10 text-sm font-medium ${
                      selectedBank === b ? "border-blue-700" : "border-gray-300"
                    }`}
                  >
                    <img
                      src={b}
                      alt={b}
                      className="absolute w-full h-full top-0 left-0 object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* BANK TRANSFER UI */}
          {selectedMethod === "bank" && (
            <div className="mb-4 p-4 bg-gray-100 rounded shadow text-sm text-gray-700">
              <h3 className="font-semibold mb-2">Bank Transfer Instructions</h3>
              <p>• Please transfer the funds to the following bank account:</p>
              <p className="mt-1">
                <strong>Account Name:</strong> MachiBet Ltd
              </p>
              <p>
                <strong>Bank:</strong> Example Bank
              </p>
              <p>
                <strong>Account Number:</strong> 1234 5678 9012
              </p>
              <p>
                <strong>Branch:</strong> Dhaka Main
              </p>
              <p className="mt-2 text-red-600">
                Do not mention anything related to gambling in the transaction
                remarks.
              </p>
            </div>
          )}


          {/* Deposit Input */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Deposit Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
              placeholder="Enter Amount"
              className="w-full border p-2 rounded text-sm"
            />
            <p className="text-xs text-blue-700 mt-1">
              Min Deposit BDT 500.00, Max Deposit BDT 30,000.00
            </p>
          </div>

          {/* Quick Amounts */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className="w-28 sm:w-32 h-10 bg-gray-200 hover:bg-gray-300 rounded shadow text-sm"
              >
                BDT {amt.toLocaleString()}
              </button>
            ))}
          </div>

          <button className="px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded font-semibold">
            SUBMIT
          </button>
        </div>

        {/* Important Notice */}
        <div className="bg-gray-200 rounded p-4 sm:p-6 mt-6 text-sm shadow max-w-4xl">
          <h2 className="text-blue-700 font-bold mb-2">IMPORTANT NOTICE</h2>
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            <li>
              Always check for latest deposit account details (E-Wallet Account
              Number And E-Wallet Account Type, eg bKash, Nagad, Rocket) before
              making a bank transfer.
            </li>
            <li>
              MachiBet will not be responsible for any compensation if there is
              any incorrect filled deposit details.
            </li>
            <li>
              Depositor’s account name must match with registered full name.
            </li>
            <li>
              Please do not put MachiBet, Slots, Casino, Betting, or any
              sensitive words related to gambling as reference/remark/transfer
              detail when making an online transfer to our deposit accounts.
            </li>
            <li>
              A minimum of one (1) time turnover is required for all deposits
              before any withdrawals can be made.
            </li>
            <li>
              Uploading of payment receipt is compulsory for cash deposit (CDM)
              transactions.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DepositPage;

