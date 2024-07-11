'use server'

import { postComment } from '@/server-api'
import { revalidatePath } from 'next/cache'

export const addComment = async (articleId: number, formData: FormData) => {
  const text = formData.get('text') as string
  console.log(formData)
  if (!text) {
    return
  }
  const res = await postComment(articleId, text)

  return res.data
}
