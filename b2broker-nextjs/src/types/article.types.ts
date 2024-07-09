import { StrapiEntity } from './strapi.types'
import { ImageData } from './image.types'

export type ArticleType = StrapiEntity<ArticleAttributes>

interface ArticleAttributes {
  title: string
  body: ArticleBodyParagraph[]
  image?: {
    data: ImageData
  }
}

interface ArticleBodyParagraph {
  type: 'paragraph'
  children: ArticleBodyParagraphChild[]
}

interface ArticleBodyParagraphChild {
  type: 'text'
  text: string
}
