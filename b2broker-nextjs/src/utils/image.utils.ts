import type { ImageData, ImageSize } from '@/types'
import { STRAPI_URL } from '@/constants'

export const getImageUrl = (image: ImageData, size?: ImageSize) => {
  const imgUrl = size
    ? image.attributes.formats[size].url
    : image.attributes.url
  return `${STRAPI_URL}${imgUrl}`
}
