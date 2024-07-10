import { PAGE_LENGTH } from '@/constants'

import type { ArticleType, StrapiResponse } from '@/types'

import { strapiApi } from './strapi.api'

export const getArticles = (page?: number) => {
  return strapiApi.get<StrapiResponse<ArticleType[]>>('/articles', {
    params: {
      'pagination[page]': page || 1,
      'pagination[pageSize]': PAGE_LENGTH,
      'populate[0]': 'image',
    },
  })
}

export const getOneArticle = (id: number) => {
  return strapiApi.get<StrapiResponse<ArticleType>>(`/articles/${id}`, {
    params: { 'populate[0]': 'image' },
  })
}
