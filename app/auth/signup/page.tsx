"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

import { useRouter } from "next/navigation"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import axios from "axios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    email: z.string().email({
        message: "Email incorreto."
    }),
    nickname: z.string().min(3, {
        message: "Seu apelido deve ter pelo menos 3 caracteres"
    }),
    password: z.string().min(8, {
        message: "A senha deve ter pelo menos 8 caracteres",
    }),
    password_confirmation: z.string().min(8, {
        message: "A confirmação deve ter pelo menos 8 caracteres",
    }),
}).refine(data => data.password === data.password_confirmation, {
    message: "As senhas não coincidem",
    path: ['password_confirmation']
})

const SignUp = () => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            nickname: "",
            password: "",
            password_confirmation: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
                "email": data.email,
                "nickname": data.nickname,
                "password": data.password,
                "password-confirmation": data.password_confirmation
            })
            router.push("/")
            toast({
                variant: "default",
                title: "Conta criada com sucesso!",
                description: `Um email com instruções de ativação foi enviado para ${
                    response.data.data.email
                }`
            })
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: error.response.data.errors[0],
            })
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="flex justify-center items-center my-10">
            <Tabs defaultValue="account" className="w-[650px]">
                <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="account">Conta</TabsTrigger>
                    <TabsTrigger value="password">Senha</TabsTrigger>
                </TabsList>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

                        <TabsContent value="account">
                            <Card className="w-[650px]">
                                <CardHeader>
                                    <CardTitle>
                                        Conta
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>E-mail</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="e-mail" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="nickname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apelido</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="apelido" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card className="w-[650px]">
                                <CardHeader>
                                    <CardTitle>
                                        Senha
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
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
                                    <FormField
                                        control={form.control}
                                        name="password_confirmation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Senha</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Confirme a senha" {...field} />
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
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </form>
                </Form>
            </Tabs>
        </div>
    )
}

export default SignUp
