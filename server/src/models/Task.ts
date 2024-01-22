import { TaskRow } from './TaskRow'

export interface Task {
    id: number
    date: Date
    totalTime: string
    rows: TaskRow[]
}
