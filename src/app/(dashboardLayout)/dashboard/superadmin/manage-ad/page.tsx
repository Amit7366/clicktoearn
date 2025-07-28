"use client";

import { useEffect, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import AdModal from "@/components/Modal/AdModal";
import { getUserInfo } from "@/services/auth.services";
import { format } from "date-fns";
import { getFromLocalStorage } from "@/utils/local-storage";

type Ad = {
  _id: string;
  title: string;
  type: string;
  date: string;
  videoUrl: string;
  adDuration: number;
  rewardVerification: {
    a: number;
    b: number;
    answer: number;
  };
  rewardAmount: number;
};

export default function AdTasksTable() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editAd, setEditAd] = useState<Ad | null>(null);

  const authToken = getFromLocalStorage("accessToken");
  const userInfo = getUserInfo();
  const userId = userInfo?.objectId;
  const plan = userInfo?.plan || "Basic";
  const today = format(new Date(), "yyyy-MM-dd");

  const fetchAds = async () => {
    if (!userId || !authToken) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/daily-tasks/admin/all`,
        {
          method: "GET",
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      const result = await res.json();
      const tasks: Ad[] = result?.data || [];
      setAds(tasks);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
      toast.error("Failed to load ads");
    }
  };

  useEffect(() => {
    fetchAds();
  }, [userId, authToken, today, plan]);

  const filtered = ads.filter((d) =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / entriesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(new Promise((res) => setTimeout(() => res(true), 1000)), {
          loading: "Deleting...",
          success: () => {
            setAds((prev) => prev.filter((u) => u._id !== id));
            return "Ad deleted successfully";
          },
          error: "Delete failed",
        });
      }
    });
  };

  return (
    <div className="p-6">
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
          placeholder="Search title..."
          className="border px-3 py-2 rounded w-full md:w-64 text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Video URL</th>
              <th className="p-3">Type</th>
              <th className="p-3">Reward</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((ad) => (
              <tr key={ad._id} className="border-t bg-white">
                <td className="p-3 whitespace-nowrap">{ad.title}</td>
                <td className="p-3 whitespace-nowrap text-blue-600">
                  {ad.videoUrl}
                </td>
                <td className="p-3">{ad.type}</td>
                <td className="p-3">{ad.rewardAmount}</td>
                <td className="p-3">{ad.date}</td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => setEditAd(ad)}
                    className="bg-blue-100 text-blue-600 p-2 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditAd(ad)}
                    className="bg-green-100 text-green-600 p-2 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
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

      {/* Modal */}
      {editAd && (
        <AdModal
          data={editAd}
          onClose={() => {
            setEditAd(null);
            fetchAds(); // 🔁 Refetch ads after close
          }}
        />
      )}
    </div>
  );
}
