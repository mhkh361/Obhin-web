import { NextResponse } from 'next/server';
import { prisma, mockStore, hasDb } from '@/lib/prisma';
import type { Platform } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (hasDb) {
      const logs = await prisma.downloadLog.findMany();
      const stats = {
        WINDOWS: logs.filter((l) => l.platform === 'WINDOWS').length,
        MACOS: logs.filter((l) => l.platform === 'MACOS').length,
        LINUX: logs.filter((l) => l.platform === 'LINUX').length,
        total: logs.length,
      };
      return NextResponse.json({ success: true, stats, recentLogs: logs.slice(-20) });
    }
  } catch {
    // fall through to mockStore
  }

  const win = mockStore.downloads.filter((d) => d.platform === 'WINDOWS').length;
  const mac = mockStore.downloads.filter((d) => d.platform === 'MACOS').length;
  const linux = mockStore.downloads.filter((d) => d.platform === 'LINUX').length;
  return NextResponse.json({
    success: true,
    stats: { WINDOWS: win, MACOS: mac, LINUX: linux, total: win + mac + linux },
    recentLogs: mockStore.downloads,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { platform } = body;

    const validatedPlatform = (
      platform?.toUpperCase() === 'MACOS'
        ? 'MACOS'
        : platform?.toUpperCase() === 'LINUX'
        ? 'LINUX'
        : 'WINDOWS'
    ) as Platform;

    let createdLog;
    try {
      if (hasDb) {
        createdLog = await prisma.downloadLog.create({
          data: {
            platform: validatedPlatform,
            version: '4.0.0-PROD',
          },
        });
      } else {
        throw new Error('No cloud DB connected yet');
      }
    } catch {
      createdLog = {
        id: `dl-${Date.now()}`,
        platform: validatedPlatform,
        version: '4.0.0-PROD',
        downloadedAt: new Date().toISOString(),
      };
      mockStore.downloads.push(createdLog);
    }

    return NextResponse.json({
      success: true,
      downloadUrl: `https://github.com/obhin-ai/obhin/releases/download/v4.0.0/obhin-v4.0.0-${validatedPlatform.toLowerCase()}.${
        validatedPlatform === 'WINDOWS' ? 'exe' : validatedPlatform === 'MACOS' ? 'dmg' : 'AppImage'
      }`,
      log: createdLog,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error logging download';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
