'use client'
import React, { FC, useRef, useState } from 'react'
import { getArticles } from '@/client-api'
import { ArticleItem } from '@/components'
import { useScrollBottom } from '@/hooks'
import type { ArticleType } from '@/types'

export interface ArticlesProps {
  articles: ArticleType[]
}

export const Articles: FC<ArticlesProps> = ({ articles: initialArticles }) => {
  const [articles, setArticles] = useState(initialArticles)
  const scrollRef = useRef<HTMLElement>(null)
  const lastIdRef = useRef(articles[articles.length - 1].id)
  const isFinalArticleReachedRef = useRef(false)

  useScrollBottom({
    ref: scrollRef,
    onScroll: async () => {
      if (isFinalArticleReachedRef.current) {
        return
      }
      const res = await getArticles(lastIdRef.current)

      const newArticles = res.data.data
      if (!newArticles.length) {
        isFinalArticleReachedRef.current = true
        return
      }
      lastIdRef.current = newArticles[newArticles.length - 1].id
      setArticles((prevState) => {
        return [...prevState, ...res.data.data]
      })
    },
  })

  return (
    <main ref={scrollRef} className="flex-1 overflow-scroll pt-2">
      {articles.map((it) => {
        return <ArticleItem key={it.id} article={it} />
      })}
    </main>
  )
}

export default Articles
