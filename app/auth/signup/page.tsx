"use client"

import { useContext } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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

const FormSchema = z.object({
    email: z.string().email({
        message: "Email incorreto."
    }),
    password: z.string().min(3, {
        message: "A senha deve ter pelo menos 3 caracteres",
    }),
    password_confirmation: z.string().min(3, {
        message: "A confirmação deve ter pelo menos 3 caracteres",
    }),
}).refine(data => data.password === data.password_confirmation, {
    message: "As senhas não coincidem",
    path: ['password']
})

const SignUp= () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            password_confirmation: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const response = await axios.post("http://localhost:3001/auth", {
            "email": data.email,
            "password": data.password,
            "password-confirmation": data.password_confirmation
        })
        console.log(JSON.stringify(data, null, 2))
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
                                    <Input type="email" placeholder="e-mail" {...field} />
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
                    <FormField
                        control={form.control}
                        name="password_confirmation"
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default SignUp
