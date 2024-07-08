import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    const data = await req.json()

    const user = await prisma.user.findFirst({
        where: {
            username: data?.username
        },
    })

    if ( user?.password && await bcrypt.compare(data?.password, user?.password) ) {
        const token = jwt.sign({
            id: user?.id,
            name: user?.username,
            email: user?.email,
            verified: user?.verified
        }, process.env.JWT_SECRET_KEY!, {
            expiresIn: '7d'
        })

        return NextResponse.json({
            token: token,
            id: user.id,
            name: user.username,
            email: user.email,
            image: user.image
        }, { status: 200 })
    }

    return NextResponse.json({
        message: 'Unauthorized',
    }, { status: 401 })
}