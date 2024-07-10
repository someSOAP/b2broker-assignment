import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import clsx from 'clsx'

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        'middle none center rounded-lg',
        'bg-blue-500 py-3 px-6',
        'font-sans text-xs font-bold uppercase text-white',
        'shadow-md shadow-blue-500/20 transition-all',
        'hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85]',
        'focus:shadow-none active:opacity-[0.85] active:shadow-none',
        'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
        className,
      )}
    />
  )
}

export default Button
