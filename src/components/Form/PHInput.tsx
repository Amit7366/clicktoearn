import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react"; // Icon set

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

const PHInput = ({
  name,
  type = "text",
  label,
  placeholder,
  required,
}: TInputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && !showPassword ? "password" : "text";

  const getLeftIcon = () => {
    if (name.toLowerCase().includes("email")) return <Mail size={18} />;
    if (isPassword) return <Lock size={18} />;
    return null;
  };

  return (
    <div className="space-y-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-800">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <div
              className={`flex items-center border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md bg-gray-50 px-3 py-3 focus-within:ring-2 focus-within:ring-purple-500`}
            >
              <span className="text-gray-500">{getLeftIcon()}</span>
              <input
                {...field}
                id={name}
                type={inputType}
                placeholder={placeholder}
                required={required}
                className="flex-1 bg-transparent outline-none border-none px-2 text-sm text-gray-900 placeholder:text-gray-400"
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
            {error && (
              <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default PHInput;
