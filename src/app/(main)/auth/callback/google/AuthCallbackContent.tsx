"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * A client component to handle the redirect from Google Sign-In.
 * It takes the authorization code from the URL, sends it to the backend
 * to exchange for user data, stores the data, and redirects to the main app.
 */
export default function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const authError = searchParams.get('error');

    if (authError) {
      setError(`Authentication failed: ${authError}. Redirecting to login...`);
      setTimeout(() => router.push('/login'), 3000);
      return;
    }

    if (!code) {
      setError('Authorization code not found. Redirecting to login...');
      setTimeout(() => router.push('/login'), 3000);
      return;
    }

    const exchangeCodeForUserData = async (authCode: string) => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        // This endpoint exchanges the Google auth code for user data.
        const response = await fetch(`${apiBaseUrl}/auth/callback/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: authCode }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to exchange code for user data.');
        }

        // The sign-in hooks now handle cookies, so we just need to redirect.
        // The backend should set the auth_token cookie.
        router.push('/analyze');

      } catch (err: any) {
        console.error('An error occurred during authentication:', err);
        setError(err.message);
        setTimeout(() => router.push('/login?error=authentication_failed'), 3000);
      }
    };

    exchangeCodeForUserData(code);

  }, [searchParams, router]);

  return (
    <div className="bg-gradient-to-br from-[#1a2332] to-[#0f1419] rounded-3xl p-12 border border-cyan-400/30 shadow-2xl shadow-cyan-400/20">
      {error ? (
        <>
          <h1 className="text-2xl font-bold text-red-500 mb-4">Authentication Failed</h1>
          <p className="text-gray-400">{error}</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-white mb-4">Authenticating...</h1>
          <p className="text-gray-400">Please wait while we securely log you in.</p>
        </>
      )}
    </div>
  );
}