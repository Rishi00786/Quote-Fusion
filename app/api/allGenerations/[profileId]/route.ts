import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  { params }: { params: { profileId: string } }
) {
  try {
    const generations = await db.generations.findMany({
      where: {
        profileId: params.profileId
      },
      include: {
        profile: true,
      }
    });

    if (generations.length === 0) {
      return NextResponse.json({ message: 'No generations found' }, { status: 200 });
    }

    return NextResponse.json(generations);
  } catch (error) {
    console.error('Error fetching generations:', error);
    return NextResponse.json({ message: "Error fetching generations" }, { status: 500 });
  }
}