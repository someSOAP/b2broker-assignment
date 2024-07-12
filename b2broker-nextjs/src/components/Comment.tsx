import React, { FC } from 'react'
import type { CommentType } from '@/types'

export interface CommentProps {
  comment: CommentType
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  const {
    attributes: { text, publishedAt },
    id,
  } = comment

  const publishDate = new Date(publishedAt)
  return (
    <div className="py-2 px-4 odd:bg-gray-100">
      <div className="pb-2">
        {text.trim() || <span className="text-gray-500 text-xs">(Empty)</span>}
      </div>
      <div className="text-xs flex">
        <span className="text-gray-500">
          {publishDate.toDateString() + ' '}
        </span>
        <span className="text-gray-800">
          &nbsp;{publishDate.toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}
