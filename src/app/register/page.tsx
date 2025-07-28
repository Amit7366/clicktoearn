"use client";

import { modifyPayload } from "@/utils/modifyPayload";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CIForm from "@/components/Form/CIForm";
import PHInput from "@/components/Form/PHInput";
import { registerUser } from "@/services/actions/resgisterUser";
import Image from "next/image";
import { ArrowUpLeft } from "lucide-react";
import { useEffect, useState } from "react";

const userValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  referredBy: z.string().optional(),
  userName: z.string().min(3, "Username must be at least 3 characters"),
  contactNo: z.string().optional(),
});

const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  normalUser: userValidationSchema,
});

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invite = searchParams.get("invite") || "";

  const [defaultValues, setDefaultValues] = useState({
    password: "",
    normalUser: {
      name: "",
      userName: "",
      referredBy: invite,
      email: "",
      contactNo: "",
    },
  });

  useEffect(() => {
    if (invite) {
      setDefaultValues((prev) => ({
        ...prev,
        normalUser: {
          ...prev.normalUser,
          referredBy: invite,
        },
      }));
    }
  }, [invite]);

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);

    toast.promise(registerUser(data), {
      loading: "Registering your account...",
      success: async (res) => {
        if (res?.data?.id) {
          const loginRes = await userLogin({
            email: values.normalUser.email,
            password: values.password,
          });

          if (loginRes?.data?.accessToken) {
            storeUserInfo({ accessToken: loginRes.data.accessToken });
            router.push("/dashboard");
            return "Registered & logged in successfully!";
          } else {
            throw new Error("Login failed after registration.");
          }
        } else {
          throw new Error(res?.message || "Registration failed.");
        }
      },
      error: (err) => {
        console.error(err);
        return err?.message || "Something went wrong during registration.";
      },
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#F2F0FF] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[480px] bg-white mx-auto py-8 px-7 md:p-20 rounded-md shadow-md shadow-slate-400">
        <div>
          <Image
            src={"/logo.png"}
            width={150}
            height={100}
            alt="ClicktoEarn"
            className="mx-auto my-3"
          />
          <h2 className="text-2xl font-semibold text-gray-900">Registration</h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome! Please enter your details.
          </p>
        </div>

        <CIForm
          onSubmit={handleRegister}
          resolver={zodResolver(validationSchema)}
          defaultValues={defaultValues}
        >
          <PHInput
            label="Name"
            placeholder="Enter your name"
            type="text"
            name="normalUser.name"
          />
          <PHInput
            label="Username"
            placeholder="Choose a username"
            type="text"
            name="normalUser.userName"
          />

          <PHInput
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="normalUser.email"
          />
          <PHInput
            label="Contact No."
            placeholder="Enter your Phone"
            type="number"
            name="normalUser.contactNo"
          />
          <PHInput
            label="Password"
            placeholder="********"
            type="password"
            name="password"
          />
          <PHInput
            label="Referral"
            placeholder="Referral ID (optional)"
            type="text"
            name="normalUser.referredBy"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded-sm" />
              Remember for 30 days
            </label>
            <a href="#" className="text-purple-600 hover:underline font-medium">
              Forgot password
            </a>
          </div>

          <button
            type="submit"
            className="block w-full text-center bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Register
          </button>
        </CIForm>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
        <Link
          href={"/"}
          className="flex items-center justify-center gap-2 mt-4"
        >
          <div className="cursor-pointer w-10 h-10 rounded-full shadow-md shadow-slate-200 flex items-center justify-center">
            <ArrowUpLeft />
          </div>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
