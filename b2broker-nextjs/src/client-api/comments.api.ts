import { clientApi } from './client.api'
import type { GetCommentsByArticleProps } from '@/server-api/comments.api'
import { CommentType, StrapiResponse } from '@/types'

export const getArticleComments = (
  articleId: number,
  params: Partial<GetCommentsByArticleProps> = {},
) => {
  return clientApi.get<StrapiResponse<CommentType[]>>('/api/comments', {
    params: {
      id: articleId,
      page: params.page || 1,
      ...params,
    },
  })
}
