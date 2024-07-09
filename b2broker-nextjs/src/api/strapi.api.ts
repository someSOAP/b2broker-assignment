import axios from 'axios'

export const strapiApi = axios.create({
  baseURL: 'http://127.0.0.1:1337/api/',
  headers: {
    Authorization: `Bearer  ${process.env.STRAPI_TOKEN}`,
  },
})
