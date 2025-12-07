import { useState, useCallback, useRef } from 'react';
import { apiClient } from '@/lib/api-client';
import Cookies from 'js-cookie';

/**
 * Type definitions based on the API contract for generation history.
 */
export interface HistoryItem {
  id: string;
  fileKey: string;
  imageUrl: string;
  engagement: {estimatedScore: number;};
  createdAt: string;
}

interface PageInfo {
  limit: number;
  nextCursor: string | null;
  hasNextPage: boolean;
}

interface HistoryResponse {
  items: HistoryItem[];
  pageInfo: PageInfo;
}

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseHistoryProps {
  limit?: number;
}

/**
 * Custom hook to fetch and manage generation history with cursor-based pagination.
 *
 * @param {UseHistoryProps} options - Configuration options for the hook, like page limit.
 * @returns An object containing the history items, fetch status, and pagination controls.
 */
export const useHistory = ({ limit = 20 }: UseHistoryProps = {}) => {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    limit,
    nextCursor: null,
    hasNextPage: true,
  });
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const fetchHistory = useCallback(async (cursor?: string | null) => {
    // Prevent multiple simultaneous requests
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setStatus('loading');
    setError(null);

    const token = Cookies.get('auth_token');

    try {
      const params = new URLSearchParams({
        limit: String(limit),
      });
      if (cursor) {
        params.set('cursor', cursor);
      }

      const response = await apiClient.get<HistoryResponse>(`/generate/history`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { items: newItems, pageInfo: newPageInfo } = response.data;


      setItems(prev => (cursor ? [...prev, ...newItems] : newItems));
      setPageInfo(newPageInfo);
      setStatus('success');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch history.';
      setError(errorMessage);
      setStatus('error');
    } finally {
      isFetchingRef.current = false;
    }
  }, [limit]);

  const fetchNextPage = useCallback(() => {
    if (pageInfo.hasNextPage && !isFetchingRef.current) {
      fetchHistory(pageInfo.nextCursor);
    }
  }, [fetchHistory, pageInfo.hasNextPage, pageInfo.nextCursor]);

  const loadFirstPage = useCallback(() => {
    if (!isFetchingRef.current) {
      fetchHistory();
    }
  }, [fetchHistory]);

  return { items, status, error, pageInfo, fetchNextPage, loadFirstPage };
};