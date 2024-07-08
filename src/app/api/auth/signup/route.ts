import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
    const data = await req.json()

    if ( !data?.username || !data?.email || !data?.password ) {
        return NextResponse.json({
            error: 'Invalid Credential'
        }, { status: 401 })
    }

    const checkuser = await prisma.user.findUnique({
        where: {
            username: data?.username
        }
    })

    const checkemail = await prisma.user.findUnique({
        where: {
            email: data?.email
        }
    })

    if ( checkuser )  {
        return NextResponse.json({
            errors: {
                username: 'Username sudah terpakai'
            }
        }, { status: 401 })
    } else {
        if ( checkemail ) {
            return NextResponse.json({
                errors: {
                    email: 'Email sudah terpakai'
                }
            }, { status: 401 })
        } else {
            const password = await bcrypt.hash(data?.password, 8)
            const user = await prisma.user.create({
                data: {
                    email: data?.email,
                    username: data?.username,
                    password: password
                }
            })

            if ( user ) {
                return NextResponse.json({
                    message: '200 OK'
                }, { status: 200 })
            } else {
                return NextResponse.json({
                    message: '500 Internal Server Error'
                }, { status: 500 })
            }
        }
    }
}