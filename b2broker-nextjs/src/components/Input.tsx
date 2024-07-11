import React, { DetailedHTMLProps, FC } from 'react'
import clsx from 'clsx'

export type InputProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        'bg-gray-100 border-gray-300 border-2',
        'text-gray-900 text-sm rounded-lg',
        'w-full p-2.5',
        className,
      )}
    />
  )
}

export default Input
