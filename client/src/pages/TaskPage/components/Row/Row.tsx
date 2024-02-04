import { type ChangeEventHandler, type FC, type MouseEventHandler, useEffect, useRef, useState } from 'react'
import { type RowType } from 'types/TaskTypes'
import { useAppDispatch } from 'store'

import Button from 'components/Button'
import Input from 'components/Input'
import TimeInput from 'components/TimeInput'
import DropdownList, { type DropdownListItemType } from 'components/DropdownList'

import { debounce, type DebouncedFunc } from 'lodash'
import { deleteTaskRowAsync, updateTaskRowAsync } from '../../TaskPageThunks'
import { apiGet } from '../../../../Api'
import { type TempnameType } from '../../../../types/TempnamesTypes'

import styles from './Row.module.scss'
import { type RowPayload } from '../../TaskPageTypes'

const Row: FC<RowType> = ({ id, taskId, from, to, title }) => {
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const nameInputRef = useRef<HTMLInputElement>(null)

  const [itemsList, setItemsList] = useState<DropdownListItemType[]>([])

  const onUpdateInputHandler = (key: keyof RowPayload): ChangeEventHandler<HTMLInputElement> => (event) => {
    dispatch(updateTaskRowAsync({ taskId, id, changes: { [key]: event.target.value } }))
  }

  const onTimeUpdate = (key: keyof RowPayload) => (value: string) => {
    dispatch(updateTaskRowAsync({ taskId, id, changes: { [key]: value } }))
  }

  const onDeleteRow = (): void => {
    dispatch(deleteTaskRowAsync({ id, taskId }))
  }

  const onNameInputClick: DebouncedFunc<MouseEventHandler<HTMLInputElement>> = debounce(() => {
    apiGet<TempnameType[]>('/tempnames')
      .then(({ data }) => {
        setItemsList(data.map(({ name, id }) => ({
          id,
          label: name
        })))
      })
      .finally(() => {
        setIsOpen(true)
      })
  }, 700)

  const onItemClick = ({ label }: DropdownListItemType): void => {
    dispatch(updateTaskRowAsync({ taskId, id, changes: { title: label } }))
  }

  useEffect(() => {
    setItemsList([])
  }, [taskId])

  const onDropdownClose = (): void => {
    onNameInputClick.cancel()
    setIsOpen(false)
  }

  return (
        <div className={styles.row}>
            <Input
                value={title}
                onClick={onNameInputClick}
                onChange={onDropdownClose}
                onBlur={onUpdateInputHandler('title')}
                placeholder="Наименование"
                ref={nameInputRef}
                className={styles.nameInput}
            />

            <DropdownList
                isOpen={isOpen}
                onClose={onDropdownClose}
                anchor={nameInputRef}
                onItemClick={onItemClick}
                items={itemsList}
            />

            <div className={styles.timeInput}>
                С
                <TimeInput
                    value={from}
                    onBlur={onTimeUpdate('from')}
                />
            </div>

            <div className={styles.timeInput}>
                По
                <TimeInput
                    value={to}
                    onBlur={onTimeUpdate('to')}
                />
            </div>

            <Button onClick={onDeleteRow}>Удалить запись</Button>
        </div>
  )
}

export default Row
