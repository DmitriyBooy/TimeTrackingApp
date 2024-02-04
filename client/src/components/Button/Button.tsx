import { type MouseEventHandler, type ReactNode, forwardRef, type ButtonHTMLAttributes } from 'react'

import styles from './Button.module.scss'

interface ButtonProps {
  children: ReactNode
  className?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps>(({
  children,
  onClick,
  className,
  ...otherProps
}, ref) => {
  return (
        <button
            onClick={onClick}
            className={`${styles.button} ${className}`}
            ref={ref}
            {...otherProps}
        >
             <div className={styles.content}>
                {children}
             </div>
        </button>
  )
})

export default Button
