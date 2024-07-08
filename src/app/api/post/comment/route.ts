import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from '@/lib/cloudinary'
import { shuffleData } from '@/lib/lib'

export async function GET(req: NextRequest) {
    if ( req.nextUrl.searchParams.has('id') ) {
        const data = await prisma.comment.findMany({
            where: {
                postId: Number(req.nextUrl.searchParams.get('id')),
            },
            take: 20,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        image: true
                    }
                },
                _count: {
                    select: {
                        reply: true
                    }
                }
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

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    const formData = await req.formData()

    const file = formData.get("image") as File

    if ( formData.has('postId') && session?.user?.id ) {
        const data: any = {
            userId: Number(session?.user.id),
            comment: formData.get('comment') as string
        }

        if ( file.size ) {
            const fileBuffer = await file.arrayBuffer()
            const mimeType = file.type
            const encoding = "base64"
            const base64Data = Buffer.from(fileBuffer).toString("base64")
            const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data
            const upload = await uploadToCloudinary(fileUri)

            if ( upload.success && upload.result ) {
                data.image = upload.result.secure_url
                data.publicId = upload.result.public_id
            }
        }

        let response: any = null;

        if ( formData.has('replyId') ) {
            data.commentId = Number(formData.get('replyId'))
            response = await prisma.reply.create({
                data: data
            })
        } else {
            data.postId = Number(formData.get('postId')),
            response = await prisma.comment.create({
                data: data
            })
        }

        return NextResponse.json({
            success: true,
            data: response
        }, { status: 200 })
    } else {
        return NextResponse.json({
            message: 'Unauthorized'
        }, { status: 401 })
    }
}