/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams, useRouter } from "next/navigation"
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
import { api } from "@/services/axios"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    password: z.string().min(8, {
        message: "A senha deve ter pelo menos 8 caracteres",
    }),
    password_confirmation: z.string().min(8,{
        message: "A confirmação senha deve ter pelo menos 8 caracteres",
    }),
}).refine(data => data.password === data.password_confirmation, {
    message: "As senhas não coincidem",
    path: ["password_confirmation"]
})

const ResetPassword = () => { //
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const searchParams = useSearchParams()
    const accessToken = searchParams.get("access-token")
    const client = searchParams.get("client")
    const uid = searchParams.get("uid")
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true)
            const response = await api.put("/auth/password", {
                "password": data.password,
                "password_confirmation": data.password_confirmation
            },
            {
                headers: {
                    "access-token": accessToken,
                    "client": client,
                    "uid": uid,
                },
            })
            router.replace("/auth/signin")
            toast({
                variant: "default",
                title:"Success",
                description: response.data.message
            })
        } catch (error: any) {
            console.error(error)
            const errors = error.response.data.errors
            if (errors.full_messages) {
                toast({
                    variant: "destructive",
                    title: "Erro",
                    description: "Se você recebeu um e-mail para redefinir sua senha, por favor, certifique-se de estar usando a URL correta",
                })
            }
            else {
                errors.forEach((message: string) => {
                    toast({
                        variant: "destructive",
                        title: "Erro",
                        description: message,
                    })
                })
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="flex justify-center items-center my-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password_confirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmação de senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirmar senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    {isLoading ? (
                        <Button >
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Alterando...
                        </Button>
                    ) :
                        (
                            <Button type="submit">
                                Alterar
                            </Button>
                        )}
                </form>
            </Form>
        </div>
    )
}

export default ResetPassword