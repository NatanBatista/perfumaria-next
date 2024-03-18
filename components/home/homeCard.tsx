/* eslint-disable @next/next/no-img-element */
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "../ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../ui/carousel"

type HomeCardProps = {
    name: string
    link: string
    data: {
        id: number
        title: string
        description: string
        created_at?: Date
        update_at?: Date
        image?: {
            url: string
        }
    }[]
}

import { ArrowRightCircleIcon } from "@heroicons/react/24/solid"
import React from "react"
import Link from "next/link"

const HomeCard: React.FC<HomeCardProps> = ({
    name, link, data
}) => {
    return (
        <>
            <div className="flex justify-between items-center mt-4">
                <h1 className="font-bold text-2xl pl-36"> {name} </h1>
                <Link href={link}>
                    <Button variant="clean">
                        <ArrowRightCircleIcon className="w-10 h-10" />
                    </Button>
                </Link>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-center">
                <Carousel className="w-full md:max-w-5xl">
                    <CarouselContent>
                        {data.map((i, index) => (
                            <CarouselItem key={index} className="basis:1/2 md:basis-1/3">
                                <Card className="md:h-96">
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                        <CardHeader className="w-64 h-64 overflow-hidden">
                                        <img className="object-cover w-full h-full" src={`${process.env.NEXT_PUBLIC_API_URL}/${i.image?.url}`} alt={i.title} />

                                        </CardHeader>
                                        <div className="">
                                            <CardTitle >
                                                {i.title}
                                            </CardTitle>
                                            <CardDescription className="">
                                                {i.description.slice(0,96)}
                                            </CardDescription>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </>
    )
}

export default HomeCard