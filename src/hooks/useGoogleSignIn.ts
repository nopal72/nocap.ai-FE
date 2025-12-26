"use client";

import { authClient } from "@/lib/auth";
import { useState } from "react";

/**
 * Custom hook for handling Google Sign-In logic.
 * It fetches a redirect URL from the backend and navigates the user to it.
 *
 * @returns An object containing:
 *  - `signIn`: A function to initiate the sign-in process.
 *  - `loading`: A boolean indicating if the sign-in process is in progress.
 *  - `error`: A string containing an error message if the sign-in failed, otherwise null.
 */
export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setLoading(true);
    setError(null);

    // const data = await apiInstance.post<{url: string}>('/auth/sign-in/social',{
    //   provider: 'google',
    //   callbackURL: `${window.location.origin}/auth/callback/google`
    // });

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/analyze`,
    });

    if (error && error.message) {
      setError(error.message);
      console.error("An error occurred during sign-in:", error);
      // Only stop loading on error, as success navigates away from the page.
      setLoading(false);
      return;
    }
  };

  return { signIn, loading, error };
};
