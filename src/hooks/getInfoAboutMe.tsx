// hooks/useCurrentUser.ts
import { authKey } from "@/constants/authkey";
import { getUserInfo } from "@/services/auth.services";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useEffect, useState } from "react";

type UserDetails = {
  name: string;
  email: string;
  avatar?: string;
  [key: string]: any; // allow additional fields
};

export const getInfoAboutMe = () => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userInfo = getUserInfo();
  const token = getFromLocalStorage(authKey);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/normalUsers/${userInfo?.objectId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser(data?.data || data); // adjust based on actual API shape
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return { user, loading, error };
};
