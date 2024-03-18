import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

import {
    Card,
    CardContent,
    CardDescription,
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
        title: string
        description: string
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
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl pl-36"> {name} </h1>
                <Link href={link}>
                    <Button variant="clean">
                        <ArrowRightCircleIcon className="w-10 h-10" />
                    </Button>
                </Link>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-center">
                <Carousel className="w-full max-w-5xl">
                    <CarouselContent>
                        {data.map((i, index) => (
                            <CarouselItem key={index} className="basis-1/3">
                                <Card>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                        <CardTitle>
                                            {i.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {i.description}
                                        </CardDescription>
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