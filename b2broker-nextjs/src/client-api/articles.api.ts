import { clientApi } from './client.api'
import { ArticleType, StrapiResponse } from '@/types'

export const getArticles = (page: number) => {
  return clientApi.get<StrapiResponse<ArticleType[]>>('/api/articles', {
    params: {
      page: page,
    },
  })
}
