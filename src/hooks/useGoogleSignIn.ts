"use client";

import apiInstance from '@/lib/fetchClient';
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
      const data = await apiInstance.post<{url: string}>('/auth/sign-in/social',{
        provider: 'google'
      });

      // The backend provides the Google auth URL in the 'url' property.
      if (data) {
        window.location.href = data.data.url;
      } else {
        throw new Error('Could not get redirect URL from the server.');
      }

    } catch (err: any) {
      setError(err.message);
      console.error('An error occurred during sign-in:', err);
      // Only stop loading on error, as success navigates away from the page.
      setLoading(false);
    }
  };

  return { signIn, loading, error };
};
