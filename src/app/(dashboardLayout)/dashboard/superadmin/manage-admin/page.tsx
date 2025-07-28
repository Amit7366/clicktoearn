"use client";

import { useEffect, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "sonner";
import UserModal from "@/components/Modal/UserModal";
import { getFromLocalStorage } from "@/utils/local-storage";

type Admin = {
  _id: string;
  id: string;
  fullName: string;
  profileImg: string;
  email: string;
  isDeleted: boolean;
};

const ManageAdminsTable = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editAdmin, setEditAdmin] = useState<Admin | null>(null);
  const token = getFromLocalStorage("accessToken");

  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admins`, {
        headers: { Authorization: `${token}` },
      });
      const result = await res.json();
      const adminList: Admin[] = result.data;
      setAdmins(adminList);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load admins");
    }
  };

  useEffect(() => {
    if (token) fetchAdmins();
  }, [token]);

  const filtered = admins.filter((a) =>
    a.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / entriesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will mark the admin as deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await toast.promise(
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admins/${id}`, {
            method: "DELETE",
            headers: { Authorization: `${token}` },
          }),
          {
            loading: "Deleting admin...",
            success: "Admin deleted!",
            error: "Failed to delete admin",
          }
        );
        fetchAdmins();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6">
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
              <th className="p-3">Admin ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((admin, index) => (
              <tr key={admin._id} className="border-t bg-white">
                <td className="p-3">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="p-3 text-blue-600">#{admin.id}</td>
                <td className="p-3 flex items-center gap-2 whitespace-nowrap">
                  <Image
                    src={
                      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                    alt={admin.fullName}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  {admin.fullName}
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      admin.isDeleted
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {admin.isDeleted ? "Deleted" : "Active"}
                  </span>
                </td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => setEditAdmin(admin)}
                    className="bg-blue-100 text-blue-600 p-2 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditAdmin(admin)}
                    className="bg-green-100 text-green-600 p-2 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(admin._id)}
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

      {/* Admin Modal */}
      {editAdmin && (
        <UserModal
          data={editAdmin}
          onClose={() => setEditAdmin(null)}
        />
      )}
    </div>
  );
};

export default ManageAdminsTable;
