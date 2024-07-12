import React, { FC } from 'react'
import clsx from 'clsx'

interface SpinnerProps {
  color?: 'light' | 'dark'
  className?: string
}

export const Spinner: FC<SpinnerProps> = ({ className, color = 'light' }) => {
  return (
    <div
      className={clsx(
        'block size-5 m-2 rounded-full border-2 border-t-transparent border-solid animate-spin',
        color === 'light' ? 'border-white' : 'border-gray-900',
        className,
      )}
    />
  )
}
