"use client"

import { authClient } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export const useSignOut = () => {
  const router = useRouter()

  const signOut = async () => {
      const {error} =await authClient.signOut();

      if (error && error.message) {
        // Even if the server fails, the user is logged out on the client.
        console.error("Sign out failed on server.", error.message)
      }

      // Remove the token from cookies and local storage.
      Cookies.remove('auth_token');
      localStorage.removeItem('auth_token');
   
      // Always redirect to the login page after attempting to sign out.
      router.push("/")
    
  }

  return { signOut }
}
