'use client'
import React, { FC, useEffect, useState, useRef } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import { getArticleComments } from '@/client-api'
import { CommentType, StrapiResponse } from '@/types'

interface ICommentsProps {
  articleId: number
}

import AddComment from './addcomment'

const Comments: FC<ICommentsProps> = ({ articleId }) => {
  const page = useRef(1)
  const [comments, setComments] = useState<CommentType[]>([])
  const [hasMore, setHasMore] = useState(true)

  const updateComments = () => {
    getArticleComments(articleId, page.current).then((res) => {
      setComments(res.data.data)
    })
  }

  const checkIfHasMore = (
    response: Awaited<ReturnType<typeof getArticleComments>>,
  ) => {
    const paginationData = response.data.meta.pagination
    const hasMorePages =
      !!paginationData && paginationData.page !== paginationData.pageCount
    if (!hasMorePages) {
      console.log({ paginationData })
    }
    setHasMore(hasMorePages)
  }

  const fetchNextComments = () => {
    page.current += 1
    getArticleComments(articleId, page.current).then((res) => {
      checkIfHasMore(res)
      setComments((prevState) => {
        return [...prevState, ...res.data.data]
      })
    })
  }

  useEffect(() => {
    let isIgnored = false
    getArticleComments(articleId, page.current).then((res) => {
      if (isIgnored) {
        return
      }
      checkIfHasMore(res)
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
