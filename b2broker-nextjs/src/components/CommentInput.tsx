import React, { FC, KeyboardEventHandler, memo, useRef } from 'react'

import { Button, Input } from '@/components'

interface CommentInputProps {
  isLoading: boolean
  onPostComment(text: string): void
}

const CommentInputDummy: FC<CommentInputProps> = ({
  onPostComment,
  isLoading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddComment = async () => {
    console.log('AAAA')
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

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (ev) => {
    if (ev.key !== 'Enter') {
      return
    }
    handleAddComment()
  }

  return (
    <div className="flex flex-row gap-5 py-10">
      <Input ref={inputRef} type="text" name="text" onKeyDown={onKeyDown} />
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        onClick={handleAddComment}
        type="submit"
      >
        Post Comment
      </Button>
    </div>
  )
}

export const CommentInput = memo(CommentInputDummy, (prevProps, nextProps) => {
  return prevProps.isLoading === nextProps.isLoading
})
