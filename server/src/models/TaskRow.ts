export interface TaskRow {
    id: number
    taskId: number
    from: string | null
    to: string | null
    title: string
}

export type TaskRowChangesPayload = {
    [K in keyof TaskRow]?: TaskRow[K]
}
