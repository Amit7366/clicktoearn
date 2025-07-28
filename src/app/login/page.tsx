"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import CIForm from "@/components/Form/CIForm";
import { zodResolver } from "@hookform/resolvers/zod";
import PHInput from "@/components/Form/PHInput";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import setAccessToken from "@/services/actions/setAccessToken";
import { ArrowUpLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { usePersistReady } from "@/redux/hook/usePersistReady";
import { persistor } from "@/redux/persistor";
import { setCredentials } from "@/redux/slices/authSlice";

const validationSchema = z.object({
  identifier: z.string().min(3, "Enter email or username"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

export default function LoginPage() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const isPersistReady = usePersistReady(persistor);

  const handleLogin = async (values: FieldValues) => {
    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.identifier);

      const loginPayload = {
        ...(isEmail
          ? { email: values.identifier }
          : { userName: values.identifier }),
        password: values.password,
      };

      await toast.promise(
        (async () => {
          const response = await userLogin(loginPayload);
          const accessToken = response.data.accessToken;
          const needsPasswordChange = response.data.needsPasswordChange;

          if (accessToken) {
            setAccessToken(accessToken);
            storeUserInfo({ accessToken });

            setTimeout(() => {
              router.push("/dashboard");
            }, 300);

            return "Login successful!";
          } else {
            throw new Error("Invalid login response.");
          }
        })(),
        {
          loading: "Logging you in...",
          success: (msg) => msg,
          error: (err) =>
            err?.response?.data?.message || err?.message || "Login failed!",
        }
      );
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F2F0FF] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[480px] bg-white mx-auto py-8 px-7 md:p-20 rounded-md shadow-md shadow-slate-400">
        <div className="relative">
          <Image
            src={"/logo.png"}
            width={150}
            height={100}
            alt="ClicktoEarn"
            className="mx-auto my-3"
          />
          <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Please enter your details.
          </p>
        </div>

        <CIForm
          onSubmit={handleLogin}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            identifier: "",
            password: "",
          }}
        >
          <PHInput
            name="identifier"
            type="text"
            label="Email or Username"
            placeholder="Enter email or username"
            required
          />
          <PHInput name="password" type="password" label="Password" required />

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
            Login
          </button>
        </CIForm>

        <p className="text-sm text-center text-gray-500 mt-2">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign up
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
