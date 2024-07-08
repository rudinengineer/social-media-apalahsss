import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    if ( req.nextUrl.searchParams.has('id') ) {
        const response = await prisma.react.count({
            where: {
                postId: Number(req.nextUrl.searchParams.has('id'))
            }
        })

        return NextResponse.json(response, { status: 200 })
    } else {
        return NextResponse.json({
            message: 'Unknown params id'
        }, { status: 401 })
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    const data = await req.json()

    if ( session?.user?.id ) {
        const react = await prisma.react.findFirst({
            where: {
                userId: Number(session.user.id),
                postId: Number(data?.id)
            }
        })
        if ( !react ) {
            const response = await prisma.react.create({
                data: {
                    userId: Number(session.user.id),
                    postId: Number(data?.id),
                    type: data?.type
                }
            })

            return NextResponse.json(response, { status: 200 })
        } else {
            if ( react.type === data?.type ) {
                await prisma.react.delete({
                    where: {
                        id: react.id
                    }
                })
            } else {
                await prisma.react.update({
                    data: {
                        type: data?.type
                    },
                    where: {
                        id: react.id
                    }
                })
            }

            return NextResponse.json({
                message: '200 OK'
            }, { status: 200 })
        }
    } else {
        return NextResponse.json({
            message: 'Unauthorized'
        }, { status: 401 })
    }
}