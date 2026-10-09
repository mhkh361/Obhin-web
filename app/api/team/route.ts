import { NextResponse } from 'next/server';
import { prisma, mockStore } from '@/lib/prisma';

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    });

    if (members.length > 0) {
      return NextResponse.json({ success: true, members });
    }

    // If database table is empty, seed with mockStore initial 3 members
    return NextResponse.json({ success: true, members: mockStore.teamMembers });
  } catch {
    // Resilient fallback to mockStore
    return NextResponse.json({ success: true, members: mockStore.teamMembers });
  }
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

      // Synchronize in-memory fallback store as well
      const idx = mockStore.teamMembers.findIndex((m) => m.order === Number(order));
      if (idx !== -1) {
        mockStore.teamMembers[idx] = { ...mockStore.teamMembers[idx], ...updated };
      } else {
        mockStore.teamMembers.push(updated);
      }

      return NextResponse.json({ success: true, member: updated });
    } catch {
      // Direct mock update fallback
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

