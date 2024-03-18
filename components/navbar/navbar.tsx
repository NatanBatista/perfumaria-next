'use client'

import { AuthContext } from "@/app/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from "next-themes"
import Link from "next/link"
import { useContext } from "react"

import UserMenu from "./userMenu"

const NavBar = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <ul className="flex justify-between items-center">
          <h1 className="text-2xl font-bold"> Perfumaria </h1>
          <div className="flex items-center gap-2">
            <Button variant="clean" onClick={toggleTheme}>
              {theme === 'light' ? (
                <SunIcon className="w-6 h-6 bg-hsl(bg-[262.1 83.3% 57.8%;])" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </Button>
            {isAuthenticated ? (
              <>
                <UserMenu></UserMenu>
              </>
            ) : (
              <>
                <div className="flex gap-2 ml-10">
                  <Link href="/auth/signin">
                    <Button> Entrar </Button>
                  </Link>

                  <Link href={"/auth/signup"} >
                    <Button> Registrar </Button>
                  </Link>
                </div>
              </>
            )}

          </div>
        </ul>
      </div>
      <Separator className="mb-10"/>
    </>
  )
}

export default NavBar
