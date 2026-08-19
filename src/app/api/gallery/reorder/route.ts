import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/gallery/reorder — batch update sort orders
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const items: { id: string; sortOrder: number }[] = body.items;

    await prisma.$transaction(
      items.map((item) =>
        prisma.galleryImage.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 });
  }
}
