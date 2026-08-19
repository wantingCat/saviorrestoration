import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/settings — public
export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: 'main' },
      });
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// PUT /api/settings — admin only
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'main' },
      update: {
        phone: body.phone,
        email: body.email,
        address: body.address,
        businessName: body.businessName,
        tagline: body.tagline,
      },
      create: {
        id: 'main',
        phone: body.phone,
        email: body.email,
        address: body.address,
        businessName: body.businessName,
        tagline: body.tagline,
      },
    });
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
