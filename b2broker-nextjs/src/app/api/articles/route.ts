import { type NextRequest } from 'next/server'

import { getArticles } from '@/strapi-api'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lastIdQuery = searchParams.get('lastId')

  const lastId = Number(lastIdQuery) || undefined
  const comments = await getArticles(lastId)

  return Response.json(comments.data)
}
