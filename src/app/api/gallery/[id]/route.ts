import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unlink } from 'fs/promises';
import path from 'path';

// PUT /api/gallery/[id] — update caption/category
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.galleryImage.update({
      where: { id },
      data: {
        caption: body.caption,
        category: body.category,
        sortOrder: body.sortOrder,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

// DELETE /api/gallery/[id]
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const image = await prisma.galleryImage.findUnique({ where: { id } });

    if (image) {
      // Delete file from disk
      try {
        const filepath = path.join(process.cwd(), 'public', image.url);
        await unlink(filepath);
      } catch {
        // File may already be deleted, continue
      }

      await prisma.galleryImage.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
