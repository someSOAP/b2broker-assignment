'use client'
import React, { FC, useEffect, useState, useRef } from 'react'
import { getArticleComments } from '@/client-api'
import { CommentType } from '@/types'

interface ICommentsProps {
  articleId: number
}

import AddComment from './addcomment'

const Comments: FC<ICommentsProps> = ({ articleId }) => {
  const page = useRef(1)
  const [comments, setComments] = useState<CommentType[]>([])

  const updateComments = () => {
    getArticleComments(articleId, page.current).then((res) => {
      setComments(res.data.data)
    })
  }

  useEffect(() => {
    let isIgnored = false
    getArticleComments(articleId, page.current).then((res) => {
      if (isIgnored) {
        return
      }
      setComments(res.data.data)
    })

    return () => {
      isIgnored = true
    }
  }, [])

  return (
    <div>
      <AddComment onPosted={updateComments} articleId={articleId} />
      <div>
        {comments.map((it, index) => {
          return (
            <div key={it.id}>
              {index + 1}) {it.attributes.text}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Comments
