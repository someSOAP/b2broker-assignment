import { getArticleComments } from '@/client-api'
import { useEffect, useRef, useState } from 'react'
import { addComment } from '@/server-actions'
import type { CommentType, StrapiResponse } from '@/types'

export const useArticleComments = (articleId: number) => {
  const minId = useRef<number | undefined>(undefined)
  const maxId = useRef<number | undefined>(undefined)
  const [comments, setComments] = useState<CommentType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEndReached, setIsEndReached] = useState(false)

  const updateLastComments = () => {
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

  const checkIfEndReached = (data: StrapiResponse<CommentType[]>) => {
    const loadedComments = data.data
    const meta = data.meta

    return Boolean(
      meta.pagination && loadedComments.length < meta.pagination.pageSize,
    )
  }

  const fetchPrevComments = () => {
    setIsLoading(true)
    getArticleComments(articleId, { idLt: minId.current })
      .then((res) => {
        const loadedComments = res.data.data

        setIsEndReached(checkIfEndReached(res.data))

        if (!loadedComments.length) {
          return
        }
        const last = loadedComments[loadedComments.length - 1]
        minId.current = last.id
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
        const loadedComments = res.data.data

        setIsEndReached(checkIfEndReached(res.data))

        if (!loadedComments.length) {
          return
        }

        const [first] = loadedComments
        const last = loadedComments[loadedComments.length - 1]
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
  }, [articleId])

  const handlePostComment = async (text: string) => {
    const formData = new FormData()
    formData.set('text', text)
    await addComment(articleId, formData)
    updateLastComments()
  }

  return {
    comments,
    isLoading,
    isEndReached,
    handlePostComment,
    fetchPrevComments,
  }
}
