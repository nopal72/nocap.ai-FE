"use client";

import { useState } from 'react';

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

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL ;
      const response = await fetch(`${apiBaseUrl}/auth/sign-in/social`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider: 'google' }), // Assuming the backend needs to know the provider
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to get Google sign-in URL.');
      }

      const data = await response.json();

      window.location.href = "/analyze";

    } catch (err: any) {
      setError(err.message);
      console.error('An error occurred during sign-in:', err);
      // Only stop loading on error, as success navigates away from the page.
      setLoading(false);
    }
  };

  return { signIn, loading, error };
};
