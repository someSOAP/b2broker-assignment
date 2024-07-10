import { FC } from 'react'
import Link from 'next/link'
import { getArticles } from '@/server-api'
import { NextPageProps } from '@/types'
import { PAGE_LENGTH } from '@/constants'

const fetchArticles = async (page: number) => {
  const res = await getArticles(page)
  return res.data
}

const HomePage: FC<NextPageProps> = async ({ searchParams }) => {
  const pageIndex = Number(searchParams?.page) || 1
  const { data, meta } = await fetchArticles(pageIndex)

  const pagesAmount = Math.ceil((meta.pagination?.total || 0) / PAGE_LENGTH)

  console.log(pagesAmount)

  return (
    <main className="flex min-h-screen flex-col  p-24">
      <h1>Main Page</h1>
      <div>
        {data.map((article: any) => {
          return (
            <Link key={article.id} href={`/article/${article.id}`}>
              <div>{article.attributes.title}</div>
            </Link>
          )
        })}
      </div>
      <div className="flex flex-row gap-1.5">
        Pagination
        {new Array(pagesAmount).fill(0).map((_, index) => {
          return <Link href={`/?page=${index + 1}`}>{index + 1}</Link>
        })}
      </div>
    </main>
  )
}

export default HomePage
