import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export const dynamic = 'force-dynamic';

export interface CreditAttribution {
  id: string;
  title: string;
  author: string;
  sourceType: 'github' | 'website' | 'doc';
  url: string;
  description: string;
}

const tmpCreditsPath = path.join(os.tmpdir(), 'obhin_credits_v1.json');
const repoCreditsPath = path.join(process.cwd(), 'lib', 'credits-data.json');

function getCredits(): CreditAttribution[] {
  // 1. Try temp file
  try {
    if (fs.existsSync(tmpCreditsPath)) {
      const data = JSON.parse(fs.readFileSync(tmpCreditsPath, 'utf-8'));
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}

  // 2. Try repo file
  try {
    if (fs.existsSync(repoCreditsPath)) {
      const data = JSON.parse(fs.readFileSync(repoCreditsPath, 'utf-8'));
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}

  return [];
}

function saveCredits(list: CreditAttribution[]) {
  try {
    fs.writeFileSync(tmpCreditsPath, JSON.stringify(list, null, 2), 'utf-8');
  } catch {}
  try {
    fs.writeFileSync(repoCreditsPath, JSON.stringify(list, null, 2), 'utf-8');
  } catch {}
}

export async function GET() {
  const credits = getCredits();
  return NextResponse.json({ success: true, credits });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, author, sourceType, url, description } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    if (!author || !author.trim()) {
      return NextResponse.json({ error: 'Author is required' }, { status: 400 });
    }
    if (!url || !url.trim()) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const current = getCredits();
    const cleanUrl = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`;

    const newCredit: CreditAttribution = {
      id: body.id || `credit-${Date.now()}`,
      title: title.trim(),
      author: author.trim(),
      sourceType: sourceType === 'website' || sourceType === 'doc' ? sourceType : 'github',
      url: cleanUrl,
      description: description ? description.trim() : '',
    };

    const existingIdx = current.findIndex((c) => c.id === newCredit.id);
    if (existingIdx !== -1) {
      current[existingIdx] = newCredit;
    } else {
      current.push(newCredit);
    }

    saveCredits(current);

    return NextResponse.json({ success: true, credit: newCredit, credits: current });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to save credit';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const current = getCredits();
    const filtered = current.filter((c) => c.id !== id);
    saveCredits(filtered);

    return NextResponse.json({ success: true, credits: filtered });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete credit';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

