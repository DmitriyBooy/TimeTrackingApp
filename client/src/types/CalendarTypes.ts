export type RowType = {
    id: number
    title: string | null
    from: string | null
    to: string | null
}

export type CalendarDataItem = {
    date: string
    rowsCount: number
    time: string
    id: number
}
