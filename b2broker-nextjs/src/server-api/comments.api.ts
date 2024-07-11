import { strapiApi } from './strapi.api'
import { StrapiResponse, CommentType } from '@/types'
import { PAGE_LENGTH } from '@/constants'

export interface GetCommentsByArticleProps {
  page: number
  idGt: number
  idGte: number
  idLt: number
  idLte: number
}

export const getCommentsByArticle = (
  articleId: number,
  params: Partial<GetCommentsByArticleProps> = {},
) => {
  return strapiApi.get<StrapiResponse<CommentType[]>>(`/comments/`, {
    params: {
      'filters[article][$eq]': articleId,
      'sort[0]': 'createdAt:desc',
      'pagination[page]': params.page || 1,
      'filters[id][$gt]': params.idGt,
      'filters[id][$gte]': params.idGte,
      'filters[id][$lt]': params.idLt,
      'filters[id][$lte]': params.idLte,
      'pagination[pageSize]': PAGE_LENGTH,
    },
  })
}

export const postComment = (articleId: number, text: string) => {
  return strapiApi.post('/comments/', {
    data: {
      text,
      article: articleId,
    },
  })
}
