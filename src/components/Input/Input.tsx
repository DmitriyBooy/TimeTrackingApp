import {FC, ChangeEventHandler, FocusEventHandler, useState} from "react";

import styles from './Input.module.scss'

type InputProps = {
    value: string | null
    onBlur: (value: string) => void
    placeholder?: string
}

const Input: FC<InputProps> = ({ value, onBlur, placeholder }) => {
    const [stateValue, setStateValue] = useState(value || '')

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        setStateValue(event.target.value)
    }

    const onBlurHandler: FocusEventHandler<HTMLInputElement> = (event) => {
        onBlur(event.target.value)
    }

    return (
        <input
            className={styles.input}
            value={stateValue}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            placeholder={placeholder}
        />
    )
}

export default Input
