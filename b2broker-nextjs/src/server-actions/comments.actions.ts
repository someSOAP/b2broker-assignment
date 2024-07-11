'use server'

import { postComment } from '@/strapi-api'

export const addComment = async (articleId: number, formData: FormData) => {
  const text = formData.get('text') as string

  if (!text) {
    throw new Error('Field "text" is required')
  }

  const res = await postComment(articleId, text)

  return res.data
}
