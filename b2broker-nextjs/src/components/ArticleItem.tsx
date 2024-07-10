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
    <Link href={href}>
      <div>
        <h2>{article.attributes.title}</h2>
        <div className="flex flex-row gap-3">
          {imageAttr && (
            <img
              alt={imageAttr.alternativeText ?? imageAttr.name}
              src={getImageUrl(imageData, 'small')}
            />
          )}
          <h3 className="px-3">
            {article.attributes.body[0].children[0].text}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default ArticleItem
