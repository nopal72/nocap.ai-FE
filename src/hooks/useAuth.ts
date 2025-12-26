import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = async () => {
      const { data } = await authClient.getSession();

      if (data) {
        setIsLoading(false);
      } else {
        router.replace("/login");
      }
    };
    isAuthenticated();
  }, [router]);

  return { isLoading};
};
