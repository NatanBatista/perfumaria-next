"use client"
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies"
import { useRouter } from 'next/navigation'
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
}

type SignInData = {
    email: string
    password: string
}


export function AuthProvider({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user

    useEffect(() => {
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

                    setUser(response.data.data)
                } catch (error) {
                    console.error('Error ao validar token:', error);
                    throw error;
                }
            }
        }
        fetchData()
    }, [])

    async function signIn({ email, password }: SignInData) {
        try {
            const response = await axios.post('http://localhost:3001/auth/sign_in',
                { // Envia o email e senha para o endpoint do backend
                    email,
                    password,
                }
            )
            setCookie(undefined, "access-token", response.headers["access-token"], {
                maxAge: 60 * 60 * 1 // 1 hora
            })
            setCookie(undefined, "client", response.headers["client"], {
                maxAge: 60 * 60 * 1 // 1 hora
            })
            setCookie(undefined, "uid", response.headers["uid"], {
                maxAge: 60 * 60 * 1 // 1 hora
            })

            setUser(response.data.data)
            console.log("data", response)

            router.push('/')
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
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
                
                destroyCookie(undefined, 'token');
                destroyCookie(undefined, 'client');
                destroyCookie(undefined, 'uid');
                setUser(null)
            } catch (error) {
                console.error('Erro ao encerrar sessão:', error);
                throw error;
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated, signIn, signOut, user
        }}>
            {children}
        </AuthContext.Provider>
    )
}