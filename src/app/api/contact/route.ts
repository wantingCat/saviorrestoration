import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/contact — public (form submission)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone || !body.email) {
      return NextResponse.json({ error: 'Name, phone, and email are required' }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        date: body.date || null,
        timeSlot: body.timeSlot || null,
        serviceType: body.serviceType || null,
        message: body.message || null,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}
