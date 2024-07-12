import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import clsx from 'clsx'

import { Spinner } from './Spinner'

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  isLoading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        'middle none center rounded-lg',
        'bg-green-500 py-3 px-6',
        'font-sans text-xs font-bold uppercase text-white',
        'shadow-md shadow-blue-500/20 transition-all',
        'hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85]',
        'focus:shadow-none active:opacity-[0.85] active:shadow-none',
        'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
        'relative',
        className,
      )}
    >
      <div className={clsx(isLoading && 'invisible')}>{children}</div>
      {isLoading && (
        <div className="h-full w-full absolute top-0 left-0 place-items-center grid">
          <Spinner />
        </div>
      )}
    </button>
  )
}
