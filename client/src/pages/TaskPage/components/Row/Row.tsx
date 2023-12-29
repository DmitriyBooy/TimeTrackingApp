import {FC} from 'react'
import { RowType } from 'types/TaskTypes'
import {useAppDispatch} from 'store';

import { RowPayload } from '../../TaskPageTypes'

import { updateRow, deleteRow } from '../../TaskPageSlice'
import { TaskService } from 'services/TaskService';

import Button from 'components/Button';
import Input from 'components/Input';
import TimeInput from 'components/TimeInput'

type OnUpdateHandler = (key: keyof RowPayload) => (value: string) => void

const Row: FC<RowType> = ({ id, taskId, from, to, title }) => {
    const dispatch = useAppDispatch()

    const onUpdateHandler: OnUpdateHandler = (key) => (value) => {
        const updatedRow = TaskService.updateTaskRow({
            rowId: id,
            changes: {[key]: value},
        }, taskId)

        if (updatedRow) {
            dispatch(updateRow(updatedRow))
        }
    }

    const onDeleteRow = () => {
        const targetId = TaskService.deleteRow(id, taskId)

        if (targetId) {
            dispatch(deleteRow(targetId))
        }
    }

    return <div style={{ display: 'flex', gap: '20px' }}>
        <Input
            value={title}
            onBlur={onUpdateHandler('title')}
            placeholder="Наименование"
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
}

export default Row
