"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

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

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

    const token = Cookies.get('auth_token');
    if (!token) {
      setError('Authentication token not found. Please sign in again.');
      setLoadingState('error');
      return;
    }

    try {
      // 2. Get the pre-signed URL from our backend
      const presignResponse = await fetch(`${API_BASE_URL}/image/get-presign-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
        }),
      });

      if (!presignResponse.ok) {
        const errorData = await presignResponse.json();
        throw new Error(errorData.message || 'Failed to get upload URL.');
      }

      const { uploadUrl, fileKey, accessUrl } = await presignResponse.json();

      // 3. Upload the file directly to the storage URL (e.g., S3)
      setLoadingState('uploading');
      await axios.put(uploadUrl, file, {
        headers: { 'Content-Type': file.type },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || file.size));
          setUploadProgress(percentCompleted);
        },
      });

      // 4. Trigger the analysis process with the fileKey
      setLoadingState('analyzing');
      const analysisResponse = await fetch(`${API_BASE_URL}/generate/from-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ fileKey }),
      });

      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json();
        throw new Error(errorData.message || 'Failed to analyze image.');
      }

      const result: AnalysisResult = await analysisResponse.json();
      setAnalysisResult(result);
      
      // Store the result in session storage to pass it to the next page
      sessionStorage.setItem('analysisResult', JSON.stringify({ ...result, accessUrl }));

      setLoadingState('success');
      router.push('/result');

    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
      setLoadingState('error');
    }
  }, [router]);

  return { generateAnalysis, loadingState, uploadProgress, analysisResult, error };
};