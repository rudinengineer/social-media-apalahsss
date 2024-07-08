import prisma from "@/lib/prisma";
import { shuffleData } from '@/lib/lib'
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    if ( req.nextUrl.searchParams.has('id') ) {
        const data = await prisma.reply.findMany({
            where: {
                commentId: Number(req.nextUrl.searchParams.get('id')),
            },
            take: 5,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        image: true
                    }
                },
            }
        })

        return NextResponse.json({
            data: shuffleData(data)
        }, { status: 200 })
    } else {
        return NextResponse.json({
            message: 'Unknown params id'
        }, { status: 401 })
    }
}