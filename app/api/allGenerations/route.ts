import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "../../../lib/db"
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: NextApiResponse) {
    try {
        const generations = await db.generations.findMany({
            include: {
                profile: {
                    select: {
                        imageUrl: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(generations)
    } catch (error) {
        console.error('Error fetching generations:', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

