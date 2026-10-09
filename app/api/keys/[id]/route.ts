import { NextResponse } from 'next/server';
import { prisma, mockStore, hasDb } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    if (hasDb) {
      await prisma.userApiKey.delete({ where: { id } });
      return NextResponse.json({ success: true, message: 'API Key deleted' });
    }
  } catch {
    // fallback
  }

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
  try {
    const body = await req.json();
    if (hasDb) {
      const updated = await prisma.userApiKey.update({
        where: { id },
        data: {
          isActive: body.isActive !== undefined ? body.isActive : undefined,
          isDefault: body.isDefault !== undefined ? body.isDefault : undefined,
        },
      });
      return NextResponse.json({ success: true, key: updated });
    }
  } catch {
    // fallback
  }

  const key = mockStore.keys.find((k) => k.id === id);
  if (key) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = await req.json().catch(() => ({}));
    if (body.isActive !== undefined) key.isActive = body.isActive;
    if (body.isDefault !== undefined) key.isDefault = body.isDefault;
  }
  return NextResponse.json({ success: true, key });
}
