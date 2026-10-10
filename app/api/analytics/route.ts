import { NextResponse } from 'next/server';
import { prisma, hasDb, getTrafficCounts, saveTrafficCounts } from '@/lib/prisma';

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

  const s = getTrafficCounts();
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
    const s = getTrafficCounts();
    s.totalPageViews += 1;
    saveTrafficCounts();

    if (hasDb && prisma) {
      await prisma.trafficAnalytics.upsert({
        where: { id: 'global-traffic' },
        create: {
          id: 'global-traffic',
          totalPageViews: s.totalPageViews,
        },
        update: {
          totalPageViews: { increment: 1 },
        },
      });
    }
    return NextResponse.json({ success: true, count: s.totalPageViews });
  } catch {
    const s = getTrafficCounts();
    return NextResponse.json({ success: true, count: s.totalPageViews });
  }
}
