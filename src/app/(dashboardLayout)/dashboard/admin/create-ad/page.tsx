"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getFromLocalStorage } from "@/utils/local-storage";

interface YoutubeFormState {
  title: string;
  videoUrl: string;
  type: "YouTube";
  date: string;
  rewardVerification: {
    a: number;
    b: number;
    answer: number;
  };
  adDuration: number;
  rewardAmount: number;
}

export default function YoutubeTaskForm() {
  const authToken = getFromLocalStorage("accessToken");
  const router = useRouter();
  const [form, setForm] = useState<YoutubeFormState>({
    title: "",
    videoUrl: "",
    type: "YouTube",
    date: new Date().toISOString().split("T")[0],
    rewardVerification: { a: 0, b: 0, answer: 0 },
    adDuration: 0,
    rewardAmount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (["a", "b", "answer"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        rewardVerification: {
          ...prev.rewardVerification,
          [name]: Number(value),
        },
      }));
    } else if (["rewardAmount", "adDuration"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { ...form };

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/daily-tasks/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Failed to create task");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      return res.json();
    });

    toast.promise(promise, {
      loading: "Creating task...",
      success: (data) => `Task created: ${data?.message || "Success"}`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <div className="max-w-xl my-12">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-6 bg-white rounded-xl shadow-md"
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Create YouTube Task
        </h2>

        <div className="space-y-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter task title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="videoUrl"
            className="block text-sm font-medium text-gray-700"
          >
            YouTube Video URL
          </label>
          <input
            id="videoUrl"
            type="url"
            name="videoUrl"
            placeholder="https://youtube.com/..."
            value={form.videoUrl}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Reward Verification
          </p>
          <div className="grid grid-cols-3 gap-3">
            {["a", "b", "answer"].map((field) => (
              <div key={field} className="space-y-1">
                <label
                  htmlFor={field}
                  className="block text-xs text-gray-600 capitalize"
                >
                  {field === "answer" ? "Answer (A + B)" : field}
                </label>
                <input
                  id={field}
                  type="number"
                  name={field}
                  placeholder={field}
                  value={(form.rewardVerification as any)[field]}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="rewardAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Reward Amount
          </label>
          <input
            id="rewardAmount"
            type="number"
            step="0.01"
            min="0.1"
            name="rewardAmount"
            placeholder="0.2"
            value={form.rewardAmount}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="adDuration"
            className="block text-sm font-medium text-gray-700"
          >
            Ad Duartion
          </label>
          <input
            id="adDuration"
            type="number"
            step="0.01"
            min="0.1"
            name="adDuration"
            placeholder="0.2"
            value={form.adDuration}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-all"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
}
