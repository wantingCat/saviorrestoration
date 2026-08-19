import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// GET /api/gallery — public
export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(images);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

// POST /api/gallery — admin (upload image)
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const caption = formData.get('caption') as string || '';
    const category = formData.get('category') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Save to public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const count = await prisma.galleryImage.count();
    const image = await prisma.galleryImage.create({
      data: {
        url: `/uploads/${filename}`,
        caption,
        category,
        sortOrder: count,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
