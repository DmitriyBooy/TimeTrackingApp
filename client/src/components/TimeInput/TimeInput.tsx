import {ChangeEventHandler, FC, useState} from "react";

import styles from './TimeInput.module.scss'

type TimeInputProps = {
    value: string | null
    onBlur: (value: string) => void
}

const TimeInput: FC<TimeInputProps> = ({ value, onBlur }) => {
    const [stateValue, setStateValue] = useState(value || '')

    const onBlurHandler = () => {
        onBlur(stateValue)
    }

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value

        setStateValue(value)
    }

    return (
        <input
            type="time"
            className={styles.input}
            value={stateValue}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
        />
    )
}

export default TimeInput
