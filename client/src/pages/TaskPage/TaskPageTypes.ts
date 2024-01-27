import { type RowType } from 'types/TaskTypes'

export type RowPayload = Pick<RowType, 'from' | 'to' | 'title'>

export type UpdateTaskPayload = {
  [K in keyof RowPayload]?: RowPayload[K]
}
