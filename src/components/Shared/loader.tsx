const Loader = ({ message }: any) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-md  w-max fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <svg
        className="animate-spin h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="text-sm font-medium text-gray-800">
        {message ? message : "Loading"}...
      </span>
    </div>
  );
};

export default Loader;
