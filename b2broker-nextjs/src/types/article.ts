export interface Article {
  id: 1
  attributes: {
    title: 'First Article'
    body: ArticleBodyParagraph[]
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

interface ArticleBodyParagraph {
  type: 'paragraph'
  children: ArticleBodyParagraphChild[]
}

interface ArticleBodyParagraphChild {
  type: 'text'
  text: string
}
