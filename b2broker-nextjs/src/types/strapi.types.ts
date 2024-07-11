export interface StrapiEntity<Attributes extends object> {
  id: number
  attributes: Attributes
  createdAt: string
  publishedAt: string
  updatedAt: string
}

interface StrapiPaginationMeta {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

interface StrapiResponseMeta {
  pagination?: StrapiPaginationMeta
}

export interface StrapiPopulatedProp<Prop> {
  data: Prop
}

export interface StrapiResponse<
  Data extends StrapiEntity<object> | StrapiEntity<object>[],
> {
  data: Data
  meta: StrapiResponseMeta
}
