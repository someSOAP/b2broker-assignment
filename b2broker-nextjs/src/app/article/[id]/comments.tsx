'use client'
import React, { FC, useEffect, useState, useRef } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import { getArticleComments } from '@/client-api'
import { Comment } from '@/types'

interface ICommentsProps {
  articleId: number
}

import AddComment from './addcomment'

const checkIfHasMore = (
  response: Awaited<ReturnType<typeof getArticleComments>>,
) => {
  const paginationData = response.data.meta.pagination
  return !!paginationData && paginationData.page !== paginationData.pageCount
}

const Comments: FC<ICommentsProps> = ({ articleId }) => {
  const page = useRef(1)
  const minId = useRef(Infinity)
  const maxId = useRef(-Infinity)
  const [comments, setComments] = useState<Comment[]>([])
  const [hasMore, setHasMore] = useState(true)

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

  const fetchNextComments = () => {
    getArticleComments(articleId, { idLt: minId.current }).then((res) => {
      setHasMore(checkIfHasMore(res))
      setComments((prevState) => {
        return [...prevState, ...res.data.data]
      })
    })
  }

  useEffect(() => {
    let isIgnored = false
    getArticleComments(articleId, { page: 1 }).then((res) => {
      if (isIgnored) {
        return
      }
      setHasMore(checkIfHasMore(res))
      const comments = res.data.data
      if (!comments.length) {
        return
      }
      const [first] = comments
      const last = comments[comments.length - 1]
      maxId.current = first.id
      minId.current = last.id
      setComments(res.data.data)
    })

    return () => {
      isIgnored = true
    }
  }, [])

  return (
    <div>
      <AddComment onPosted={updateComments} articleId={articleId} />
      <InfiniteScroll
        scrollableTarget="root-layout"
        dataLength={25}
        loader={<div>LOADING</div>}
        hasMore={hasMore}
        next={fetchNextComments}
      >
        {comments.map((it, index) => {
          return (
            <div key={it.id}>
              {index + 1}) {it.attributes.text}
            </div>
          )
        })}
      </InfiniteScroll>
    </div>
  )
}

export default Comments
