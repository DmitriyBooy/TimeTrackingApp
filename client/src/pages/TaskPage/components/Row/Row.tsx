import { type FC, type MouseEventHandler, useEffect, useRef, useState } from 'react'
import { type RowType } from 'types/TaskTypes'
import { useAppDispatch } from 'store'

import { type RowPayload } from '../../TaskPageTypes'

import Button from 'components/Button'
import Input from 'components/Input'
import TimeInput from 'components/TimeInput'
import DropdownList, { type DropdownListItemType } from 'components/DropdownList'

import { debounce } from 'lodash'
import { deleteTaskRowAsync, updateTaskRowAsync } from '../../TaskPageThunks'

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

  const onNameInputClick: MouseEventHandler<HTMLInputElement> = debounce(() => {
    setIsOpen(true)
  }, 700)

  const onItemClick = ({ label }: DropdownListItemType): void => {
    onUpdateHandler('title')(label)
  }

  useEffect(() => {
    setItemsList([])
  }, [taskId])

  return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <Input
                value={title}
                onClick={onNameInputClick}
                onChange={() => { setIsOpen(false) }}
                onBlur={onUpdateHandler('title')}
                placeholder="Наименование"
                ref={nameInputRef}
            />

            <DropdownList
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
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
