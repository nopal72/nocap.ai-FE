"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth';

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

  
      // Note: Using '/auth/sign-in' for standard email/password login.
  const {error} =    await authClient.signIn.email({ email, password });

    if (error && error.message) {
      setError(error.message);
      console.error('An error occurred during sign-in:', error);
      setLoading(false);
      return;
    }

      // On successful sign-in, you might want to store tokens from 'data' here.
      // For now, redirecting to the analyze page.
      router.push('/analyze');

   

  };

  return { signIn, loading, error };
};
