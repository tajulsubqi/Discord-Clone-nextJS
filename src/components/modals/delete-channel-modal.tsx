"use client"
import { useModal } from "@/hooks/use-modal-store"
import axios from "axios"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const DeleteChannelModal = () => {
  const { onClose, isOpen, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === "deleteChannel"
  const { server, channel } = data

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      })
      await axios.delete(url)

      onClose()
      router.refresh()
      // window.location.reload()
      router.push(`/servers/${server?.id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete this? <br />
            <span className="font-semibold text-indigo-500">{channel?.name}</span> will be
            permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} variant="ghost" onClick={onClose}>
              Cancel
            </Button>

            <Button disabled={isLoading} variant="primary" onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteChannelModal
