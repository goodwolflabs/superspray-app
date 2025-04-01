'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="h-96 bg-[url('/image/spray-footer.png')] bg-cover bg-center">
      <div className="z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between sm:px-1 lg:px-8">
            <div className="text-muted-foreground text-sm">
              © 2024 Superspray
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
