/* eslint-disable @next/next/no-img-element */
'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"

type Article = {
    id: number
    title: string
    description: string
    image: {
        url: string
    }
}[]

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Article>([])

    const handleFetchData = async () => {
        const response = await axios.get(`http://localhost:3001/articles`)

        setArticles(response.data)
    }

    useEffect(() => {
        handleFetchData()
    }, [])
    return (
        <>
            <div>
                <h2>
                    Central das notícias
                </h2>
            </div>
            {articles.map((item, index) => (
                <div key={index} className="border border-b-2 m-2 container">
                <Link href={`/articles/${item.id}`}>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image?.url}`}
                        className="p-1 w-full h-96 rounded-2xl object-cover" alt={item.title}/>
                        <h1 className="font-bold text-lg m-6"> { item.title } </h1>

                        <h3 className="p-6">
                            {item.description }
                        </h3>

                        <div>
                            <h3 className="m-7"> Publicado por Natan Batista</h3>
                        </div>
                </Link>
            </div>
            ))}
        </>
    )
}
export default ArticlesPage