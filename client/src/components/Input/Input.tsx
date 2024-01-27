import {FC, ChangeEventHandler, FocusEventHandler, useState, MouseEventHandler, forwardRef} from "react";

import styles from './Input.module.scss'

type InputProps = {
    value: string | null
    onBlur: (value: string) => void
    placeholder?: string
    onClick?: MouseEventHandler<HTMLInputElement>
    onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ value, onBlur, onClick, placeholder, onChange }, ref) => {
        const [stateValue, setStateValue] = useState(value || '')

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        onChange?.(event)
        setStateValue(event.target.value)
    }

    const onBlurHandler: FocusEventHandler<HTMLInputElement> = (event) => {
        if (event.target.value !== value) {
            onBlur(event.target.value)
        }
    }

    return (
        <input
            ref={ref}
            className={styles.input}
            value={stateValue}
            onChange={onChangeHandler}
            onClick={onClick}
            onBlur={onBlurHandler}
            placeholder={placeholder}
        />
    )
})

export default Input
