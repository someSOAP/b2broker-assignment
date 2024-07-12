import React, { FC } from 'react'
import type { ImageData, ImageSize } from '@/types'
import { getImageUrl } from '@/utils'
import clsx from 'clsx'

export interface ImageProps {
  imageData: ImageData
  maxSize?: ImageSize
  className?: string
}

export const Image: FC<ImageProps> = ({ imageData, maxSize, className }) => {
  const imgAlt =
    imageData.attributes.alternativeText ?? imageData.attributes.name

  return (
    <picture>
      <source
        media="(max-width: 640px)"
        srcSet={getImageUrl(imageData, 'small')}
      />
      <source
        media="(max-width: 1280px)"
        srcSet={getImageUrl(imageData, 'medium')}
      />
      <img
        loading="lazy"
        className={clsx(
          className,
          'bg-gradient-to-r from-gray-400 to-gray-200',
        )}
        src={getImageUrl(imageData, maxSize)}
        alt={imgAlt}
      />
    </picture>
  )
}

export default Image
