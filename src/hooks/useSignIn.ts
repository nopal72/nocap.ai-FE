"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Defines the structure for the sign-in function parameters.
 */
interface SignInParams {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Custom hook for handling user sign-in logic with email and password.
 * It sends user credentials to the backend sign-in endpoint.
 *
 * @returns An object containing:
 *  - `signIn`: A function to initiate the sign-in process.
 *  - `loading`: A boolean indicating if the sign-in process is in progress.
 *  - `error`: A string containing an error message if sign-in failed, otherwise null.
 */
export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signIn = async ({ email, password, rememberMe }: SignInParams) => {
    setLoading(true);
    setError(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      // Note: Using '/auth/sign-in' for standard email/password login.
      const response = await fetch(`${apiBaseUrl}/auth/sign-in/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to sign in.');
      }

      const data = await response.json();
      
      // Store user data in local storage
      localStorage.setItem('userData', JSON.stringify(data));

      // On successful sign-in, you might want to store tokens from 'data' here.
      // For now, redirecting to the analyze page.
      router.push('/analyze');

    } catch (err: any) {
      setError(err.message);
      console.error('An error occurred during sign-in:', err);
      setLoading(false);
    }
  };

  return { signIn, loading, error };
};
