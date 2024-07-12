import Link from 'next/link'

import { NotFound } from '@/components'

export default function ArticleNotFound() {
  return (
    <NotFound
      title="404 - Article is not found "
      caption="It was deleted or was not created"
    />
  )
}
