import { clientApi } from './client.api'
import { ArticleType, StrapiResponse } from '@/types'

export const getArticles = (lastId?: number) => {
  return clientApi.get<StrapiResponse<ArticleType[]>>('/api/articles', {
    params: {
      lastId,
    },
  })
}
