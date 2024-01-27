import {FC, MouseEventHandler, useEffect, useRef, useState} from 'react'
import { RowType } from 'types/TaskTypes'
import {useAppDispatch} from 'store';

import { RowPayload } from '../../TaskPageTypes'

import { updateRow, deleteRow } from '../../TaskPageSlice'
import { TaskService } from 'services/TaskService';

import Button from 'components/Button';
import Input from 'components/Input';
import TimeInput from 'components/TimeInput'
import DropdownList, {DropdownListItemType} from 'components/DropdownList'

import { debounce } from 'lodash'

type OnUpdateHandler = (key: keyof RowPayload) => (value: string) => void

const Row: FC<RowType> = ({ id, taskId, from, to, title }) => {
    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const nameInputRef = useRef<HTMLInputElement>(null)

    const [itemsList, setItemsList] = useState<DropdownListItemType[]>([])

    const onUpdateHandler: OnUpdateHandler = (key) => async (value) => {
        const updatedRow = await TaskService.updateTaskRow({
            rowId: id,
            changes: {[key]: value},
        }, taskId)

        if (updatedRow) {
            dispatch(updateRow(updatedRow))
        }
    }

    const onDeleteRow = async () => {
        const targetId = await TaskService.deleteRow(id, taskId)

        if (targetId) {
            dispatch(deleteRow(targetId))
        }
    }

    const onNameInputClick: MouseEventHandler<HTMLInputElement> = debounce(() => {
        setIsOpen(true)
    }, 700)

    const onItemClick = ({ label }: DropdownListItemType) => {
        onUpdateHandler('title')(label)
    }

    useEffect(() => {
        TaskService.getTempnamesNames().then((data) => {
            setItemsList(data.map((key, index) => ({
                label: key,
                id: index,
            })))
        })
    }, [taskId])

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <Input
                value={title}
                onClick={onNameInputClick}
                onChange={() => setIsOpen(false)}
                onBlur={onUpdateHandler('title')}
                placeholder="Наименование"
                ref={nameInputRef}
            />

            <DropdownList
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
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
