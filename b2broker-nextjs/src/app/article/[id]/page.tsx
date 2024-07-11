import { FC } from 'react'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

import { getOneArticle } from '@/server-api'
import { getImageUrl } from '@/utils'

import type { NextPageProps } from '@/types'
import { AxiosError } from 'axios'

const DynamicComments = dynamic(() => import('./components/comments'), {
  ssr: false,
})

const fetchArticle = async (id: number) => {
  try {
    const res = await getOneArticle(id)
    return res.data.data
  } catch (err) {
    const parsedErr = err as AxiosError
    if (parsedErr?.response?.status === 404) {
      return notFound()
    }
    throw err
  }
}

type ArticlePageProps = NextPageProps<'id' | 'wow'>

const ArticlePage: FC<ArticlePageProps> = async (props) => {
  const articleId = Number(props.params.id)
  const article = await fetchArticle(articleId)
  const { title, image, body } = article.attributes

  return (
    <main>
      <h1>{title}</h1>
      {image && <img src={getImageUrl(image.data)} alt="" />}
      {body.map((paragraph, index) => {
        return (
          <p key={index}>{paragraph.children.map((child) => child.text)}</p>
        )
      })}
      <DynamicComments articleId={articleId} />
    </main>
  )
}

export default ArticlePage
