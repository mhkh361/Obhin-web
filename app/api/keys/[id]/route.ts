import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const idx = mockStore.keys.findIndex((k) => k.id === id);
  if (idx !== -1) {
    mockStore.keys.splice(idx, 1);
  }
  return NextResponse.json({ success: true, message: 'API Key removed' });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const key = mockStore.keys.find((k) => k.id === id);
  if (key) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = await req.json().catch(() => ({}));
    if (body.isActive !== undefined) key.isActive = body.isActive;
    if (body.isDefault !== undefined) key.isDefault = body.isDefault;
  }
  return NextResponse.json({ success: true, key });
}
