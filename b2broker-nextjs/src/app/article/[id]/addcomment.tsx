'use client'
import React, { FC, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import { Button, Input } from '@/components'

import { addComment } from './actions'

interface IAddCommentProps {
  articleId: number
  onPosted(): void
}

const SubmitButton: FC = () => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      Add Comment
    </Button>
  )
}

const AddComment: FC<IAddCommentProps> = ({ articleId, onPosted }) => {
  const addCommentBind = addComment.bind(null, articleId)
  const formRef = useRef<HTMLFormElement>(null)

  const handleAddComment: typeof addCommentBind = async (...args) => {
    await addCommentBind(...args)
    onPosted()
  }

  return (
    <form
      className="flex flex-row gap-5 py-10"
      ref={formRef}
      action={handleAddComment}
    >
      <Input
        required
        type="text"
        name="text"
        style={{ background: 'black', borderColor: 'gray', borderWidth: 1 }}
      />
      <SubmitButton />
    </form>
  )
}

export default AddComment
