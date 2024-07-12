import React, { FC } from 'react'
import type { ImageData } from '@/types'
import { getImageUrl } from '@/utils'

export interface ImageProps {
  imageData: ImageData
}

export const Image: FC<ImageProps> = ({ imageData }) => {
  const imgAlt =
    imageData.attributes.alternativeText ?? imageData.attributes.name

  return (
    <picture>
      <source
        media="(max-width: 640px)"
        srcSet={getImageUrl(imageData, 'small')}
      />
      <source
        media="(max-width: 768px)"
        srcSet={getImageUrl(imageData, 'medium')}
      />
      <img
        className="max-h-[50vh] sm:max-h-[40vh] w-full object-cover mb-6"
        src={getImageUrl(imageData)}
        alt={imgAlt}
      />
    </picture>
  )
}

export default Image
