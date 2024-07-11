import type { StrapiEntity, StrapiPopulatedProp } from './strapi.types'
import type { ImageData } from './image.types'
import type { CommentType } from './comment.types'

export type ArticleType = StrapiEntity<ArticleAttributes>

interface ArticleAttributes {
  title: string
  body: ArticleBodyParagraph[]
  image?: StrapiPopulatedProp<ImageData>
  comments?: StrapiPopulatedProp<CommentType[]>
}

interface ArticleBodyParagraph {
  type: 'paragraph'
  children: ArticleBodyParagraphChild[]
}

interface ArticleBodyParagraphChild {
  type: 'text'
  text: string
}
