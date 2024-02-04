import { createSlice } from '@reduxjs/toolkit'
import { type TempnameType } from './SettingsPageTypes'

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
    setTempnames: (state, { payload }) => {
      state.tempnames = payload
    }
  }
})

export const { setTempnames } = slice.actions

export default slice.reducer
