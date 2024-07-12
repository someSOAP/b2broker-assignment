import { FC } from 'react'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { AxiosError } from 'axios'

import { Image } from '@/components'
import { getOneArticle } from '@/strapi-api'
import { getImageUrl } from '@/utils'

import type { NextPageProps } from '@/types'

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
    <div className="overflow-scroll">
      <article className="flex flex-col max max-w-screen-md m-auto bg-white py-5 my-4">
        <h1 className="text-4xl font-semibold my-2 px-2 sm:px-4">{title}</h1>
        {image && <Image imageData={image.data} />}

        {body.map((paragraph, index) => {
          return (
            <p className="px-4 pb-4 text-gray-800 text-justify" key={index}>
              {paragraph.children.map((child) => child.text)}
            </p>
          )
        })}

        <DynamicComments articleId={articleId} />
      </article>
    </div>
  )
}

export default ArticlePage
