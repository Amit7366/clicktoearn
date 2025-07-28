"use client";

import { useState } from "react";
import { toast } from "sonner";
import { getFromLocalStorage } from "@/utils/local-storage";

interface ReplyMessageModalProps {
  recipientEmail: string;
  subject: string;
  onClose: () => void;
}

const ReplyMessageModal = ({ recipientEmail, subject, onClose }: ReplyMessageModalProps) => {
  const token = getFromLocalStorage("accessToken");
  const [reply, setReply] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: recipientEmail,
      subject,
      message: reply,
    };

    const promise = fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/contact/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      if (!res.ok) throw new Error("Failed to send reply");
      onClose();
      return res.json();
    });

    toast.promise(promise, {
      loading: "Sending reply...",
      success: (data) => `Reply sent: ${data?.message || "Success"}`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <h2 className="text-lg font-semibold mb-4">Reply to Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">To</label>
            <input
              type="email"
              value={recipientEmail}
              disabled
              className="w-full border p-2 rounded text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Subject</label>
            <input
              type="text"
              value={subject}
              disabled
              className="w-full border p-2 rounded text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Reply Message</label>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={5}
              className="w-full border p-2 rounded text-sm"
              required
            ></textarea>
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
              Send Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyMessageModal;
