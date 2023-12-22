export type TaskType = {
    id: number
    date: string
    totalTime: string
    rows: RowType[]
}

export type RowType = {
    id: number
    taskId: number
    from: string | null
    to: string | null
    title: string
}
