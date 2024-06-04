import { ModeToggle } from "@/components/mode-toggle"
import { UserButton } from "@clerk/nextjs"
import React from "react"

const Home = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  )
}

export default Home
