import { getOneArticle } from '@/server-api'
import { getImageUrl } from '@/utils'

import Comments from './comments'

const fetchArticle = async (id: number) => {
  const res = await getOneArticle(id)
  return res.data.data
}

export default async function Page(props: any) {
  const articleId = props.params.id
  const article = await fetchArticle(articleId)
  const { title, image, body } = article.attributes

  return (
    <div>
      <main>
        <h1>{title}</h1>
        {image && <img src={getImageUrl(image.data)} alt="" />}
        {body.map((paragraph, index) => {
          return (
            <p key={index}>{paragraph.children.map((child) => child.text)}</p>
          )
        })}
      </main>
      <Comments key="comments" articleId={articleId} />
    </div>
  )
}
