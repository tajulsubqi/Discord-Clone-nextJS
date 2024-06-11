import { initialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation"
import InitialModal from "@/components/modals/initial-modal"
import { db } from "@/lib/db/db"

const SetupPage = async () => {
  const profile = (await initialProfile()) as { id: string }
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (!server) {
    return redirect(`/servers/${profile.id}`)
  }

  return (
    <div>
      <InitialModal />
    </div>
  )
}

export default SetupPage
