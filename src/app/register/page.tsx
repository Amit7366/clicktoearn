"use client";
import { modifyPayload } from "@/utils/modifyPayload";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CIForm from "@/components/Form/CIForm";
import PHInput from "@/components/Form/PHInput";
import { registerUser } from "@/services/actions/resgisterUser";

export const userValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  referredBy: z.string().optional(),
  userName: z.string().optional(),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  normalUser: userValidationSchema,
});

export const defaultValues = {
  password: "",
  normalUser: {
    name: "",
    userName: "",
    referredBy: "",
    email: "",
  },
};

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerUser(data);
      console.log("register res:", res);
      if (res?.data?.id) {
        toast.success(res?.message || "Registration successful!");

        const loginRes = await userLogin({
          email: values.normalUser.email,
          password: values.password,
        });

        if (loginRes?.data?.accessToken) {
          storeUserInfo({ accessToken: loginRes.data.accessToken });
          router.push("/dashboard");
        } else {
          toast.error("Login failed after registration.");
        }
      } else {
        toast.error(res?.message || "Registration failed.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong during registration.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div>
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
              label="Email"
              placeholder="Enter your email"
              type="email"
              name="normalUser.email"
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
            <Link href="/login" className="text-purple-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Circle visual */}
      <div className="w-full md:w-1/2 bg-[#f9fafb] flex items-center justify-center relative">
        <div className="relative w-48 h-48 bg-purple-600 rounded-full shadow-[0_50px_80px_rgba(128,90,213,0.35)] overflow-hidden"></div>
      </div>
    </div>
  );
}
