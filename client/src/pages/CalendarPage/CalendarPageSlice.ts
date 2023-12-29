import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { CalendarDataItem } from 'types/CalendarTypes'

const initialState: { data: CalendarDataItem[] } = {
    data: []
}

const slice = createSlice({
    name: 'kalendar',
    initialState,
    reducers: {
        setData: (state, { payload }: PayloadAction<CalendarDataItem[]>) => {
          state.data = payload
        },
        addCard: (state, { payload }: PayloadAction<CalendarDataItem>) => {
            state.data.push(payload)
        },
        deleteCard: (state, { payload }: PayloadAction<number>) => {
            state.data = state.data.filter(({ id }) => id !== payload)
        }
    }
})

export const { setData, addCard, deleteCard } = slice.actions

export default slice.reducer
