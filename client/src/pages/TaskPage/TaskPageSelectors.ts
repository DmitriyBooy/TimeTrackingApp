import { type RootState } from 'store'
import { type TaskType } from '../../types/TaskTypes'

export const selectTaskData = (state: RootState): TaskType | null => state.task.data
