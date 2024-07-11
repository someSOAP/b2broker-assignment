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
      className="overflow-hidden flex-1 my-10 flex max-h-40 max-w-3xl flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-auto"
    >
      {imageAttr && (
        <div className="relative m-0 w-1/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
          <img
            src={getImageUrl(imageData, 'small')}
            alt={imageAttr.alternativeText ?? imageAttr.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-3 overflow-hidden">
        <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {article.attributes.title}
        </h4>
        <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased overflow-ellipsis">
          {article.attributes.body[0].children[0].text}
        </p>
      </div>
    </Link>
  )
}

export default ArticleItem
