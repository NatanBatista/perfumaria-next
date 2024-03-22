"use client"

import React from "react"
import { useContext } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { AuthContext } from "@/app/contexts/AuthContext"

const FormSchema = z.object({
    email: z.string().email({
        message: "Email incorreto."
    }),
    password: z.string().min(3, {
        message: "A senha deve ter pelo menos 3 caracteres",
    }),
})

const SignIn = () => {
    const { signIn, isLoading } = useContext(AuthContext)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        await signIn(data)
        // console.log(JSON.stringify(data, null, 2))
    }

    return (
        <div className="flex justify-center items-center my-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="e-mail" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    {isLoading ? (
                        <Button >
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Entrando...
                        </Button>
                    ) :
                        (
                            <Button type="submit">
                                Entrar
                            </Button>
                        )}
                </form>
            </Form>
        </div>
    )
}

export default SignIn
