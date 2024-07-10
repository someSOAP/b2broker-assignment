import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'B2B Broker',
  description: 'Test assignment',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Link href="/">B2B Broker</Link>
        </header>
        <div id="root-layout" className="overflow-scroll pl-5 pr-5">
          {children}
        </div>
      </body>
    </html>
  )
}
