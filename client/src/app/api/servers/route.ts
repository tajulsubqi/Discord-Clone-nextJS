import { NextResponse } from "next/server"
import { MemberRole } from "@prisma/client"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db/db"

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json()

    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: Math.random().toString(36).slice(2),
        channels: {
          create: {
            name: "general",
            profileId: profile.id,
          },
        },

        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("[SERVER_POST]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
