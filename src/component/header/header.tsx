import { Bell, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function Header() {
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
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Bell className="h-5 w-5 text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="font-bold">0.4500</div>
            <div className="text-xs text-gray-500">Mainnet</div>
          </div>
          <div className="flex items-center gap-2 rounded-full border px-3 py-1.5">
            <div className="h-6 w-6 rounded-full bg-blue-500" />
            <span className="text-sm">0x55...50E4</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  )
}
