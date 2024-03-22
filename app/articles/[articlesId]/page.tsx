"use client"

import ArticlesComments from "@/components/articles/comments"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"
import React from "react"
import { useEffect, useState } from "react"

type ArticlesPageProps = {
    params: {
        articlesId: number
    }
}

type Article = {
    id: number
    title: string
    description: string
    image: {
        url: string
    }
}
const ArtcilePage: React.FC<ArticlesPageProps> = ({
    params
}) => {
    const [article, setArticle] = useState<Article>()

    const handleFetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/${params.articlesId}`)

            setArticle(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        handleFetchData()
    }, [])
    return (
        <>
            <div className="container">
                <img alt="Notícia" src={`${process.env.NEXT_PUBLIC_API_URL}/${article?.image.url}`} className="p-1 w-full h-[452px] rounded-2xl object-cover"/>
                <div className="flex justify-end items-center gap-2 m-7 mt-2">
                    <Avatar >
                        <AvatarImage src="https://avatars.githubusercontent.com/u/739984?v=4"/>
                        <AvatarFallback> CN </AvatarFallback>
                    </Avatar>
                    <h3 className=""> Publicado por Natan Batista</h3>
                </div>
                <h1 className="font-bold text-lg m-6"> {article?.title}</h1>
                <div className="m-6 leading-relaxed">
                    {article?.description}
                </div>

                <span className="font-bold m-6 pb-6">
                    Comentários
                </span>
                <ArticlesComments />
                <ArticlesComments />
                <ArticlesComments />
            </div>
        </>
    )
}

export default ArtcilePage