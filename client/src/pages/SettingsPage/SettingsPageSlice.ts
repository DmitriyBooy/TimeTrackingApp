import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TempnameType } from 'types/TempnamesTypes'

interface SettingsPageType {
  tempnames: TempnameType[] | null
}

const initialState: SettingsPageType = {
  tempnames: null
}

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTempnames: (state, { payload }: PayloadAction<TempnameType[]>) => {
      state.tempnames = payload
    },
    deleteTempname: (state, { payload }: PayloadAction<number>) => {
      if (state.tempnames !== null) {
        state.tempnames = state.tempnames.filter(({ id }) => id !== payload)
      }
    },
    addTempname: (state, { payload }: PayloadAction<TempnameType>) => {
      if (state.tempnames !== null) {
        state.tempnames.unshift(payload)
      }
    }
  }
})

export const { setTempnames, deleteTempname, addTempname } = slice.actions

export default slice.reducer
