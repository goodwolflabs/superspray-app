'use client'

import { Bell, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/hooks/useTheme'
import { CustomConnectButton } from '../ui/CustomConnectButton'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
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
        <span className="text-xl font-bold">Superspray</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-gray-500" />
          ) : (
            <Moon className="h-5 w-5 text-gray-500" />
          )}
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Bell className="h-5 w-5 text-gray-500" />
        </div>
        <CustomConnectButton />
      </div>
    </header>
  )
}
