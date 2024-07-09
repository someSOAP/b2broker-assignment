export interface ImageData {
  id: number
  attributes: ImageAttributes
}

export interface ImageAttributes {
  alternativeText: string | null
  caption: string | null
  createdAt: string
  ext: string
  formats: ImageFormatsMap
  hash: string
  height: number
  mime: string
  name: string
  previewUrl: string | null
  provider: string
  provider_metadata: string | null
  size: number
  updatedAt: string
  url: string
  width: number
}

export type ImageSize = 'small' | 'medium' | 'thumbnail'

export type ImageFormatsMap = Record<ImageSize, ImageFormat>

export interface ImageFormat {
  ext: string
  hash: string
  height: number
  mime: string
  name: string
  size: number
  sizeInBytes: number
  url: string
  width: number
}
