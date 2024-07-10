import { strapiApi } from './strapi.api'
import { StrapiResponse, Comment } from '@/types'

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
  return strapiApi.get<StrapiResponse<Comment[]>>(`/comments/`, {
    params: {
      'filters[article][$eq]': articleId,
      'sort[0]': 'updatedAt:desc',
      'pagination[page]': params.page || 1,
      'filters[id][$gt]': params.idGt,
      'filters[id][$gte]': params.idGte,
      'filters[id][$lt]': params.idLt,
      'filters[id][$lte]': params.idLte,
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
