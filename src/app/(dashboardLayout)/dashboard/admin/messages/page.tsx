"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { getFromLocalStorage } from "@/utils/local-storage";
import Image from "next/image";

type Message = {
  name: string;
  email: string;
  subject: string;
  message: string;
  profileImg: string;
  date: Date;
};

const MessageTable = () => {
  const [filter, setFilter] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);

  const token = getFromLocalStorage("accessToken");

  useEffect(() => {
    const fetchMessages = async () => {
      if (!token) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/contact`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          const mapped: Message[] = data.data.map((m: any) => ({
            name: m.name,
            email: m.email,
            subject: m.subject,
            message: m.message,
            profileImg: m.profileImg || "https://i.pravatar.cc/150?img=1",
            date: new Date(m.createdAt),
          }));
          setMessages(mapped);
          setFilteredMessages(mapped);
        } else {
          toast.error(data.message || "Failed to fetch messages");
        }
      } catch (err) {
        toast.error("Error fetching messages");
      }
    };

    fetchMessages();
  }, [token]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    setFilter(keyword);
    setFilteredMessages(
      messages.filter(
        (m) =>
          m.name.toLowerCase().includes(keyword) ||
          m.email.toLowerCase().includes(keyword) ||
          m.subject.toLowerCase().includes(keyword)
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
        <input
          value={filter}
          onChange={handleFilter}
          placeholder="Search messages..."
          className="border px-3 py-2 rounded text-sm w-64"
        />
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredMessages.map((msg, idx) => (
              <tr key={idx}>
                <td className="px-4 py-3 flex items-center gap-2">
                  <Image
                    src={msg.profileImg}
                    alt={msg.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">{msg.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-600">{msg.email}</td>
                <td className="px-4 py-3 text-gray-700">{msg.subject}</td>
                <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{msg.message}</td>
                <td className="px-4 py-3 text-gray-400">{format(msg.date, "dd MMM yyyy")}</td>
              </tr>
            ))}
            {filteredMessages.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-6">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageTable;
