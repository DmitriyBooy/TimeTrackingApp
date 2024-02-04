import { type FC, type MouseEventHandler, useEffect, useRef, useState } from 'react'
import { type RowType } from 'types/TaskTypes'
import { useAppDispatch } from 'store'

import { type RowPayload } from '../../TaskPageTypes'

import Button from 'components/Button'
import Input from 'components/Input'
import TimeInput from 'components/TimeInput'
import DropdownList, { type DropdownListItemType } from 'components/DropdownList'

import { debounce, type DebouncedFunc } from 'lodash'
import { deleteTaskRowAsync, updateTaskRowAsync } from '../../TaskPageThunks'
import { apiGet } from '../../../../Api'
import { type TempnameType } from '../../../../types/TempnamesTypes'

import styles from './Row.module.css'

type OnUpdateHandler = (key: keyof RowPayload) => (value: string) => void

const Row: FC<RowType> = ({ id, taskId, from, to, title }) => {
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const nameInputRef = useRef<HTMLInputElement>(null)

  const [itemsList, setItemsList] = useState<DropdownListItemType[]>([])

  const onUpdateHandler: OnUpdateHandler = (key) => async (value) => {
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
                onBlur={onUpdateHandler('title')}
                placeholder="Наименование"
                ref={nameInputRef}
            />

            <DropdownList
                isOpen={isOpen}
                onClose={onDropdownClose}
                anchor={nameInputRef}
                onItemClick={onItemClick}
                items={itemsList}
            />

            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                С
                <TimeInput
                    value={from}
                    onBlur={onUpdateHandler('from')}
                />
            </div>

            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                По
                <TimeInput
                    value={to}
                    onBlur={onUpdateHandler('to')}
                />
            </div>

            <Button onClick={onDeleteRow}>Удалить запись</Button>
        </div>
  )
}

export default Row
