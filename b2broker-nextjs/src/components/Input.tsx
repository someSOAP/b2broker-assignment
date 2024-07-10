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
        'w-full rounded-[7px]',
        'border border-blue-gray-200 outline outline-0',
        'bg-transparent px-3 py-2.5',
        'font-sans text-sm font-normal text-blue-gray-700',
        'transition-all',
        'placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200',
        'focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0',
        'disabled:border-0 disabled:bg-blue-gray-50',
        className,
      )}
    />
  )
}

export default Input
