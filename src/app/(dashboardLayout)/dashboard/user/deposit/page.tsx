"use client";

import { getUserInfo } from "@/services/auth.services";
import { getFromLocalStorage } from "@/utils/local-storage";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Trc20DepositForm() {
  const router = useRouter();
  const userInfo = getUserInfo();
  const authToken = getFromLocalStorage("accessToken");

  const [form, setForm] = useState({
    userId: "",
    amount: "",
    transactionId: "",
    proofImage: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [transferInfo, setTransferInfo] = useState<{
    walletAddress: string;
    image: string;
  } | null>(null);

  // ✅ Fetch wallet and image from /qr-transfer/my-transfers
  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/qr-transfer/my-transfers`,
          {
            headers: {
              Authorization: `${authToken}`,
            },
          }
        );

        const result = await res.json();

        if (result.success) {
          setTransferInfo({
            walletAddress: result.data.walletAddress,
            image: result.data.image,
          });
        }
      } catch (err) {
        console.error("Failed to load QR transfer info", err);
        toast.error("Failed to fetch wallet info.");
      }
    };

    if (authToken) fetchTransfer();
  }, [authToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "clicktoearn");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dsekhxz2h/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (data.secure_url) {
          imageUrl = data.secure_url;
          toast.success("Image uploaded successfully");
        } else {
          throw new Error("Upload failed");
        }
      } catch (err: any) {
        toast.error("Image upload failed: " + err.message);
        return;
      }
    }

    const payload = {
      userId: userInfo.objectId,
      amount: parseFloat(form.amount),
      transactionId: form.transactionId,
      proofImage: imageUrl,
    };

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/transaction/deposit/trc20`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Failed to deposit");

      setTimeout(() => {
        router.push("/dashboard/user");
      }, 1000);

      return res.json();
    });

    toast.promise(promise, {
      loading: "Submitting deposit...",
      success: (data) => `Deposit successful: ${data?.message || "Success"}`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <div className="max-w-7xl my-12 flex justify-start flex-col md:flex-row gap-5">
      {/* Left Column - Wallet Info */}
      <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          TRC20 Deposit Address
        </h2>
        {transferInfo?.image && (
          <Image
              src={transferInfo.image}
              alt="Uploaded Proof"
              width={200}
              height={200}
              className="rounded shadow border mx-auto"
            />
        )}

        <div
          onClick={() => {
            if (transferInfo?.walletAddress) {
              navigator.clipboard.writeText(transferInfo.walletAddress);
              toast.success("Wallet address copied to clipboard!");
            }
          }}
          className="cursor-pointer text-center my-4 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition select-none text-gray-800 font-semibold flex flex-wrap items-center justify-center"
        >
          <span className="text-nowrap text-xs">
            {transferInfo?.walletAddress || "Loading..."}
          </span>
          <span className="ml-2 text-sm text-gray-500 hover:text-red-400">
            <Copy />
          </span>
        </div>

      
      </div>

      {/* Right Column - Deposit Form */}
      <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          TRC20 Deposit
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              label: "Amount",
              name: "amount",
              type: "number",
              placeholder: "e.g. 50",
            },
            {
              label: "Transaction ID",
              name: "transactionId",
              type: "text",
              placeholder: "e.g. trx-20250622-01",
            },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={(form as any)[field.name]}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload Proof Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {selectedFile && (
              <p className="text-sm mt-2 text-gray-600">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Submit Deposit
          </button>
        </form>
      </div>
    </div>
  );
}
