import { strapiApi } from './strapi.api'

export const getArticles = () => {
  return strapiApi.get('/articles')
}

export const getOneArticle = (id: number) => {
  return strapiApi.get(`/articles/${id}?populate[0]=image`)
}
