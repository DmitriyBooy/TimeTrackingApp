import { createAsyncThunk } from '@reduxjs/toolkit'
import { type RootState } from '../../../../store'
import { apiDelete, apiGet } from '../../../../Api'

import { setTempnames } from '../../SettingsPageSlice'

export const getTempnamesAsync = createAsyncThunk<
void,
void,
{ state: RootState }
>(
  'settings/getTempnamesAsync',
  async (_, { dispatch }) => {
    try {
      const { data } = await apiGet<string[]>('/tempnames')

      dispatch(setTempnames(data))
    } catch (e) {
      console.error(e)
    }
  }
)

export const deleteTempnameAsync = createAsyncThunk<
void,
number,
{ state: RootState }
>(
  'settings/deleteTempnameAsync',
  async (id, { dispatch }) => {
    try {
      await apiDelete('/tempnames', { id })

      console.log('УДАЛЯЕМ В СТОРЕ')
    } catch (e) {
      console.error(e)
    }
  }
)
