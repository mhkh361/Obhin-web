'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Only track public visits; avoid counting admin console refreshes
    if (pathname && !pathname.startsWith('/admin') && trackedPath.current !== pathname) {
      trackedPath.current = pathname;
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}

