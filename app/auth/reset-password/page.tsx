"use client"

import React, { useState } from "react"
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
import { api } from "@/services/axios"

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

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false)

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
            await api.put("auth/password/edit", {
                "password": data.password
            })
        } catch (error) {
            console.error(error)
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
                        name="password_confirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
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
