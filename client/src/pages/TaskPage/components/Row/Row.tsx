import { type ChangeEventHandler, type FC, useRef, useState } from 'react'
import { type RowType } from 'types/TaskTypes'
import { useAppDispatch } from 'store'

import { Button, TimePicker, type TimePickerProps } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Input from 'components/Input'

import dayjs from 'dayjs'

import { deleteTaskRowAsync, updateTaskRowAsync } from '../../TaskPageThunks'
import styles from './Row.module.scss'
import { type RowPayload } from '../../TaskPageTypes'

const Row: FC<RowType> = ({ id, taskId, from, to, title }) => {
  const dispatch = useAppDispatch()

  const [status, setStatus] = useState<TimePickerProps['status']>('')

  const nameInputRef = useRef<HTMLInputElement>(null)

  const onUpdateInputHandler = (key: keyof RowPayload): ChangeEventHandler<HTMLInputElement> => (event) => {
    dispatch(updateTaskRowAsync({ taskId, id, changes: { [key]: event.target.value } }))
  }

  const onDeleteRow = (): void => {
    dispatch(deleteTaskRowAsync({ id, taskId }))
  }

  const onFromChange: TimePickerProps['onChange'] = (time) => {
    if (time === null) {
      dispatch(updateTaskRowAsync({ taskId, id, changes: { from: null } }))
      return
    }

    if (time?.isValid()) {
      dispatch(updateTaskRowAsync({ taskId, id, changes: { from: dayjs(time).format('HH:mm') } }))
    }
    setStatus('')
  }

  const onToChange: TimePickerProps['onChange'] = (time) => {
    if (time === null) {
      dispatch(updateTaskRowAsync({ taskId, id, changes: { to: null } }))
      return
    }

    if (time?.isValid()) {
      const fromTest = dayjs(from)

      if (time.isAfter(fromTest)) {
        dispatch(updateTaskRowAsync({ taskId, id, changes: { to: dayjs(time).format('HH:mm') } }))
      } else {
        setStatus('error')
      }
    }
  }

  return (
        <div className={styles.row}>
            <Input
                value={title}
                onBlur={onUpdateInputHandler('title')}
                placeholder="Наименование"
                ref={nameInputRef}
                className={styles.nameInput}
            />

          <TimePicker
              defaultValue={from ? dayjs(from, 'HH:mm') : null}
              placeholder='С'
              format="HH:mm"
              onChange={onFromChange}
              className={styles.timeInput}
          />

          <TimePicker
              defaultValue={to ? dayjs(to, 'HH:mm') : null}
              placeholder='По'
              format="HH:mm"
              onChange={onToChange}
              status={status}
              className={styles.timeInput}
          />

          <Button
              onClick={onDeleteRow}
              type='primary'
              danger
              icon={<CloseOutlined />}
          >
            Удалить запись
          </Button>
        </div>
  )
}

export default Row
