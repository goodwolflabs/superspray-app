'use client'

import { Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/hooks/useTheme'
import { CustomConnectButton } from '@/components/buttons'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex items-center justify-between border-b border-gray-100/50 px-4 py-3 dark:border-dark-100">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center">
          <Image
            src="/image/logo.png"
            alt="Superspray Logo"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <span className="text-xl font-bold dark:text-white">Superspray</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit transition-colors hover:bg-gray-200/50"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-gray-500 transition-colors" />
          ) : (
            <Moon className="h-5 w-5 text-gray-500 transition-colors" />
          )}
        </button>
        {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Bell className="h-5 w-5 text-gray-500" />
        </div> */}
        <CustomConnectButton />
      </div>
    </header>
  )
}
