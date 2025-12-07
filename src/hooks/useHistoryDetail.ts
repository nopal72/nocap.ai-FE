"use client";

import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';

/**
 * Type definitions based on the API contract for detailed history.
 */
export interface DetailedHistoryItem {
  id: string;
  fileKey: string;
  accessUrl: string;
  tasks: string[];
  imageUrl: string; 
  curation: {
    isAppropriate: boolean;
    labels: string[];
    risk: string;
    notes: string;
  };
  caption: {
    text: string;
    alternatives: string[];
  };
  songs: Array<{
    title: string;
    artist: string;
    reason: string;
  }>;
  topics: Array<{
    topic: string;
    confidence: number;
  }>;
  engagement: {
    estimatedScore: number;
    drivers: string[];
    suggestions: string[];
  };
  meta: {
    language: string;
    generatedAt: string;
  };
}

interface DetailHistoryResponse {
  item: DetailedHistoryItem;
}

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Custom hook to fetch detailed history for a specific entry.
 *
 * @param {string} historyId - The ID of the history entry to fetch
 * @returns An object containing the history item, fetch status, and fetch function
 */
export const useHistoryDetail = (historyId?: string) => {
  const [item, setItem] = useState<DetailedHistoryItem | null>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async (id: string) => {
    if (!id) {
      setError('History ID is required');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const response = await apiClient.get<DetailHistoryResponse>(`/generate/history/${id}`);
      const { item: detailedItem } = response.data;

      setItem(detailedItem);
      setStatus('success');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch history detail.';
      setError(errorMessage);
      setStatus('error');
    }
  }, []);

  // Auto-fetch if historyId is provided
  const loadDetail = useCallback(async () => {
    if (historyId) {
      await fetchDetail(historyId);
    }
  }, [historyId, fetchDetail]);

  return { item, status, error, fetchDetail, loadDetail };
};
