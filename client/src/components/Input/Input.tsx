import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type InputHTMLAttributes,
  useState,
  forwardRef,
  useEffect
} from 'react'

import styles from './Input.module.scss'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ value, onBlur, onClick, placeholder, onChange }, ref) => {
  const [stateValue, setStateValue] = useState(value ?? '')

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event)
    setStateValue(event.target.value)
  }

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = (event) => {
    if (onBlur && event.target.value !== value) {
      onBlur(event)
    }
  }

  useEffect(() => {
    setStateValue(value ?? '')
  }, [value])

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
