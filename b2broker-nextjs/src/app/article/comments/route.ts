import { type NextRequest } from 'next/server'

import { getCommentsByArticle } from '@/server-api'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('id')
  const page = searchParams.get('page')

  const comments = await getCommentsByArticle(Number(query), Number(page) || 1)

  return Response.json(comments.data)
}
