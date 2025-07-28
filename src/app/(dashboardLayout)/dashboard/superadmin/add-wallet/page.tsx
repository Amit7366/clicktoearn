"use client";

import { getUserInfo } from "@/services/auth.services";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AdWalletUploadForm() {
  const router = useRouter();
  const userInfo = getUserInfo();
  const authToken = getFromLocalStorage("accessToken");

  const [form, setForm] = useState({
    walletAddress: "",
    image: "", // will hold uploaded image URL
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";

    // Upload image to Cloudinary
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "clicktoearn");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dsekhxz2h/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
          imageUrl = data.secure_url;
          toast.success("Image uploaded");
        } else {
          throw new Error("Upload failed");
        }
      } catch (err: any) {
        toast.error("Upload failed: " + err.message);
        return;
      }
    }

    const payload = {
      user: userInfo?.objectId,
      walletAddress: form.walletAddress,
      image: imageUrl,
    };

    const promise = fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/qr-transfer/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken}`,
      },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      if (!res.ok) throw new Error("Submission failed");
      setTimeout(() => router.push("/dashboard/user"), 1000);
      return res.json();
    });

    toast.promise(promise, {
      loading: "Submitting...",
      success: (data) => `Submitted: ${data?.message || "Success"}`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <div className="max-w-2xl bg-white rounded-2xl shadow-md p-8 mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-green-900">
        Submit Wallet for Ad Transfer
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="walletAddress" className="block mb-1 text-sm font-medium text-gray-700">
            Wallet Address
          </label>
          <input
            id="walletAddress"
            name="walletAddress"
            type="text"
            placeholder="bnb123456789xyz"
            value={form.walletAddress}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Upload Screenshot (Proof)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {selectedFile && (
            <p className="text-sm mt-2 text-gray-600">Selected: {selectedFile.name}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
