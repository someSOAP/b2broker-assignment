import { clientApi } from './client.api'

export const getArticleComments = (articleId: number) => {
  return clientApi('/article/comments/api', { params: { id: 1 } })
}
