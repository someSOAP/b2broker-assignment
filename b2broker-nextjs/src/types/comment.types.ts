import { StrapiEntity } from './strapi.types'

export type CommentType = StrapiEntity<CommentAttributes>

interface CommentAttributes {
  text: string
}
