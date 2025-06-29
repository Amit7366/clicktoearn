import { Controller, useFormContext } from "react-hook-form";

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

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              required={required}
              className={`mt-1 w-full border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
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
