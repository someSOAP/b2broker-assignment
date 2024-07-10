import { strapiApi } from './strapi.api'
import { StrapiResponse, CommentType } from '@/types'

export const getCommentsByArticle = (articleId: number, page: number = 1) => {
  return strapiApi.get<StrapiResponse<CommentType[]>>(`/comments/`, {
    params: {
      'filters[article][$eq]': articleId,
      'sort[0]': 'updatedAt:desc',
      'pagination[page]': page,
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
