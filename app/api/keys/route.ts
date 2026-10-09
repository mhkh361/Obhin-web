import { NextResponse } from 'next/server';
import { prisma, mockStore } from '@/lib/prisma';
import { encryptKey, maskKey } from '@/lib/crypto';
import { testProviderHandshake } from '@/lib/providers';
import type { ApiProvider } from '@prisma/client';

export async function GET() {
  try {
    const keys = await prisma.userApiKey.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    // Mask sensitive encrypted keys before client return
    const safeKeys = keys.map((k) => ({
      ...k,
      encryptedKey: maskKey(k.encryptedKey),
    }));
    return NextResponse.json({ success: true, keys: safeKeys });
  } catch {
    // Resilient fallback to mockStore
    return NextResponse.json({
      success: true,
      keys: mockStore.keys.map((k) => ({
        ...k,
        encryptedKey: maskKey(k.encryptedKey),
      })),
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provider, label, apiKey, baseUrl, isDefault } = body;

    if (!provider || !apiKey) {
      return NextResponse.json({ error: 'Provider and API Key are required' }, { status: 400 });
    }

    // Encrypt key with AES-256-GCM
    const { encryptedKey, iv, authTag } = encryptKey(apiKey);

    // Initial handshake verification
    const handshake = await testProviderHandshake(provider, apiKey, baseUrl);

    let createdKey;
    try {
      // Find or create default user
      let user = await prisma.user.findFirst();
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: 'builder@obhin.ai',
            name: 'OBHIN Developer',
          },
        });
      }

      if (isDefault) {
        await prisma.userApiKey.updateMany({
          where: { userId: user.id },
          data: { isDefault: false },
        });
      }

      createdKey = await prisma.userApiKey.create({
        data: {
          userId: user.id,
          provider: provider as ApiProvider,
          label: label || `${provider} Key`,
          encryptedKey,
          iv,
          authTag,
          baseUrl: baseUrl || null,
          isDefault: Boolean(isDefault),
          lastTestedAt: new Date(),
          latencyMs: handshake.latencyMs,
        },
      });
    } catch {
      // Fallback in-memory persistence
      createdKey = {
        id: `key-${Date.now()}`,
        userId: 'default-user',
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockStore.keys.unshift(createdKey as any);
    }

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

