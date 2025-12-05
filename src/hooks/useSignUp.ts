"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Defines the structure for the sign-up function parameters.
 */
interface SignUpParams {
  email: string;
  name: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Custom hook for handling user sign-up logic.
 * It sends user data to the backend sign-up endpoint.
 *
 * @returns An object containing:
 *  - `signUp`: A function to initiate the sign-up process.
 *  - `loading`: A boolean indicating if the sign-up process is in progress.
 *  - `error`: A string containing an error message if sign-up failed, otherwise null.
 */
export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signUp = async ({ email, name, password, rememberMe }: SignUpParams) => {
    setLoading(true);
    setError(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/auth/sign-up/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password, rememberMe }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to sign up.');
      }

      // On successful sign-up, redirect to the login page
      router.push('/login');

    } catch (err: any) {
      setError(err.message);
      console.error('An error occurred during sign-up:', err);
      setLoading(false);
    }
  };

  return { signUp, loading, error };
};
