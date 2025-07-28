"use client";

import { useState } from "react";
import { toast } from "sonner";
import { getFromLocalStorage } from "@/utils/local-storage";

interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  features: string[];
}

interface EditSubscriptionModalProps {
  data: SubscriptionPlan;
  onClose: () => void;
  onUpdated: () => void;
}

const PLAN_OPTIONS = ["Basic", "Standard", "Premium", "Gold", "Titanium"];

const EditSubscriptionModal = ({ data, onClose, onUpdated }: EditSubscriptionModalProps) => {
  const token = getFromLocalStorage("accessToken");
  const [form, setForm] = useState<SubscriptionPlan>(data);

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

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscription-plans/${form._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(form),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Failed to update subscription plan");
      onUpdated();
      onClose();
      return res.json();
    });

    toast.promise(promise, {
      loading: "Updating plan...",
      success: (data) => `Plan updated: ${data?.message || "Success"}`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl relative">
        <h2 className="text-lg font-semibold mb-4">Edit Subscription Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Plan Name</label>
            <select
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded text-sm"
            >
              <option value="">Select</option>
              {PLAN_OPTIONS.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Price (USD)</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-2 rounded text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Features</label>
            {form.features.map((feature, index) => (
              <input
                key={index}
                name="features"
                value={feature}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Feature ${index + 1}`}
                className="w-full mb-2 border p-2 rounded text-sm"
              />
            ))}
            <button
              type="button"
              onClick={handleAddFeature}
              className="text-blue-600 text-sm hover:underline"
            >
              + Add Feature
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;
