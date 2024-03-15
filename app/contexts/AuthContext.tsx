"use client"
import { createContext, useState } from "react";
import { setCookie } from "nookies"
import Router from "next/router"
import axios from "axios"

export const AuthContext = createContext({} as AuthContextType)

type User = {
    email: string
    name: string
    lastname: string
    nickname: string
}

type AuthContextType = {
    isAuthenticated: Boolean
    signIn: (data: SignInData) => Promise<void>
}

type SignInData = {
    email: string
    password: string
}


export function AuthProvider({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user

    async function signIn({ email, password }: SignInData) {
        console.log(email, password)
        try {
            const response = await axios.post('http://localhost:3001/auth/sign_in',
                { // Envia o email e senha para o endpoint do backend
                    email,
                    password,
                }
            )
            setCookie(undefined, "access-token", response.headers["access-token"], {
                maxAge: 60*60*1 // 1 hora
            })
            setCookie(undefined, "client", response.headers["client"], {
                maxAge: 60*60*1 // 1 hora
            })
            setCookie(undefined, "uid", response.headers["uid"], {
                maxAge: 60*60*1 // 1 hora
            })

            setUser(response.data.data)
            console.log("data", response)

            // Router.push('/')
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}