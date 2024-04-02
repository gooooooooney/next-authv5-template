"use client"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-succcess"
import { type SignupSchema, signupSchema } from "@/schema/auth"
import { signup } from "@/action/auth"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/ui/password-input"




export const SignupForm = () => {

    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams();
    const router = useRouter()
    // const callbackUrl = searchParams.get("callbackUrl");

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: SignupSchema) {
        setError("");
        setSuccess("");

        console.log(values)
        startTransition(() => {
            signup(values)
                .then((res) => {
                    if (res.data?.error) {
                        form.reset();
                        setError(res.data.error);
                    }
                    if (res.data?.success) {
                        form.reset();
                        setSuccess("Account created successfully");
                        router.replace("/login")
                    }
                })
                .catch(() => setError("Something went wrong"));
        })

    }
    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        id="name"
                                        placeholder="m@example.com"

                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"

                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        disabled={isPending}
                                        id="password"
                                        placeholder="********"
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        disabled={isPending}
                                        id="password"
                                        placeholder="********"
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormError message={error ?? urlError} />
                    <FormSuccess message={success} />
                    <Button type="submit" disabled={isPending}
                        className="w-full">
                        {isPending && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create an account
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign up with GitHub
                    </Button>
                </form>
            </Form>
        </>

    )
}
