import { strapiApi } from './strapi.api'
import { StrapiResponse, CommentType } from '@/types'

export const getComments = () => {
  return strapiApi.get('/comments')
}

export const getCommentsByArticle = (articleId: number) => {
  return strapiApi.get<StrapiResponse<CommentType[]>>(`/comments/`, {
    params: {
      'filters[article][$eq]': articleId,
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
