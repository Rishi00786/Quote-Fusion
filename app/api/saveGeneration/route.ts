import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const { userId, imageName, image } = await req.json();

  if (!userId || !imageName || !image) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const profile = await db.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const generation = await db.generations.create({
      data: {
        imageUrl: image,
        profileId: profile.id, // Use profile.id instead of profile.userId
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(generation, { status: 200 });
  } catch (error) {
    console.error('Error saving generation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}