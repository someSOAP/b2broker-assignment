'use server'

import { wait } from '@/utils'

import { postComment } from '@/strapi-api'

export const addComment = async (articleId: number, formData: FormData) => {
  const text = formData.get('text') as string

  if (!text) {
    throw new Error('Field "text" is required')
  }

  // Just to have some delay in order to display loader spinner
  // await wait(500)

  const res = await postComment(articleId, text)

  return res.data
}
