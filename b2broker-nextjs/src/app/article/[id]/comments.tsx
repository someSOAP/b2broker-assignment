'use client'
import React, { FC, useEffect } from 'react'
import { getArticleComments } from '@/client-api'

interface ICommentsProps {
  articleId: number
}

const Comments: FC<ICommentsProps> = ({ articleId }) => {
  useEffect(() => {
    let isIgnored = false
    getArticleComments(articleId).then((res) => {
      if (isIgnored) {
        return
      }
      console.log(res)
    })
    return () => {
      isIgnored = true
    }
  }, [])

  return <div>{articleId}</div>
}

export default Comments
