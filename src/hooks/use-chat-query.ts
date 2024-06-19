import { useSocket } from "@/components/providers/socket-provider"
import { useInfiniteQuery } from "@tanstack/react-query"
import qs from "query-string"

interface ChatQueryProps {
  queryKey: string
  apiUrl: string
  paramKey: "channelId" | "conversationId"
  paramValue: string
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket()

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true },
    )

    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Error fetching messages: ${res.statusText}`)
      }
      return res.json()
    } catch (error) {
      console.error("Failed to fetch messages", error)
      throw error
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      // refetchInterval: isConnected ? false : 1000,
      refetchInterval: 1000,
      initialPageParam: undefined,
    })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  }
}
