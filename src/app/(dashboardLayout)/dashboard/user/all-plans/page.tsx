"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getFromLocalStorage } from "@/utils/local-storage";
import { getUserInfo } from "@/services/auth.services";
import { useUserBalance } from "@/hooks/useUserBalance";

interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  features: string[];
}

export default function SubscriptionPlanList() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const token = getFromLocalStorage("accessToken");
  const userInfo = getUserInfo();
  const userId = userInfo?.objectId;
  const { data: userBalance, isLoading, refetch } = useUserBalance();
  // console.log(userBalance);

  const fetchPlans = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscription-plans/all`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      const result = await res.json();
      setPlans(result.data);
    } catch (error) {
      toast.error("Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  };

  const activatePlan = async (planId: string) => {
    try {
      if (!userId) {
        throw new Error("User ID missing");
      }

      if (isPlanAlreadyActive(planId)) {
        toast.warning("This plan is already active.");
        return;
      }

      await toast.promise(
        (async () => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscription-activation/activate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
              body: JSON.stringify({ planId, userId }),
            }
          );

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Activation failed");
          }

          const data = await res.json();
          return data.message || "Plan activated successfully!";
        })(),
        {
          loading: "Activating plan...",
          success: (msg) => msg,
          error: (err) =>
            err?.response?.data?.message ||
            err?.message ||
            "Failed to activate plan",
        }
      );
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong.";
      toast.error(message);
    }
  };

  useEffect(() => {
    if (token) fetchPlans();
  }, [token]);
  //console.log(userBalance?.activeSubscriptionPlan?.name);
  const isPlanAlreadyActive = (planName: string) =>
    userBalance?.data?.activeSubscriptionPlan?.name === planName;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Subscription Plans</h2>
      {loading ? (
        <p>Loading plans...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="border p-4 rounded shadow bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  ${plan.price.toFixed(2)}
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => activatePlan(plan._id)}
                disabled={isPlanAlreadyActive(plan.name)}
                className={`mt-auto text-sm py-2 px-4 rounded ${
                  isPlanAlreadyActive(plan.name)
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isPlanAlreadyActive(plan.name)
                  ? "Already Active"
                  : "Activate Plan"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
