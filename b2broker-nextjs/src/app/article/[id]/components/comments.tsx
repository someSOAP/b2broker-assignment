'use client'
import React, { FC } from 'react'

import { CommentInput, Comment } from '@/components'

import { useArticleComments } from '@/hooks'

interface CommentsProps {
  articleId: number
}

const CommentsSlot: FC<CommentsProps> = ({ articleId }) => {
  const {
    handlePostComment,
    fetchPrevComments,
    comments,
    isLoading,
    isEndReached,
  } = useArticleComments(articleId)

  return (
    <div>
      {!isEndReached && (
        <button
          className="relative w-full py-4 grid place-items-center"
          key="load-prev"
          onClick={fetchPrevComments}
        >
          <div className="animate-pulse bg-green-500  absolute w-full h-full top-0" />
          <div className="z-10">Load Older Comments</div>
        </button>
      )}
      <div key="comments-wrapper" className="flex flex-col-reverse ">
        {comments.map((it) => {
          return <Comment key={it.id} comment={it} />
        })}
      </div>
      <div className="px-4">
        <CommentInput
          isDisabled={isLoading}
          key="add-comment"
          onPostComment={handlePostComment}
        />
      </div>
    </div>
  )
}

export default CommentsSlot
