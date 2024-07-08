import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from '@/lib/cloudinary'
import { shuffleData } from '@/lib/lib'

export async function GET() {
    const session = await getServerSession(authOptions)
    // const postCount = await prisma.post.count()
    const data = await prisma.post.findMany({
        where: {
            status: 'public'
        },
        // skip: Math.floor(Math.random() * postCount),
        take: 15,
        include: {
            author: true,
            likes: {
                select: {
                    id: true,
                    userId: true,
                    type: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            }
        }
    })

    const result: any = []

    data.map((value: any) => {
        const react = value.likes.find((item: any) => Number(item.userId) === Number(session?.user.id))
        if ( react ) {
            value.react = react?.type
        } else {
            value.react = null
        }
        result.push(value)
    })

    return NextResponse.json({
        data: shuffleData(result)
    }, { status: 200 })
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    const formData = await req.formData()

    const file = formData.get("image") as File

    if ( session?.user?.id ) {
        const user: any = session.user

        const data: any = {
            caption: formData.get('caption') as string,
            status: formData.get('status') as string,
            userId: Number(user?.id)
        }

        if ( file.size ) {
            const fileBuffer = await file.arrayBuffer()
            const mimeType = file.type
            const encoding = "base64"
            const base64Data = Buffer.from(fileBuffer).toString("base64")
            const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data
            const res = await uploadToCloudinary(fileUri)

            if (res.success && res.result) {
                data.image = res.result.secure_url
                data.publicImageId = res.result.public_id
            } else {
                return NextResponse.json({
                    message: 'Failed to upload image'
                }, { status: 500 })
            }
        }

        const response = await prisma.post.create({
            data: data
        })

        return NextResponse.json(response, { status: 200 })
    }
    return NextResponse.json({
        message: 'Unauthorized'
    }, { status: 401 })
}