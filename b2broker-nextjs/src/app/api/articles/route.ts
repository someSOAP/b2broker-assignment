import { type NextRequest } from 'next/server'

import { getArticles } from '@/server-api'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page')

  const comments = await getArticles(Number(page || 1))

  return Response.json(comments.data)
}
