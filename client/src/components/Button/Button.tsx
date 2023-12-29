import {MouseEventHandler, ReactNode, forwardRef} from "react";

import styles from './Button.module.scss'

type ButtonProps = {
    children: ReactNode
    className?: string
    onClick: MouseEventHandler<HTMLButtonElement>
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
                                                               children,
                                                               onClick,
                                                               className,
                                                           }, ref) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${className}`}
            ref={ref}
        >
            <div className={styles.prevContent}>
                {children}
            </div>

            <div className={styles.content}>
                {children}
            </div>
        </button>
    )
})

export default Button
