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
      Post Comment
    </Button>
  )
}

const AddComment: FC<IAddCommentProps> = ({ articleId, onPosted }) => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleAddComment = async (formData: FormData) => {
    const text = formData.get('text')

    formRef.current?.reset()

    if (typeof text !== 'string') {
      return
    }

    const trimmedText = text.trim()
    if (!trimmedText) {
      return
    }

    await addComment(articleId, formData)
    onPosted()
  }

  return (
    <form
      className="flex flex-row gap-5 py-10"
      ref={formRef}
      action={handleAddComment}
    >
      <Input type="text" name="text" />
      <SubmitButton />
    </form>
  )
}

export default AddComment
