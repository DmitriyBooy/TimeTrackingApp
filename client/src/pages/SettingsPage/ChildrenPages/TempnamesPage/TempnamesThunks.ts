import { createAsyncThunk } from '@reduxjs/toolkit'
import { type RootState } from '../../../../store'
import { apiDelete, apiGet, apiPost, apiPut } from '../../../../Api'

import { type TempnameType } from 'types/TempnamesTypes'

import { setTempnames, deleteTempname, addTempname } from '../../SettingsPageSlice'

export const getTempnamesAsync = createAsyncThunk<
void,
void,
{ state: RootState }
>(
  'settings/getTempnamesAsync',
  async (_, { dispatch }) => {
    try {
      const { data } = await apiGet<TempnameType[]>('/tempnames')

      dispatch(setTempnames(data))
    } catch (e) {
      console.error(e)
    }
  }
)

export const addTempnateAsync = createAsyncThunk<
void,
string,
{ state: RootState }
>(
  'settings/addTempnateAsync',
  async (name, { dispatch }) => {
    try {
      const { data } = await apiPost<TempnameType>('/tempnames', { name })

      dispatch(addTempname(data))
    } catch (e) {
      console.error(e)
    }
  }
)

export const updateTempnameAsync = createAsyncThunk<
void,
TempnameType,
{ state: RootState }
>(
  'settings/updateTempnameAsync',
  async (tempname, { dispatch }) => {
    try {
      const { data } = await apiPut<TempnameType>('/tempnames', tempname)

      console.log(data)
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
      const { data } = await apiDelete<number>('/tempnames', { id })

      dispatch(deleteTempname(data))
    } catch (e) {
      console.error(e)
    }
  }
)
