import { NextResponse } from 'next/server';
import { prisma, mockStore, hasDb } from '@/lib/prisma';
import type { Platform } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { platform } = await req.json();
    const validatedPlatform = (
      platform?.toUpperCase() === 'MACOS'
        ? 'MACOS'
        : platform?.toUpperCase() === 'LINUX'
        ? 'LINUX'
        : 'WINDOWS'
    ) as Platform;

    let logged;
    try {
      if (hasDb) {
        logged = await prisma.downloadLog.create({
          data: {
            platform: validatedPlatform,
            version: '4.0.0-PROD',
          },
        });
      } else {
        throw new Error('No DB');
      }
    } catch {
      logged = {
        id: `dl-${Date.now()}`,
        platform: validatedPlatform,
        version: '4.0.0-PROD',
        downloadedAt: new Date().toISOString(),
      };
      mockStore.downloads.push(logged);
    }

    return NextResponse.json({
      success: true,
      downloadUrl: `https://github.com/obhin-ai/obhin/releases/download/v4.0.0/obhin-v4.0.0-${validatedPlatform.toLowerCase()}.${
        validatedPlatform === 'WINDOWS' ? 'exe' : validatedPlatform === 'MACOS' ? 'dmg' : 'AppImage'
      }`,
      log: logged,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Telemetry failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
