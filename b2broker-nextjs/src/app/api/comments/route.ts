import { type NextRequest } from 'next/server'

import { getCommentsByArticle } from '@/server-api'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  const page = searchParams.get('page')
  const idGt = searchParams.get('idGt')
  const idGte = searchParams.get('idGte')
  const idLte = searchParams.get('idLte')
  const idLt = searchParams.get('idLt')

  const comments = await getCommentsByArticle(Number(id), {
    page: Number(page),
    idGt: idGt ? Number(idGt) : undefined,
    idGte: idGte ? Number(idGte) : undefined,
    idLte: idLte ? Number(idLte) : undefined,
    idLt: idLt ? Number(idLt) : undefined,
  })

  return Response.json(comments.data)
}
