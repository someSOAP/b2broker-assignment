import { clientApi } from './client.api'
import type { GetCommentsByArticleProps } from '@/server-api/comments.api'
import { Comment, StrapiResponse } from '@/types'

export const getArticleComments = (
  articleId: number,
  params: Partial<GetCommentsByArticleProps> = {},
) => {
  return clientApi.get<StrapiResponse<Comment[]>>('/article/comments', {
    params: {
      id: articleId,
      page: params.page || 1,
      ...params,
    },
  })
}
