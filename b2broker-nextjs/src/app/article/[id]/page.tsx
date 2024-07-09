import { getOneArticle } from '@/api'
import { getImageUrl } from '@/utils'
const fetchArticle = async (id: number) => {
  const res = await getOneArticle(id)
  return res.data.data
}

export default async function Page(props: any) {
  const article = await fetchArticle(props.params.id)
  console.log(props.params.id)
  console.log(article)
  console.log(JSON.stringify(article.attributes.body))
  console.log('IMAGE')
  console.log(JSON.stringify(article.attributes.image))

  return (
    <main>
      <h1>{article.attributes.title}</h1>
      <img src={getImageUrl(article.attributes.image.data)} alt="" />
      {article.attributes.body.map((paragraph: any, index: number) => {
        return (
          <p key={index}>
            {paragraph.children.map((child: any) => child.text)}
          </p>
        )
      })}
    </main>
  )
}
