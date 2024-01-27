import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type RowType, type TaskType } from 'types/TaskTypes'

const initialState: { data: TaskType | null } = {
  data: null
}

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setData: (state, { payload }: PayloadAction<TaskType | null>) => {
      state.data = payload
    },
    addRow: (state, { payload }: PayloadAction<RowType>) => {
      state.data?.rows.push(payload)
    },
    updateRow: (state, { payload }: PayloadAction<RowType>) => {
      if (state.data !== null) {
        state.data.rows = state.data.rows.map((row) => {
          if (row.id === payload.id) {
            return payload
          }
          return row
        })
      }
    },
    deleteRow: (state, { payload }: PayloadAction<number>) => {
      if (state.data !== null) {
        state.data.rows = state.data.rows.filter(({ id }) => id !== payload)
      }
    }
  }
})

export const { setData, addRow, updateRow, deleteRow } = slice.actions

export default slice.reducer
