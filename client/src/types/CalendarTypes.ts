export interface RowType {
  id: number
  title: string | null
  from: string | null
  to: string | null
}

export interface CalendarDataItem {
  date: string
  rowsCount: number
  time: string
  id: number
}
