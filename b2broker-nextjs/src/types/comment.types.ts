import { StrapiEntity } from './strapi.types'

type CommentType = StrapiEntity<CommentAttributes>

interface CommentAttributes {
  text: string
}
