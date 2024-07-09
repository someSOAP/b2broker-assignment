import { getOneArticle } from '@/server-api'
import { getImageUrl } from '@/utils'

import Comments from './comments'
import AddComment from './addcomment'

const fetchArticle = async (id: number) => {
  const res = await getOneArticle(id)
  return res.data.data
}

export default async function Page(props: any) {
  const articleId = props.params.id
  const article = await fetchArticle(articleId)
  const { title, image, body } = article.attributes

  return (
    <main>
      <h1>{title}</h1>
      {image && <img src={getImageUrl(image.data)} alt="" />}
      {body.map((paragraph: any, index: number) => {
        return (
          <p key={index}>
            {paragraph.children.map((child: any) => child.text)}
          </p>
        )
      })}
      <Comments key="comments" articleId={articleId} />
      <AddComment key="add-comment" articleId={articleId} />
    </main>
  )
}
