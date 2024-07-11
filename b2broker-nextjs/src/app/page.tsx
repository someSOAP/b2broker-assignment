import { FC } from 'react'

import Link from 'next/link'

import clsx from 'clsx'

import { getArticles } from '@/server-api'
import { PAGE_LENGTH } from '@/constants'
import type { NextPageProps } from '@/types'

import { Articles } from './articles'

const fetchArticles = async (lastId?: number) => {
  const res = await getArticles(lastId)
  return res.data
}

const HomePage: FC<NextPageProps> = async ({ searchParams }) => {
  const lastIdQuery = searchParams?.lastId
    ? Number(searchParams.lastId)
    : undefined
  const { data, meta } = await fetchArticles(lastIdQuery)

  const isEndReached = !data.length

  return (
    <div className="flex flex-col flex-1 justify-between py-5 h-full">
      {!isEndReached && <Articles articles={data} />}
      {!isEndReached && (
        <div>
          <a className="sr-only" href={`/?lastId=${data[data.length - 1].id}`}>
            Load More
          </a>
        </div>
      )}
      {/*<div className="flex flex-row gap-1.5 py-3 px-4">*/}
      {/*  Pagination*/}
      {/*  {new Array(pagesAmount).fill(0).map((_, index) => {*/}
      {/*    const pageNum = index + 1*/}
      {/*    const href = index === 0 ? '/' : `/?page=${pageNum}`*/}
      {/*    const isActive = pageIndex === pageNum*/}
      {/*    return (*/}
      {/*      <Link*/}
      {/*        key={href}*/}
      {/*        href={href}*/}
      {/*        className={clsx(*/}
      {/*          isActive && 'text-blue-700',*/}
      {/*          'transition-all',*/}
      {/*          !isActive && 'hover:text-blue-500',*/}
      {/*        )}*/}
      {/*      >*/}
      {/*        {pageNum}*/}
      {/*      </Link>*/}
      {/*    )*/}
      {/*  })}*/}
      {/*</div>*/}
    </div>
  )
}

export default HomePage
