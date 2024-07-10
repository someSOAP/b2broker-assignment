import { strapiApi } from './strapi.api'

export const getComments = () => {
  return strapiApi.get('/comments')
}

export const getCommentsByArticle = (articleId: number) => {
  return strapiApi.get(`/comments/`)
}

export const postComment = (articleId: number, text: string) => {
  return strapiApi.post('/comments/', {
    data: {
      text,
      article: articleId,
    },
  })
}
