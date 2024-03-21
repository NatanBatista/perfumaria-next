import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const SlideBar = () => {
    return (
        <>
            <Sheet>
                <SheetTrigger><Bars3Icon className="h-6 w-6 sm:hidden"/></SheetTrigger>
                <SheetContent side={"left"} className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default SlideBar