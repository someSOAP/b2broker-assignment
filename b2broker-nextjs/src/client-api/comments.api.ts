import { clientApi } from './client.api'
import { CommentType, StrapiResponse } from '@/types'

export const getArticleComments = (articleId: number, page?: number) => {
  return clientApi.get<StrapiResponse<CommentType[]>>('/article/comments', {
    params: {
      id: articleId,
      page,
    },
  })
}
