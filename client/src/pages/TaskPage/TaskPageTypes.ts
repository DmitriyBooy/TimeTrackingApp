import { RowType } from 'types/TaskTypes'

export type RowPayload = Pick<RowType, 'from'|'to'|'title'>

export type UpdateTaskPayload = {
    rowId: number,
    changes: {[K in keyof RowPayload]?: RowPayload[K]}
}
