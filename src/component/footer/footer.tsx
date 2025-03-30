'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[url('/image/spray-footer.png')] bg-cover bg-center h-96">
      <div className="z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between lg:px-8 sm:px-1">
            <div className="text-sm text-muted-foreground">© 2024 Superspray</div>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 