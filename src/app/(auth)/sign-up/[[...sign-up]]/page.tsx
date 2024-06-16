import AuthLayout from "@/app/(auth)/layout"
import { SignUp } from "@clerk/nextjs"

const Page = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  )
}

export default Page
