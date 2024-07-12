import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const profile = await db.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const generations = await db.generations.findMany({
      where: { profileId: profile.id },
      include: { profile: true },
    });

    return NextResponse.json(generations);
  } catch (error) {
    console.error('Error fetching generations:', error);
    return NextResponse.json({ error: "Error fetching generations" }, { status: 500 });
  }
}
