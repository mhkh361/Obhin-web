import { NextResponse } from 'next/server';
import { prisma, mockStore, hasDb } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (hasDb) {
      const members = await prisma.teamMember.findMany({
        orderBy: { order: 'asc' },
      });

      if (members.length > 0) {
        return NextResponse.json({ success: true, members });
      }
    }
  } catch {
    // fallback
  }

  return NextResponse.json({ success: true, members: mockStore.teamMembers });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order, name, roleTitle, bio, imageUrl, githubUrl, linkedinUrl, twitterUrl } = body;

    if (!order || !name || !roleTitle || !imageUrl) {
      return NextResponse.json(
        { error: 'Order (1, 2, or 3), name, roleTitle, and imageUrl are required.' },
        { status: 400 }
      );
    }

    try {
      if (!hasDb) throw new Error('No DB');
      const updated = await prisma.teamMember.upsert({
        where: { order: Number(order) },
        create: {
          order: Number(order),
          name,
          roleTitle,
          bio: bio || '',
          imageUrl,
          githubUrl: githubUrl || null,
          linkedinUrl: linkedinUrl || null,
          twitterUrl: twitterUrl || null,
        },
        update: {
          name,
          roleTitle,
          bio: bio || '',
          imageUrl,
          githubUrl: githubUrl || null,
          linkedinUrl: linkedinUrl || null,
          twitterUrl: twitterUrl || null,
        },
      });

      const idx = mockStore.teamMembers.findIndex((m) => m.order === Number(order));
      if (idx !== -1) {
        mockStore.teamMembers[idx] = { ...mockStore.teamMembers[idx], ...updated };
      } else {
        mockStore.teamMembers.push(updated);
      }

      return NextResponse.json({ success: true, member: updated });
    } catch {
      const idx = mockStore.teamMembers.findIndex((m) => m.order === Number(order));
      const fallbackMember = {
        id: `dev-${order}`,
        order: Number(order),
        name,
        roleTitle,
        bio: bio || '',
        imageUrl,
        githubUrl: githubUrl || null,
        linkedinUrl: linkedinUrl || null,
        twitterUrl: twitterUrl || null,
        updatedAt: new Date().toISOString(),
      };

      if (idx !== -1) {
        mockStore.teamMembers[idx] = fallbackMember;
      } else {
        mockStore.teamMembers.push(fallbackMember);
      }

      return NextResponse.json({ success: true, member: fallbackMember });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update team member';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
