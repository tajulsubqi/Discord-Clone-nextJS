import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db/db"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    const server = await db.server.findFirst({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    })

    if (!server) return new NextResponse("Server not found", { status: 404 })

    await db.member.deleteMany({
      where: {
        serverId: params.serverId,
      },
    })

    await db.channel.deleteMany({
      where: {
        serverId: params.serverId,
      },
    })

    await db.server.delete({
      where: {
        id: params.serverId,
      },
    })

    return NextResponse.json({ message: "Server deleted successfully" })
  } catch (error) {
    console.error("SERVER_ID_DELETE error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
  try {
    const profile = await currentProfile()
    const { name, imageUrl } = await req.json()

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("SERVER_ID_PATCH", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
