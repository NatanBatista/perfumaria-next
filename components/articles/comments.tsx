import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const ArticlesComments = () => {
    return (
        <>
            <div className="border border-b-2 rounded-2xl p-3 w-1/2 m-6">
                <div className="flex items-center gap-2 mb-2">
                
                    <Avatar >
                        <AvatarImage src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                        <AvatarFallback> CN </AvatarFallback>
                    </Avatar>
                    <h3 className=""> Natan Batista</h3>
                </div>
                <div className="font-extralight tracking-tighter line-clamp-3 lg:line-clamp-none">
                psum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum
                psum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum 
                psum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum. 
                psum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum 
                </div>
            </div>
        </>
    )
}

export default ArticlesComments