import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/prisma';
import { encryptKey, maskKey } from '@/lib/crypto';
import { testProviderHandshake } from '@/lib/providers';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    keys: mockStore.keys.map((k) => ({
      ...k,
      encryptedKey: maskKey(k.encryptedKey),
    })),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provider, label, apiKey, baseUrl, isDefault } = body;

    if (!provider || !apiKey) {
      return NextResponse.json({ error: 'Provider and API Key are required' }, { status: 400 });
    }

    const { encryptedKey, iv, authTag } = encryptKey(apiKey);
    const handshake = await testProviderHandshake(provider, apiKey, baseUrl);

    const createdKey = {
      id: `key-${Date.now()}`,
      userId: 'client-local-user',
      provider,
      label: label || `${provider} Key`,
      encryptedKey,
      iv,
      authTag,
      baseUrl: baseUrl || null,
      isActive: true,
      isDefault: Boolean(isDefault),
      lastTestedAt: new Date().toISOString(),
      latencyMs: handshake.latencyMs,
      createdAt: new Date().toISOString(),
    };

    mockStore.keys.unshift(createdKey);

    return NextResponse.json({
      success: true,
      key: {
        ...createdKey,
        encryptedKey: maskKey(apiKey),
      },
      handshake,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
