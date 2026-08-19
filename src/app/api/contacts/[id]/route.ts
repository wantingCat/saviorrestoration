import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/contacts/[id] — update status
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { status: body.status },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

// DELETE /api/contacts/[id]
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.contactSubmission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
