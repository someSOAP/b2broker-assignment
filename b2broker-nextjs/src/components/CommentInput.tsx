import React, { FC, useRef } from 'react'

import { Button, Input } from '@/components'

interface CommentInputProps {
  isDisabled: boolean
  onPostComment(text: string): void
}

export const CommentInput: FC<CommentInputProps> = ({
  onPostComment,
  isDisabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddComment = async () => {
    const input = inputRef.current
    if (!input) {
      return
    }
    const text = inputRef.current?.value.trim()

    if (!text) {
      return
    }

    input.value = ''

    onPostComment(text)
  }

  return (
    <div className="flex flex-row gap-5 py-10">
      <Input ref={inputRef} type="text" name="text" />
      <Button onClick={handleAddComment} type="submit" disabled={isDisabled}>
        Post Comment
      </Button>
    </div>
  )
}

export default CommentInput
