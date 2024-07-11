import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'B2B Broker',
  description: 'Articles assignment',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-green-800 p-3 md:p-6 text-xl font-medium shadow-md">
          <Link href="/">
            <span className="text-gray-200">B2B Broker</span>
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}
