import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignupForm } from "./_components/signup-form"
import { Suspense } from "react"

export default function LoginPage() {
  return (
    <Card className="mx-auto max-w-md  min-w-[90%] md:min-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={null}>
          <SignupForm />
        </Suspense>
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
