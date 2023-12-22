import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { KalendarDataItem } from '../../types/KalendarTypes'

const initialState: { data: KalendarDataItem[] } = {
    data: []
}

const slice = createSlice({
    name: 'kalendar',
    initialState,
    reducers: {
        setData: (state, { payload }: PayloadAction<KalendarDataItem[]>) => {
          state.data = payload
        },
        addCard: (state, { payload }: PayloadAction<KalendarDataItem>) => {
            state.data.push(payload)
        },
        deleteCard: (state, { payload }: PayloadAction<number>) => {
            state.data = state.data.filter(({ id }) => id !== payload)
        }
    }
})

export const { setData, addCard, deleteCard } = slice.actions

export default slice.reducer
