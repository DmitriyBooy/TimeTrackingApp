import { type FC, useState } from 'react'
import styles from './TimeInput.module.scss'

import { NumberFormatBase, type PatternFormatProps } from 'react-number-format'

const formatZeros = (value: string): string =>
  value.length === 1 ? `0${value}` : value

const validateValueByLimit = (value: string, max: string): string => {
  if (value.length === 1 && value[0] > max[0]) {
    return `0${value}`
  }

  if (value.length === 2 && value > max) {
    return max
  }

  return value
}

const TestTimeInput: FC = () => {
  const [stateValue, setStateValue] = useState('')

  const format = (value: string): string => {
    if (!value) {
      return ''
    }

    let [hours, minutes] = value.split(':')

    hours = hours?.substring(0, 2) || '00'
    minutes = minutes?.substring(0, 2) || '00'

    const resultHours = validateValueByLimit(hours, '23')
    const resultMinutes = validateValueByLimit(minutes, '59')

    return (resultHours ?? '00') + ':' + (resultMinutes.length ? resultMinutes : '00')
  }

  const onBlurHandler: PatternFormatProps['onBlur'] = (event) => {
    const { target: { value } } = event

    if (!value?.length) {
      setStateValue('')
      return
    }

    let [hours, minutes] = value.split(':')

    hours = formatZeros(hours)
    minutes = formatZeros(minutes)

    const result = [hours, minutes].join(':')

    setStateValue(result)
  }

  return (
      <div className={styles.container}>
        <NumberFormatBase
            format={format}
            removeFormatting={(value: string) => value.replace(/\s+/gi, '')}
            getCaretBoundary={() => [true, true, false, true, true, true]}
            onBlur={onBlurHandler}
            value={stateValue}
        />

        <span className={styles.icon}>
          &#128339;
        </span>
      </div>
  )
}

export default TestTimeInput
