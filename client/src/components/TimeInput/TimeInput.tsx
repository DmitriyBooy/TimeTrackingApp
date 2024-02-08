import { type ChangeEventHandler, type FC, useState } from 'react'

import styles from './TimeInput.module.scss'

interface TimeInputProps {
  value: string | null
  onBlur: (value: string) => void
  min?: string
}

const TimeInput: FC<TimeInputProps> = ({ value, onBlur, min }) => {
  const [stateValue, setStateValue] = useState(value ?? '')

  const onBlurHandler = (): void => {
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
            min={min}
        />
  )
}

export default TimeInput
