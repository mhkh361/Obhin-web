import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { platform } = await req.json().catch(() => ({}));
    const plat = (platform?.toUpperCase() === 'MACOS' ? 'MACOS' : platform?.toUpperCase() === 'LINUX' ? 'LINUX' : 'WINDOWS');

    if (plat === 'MACOS') mockStore.traffic.macDownloads += 1;
    else if (plat === 'LINUX') mockStore.traffic.linuxDownloads += 1;
    else mockStore.traffic.windowsDownloads += 1;

    return NextResponse.json({
      success: true,
      downloadUrl: `https://github.com/mhkh361/Obhin-web/releases/download/v4.0.0/obhin-v4.0.0-${plat.toLowerCase()}.${
        plat === 'WINDOWS' ? 'exe' : plat === 'MACOS' ? 'dmg' : 'AppImage'
      }`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Download tracking failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
