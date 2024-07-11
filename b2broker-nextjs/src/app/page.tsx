import { FC } from 'react'

import { getArticles } from '@/server-api'
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
        // https://developers.google.com/search/blog/2014/02/infinite-scroll-search-friendly
        <a href={`/?lastId=${data[data.length - 1].id}`}>Load More</a>
      )}
    </div>
  )
}

export default HomePage
