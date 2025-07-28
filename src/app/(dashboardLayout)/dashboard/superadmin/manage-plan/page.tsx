"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { getFromLocalStorage } from "@/utils/local-storage";
import EditSubscriptionModal from "./EditSubscriptionModal";

interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  features: string[];
}

const SubscriptionPlanTable = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editPlan, setEditPlan] = useState<SubscriptionPlan | null>(null);
  const token = getFromLocalStorage("accessToken");

  const fetchPlans = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscription-plans/all`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      const result = await res.json();
      setPlans(result.data || []);
    } catch (error) {
      toast.error("Failed to load subscription plans");
    }
  };

  useEffect(() => {
    if (token) fetchPlans();
  }, [token]);

  const filtered = plans.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / entriesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the subscription plan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await toast.promise(
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscription-plans/${id}`,
            {
              method: "DELETE",
              headers: { Authorization: `${token}` },
            }
          ),
          {
            loading: "Deleting plan...",
            success: "Plan deleted!",
            error: "Failed to delete plan",
          }
        );
        fetchPlans();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Subscription Plans</h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm">Show</label>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border px-2 py-1 rounded text-sm"
          >
            {[5, 10, 15].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
          <span className="text-sm">entries</span>
        </div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
          className="border px-3 py-2 rounded w-full md:w-64 text-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="p-3">S.L</th>
              <th className="p-3">Plan Name</th>
              <th className="p-3">Price (USD)</th>
              <th className="p-3">Features</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((plan, index) => (
              <tr key={plan._id} className="border-t bg-white">
                <td className="p-3">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="p-3">{plan.name}</td>
                <td className="p-3">${plan.price.toFixed(2)}</td>
                <td className="p-3">
                  <ul className="list-disc list-inside text-xs space-y-1">
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => setEditPlan(plan)}
                    className="bg-green-100 text-green-600 p-2 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="bg-red-100 text-red-600 p-2 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <p>
          Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
          {Math.min(currentPage * entriesPerPage, filtered.length)} of{" "}
          {filtered.length} entries
        </p>
        <div className="flex gap-1">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Optional Edit Modal */}
      {/* {editPlan && (
        <YourEditPlanModal
          data={editPlan}
          onClose={() => setEditPlan(null)}
        />
      )} */}
      {editPlan && (
        <EditSubscriptionModal
          data={editPlan}
          onClose={() => setEditPlan(null)}
          onUpdated={fetchPlans}
        />
      )}
    </div>
    // At the bottom of your component:
  );
};

export default SubscriptionPlanTable;
