"use client";

import { useEffect, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import Image from "next/image";
import { getFromLocalStorage } from "@/utils/local-storage";

type ClickedUser = {
  _id: string;
  count: number;
  date: string;
  user: {
    _id: string;
    id: string;
    userName: string;
    email: string;
    profileImg?: string;
    isDeleted: boolean;
  };
};

const ClickDataTable = () => {
  const [clicks, setClicks] = useState<ClickedUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const token = getFromLocalStorage("accessToken");

  const fetchClicks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/click/all`, {
        headers: { Authorization: `${token}` },
      });

      const result = await res.json();
      const records: ClickedUser[] = result.data.clicksByUser;
      setClicks(records);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load click records");
    }
  };

  useEffect(() => {
    if (token) fetchClicks();
  }, [token]);

  const filtered = clicks.filter((item) =>
    item.user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / entriesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will remove the record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await toast.promise(
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/click/all`, {
            method: "DELETE",
            headers: { Authorization: `${token}` },
          }),
          {
            loading: "Deleting record...",
            success: "Record deleted!",
            error: "Failed to delete record",
          }
        );
        fetchClicks(); // Refresh list
      } catch (err) {
        console.error(err);
      }
    }
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
          placeholder="Search by username..."
          className="border px-3 py-2 rounded w-full md:w-64 text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="p-3">S.L</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Click Count</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, index) => (
              <tr key={item._id} className="border-t bg-white">
                <td className="p-3">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td className="p-3 text-blue-600">#{item.user.id}</td>
                <td className="p-3 flex items-center gap-2 whitespace-nowrap">
                  <Image
                    src={item.user.profileImg || "https://i.pravatar.cc/150?u=" + item.user.email}
                    alt={item.user.userName}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  {item.user.userName}
                </td>
                <td className="p-3">{item.count}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button
                    className="bg-blue-100 text-blue-600 p-2 rounded"
                    onClick={() => console.log(item)}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-green-100 text-green-600 p-2 rounded"
                    onClick={() => console.log("Edit", item)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
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
    </div>
  );
};

export default ClickDataTable;
