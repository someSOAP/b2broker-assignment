import React, { FC, KeyboardEventHandler, memo, useRef } from 'react'

import { Button, Input } from '@/components'

interface CommentInputProps {
  isDisabled: boolean
  onPostComment(text: string): void
}

const CommentInputDummy: FC<CommentInputProps> = ({
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

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (ev) => {
    if (ev.key !== 'Enter') {
      return
    }
    handleAddComment()
  }

  return (
    <div className="flex flex-row gap-5 py-10">
      <Input ref={inputRef} type="text" name="text" onKeyDown={onKeyDown} />
      <Button onClick={handleAddComment} type="submit" disabled={isDisabled}>
        Post Comment
      </Button>
    </div>
  )
}

export const CommentInput = memo(CommentInputDummy, (prevProps, nextProps) => {
  return prevProps.isDisabled === nextProps.isDisabled
})

export default CommentInput
