import { ImageData, ImageSize } from '@/types'
import { STRAPI_API_URL, STRAPI_URL } from '@/constants'

export const getImageUrl = (image: ImageData, size?: ImageSize) => {
  console.log(image)
  if (!size) {
    return `${STRAPI_URL}${image.attributes.url}`
  }

  return image.attributes.formats[size].url
}
