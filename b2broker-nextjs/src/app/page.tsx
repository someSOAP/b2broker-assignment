import { FC } from 'react'

import Link from 'next/link'

import clsx from 'clsx'

import { getArticles } from '@/server-api'
import { PAGE_LENGTH } from '@/constants'
import type { NextPageProps } from '@/types'

import { Articles } from './articles'

const fetchArticles = async (page: number) => {
  const res = await getArticles(page)
  return res.data
}

const HomePage: FC<NextPageProps> = async ({ searchParams }) => {
  const pageIndex = Number(searchParams?.page) || 1
  const { data, meta } = await fetchArticles(pageIndex)

  const pagesAmount = Math.ceil((meta.pagination?.total || 0) / PAGE_LENGTH)

  return (
    <div className="flex flex-col flex-1 justify-between py-5 h-full">
      <Articles
        initialPage={pageIndex}
        articles={data}
        pagesAmount={pagesAmount}
      />
      <div className="flex flex-row gap-1.5 py-3 px-4">
        Pagination
        {new Array(pagesAmount).fill(0).map((_, index) => {
          const pageNum = index + 1
          const href = index === 0 ? '/' : `/?page=${pageNum}`
          const isActive = pageIndex === pageNum
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                isActive && 'text-blue-700',
                'transition-all',
                !isActive && 'hover:text-blue-500',
              )}
            >
              {pageNum}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage
