import { Member, Profile, Server } from "@prisma/client"

export type ServerMembersWithProfiles = Server & {
  members: (Member & {
    profile: Profile
  })[]
}
