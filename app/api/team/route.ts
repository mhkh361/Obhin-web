import { NextResponse } from 'next/server';
import { prisma, hasDb, getTeamMembers, saveTeamMembers, TeamMemberData } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';

export async function GET() {
  try {
    if (hasDb && prisma) {
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

  const members = getTeamMembers();
  return NextResponse.json({ success: true, members });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order, name, roleTitle, bio, imageUrl, githubUrl, linkedinUrl, twitterUrl } = body;

    const slotOrder = Number(order);
    if (!slotOrder || slotOrder < 1 || slotOrder > 3) {
      return NextResponse.json(
        { error: 'Valid slot order (1, 2, or 3) is required.' },
        { status: 400 }
      );
    }

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Full Name is required to update this team slot.' },
        { status: 400 }
      );
    }

    if (!roleTitle || !roleTitle.trim()) {
      return NextResponse.json(
        { error: 'Role Title is required to update this team slot.' },
        { status: 400 }
      );
    }

    function formatUrl(url?: string | null, platform?: 'linkedin' | 'github' | 'twitter'): string | null {
      if (!url) return null;
      const clean = url.trim();
      if (!clean) return null;
      if (/^https?:\/\//i.test(clean)) return clean;
      if (/^(www\.)?linkedin\.com/i.test(clean)) return `https://${clean.replace(/^\/+/, '')}`;
      if (/^(www\.)?github\.com/i.test(clean)) return `https://${clean.replace(/^\/+/, '')}`;
      if (/^(www\.)?(twitter\.com|x\.com)/i.test(clean)) return `https://${clean.replace(/^\/+/, '')}`;

      const handle = clean.replace(/^@/, '').replace(/^\/+/, '');
      if (platform === 'linkedin') return `https://www.linkedin.com/in/${handle}`;
      if (platform === 'github') return `https://github.com/${handle}`;
      if (platform === 'twitter') return `https://x.com/${handle}`;
      return `https://${clean}`;
    }

    const finalImage = imageUrl && imageUrl.trim().length > 0 ? imageUrl.trim() : DEFAULT_AVATAR;
    const finalGithub = formatUrl(githubUrl, 'github');
    const finalLinkedin = formatUrl(linkedinUrl, 'linkedin');
    const finalTwitter = formatUrl(twitterUrl, 'twitter');

    let updatedMember: TeamMemberData;

    try {
      if (hasDb && prisma) {
        updatedMember = await prisma.teamMember.upsert({
          where: { order: slotOrder },
          create: {
            order: slotOrder,
            name: name.trim(),
            roleTitle: roleTitle.trim(),
            bio: bio ? bio.trim() : '',
            imageUrl: finalImage,
            githubUrl: finalGithub,
            linkedinUrl: finalLinkedin,
            twitterUrl: finalTwitter,
          },
          update: {
            name: name.trim(),
            roleTitle: roleTitle.trim(),
            bio: bio ? bio.trim() : '',
            imageUrl: finalImage,
            githubUrl: finalGithub,
            linkedinUrl: finalLinkedin,
            twitterUrl: finalTwitter,
          },
        });
      } else {
        throw new Error('Using persistent file store');
      }
    } catch {
      updatedMember = {
        id: `dev-${slotOrder}`,
        order: slotOrder,
        name: name.trim(),
        roleTitle: roleTitle.trim(),
        bio: bio ? bio.trim() : '',
        imageUrl: finalImage,
        githubUrl: finalGithub,
        linkedinUrl: finalLinkedin,
        twitterUrl: finalTwitter,
        updatedAt: new Date().toISOString(),
      };
    }

    // Update in-memory & file cache
    const current = getTeamMembers();
    const idx = current.findIndex((m) => m.order === slotOrder);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...updatedMember };
    } else {
      current.push(updatedMember);
    }
    current.sort((a, b) => a.order - b.order);
    saveTeamMembers(current);

    return NextResponse.json({
      success: true,
      member: updatedMember,
      members: current,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update team member';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
