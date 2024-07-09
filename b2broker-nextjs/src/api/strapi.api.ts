import axios from 'axios'
import { STRAPI_TOKEN, STRAPI_API_URL } from '@/constants'

export const strapiApi = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    Authorization: `Bearer  ${STRAPI_TOKEN}`,
  },
})
