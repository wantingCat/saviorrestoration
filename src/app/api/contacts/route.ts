import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/contacts — admin (list all submissions)
export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
