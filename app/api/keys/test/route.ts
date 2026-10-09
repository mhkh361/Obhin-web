import { NextResponse } from 'next/server';
import { testProviderHandshake } from '@/lib/providers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provider, apiKey, baseUrl } = body;

    if (!provider || !apiKey) {
      return NextResponse.json(
        { success: false, message: 'Provider and API Key required' },
        { status: 400 }
      );
    }

    const result = await testProviderHandshake(provider, apiKey, baseUrl);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Handshake test failed';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

