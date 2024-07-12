'use client'
import React, { FC } from 'react'

import { CommentInput, Comment, ButtonFull } from '@/components'

import { useArticleComments } from '@/hooks'

interface CommentsProps {
  articleId: number
}

const Comments: FC<CommentsProps> = ({ articleId }) => {
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
        <ButtonFull
          isLoading={isLoading}
          key="load-prev"
          onClick={fetchPrevComments}
        >
          Load Older Comments
        </ButtonFull>
      )}

      <div key="comments-wrapper" className="flex flex-col-reverse ">
        {comments.map((it) => {
          return <Comment key={it.id} comment={it} />
        })}
      </div>
      <div key="add-comment" className="px-4">
        <CommentInput isLoading={isLoading} onPostComment={handlePostComment} />
      </div>
    </div>
  )
}

export default Comments
