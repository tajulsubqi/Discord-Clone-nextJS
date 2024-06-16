import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db/db"
import { ChannelType } from "@prisma/client"
import { redirect } from "next/navigation"
import React from "react"
import ServerHeader from "./server-header"

interface ServerSidebarProps {
  serverId: string
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect("/")
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  })

  const textChannels = server?.channels.filter((item) => item.type === ChannelType.TEXT)
  const audioChannels = server?.channels.filter((item) => item.type === ChannelType.AUDIO)
  const videoChannels = server?.channels.filter((item) => item.type === ChannelType.VIDEO)

  const members = server?.members.filter((item) => item.profileId !== profile.id)

  if (!server) {
    return redirect("/")
  }

  const role = server.members.find((item) => item.profileId === profile.id)?.role

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  )
}

export default ServerSidebar
