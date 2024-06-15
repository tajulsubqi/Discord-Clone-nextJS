import ServerSidebar from "@/components/server/server-sidebar"
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db/db"
import { redirectToSignIn } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import React from "react"

interface ServerIdLayoutProps {
  children: React.ReactNode
  params: {
    serverId: string
  }
}

const ServerIdLayout = async ({ children, params }: ServerIdLayoutProps) => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (!server) {
    return redirect("/")
  }

  console.log("SERVERID", server)

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  )
}

export default ServerIdLayout
