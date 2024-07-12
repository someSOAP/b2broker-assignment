import React, { FC } from 'react'

import Link from 'next/link'

import { Image } from './Image'

import { ArticleType } from '@/types'

export interface ArticleItemProps {
  article: ArticleType
}

export const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  const href = `/article/${article.id}`

  const imageData = article.attributes.image?.data
  const imageAttr = imageData?.attributes

  return (
    <article className="max-h-fit overflow-hidden mb-5 sm:max-h-[30vh] xl:max-h-[20vh] max-w-screen-md bg-white bg-clip-border text-gray-700 shadow-md m-auto">
      <Link href={href} className="sm:flex flex-row flex-1 ">
        {imageAttr && (
          <div className="overflow-hidden sm:w-2/5 h-[200px] sm:min-h-full">
            <Image
              imageData={imageData}
              className="object-cover object-center w-full"
              maxSize="medium"
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
