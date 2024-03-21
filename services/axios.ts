import axios from "axios";
import { parseCookies } from "nookies";

export default function getAPIClient (ctx?: any) {
    const {
        "access-token": token,
        "client": client,
        "uid": uid
    
    } = parseCookies()
    
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL
    })
    
    if (token && client && uid) {
        api.defaults.headers['access-token'] = token
        api.defaults.headers['client'] = client;
        api.defaults.headers['uid'] = uid;
    }

    return api
}

export const api = getAPIClient()