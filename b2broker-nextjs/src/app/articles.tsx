'use client'
import React, { FC, useEffect, useRef, useState } from 'react'
import { ArticleType } from '@/types'
import { ArticleItem } from '@/components'
import { getArticles } from '@/client-api'

export interface TestProps {
  articles: ArticleType[]
}

export const Articles: FC<TestProps> = ({ articles: initialArticles }) => {
  const [articles, setArticles] = useState(initialArticles)
  const scrollRef = useRef<HTMLElement>(null)
  const lastIdRef = useRef(articles[articles.length - 1].id)
  const isFetching = useRef(false)
  const finalArticleReached = useRef(false)

  useEffect(() => {
    console.log(scrollRef.current)

    const scrollElement = scrollRef.current
    if (!scrollElement) {
      return
    }

    const onScroll = (evt: Event) => {
      console.log(evt)

      if (finalArticleReached.current || isFetching.current) {
        return
      }

      const isBottomReached =
        scrollElement.scrollTop + scrollElement.clientHeight ===
        scrollElement.scrollHeight

      if (!isBottomReached) {
        return
      }

      isFetching.current = true
      getArticles(lastIdRef.current)
        .then((res) => {
          const newArticles = res.data.data
          if (!newArticles.length) {
            finalArticleReached.current = true
            return
          }
          lastIdRef.current = newArticles[newArticles.length - 1].id
          setArticles((prevState) => {
            return [...prevState, ...res.data.data]
          })
        })
        .finally(() => {
          isFetching.current = false
        })
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
