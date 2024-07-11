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

  const imgAlt =
    image?.data.attributes.alternativeText ?? image?.data.attributes.name

  return (
    <main className="flex flex-col max max-w-screen-md m-auto">
      <h1 className="text-4xl font-semibold my-2 px-2 sm:px-4">{title}</h1>
      {image && (
        <img
          className="max-h-[50vh] sm:max-h-[40vh] w-full object-cover sm:px-4"
          src={getImageUrl(image.data)}
          alt={imgAlt}
        />
      )}
      <div className="px-4 pt-4">
        {body.map((paragraph, index) => {
          return (
            <p className="pb-4 text-gray-800 text-justify" key={index}>
              {paragraph.children.map((child) => child.text)}
            </p>
          )
        })}
        <DynamicComments articleId={articleId} />
      </div>
    </main>
  )
}

export default ArticlePage
