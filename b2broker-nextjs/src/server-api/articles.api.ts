import { strapiApi } from './strapi.api'
import { StrapiResponse } from '@/types/strapi.types'
import { ArticleType } from '@/types'

export const getArticles = () => {
  return strapiApi.get<StrapiResponse<ArticleType[]>>('/articles')
}

export const getOneArticle = (id: number) => {
  return strapiApi.get<StrapiResponse<ArticleType>>(`/articles/${id}`, {
    params: { 'populate[0]': 'image' },
  })
}
