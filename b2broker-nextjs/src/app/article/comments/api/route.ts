import { type NextRequest } from 'next/server'

import { getCommentsByArticle } from '@/server-api'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('id')

  const comments = await getCommentsByArticle(Number(query))

  return Response.json(comments.data)
}
