"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

interface ActionTooltipProps {
  children: React.ReactNode
  label: string
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
}

const ActionTooltip = ({
  children,
  align = "center",
  side = "bottom",
  label,
}: ActionTooltipProps) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side={side} align={align}>
            <p className="font-semibold text-sm capitalize"> {label.toLowerCase()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ActionTooltip
