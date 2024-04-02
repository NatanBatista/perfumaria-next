/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createContext, useEffect, useState } from "react"
import { setCookie, parseCookies, destroyCookie } from "nookies"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { api } from "@/services/axios"
import React from "react"

export const AuthContext = createContext({} as AuthContextType)

type User = {
    email: string
    name: string
    lastname: string
    nickname: string
    gender: string
}

type AuthContextType = {
    isAuthenticated: boolean
    signIn: (data: SignInData) => Promise<void>
    signOut: () => Promise<void>
    user: User | null
    isLoading: boolean
}

type SignInData = {
    email: string
    password: string
}


export function AuthProvider({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const { toast } = useToast()
    const router = useRouter()

    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const isAuthenticated = !!user

    useEffect(() => { // Função para validar usuário logado ou não ao entrar no sistema
        const fetchData = async () => {
            const {
                "access-token": token,
                "client": client,
                "uid": uid
            } = parseCookies()

            if (token && client && uid) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate_token`, {
                    headers: {
                        "access-token": token,
                        "client": client,
                        "uid": uid
                    }
                })

                setUser(response.data.data) // Retorna os dados básicos do usuario e salva
    
            }
        }
        fetchData()
    }, [])

    async function signIn({ email, password }: SignInData) {
        try {
            setIsLoading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in`, {
                email,
                password,
            })

            setCookie(undefined, "access-token", response.headers["access-token"], {
                maxAge: 60 * 60 * 24 * 2 // 2 dias
            })
            setCookie(undefined, "client", response.headers["client"], {
                maxAge: 60 * 60 * 24 * 2 // 2 dias
            })
            setCookie(undefined, "uid", response.headers["uid"], {
                maxAge: 60 * 60 * 24 * 2 // 2 dias
            })

            
            // Atualiza os cookies do axios ao logar
            api.defaults.headers["access-token"] = response.headers["access-token"]
            api.defaults.headers["client"] = response.headers["client"]
            api.defaults.headers["uid"] = response.headers["uid"]

            setUser(response.data.data)
            router.push("/")
        } catch (error: any) {
            const errors = error.response.data.errors
            if (errors) {
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


    async function signOut() {
        const {
            "access-token": token,
            "client": client,
            "uid": uid,
        } = parseCookies()

        if (token && client && uid) {
            await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_out`, {
                headers: {
                    "access-token": token,
                    "client": client,
                    "uid": uid,
                }
            })

            destroyCookie(undefined, "access-token")
            destroyCookie(undefined, "client")
            destroyCookie(undefined, "uid")
            setUser(null)

            router.push("/")

        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated, signIn, signOut, user,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}