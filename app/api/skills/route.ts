import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/prisma';

export async function GET() {
  return NextResponse.json({
    success: true,
    skills: mockStore.skills,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, identifier, stage, promptModifier, description } = body;

    if (!name || !identifier || !promptModifier) {
      return NextResponse.json(
        { error: 'name, identifier, and promptModifier are required' },
        { status: 400 }
      );
    }

    const newSkill = {
      id: identifier,
      name,
      stage: stage || 'POST_EXECUTION',
      description: description || promptModifier,
      isEnabled: true,
      isCustom: true,
      priorityOrder: 99,
    };

    mockStore.skills.push(newSkill);
    return NextResponse.json({ success: true, skill: newSkill });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error creating skill';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
