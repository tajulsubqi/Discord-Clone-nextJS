import AuthLayout from "@/app/(auth)/layout"
import { SignIn } from "@clerk/nextjs"

const Page = () => {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  )
}

export default Page
