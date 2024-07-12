import React, { FC } from 'react'
import clsx from 'clsx'

import type { ButtonProps } from './Button'

export const ButtonFull: FC<ButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <button className="relative w-full py-4 grid place-items-center" {...props}>
      <div
        className={clsx(
          isLoading && 'animate-pulse',
          'bg-green-500  absolute w-full h-full top-0',
        )}
      />
      <div className="z-10 text-white uppercase font-medium">{children}</div>
    </button>
  )
}
