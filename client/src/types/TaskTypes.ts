export interface TaskType {
  id: number
  date: string
  totalTime: string
  rows: RowType[]
}

export interface RowType {
  id: number
  taskId: number
  from: string | null
  to: string | null
  title: string
}
