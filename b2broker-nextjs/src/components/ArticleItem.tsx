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
    <Link
      href={href}
      className="max-h-[60vh] overflow-hidden mb-5 flex flex-col flex-1 md:max-h-[30vh] xl:max-h-[20vh] md:flex-row max-w-screen-md bg-white bg-clip-border text-gray-700 shadow-md m-auto"
    >
      {imageAttr && (
        <img
          src={getImageUrl(imageData)}
          alt={imageAttr.alternativeText ?? imageAttr.name}
          className="object-cover object-center overflow-hidden md:w-2/5 md:h-full"
        />
      )}
      <div className="flex-1 p-3 flex flex-col border-b-4 md:border-t-4 md:border-y-4 border-gray-300 border-solid">
        <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {article.attributes.title}
        </h4>
        <p className="line-clamp-4 flex-1 mb-8 font-sans text-base font-normal leading-relaxed text-gray-400 text-ellipsis overflow-hidden">
          {article.attributes.body[0].children[0].text}
        </p>
      </div>
    </Link>
  )
}

export default ArticleItem
