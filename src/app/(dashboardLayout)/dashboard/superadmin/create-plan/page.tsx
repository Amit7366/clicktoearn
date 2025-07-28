"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getFromLocalStorage } from "@/utils/local-storage";

interface PlanFormState {
  name: string;
  price: number;
  features: string[];
}
const SUBSCRIPTION_PLAN = ["Basic", "Standard", "Premium", "Gold", "Titanium"];

export default function CreateSubscriptionPlan() {
  const authToken = getFromLocalStorage("accessToken");
  const router = useRouter();
  const [form, setForm] = useState<PlanFormState>({
    name: "",
    price: 0,
    features: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === "features" && index !== undefined) {
      const updatedFeatures = [...form.features];
      updatedFeatures[index] = value;
      setForm((prev) => ({ ...prev, features: updatedFeatures }));
    } else if (name === "price") {
      setForm((prev) => ({ ...prev, price: parseFloat(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { ...form };

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscription-plans/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Failed to create subscription plan");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      return res.json();
    });

    toast.promise(promise, {
      loading: "Creating subscription plan...",
      success: (data) => `Plan created: ${data?.message || "Success"}`,
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
          Create Subscription Plan
        </h2>

        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Select Plan Name
          </label>
          <select
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => handleChange(e)}
            className="w-full border rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a plan</option>
            {SUBSCRIPTION_PLAN.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price (USD)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Features
          </label>
          {form.features.map((feature, index) => (
            <input
              key={index}
              type="text"
              name="features"
              value={feature}
              onChange={(e) => handleChange(e, index)}
              placeholder={`Feature ${index + 1}`}
              className="w-full mb-2 border rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
          <button
            type="button"
            onClick={handleAddFeature}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            + Add Feature
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-all"
        >
          Create Plan
        </button>
      </form>
    </div>
  );
}
