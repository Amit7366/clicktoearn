"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { getFromLocalStorage } from "@/utils/local-storage";
import { toast } from "sonner";
import ChangePassword from "./ChangePassword";
import { getUserInfo } from "@/services/auth.services";
import Image from "next/image";

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const [userData, setUserData] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    userName: "",
    email: "",
    referralId: "",
    referredBy: "",
    refferCount: 0,
    contactNo: "",
    userLevel: "",
    profileImg: "",
  });

  const userInfo = getUserInfo();
  const token = getFromLocalStorage("accessToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/normalUsers/${userInfo?.objectId}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        const json = await res.json();

        if (json?.data) {
          const data = json.data;
          setUserData(data);
          setForm({
            name: data.name || "",
            userName: data.userName || "",
            email: data.email || "",
            referralId: data.referralId || "",
            referredBy: data.referredBy || "",
            refferCount: data.refferCount || 0,
            contactNo: data.contactNo || "",
            userLevel: data.userLevel || "",
            profileImg: data.profileImg || "",
          });
        }
      } catch {
        toast.error("Failed to fetch user info");
      }
    };

    fetchUserData();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setForm((prev) => ({
        ...prev,
        profileImg: URL.createObjectURL(file), // 👈 live preview
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.promise(
      (async () => {
        let imageUrl = form.profileImg;

        if (selectedFile) {
          const formData = new FormData();
          formData.append("file", selectedFile);
          formData.append("upload_preset", "clicktoearn");

          const uploadRes = await fetch(
            "https://api.cloudinary.com/v1_1/dsekhxz2h/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const uploadData = await uploadRes.json();

          if (!uploadData.secure_url) {
            throw new Error("Image upload failed");
          }

          imageUrl = uploadData.secure_url;
        }

        const payload: any = {
          name: form.name,
          referredBy: form.referredBy,
        };

        if (selectedFile) {
          payload.profileImg = imageUrl;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/normalUsers/${userInfo?.objectId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({ normalUser: payload }),
          }
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Profile update failed");
        }

        return "Profile updated successfully";
      })(),
      {
        loading: "Updating profile...",
        success: (msg) => msg,
        error: (err: any) => err.message || "Something went wrong",
      }
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mt-12 bg-white rounded-lg shadow">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 rounded-t-md font-semibold ${
            activeTab === "settings"
              ? "bg-purple-600 text-white"
              : "bg-purple-100 text-purple-600"
          }`}
        >
          Settings
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-4 py-2 rounded-t-md font-semibold ${
            activeTab === "password"
              ? "bg-purple-600 text-white"
              : "bg-purple-100 text-purple-600"
          }`}
        >
          Change Password
        </button>
      </div>

      {/* Settings Form */}
      {activeTab === "settings" && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold">Profile Settings</h2>

          {/* Profile Image */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Image
              src={form.profileImg || "/avatar.jpg"}
              alt="Profile"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover border-2 border-dotted border-purple-400"
            />

            <div className="flex flex-col gap-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span className="text-xs text-gray-500">
                Upload new profile photo
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input py-3 px-3 border"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              className="input py-3 px-3 border"
              value={form.userName}
              disabled
              placeholder="Username"
            />
            <input
              className="input py-3 px-3 border"
              value={form.email}
              disabled
              placeholder="Email"
            />
            <input
              className="input py-3 px-3 border"
              value={form.contactNo}
              disabled
              placeholder="Contact No"
            />
            <input
              className="input py-3 px-3 border"
              value={form.referralId}
              disabled
              placeholder="Referral ID"
            />
            <input
              className="input py-3 px-3 border"
              name="referredBy"
              value={form.referredBy}
              onChange={handleChange}
              placeholder="Referred By"
            />
            <input
              className="input py-3 px-3 border"
              value={form.refferCount}
              disabled
              placeholder="Referral Count"
            />
            <input
              className="input py-3 px-3 border"
              value={form.userLevel}
              disabled
              placeholder="User Level"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold px-6 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> Save
          </button>
        </form>
      )}

      {activeTab === "password" && <ChangePassword />}
    </div>
  );
};

export default UserSettings;
