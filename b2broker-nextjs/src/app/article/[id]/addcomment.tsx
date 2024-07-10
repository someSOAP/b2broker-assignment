'use client'
import React, { FC, useRef } from 'react'

import { addComment } from './actions'
import { useFormStatus } from 'react-dom'

interface IAddCommentProps {
  articleId: number
  onPosted(): void
}

const SubmitButton: FC = () => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      Add Comment
    </button>
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
    <form ref={formRef} action={handleAddComment}>
      <div
        style={{ padding: 30, display: 'flex', flexDirection: 'row', gap: 20 }}
      >
        <input
          required
          type="text"
          name="text"
          style={{ background: 'black', borderColor: 'gray', borderWidth: 1 }}
        />
        <SubmitButton />
      </div>
    </form>
  )
}

export default AddComment
