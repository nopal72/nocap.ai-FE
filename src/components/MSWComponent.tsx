'use client';

import { useEffect, useState } from 'react';
import { enableMocking } from '@/mock/enableMocking';

export function MSWComponent({ children }: { children: React.ReactNode }) {
  const [isMSWReady, setIsMSWReady] = useState(false);

  useEffect(() => {
    enableMocking().then(() => {
      setIsMSWReady(true);
    });
  }, []);

  // Don't render children until MSW is ready to prevent race conditions
  if (!isMSWReady && process.env.NODE_ENV === 'development') {
    return null;
  }

  return <>{children}</>;
}
