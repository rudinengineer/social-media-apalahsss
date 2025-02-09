import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions)

    return NextResponse.json({
        data: session?.user
    }, { status: 200 })
}