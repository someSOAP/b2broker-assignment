import { StrapiEntity } from './strapi.types'

export type Comment = StrapiEntity<CommentAttributes>

interface CommentAttributes {
  text: string
}
