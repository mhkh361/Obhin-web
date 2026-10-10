import { NextResponse } from 'next/server';
import { prisma, hasDb, getTrafficCounts, saveTrafficCounts } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const s = getTrafficCounts();
  return NextResponse.json({
    success: true,
    stats: {
      WINDOWS: s.windowsDownloads,
      MACOS: s.macDownloads,
      LINUX: s.linuxDownloads,
      total: s.windowsDownloads + s.macDownloads + s.linuxDownloads,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { platform } = body;
    const plat = (platform || 'WINDOWS').toUpperCase();

    const s = getTrafficCounts();
    if (plat === 'MACOS') {
      s.macDownloads += 1;
    } else if (plat === 'LINUX') {
      s.linuxDownloads += 1;
    } else {
      s.windowsDownloads += 1;
    }
    saveTrafficCounts();

    try {
      if (hasDb && prisma) {
        await prisma.trafficAnalytics.upsert({
          where: { id: 'global-traffic' },
          create: {
            id: 'global-traffic',
            windowsDownloads: plat === 'WINDOWS' ? 1 : 0,
            macDownloads: plat === 'MACOS' ? 1 : 0,
            linuxDownloads: plat === 'LINUX' ? 1 : 0,
          },
          update: {
            windowsDownloads: plat === 'WINDOWS' ? { increment: 1 } : undefined,
            macDownloads: plat === 'MACOS' ? { increment: 1 } : undefined,
            linuxDownloads: plat === 'LINUX' ? { increment: 1 } : undefined,
          },
        });
      }
    } catch {
      // fallback
    }

    const downloadUrl = `https://github.com/mhkh361/Obhin-web/releases/download/v4.0.0/obhin-v4.0.0-${plat.toLowerCase()}.${
      plat === 'WINDOWS' ? 'exe' : plat === 'MACOS' ? 'dmg' : 'AppImage'
    }`;

    return NextResponse.json({
      success: true,
      downloadUrl,
      platform: plat,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error tracking download';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
