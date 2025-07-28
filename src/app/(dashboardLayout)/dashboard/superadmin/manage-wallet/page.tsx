"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Swal from "sweetalert2";
import { getFromLocalStorage } from "@/utils/local-storage";
import { Eye, Trash2 } from "lucide-react";

type TransferRecord = {
  _id: string;
  user: {
    id: string;
    userName: string;
    email: string;
  };
  walletAddress: string;
  amount?: number;
  image: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

const QrTransferTable = () => {
  const [records, setRecords] = useState<TransferRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const token = getFromLocalStorage("accessToken");

  const fetchRecords = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/qr-transfer/all`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      const result = await res.json();
      setRecords(result.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load transfer records");
    }
  };

  useEffect(() => {
    if (token) fetchRecords();
  }, [token]);

  const filtered = records.filter((r) =>
    r.user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / entriesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the transfer record!",
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
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/qr-transfer/${id}`,
            {
              method: "DELETE",
              headers: { Authorization: `${token}` },
            }
          ),
          {
            loading: "Deleting...",
            success: "Deleted successfully",
            error: "Failed to delete",
          }
        );
        fetchRecords(); // Refresh list
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleStatusChange = async (index: number, newStatus: string) => {
    const record = filtered[(currentPage - 1) * entriesPerPage + index];

    const patchUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/qr-transfer/${record._id}/status`;

    const promise = fetch(patchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to update status");
      const updated = [...records];
     updated.find((r) => r._id === record._id)!.status = newStatus as "pending" | "approved" | "rejected";
      setRecords(updated);
      return res.json();
    });

    toast.promise(promise, {
      loading: "Updating status...",
      success: "Status updated!",
      error: (err) => `Error: ${err.message}`,
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
          placeholder="Search by user name..."
          className="border px-3 py-2 rounded w-full md:w-64 text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="p-3">S.L</th>
              {/* <th className="p-3">User ID</th> */}
              {/* <th className="p-3">Name</th> */}
              <th className="p-3">Wallet</th>
              {/* <th className="p-3">Amount</th> */}
              <th className="p-3">Status</th>
              <th className="p-3 text-center">QR Code</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((record, index) => (
              <tr key={record._id} className="border-t bg-white">
                <td className="p-3">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                {/* <td className="p-3 text-blue-600">#{record.user.id}</td> */}
                {/* <td className="p-3">{record.user.userName}</td> */}
                <td className="p-3">{record.walletAddress}</td>
                {/* <td className="p-3">{record.amount || "-"}</td> */}
                <td className="p-3">
                  <select
                    className="text-xs font-medium rounded px-2 py-1 border"
                    value={record.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-3 text-center">
                  <a
                    href={record.image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={record.image}
                      alt="proof"
                      width={40}
                      height={40}
                      className="rounded object-cover"
                    />
                  </a>
                </td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button className="bg-blue-100 text-blue-600 p-2 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(record._id)}
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

export default QrTransferTable;
