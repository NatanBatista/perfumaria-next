"use client"
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast";
import axios from "axios"

export const AuthContext = createContext({} as AuthContextType)

type User = {
    email: string
    name: string
    lastname: string
    nickname: string
    gender: string
}

type AuthContextType = {
    isAuthenticated: Boolean
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
                try {
                    const response = await axios.get("http://localhost:3001/auth/validate_token", {
                        headers: {
                            "access-token": token,
                            "client": client,
                            "uid": uid
                        }
                    })

                    setUser(response.data.data) // Retorna os dados básicos do usuario e salva
                } catch (error) {
                    throw error;
                }
            }
        }
        fetchData()
    }, [])

    async function signIn({ email, password }: SignInData) {
        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:3001/auth/sign_in', {
                email,
                password,
            });

            setCookie(undefined, "access-token", response.headers["access-token"], {
                maxAge: 60 * 60 * 24 * 2 // 2 dias
            });
            setCookie(undefined, "client", response.headers["client"], {
                maxAge: 60 * 60 * 24 * 2 // 2 dias
            });
            setCookie(undefined, "uid", response.headers["uid"], {
                maxAge: 60 * 60 * 24 * 2 // 2 dias
            });

            setUser(response.data.data);
            router.push('/');
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: error.response.data.errors[0],
                description: "Email ou senha incorretos!",
            })
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
            try {
                await axios.delete("http://localhost:3001/auth/sign_out", {
                    headers: {
                        "access-token": token,
                        "client": client,
                        "uid": uid,
                    }
                })

                destroyCookie(undefined, 'access-token');
                destroyCookie(undefined, 'client');
                destroyCookie(undefined, 'uid');
                setUser(null)

                router.push("/")
            } catch (error) {
                throw error;
            }
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