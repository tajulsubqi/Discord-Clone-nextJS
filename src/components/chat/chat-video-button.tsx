"use client"

import qs from "query-string"
import ActionTooltip from "@/components/ui/action-tooltip"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Video, VideoOff } from "lucide-react"

export const ChatVideoButton = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const isVideo = searchParams?.get("video")

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true },
    )

    router.push(url)
  }

  const Icon = isVideo ? VideoOff : Video
  const tooltiplabel = isVideo ? "Disable Video" : "Enable Video"

  return (
    <ActionTooltip side="bottom" label={tooltiplabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  )
}
