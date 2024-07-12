import React, { FC } from 'react'
import Link from 'next/link'

export interface NotFoundProps {
  title: string
  caption: string
}

export const NotFound: FC<NotFoundProps> = ({ title, caption }) => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex flex-col gap-3 items-center bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p>{caption}</p>
        <Link
          className="text-green-600 hover:text-green-500 underline underline-offset-4"
          href="/"
        >
          Return Home 👉 🏠
        </Link>
      </div>
    </div>
  )
}
