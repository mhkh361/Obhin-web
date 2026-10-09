import { NextResponse } from 'next/server';
import { prisma, mockStore, hasDb } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (hasDb && prisma) {
      const dbProviders = await prisma.apiProviderItem.findMany({
        orderBy: { order: 'asc' },
      });
      if (dbProviders.length > 0) {
        return NextResponse.json({ success: true, providers: dbProviders });
      }
    }
  } catch {
    // fallback
  }

  return NextResponse.json({
    success: true,
    providers: mockStore.providers,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { providerKey, name, tag, description, defaultUrl, isVisible } = body;

    if (!providerKey || !name || !description) {
      return NextResponse.json({ error: 'providerKey, name, and description required' }, { status: 400 });
    }

    const newProv = {
      id: `prov-${Date.now()}`,
      providerKey: providerKey.toUpperCase(),
      name,
      tag: tag || 'Ready',
      description,
      defaultUrl: defaultUrl || null,
      isVisible: isVisible !== false,
      order: mockStore.providers.length + 1,
    };

    try {
      if (hasDb && prisma) {
        const created = await prisma.apiProviderItem.upsert({
          where: { providerKey: newProv.providerKey },
          create: {
            providerKey: newProv.providerKey,
            name: newProv.name,
            tag: newProv.tag,
            description: newProv.description,
            defaultUrl: newProv.defaultUrl,
            isVisible: newProv.isVisible,
            order: newProv.order,
          },
          update: {
            name: newProv.name,
            tag: newProv.tag,
            description: newProv.description,
            defaultUrl: newProv.defaultUrl,
            isVisible: newProv.isVisible,
          },
        });
        const idx = mockStore.providers.findIndex((p) => p.providerKey === newProv.providerKey);
        if (idx !== -1) mockStore.providers[idx] = created;
        else mockStore.providers.push(created);
        return NextResponse.json({ success: true, provider: created });
      }
    } catch {
      // fallback
    }

    const idx = mockStore.providers.findIndex((p) => p.providerKey === newProv.providerKey);
    if (idx !== -1) mockStore.providers[idx] = newProv;
    else mockStore.providers.push(newProv);

    return NextResponse.json({ success: true, provider: newProv });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error saving provider';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { providerKey, isVisible } = await req.json();
    if (!providerKey) return NextResponse.json({ error: 'providerKey required' }, { status: 400 });

    try {
      if (hasDb && prisma) {
        await prisma.apiProviderItem.update({
          where: { providerKey },
          data: { isVisible },
        });
      }
    } catch {
      // fallback
    }

    const prov = mockStore.providers.find((p) => p.providerKey === providerKey);
    if (prov) prov.isVisible = Boolean(isVisible);

    return NextResponse.json({ success: true, providerKey, isVisible });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating provider';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

