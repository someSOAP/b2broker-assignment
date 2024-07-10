interface NextSSPSearchParams {
  [key: string]: string | string[] | undefined
}

interface NextSSPParams {
  [key: string]: string
}

export interface NextPageProps<Params extends string = string> {
  params: Record<Params, string>
  searchParams?: NextSSPSearchParams
}
