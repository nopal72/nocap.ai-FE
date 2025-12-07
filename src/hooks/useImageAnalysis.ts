"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import imageCompression from 'browser-image-compression';
import { apiClient } from '@/lib/api-client';

// Define the structure for the analysis result based on your mock handler
interface AnalysisResult {
  accessUrl?: string | null; // Add this to carry the clean URL
  curation: { isAppropriate: boolean; labels: string[]; risk: string; notes: string; };
  caption: { text: string; alternatives: string[]; };
  songs: { title: string; artist: string; reason: string; }[];
  topics: { topic: string; confidence: number; }[];
  engagement: { estimatedScore: number; drivers: string[]; suggestions: string[]; };
  meta: { language: string; generatedAt: string; };
}

// Define the possible states of the image processing flow
type LoadingState = 'idle' | 'presigning' | 'uploading' | 'analyzing' | 'success' | 'error';

/**
 * Custom hook to handle the entire image upload and analysis workflow.
 * 
 * @returns An object containing:
 *  - `generateAnalysis`: The function to start the process with a file.
 *  - `loadingState`: The current stage of the process.
 *  - `uploadProgress`: The upload progress percentage (0-100).
 *  - `analysisResult`: The final analysis data.
 *  - `error`: Any error message that occurred.
 */
export const useImageAnalysis = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const generateAnalysis = useCallback(async (file: File,previewUrl: string | null) => {
    // 1. Reset state for a new run
    setLoadingState('presigning');
    setError(null);
    setUploadProgress(0);
    setAnalysisResult(null);

    // apiClient's interceptor handles the token. We just check if it exists.
    if (!Cookies.get('auth_token')) {
      setError('Authentication token not found. Please sign in again.');
      setLoadingState('error');
      return;
    }

    try {

      const MAX_SIZE_MB = 2;
      let processedFile = file;

      // --- LOGIKA KOMPRESI GAMBAR ---
      // Cek jika ukuran file melebihi batas maksimal (2MB)
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        // Opsi untuk kompresi
        const options = {
          maxSizeMB: MAX_SIZE_MB,
          maxWidthOrHeight: 1920, // Opsional: Mengubah ukuran gambar agar tidak terlalu besar
          useWebWorker: true,      // Opsional: Menggunakan web worker agar UI tidak freeze
          onProgress: (p: number) => {
            // Anda bisa membuat state baru untuk progress kompresi jika mau
          },
        };

        processedFile = await imageCompression(file, options);
      }

      // 2. Get the pre-signed URL from our backend
      // apiClient akan otomatis menambahkan token. Tidak perlu config manual.
      const presignResponse = await apiClient.post('/image/get-presign-url',
        {
          fileName: processedFile.name,
          contentType: processedFile.type,
        }
      );

      const { uploadUrl, fileKey, accessUrl } = presignResponse.data;

      // 3. Upload the file directly to the storage URL (e.g., S3)
      setLoadingState('uploading');
      await axios.put(uploadUrl, processedFile, {
        headers: { 'Content-Type': processedFile.type },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || file.size));
          setUploadProgress(percentCompleted);
        },
      });

      // 4. Trigger the analysis process with the fileKey
      setLoadingState('analyzing');
      // Menggunakan apiClient yang sudah memiliki token, dan menambahkan timeout.
      const analysisResponse = await apiClient.post(`/generate/from-image`, {
        fileKey,
        tasks: ["curation", "caption", "songs", "topics", "engagement"],
        language: "id",
        limits:{maxSongs:5,maxTopics:8}
      }, {
        // Timeout 120 detik (120000 ms). 6000000 (100 menit) terlalu lama.
        timeout: 120000,
      });

      // Jika request berhasil, data ada di `analysisResponse.data`.
      const result: AnalysisResult = analysisResponse.data;
      setAnalysisResult(result);
      
      // INI BAGIAN PENTING: Menyimpan hasil analisis DAN accessUrl ke session storage
      sessionStorage.setItem('analysisResult', JSON.stringify({ ...result, accessUrl }));

      setLoadingState('success');
      router.push('/result');

    } catch (e: any) {
      // Menangani error dari Axios dengan lebih baik
      if (axios.isAxiosError(e) && e.response) {
        // e.response.data mungkin berisi pesan error dari backend
        const errorMessage = e.response.data?.message || e.response.statusText || 'An error occurred during the request.';
        setError(`Error: ${e.response.status} - ${errorMessage}`);
      } else {
      setError(e.message || 'An unexpected error occurred.');
      }
      setLoadingState('error');
    }
  }, [router]);

  return { generateAnalysis, loadingState, uploadProgress, analysisResult, error };
};