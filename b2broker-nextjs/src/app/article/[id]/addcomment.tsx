'use client'
import React, { FC, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import { Button, Input } from '@/components'

import { addComment } from './actions'

interface IAddCommentProps {
  articleId: number
  onPosted(text: string): void
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

  const handleAddComment: typeof addCommentBind = async (formData) => {
    await addCommentBind(formData)

    const text = formData.get('text')

    formRef.current?.reset()

    if (typeof text !== 'string') {
      console.error('TEXT IF EMPTY')
      return
    }
    onPosted(text)
  }

  return (
    <form
      className="flex flex-row gap-5 py-10"
      ref={formRef}
      action={handleAddComment}
    >
      <Input required type="text" name="text" />
      <SubmitButton />
    </form>
  )
}

export default AddComment
