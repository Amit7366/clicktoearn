// hooks/useRefetchOnFocus.ts
import { useEffect } from "react";

export const useRefetchOnFocus = (refetchFn: () => void) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        //console.log("Tab is back in focus, refetching...");
        refetchFn();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refetchFn]);
};
