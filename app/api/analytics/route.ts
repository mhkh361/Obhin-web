import { NextResponse } from 'next/server';
import { prisma, mockStore, hasDb } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (hasDb && prisma) {
      const stats = await prisma.trafficAnalytics.findUnique({
        where: { id: 'global-traffic' },
      });
      if (stats) {
        return NextResponse.json({
          success: true,
          stats: {
            pageViews: stats.totalPageViews,
            windows: stats.windowsDownloads,
            mac: stats.macDownloads,
            linux: stats.linuxDownloads,
            totalDownloads: stats.windowsDownloads + stats.macDownloads + stats.linuxDownloads,
          },
        });
      }
    }
  } catch {
    // fallback
  }

  const s = mockStore.traffic;
  return NextResponse.json({
    success: true,
    stats: {
      pageViews: s.totalPageViews,
      windows: s.windowsDownloads,
      mac: s.macDownloads,
      linux: s.linuxDownloads,
      totalDownloads: s.windowsDownloads + s.macDownloads + s.linuxDownloads,
    },
  });
}

export async function POST() {
  try {
    mockStore.traffic.totalPageViews += 1;
    if (hasDb && prisma) {
      await prisma.trafficAnalytics.upsert({
        where: { id: 'global-traffic' },
        create: {
          id: 'global-traffic',
          totalPageViews: 1,
        },
        update: {
          totalPageViews: { increment: 1 },
        },
      });
    }
    return NextResponse.json({ success: true, count: mockStore.traffic.totalPageViews });
  } catch {
    return NextResponse.json({ success: true, count: mockStore.traffic.totalPageViews });
  }
}

