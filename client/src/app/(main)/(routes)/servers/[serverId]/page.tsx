import { UserButton } from "@clerk/nextjs"

const ServerPage = () => {
  return (
    <div>
      <h1>ServerId Page</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default ServerPage
