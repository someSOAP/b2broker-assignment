import { getOneArticle } from '@/server-api'
import { getImageUrl } from '@/utils'

import Comments from './comments'
import { NextPageProps } from '@/types'
import { FC } from 'react'

const fetchArticle = async (id: number) => {
  const res = await getOneArticle(id)
  return res.data.data
}

type ArticlePageProps = NextPageProps<'id' | 'wow'>

const ArticlePage: FC<ArticlePageProps> = async (props) => {
  const articleId = Number(props.params.id)
  const article = await fetchArticle(articleId)
  const { title, image, body } = article.attributes

  return (
    <div id="scroll-layout" className="overflow-scroll">
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

export default ArticlePage
