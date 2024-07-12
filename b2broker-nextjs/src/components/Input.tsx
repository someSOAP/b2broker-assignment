import React, {
  DetailedHTMLProps,
  FC,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import clsx from 'clsx'

export type InputProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const InputRenderFunction: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
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

export const Input = forwardRef(InputRenderFunction)
