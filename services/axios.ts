import { parseCookies } from "nookies" // Importe parseCookies de 'nookies'
import express from "express"
import axios, { AxiosInstance } from "axios"
import * as next from "next"

export default function getAPIClient(ctx?: Pick<next.NextPageContext, "req"> | {
    req: next.NextApiRequest;
} | {
    req: express.Request;
} | null | undefined): AxiosInstance{ // Especifique o tipo de retorno para corresponder a parseCookies
    const {
        "access-token": token,
        "client": client,
        "uid": uid
    
    } = parseCookies(ctx)
    
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL
    })
    
    if (token && client && uid) {
        api.defaults.headers["access-token"] = token
        api.defaults.headers["client"] = client
        api.defaults.headers["uid"] = uid
    }

    return api
}

export const api = getAPIClient()
