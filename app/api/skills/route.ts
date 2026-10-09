import { NextResponse } from 'next/server';
import { prisma, mockStore, hasDb } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (hasDb && prisma) {
      const dbSkills = await prisma.skillItem.findMany({
        orderBy: { order: 'asc' },
      });
      if (dbSkills.length > 0) {
        return NextResponse.json({ success: true, skills: dbSkills });
      }
    }
  } catch {
    // fallback
  }

  return NextResponse.json({
    success: true,
    skills: mockStore.skills,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = body.title || body.name;
    const { description, category, githubRepoUrl, creatorName, creatorUrl } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const newSkill = {
      id: `skill-${Date.now()}`,
      order: mockStore.skills.length + 1,
      title,
      name: title,
      description,
      category: category || 'Tool',
      githubRepoUrl: githubRepoUrl || null,
      creatorName: creatorName || null,
      creatorUrl: creatorUrl || (githubRepoUrl ? githubRepoUrl.split('/').slice(0, 4).join('/') : null),
      isLive: body.isLive !== false,
      iconType: body.iconType || 'shield',
    };

    try {
      if (hasDb && prisma) {
        const created = await prisma.skillItem.create({
          data: {
            title: newSkill.title,
            description: newSkill.description,
            category: newSkill.category,
            githubRepoUrl: newSkill.githubRepoUrl,
            creatorName: newSkill.creatorName,
            creatorUrl: newSkill.creatorUrl,
            isLive: newSkill.isLive,
            order: newSkill.order,
          },
        });
        mockStore.skills.push(created as any);
        return NextResponse.json({ success: true, skill: created });
      }
    } catch {
      // fallback
    }

    mockStore.skills.push(newSkill);
    return NextResponse.json({ success: true, skill: newSkill });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error creating skill';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
      if (hasDb && prisma) {
        await prisma.skillItem.delete({ where: { id } });
      }
    } catch {
      // fallback
    }

    const idx = mockStore.skills.findIndex((s) => s.id === id);
    if (idx !== -1) mockStore.skills.splice(idx, 1);

    return NextResponse.json({ success: true, message: 'Skill deleted' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting skill';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
