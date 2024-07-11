import { PAGE_LENGTH } from '@/constants'

import type { ArticleType, StrapiResponse } from '@/types'

import { strapiApi } from './strapi.api'

export const getArticles = (lastId?: number) => {
  return strapiApi.get<StrapiResponse<ArticleType[]>>('/articles', {
    params: {
      'sort[0]': 'createdAt:desc',
      'pagination[pageSize]': PAGE_LENGTH,
      'filters[id][$lt]': lastId,
      'populate[0]': 'image',
    },
  })
}

export const getOneArticle = (id: number) => {
  return strapiApi.get<StrapiResponse<ArticleType>>(`/articles/${id}`, {
    params: {
      'populate[0]': 'image',
    },
  })
}
