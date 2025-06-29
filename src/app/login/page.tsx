"use client";

import { useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
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

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});
export default function LoginPage() {
  const [error, setError] = useState("");
    const router = useRouter();


  const handleLogin = async (values: FieldValues) => {
    // console.log(values);
    try {
      const res = await userLogin(values);
      // console.log(res)
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        // console.log(res);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/dashboard");
      } else {
        setError(res.message);
        // console.log(res);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back! Please enter your details.
            </p>
          </div>

          <CIForm
            onSubmit={handleLogin}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              email: "",
              password: "",
            }}
          >
            <div>
              <PHInput name="email" type="email" label="Email" required />
            </div>

            <div>
              <PHInput
                name="password"
                type="password"
                label="Password"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded-sm" />
                Remember for 30 days
              </label>
              <a
                href="#"
                className="text-purple-600 hover:underline font-medium"
              >
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="block w-full text-center bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
             
            >
               "Login"
            </button>

            <Link
              href="/dashboard"
              className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </Link>
          </CIForm>

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-purple-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
         
        </div>
      </div>

      {/* Right side: Purple circle visual */}
      <div className="w-full md:w-1/2 bg-[#f9fafb] flex items-center justify-center relative">
        <div className="relative w-48 h-48 bg-purple-600 rounded-full shadow-[0_50px_80px_rgba(128,90,213,0.35)] overflow-hidden"></div>
      </div>
    </div>
  );
}
