import Link from 'next/link'
import { getArticles } from '../server-api'

const fetchArticles = async () => {
  const res = await getArticles()
  return res.data.data
}

export default async function Home() {
  const articles = await fetchArticles()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Main Page</h1>
      <div>
        {articles.map((article: any) => {
          return (
            <Link key={article.id} href={`/article/${article.id}`}>
              <div>{article.attributes.title}</div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
