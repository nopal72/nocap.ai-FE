import axios from 'axios';
import Cookies from 'js-cookie';

// Fungsi untuk mendapatkan token autentikasi dari cookies
const getSessionToken = (): string | null => {
  if (typeof window !== 'undefined') {
    // Cek token di cookies terlebih dahulu (prioritas utama)
    const cookieToken = Cookies.get('auth_token');
    if (cookieToken) {
      return cookieToken;
    }
    // Fallback ke localStorage jika ada
    return localStorage.getItem('session_token');
  }
  return null;
};

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token Authorization ke setiap permintaan secara otomatis
apiClient.interceptors.request.use((config) => {
  const token = getSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});