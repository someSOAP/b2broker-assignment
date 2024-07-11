'use client'
import React, { FC, useEffect, useRef, useState } from 'react'
import { ArticleType } from '@/types'
import { ArticleItem } from '@/components'
import { getArticles } from '@/client-api'

export interface TestProps {
  articles: ArticleType[]
  initialPage: number
  pagesAmount: number
}

export const Articles: FC<TestProps> = ({
  articles: initialArticles,
  initialPage,
  pagesAmount,
}) => {
  const [articles, setArticles] = useState(initialArticles)
  const scrollRef = useRef<HTMLElement>(null)
  const pageRef = useRef(initialPage)
  const isFetching = useRef(false)

  useEffect(() => {
    console.log(scrollRef.current)

    const scrollElement = scrollRef.current
    if (!scrollElement) {
      return
    }

    const onScroll = (evt: Event) => {
      console.log(evt)

      if (isFetching.current) {
        return
      }

      const isBottomReached =
        scrollElement.scrollTop + scrollElement.clientHeight ===
        scrollElement.scrollHeight

      if (isBottomReached) {
        isFetching.current = true
        pageRef.current += 1
        getArticles(pageRef.current)
          .then((res) => {
            if (!res.data.data.length) {
              pageRef.current -= 1
              return
            }
            setArticles((prevState) => {
              return [...prevState, ...res.data.data]
            })
          })
          .finally(() => {
            isFetching.current = false
          })
      }
    }

    scrollElement.addEventListener('scroll', onScroll)

    return () => {
      scrollElement.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <main ref={scrollRef} className="flex-1 overflow-scroll">
      {articles.map((it) => {
        return <ArticleItem key={it.id} article={it} />
      })}
    </main>
  )
}

export default Articles
