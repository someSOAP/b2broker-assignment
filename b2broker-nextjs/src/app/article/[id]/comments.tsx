import React, { FC } from 'react'
import { getCommentsByArticle } from '@/server-api'

interface ICommentsProps {
  articleId: number
}

const fetchComments = async (articleId: number) => {
  const res = await getCommentsByArticle(articleId)
  return res.data
}

const Comments: FC<ICommentsProps> = async ({ articleId }) => {
  const comments = await fetchComments(articleId)

  return (
    <div>
      {comments.data.map((it, index) => {
        return (
          <div key={it.id}>
            {index + 1}) {it.attributes.text}
          </div>
        )
      })}
    </div>
  )
}

export default Comments
