import React, { FC } from 'react'

import Link from 'next/link'

import { ArticleType } from '@/types'
import { getImageUrl } from '@/utils'

export interface ArticleItemProps {
  article: ArticleType
}

export const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  const href = `/article/${article.id}`

  const imageData = article.attributes.image?.data
  const imageAttr = imageData?.attributes

  return (
    <article>
      <Link
        href={href}
        className="max-h-[40vh] overflow-hidden mb-5 flex flex-col sm:flex-row  flex-1 sm:max-h-[30vh] xl:max-h-[20vh] max-w-screen-md bg-white bg-clip-border text-gray-700 shadow-md m-auto"
      >
        {imageAttr && (
          <div className="overflow-hidden sm:w-2/5 sm:h-full">
            <img
              src={getImageUrl(imageData)}
              alt={imageAttr.alternativeText ?? imageAttr.name}
              className="object-cover object-center w-full"
            />
          </div>
        )}
        <div className="flex-1 p-3 flex flex-col border-b-4 md:border-r-4 md:border-y-4 border-gray-300 border-solid">
          <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {article.attributes.title}
          </h4>
          <p className="flex-1 mb-2 font-sans text-base font-normal leading-relaxed text-gray-400 text-ellipsis overflow-hidden">
            {article.attributes.body[0].children[0].text.slice(0, 110)}...
          </p>
        </div>
      </Link>
    </article>
  )
}

export default ArticleItem
