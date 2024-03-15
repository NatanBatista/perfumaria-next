'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from "next-themes"

const NavBar = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <div className="p-4">
        <ul className="flex justify-between items-center">
          <p> Perfumaria </p>
          <div className="flex items-center gap-2">
            <Button variant="clean" onClick={toggleTheme}>
              {theme === 'light' ? (
                <SunIcon className="w-6 h-6 bg-hsl(bg-[262.1 83.3% 57.8%;])" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </Button>
            <div className="flex gap-2 ml-10">
              <Button> Entrar </Button>
              <Button> Registrar </Button>
            </div>
          </div>
        </ul>
      </div>
      <Separator />
    </>
  )
}

export default NavBar
