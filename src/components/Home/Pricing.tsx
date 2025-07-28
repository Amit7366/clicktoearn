"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Plan {
  _id: string;
  name: string;
  price: number;
  features: string[];
}

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscription-plans/all`
        );
        const json = await res.json();
        if (json.success) {
          setPlans(json.data);
        } else {
          toast.error(json.message || "Failed to fetch plans");
        }
      } catch (err) {
        toast.error("Something went wrong fetching plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <section className="max-w-6xl w-full mx-auto bg-[#fdfdff] py-20 px-4 md:px-16 text-center">
      <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full font-semibold text-sm mb-4">
        Subscription Plan
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-10">
        Choose The Best Package <br /> For your Income
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading plans...</p>
      ) : (
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6">
          {plans.map((plan, idx) => (
            <div
              key={plan._id}
              className="w-full md:w-[calc(33%-24px)] relative bg-white rounded-xl shadow-xl px-8 py-10 mx-auto hover:shadow-2xl transition-all duration-300"
            >
              {/* Decorative Icon */}
              <div className="absolute md:top-[-30px] right-[30px] md:right-[-30px] text-4xl select-none">
                {["🐻", "🖐️", "✋"][idx % 3]}
              </div>

              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-1">
                ${plan.price}
                <span className="text-base font-medium">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Perfect for {plan.name.toLowerCase()} users
              </p>

              <ul className="text-sm text-left text-gray-700 space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-pink-600 text-lg">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
              href={'/register'}
                className={`${
                  idx % 2 === 0 ? "bg-purple-600" : "bg-orange-500"
                } w-full text-white font-semibold py-3 rounded-md hover:opacity-90 transition`}
              >
                Get Started
              </Link>

              <p className="text-xs text-gray-400 mt-3">
                No credit card required
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Pricing;
