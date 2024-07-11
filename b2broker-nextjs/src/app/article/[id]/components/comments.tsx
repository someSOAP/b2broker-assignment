'use client'
import React, { FC, useEffect, useRef, useState } from 'react'

import { getArticleComments } from '@/client-api'
import { CommentInput, Comment } from '@/components'
import type { CommentType } from '@/types'

import { addComment } from './actions'

interface CommentsProps {
  articleId: number
}

const CommentsSlot: FC<CommentsProps> = ({ articleId }) => {
  const minId = useRef<number | undefined>(undefined)
  const maxId = useRef<number | undefined>(undefined)
  const [comments, setComments] = useState<CommentType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEndReached, setIsEndReached] = useState(false)

  const updateComments = () => {
    getArticleComments(articleId, { idGt: maxId.current }).then((res) => {
      const newComments = res.data.data
      if (!newComments.length) {
        return
      }
      const [first] = newComments
      maxId.current = first.id
      setComments((prevState) => [...res.data.data, ...prevState])
    })
  }

  const fetchPrevComments = () => {
    setIsLoading(true)
    getArticleComments(articleId, { idLt: minId.current })
      .then((res) => {
        setComments((prevState) => {
          return [...prevState, ...res.data.data]
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    let ignore = false
    setIsLoading(true)
    getArticleComments(articleId)
      .then((res) => {
        if (ignore) {
          return
        }
        const comments = res.data.data
        if (!comments.length) {
          setIsEndReached(true)
          return
        }
        const [first] = comments
        const last = comments[comments.length - 1]
        maxId.current = first.id
        minId.current = last.id
        setComments(res.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  const handlePostComment = async (text: string) => {
    const formData = new FormData()
    formData.set('text', text)
    await addComment(articleId, formData)
    updateComments()
  }

  return (
    <div>
      {!isEndReached && (
        <button key="load-prev" onClick={fetchPrevComments}>
          Load prev comments
        </button>
      )}
      <div key="comments-wrapper" className="flex flex-col-reverse ">
        {comments.map((it, index) => {
          return <Comment comment={it} />
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
