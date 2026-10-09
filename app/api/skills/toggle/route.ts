import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request) {
  try {
    const { skillId, isEnabled } = await req.json();

    if (!skillId || typeof isEnabled !== 'boolean') {
      return NextResponse.json({ error: 'skillId and isEnabled boolean required' }, { status: 400 });
    }

    const target = mockStore.skills.find((s) => s.id === skillId);
    if (target) {
      target.isEnabled = isEnabled;
    }

    return NextResponse.json({ success: true, skillId, isEnabled });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error toggling skill';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
