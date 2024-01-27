import { createAsyncThunk } from '@reduxjs/toolkit'
import { addCard, setData, deleteCard } from './CalendarPageSlice'
import { apiDelete, apiGet, apiPost } from 'Api'
import { type CalendarDataItem } from '../../types/CalendarTypes'

export const fetchCalendarData = createAsyncThunk(
  'calendar',
  async (_, { dispatch }) => {
    try {
      const { data } = await apiGet<CalendarDataItem[]>('/calendar')

      dispatch(setData(data))
    } catch (e) {
      console.error(e)
    }
  }
)

export const addTaskAsync = createAsyncThunk(
  'calendar/addTaskAsync',
  async (_, { dispatch }) => {
    try {
      const { data } = await apiPost<CalendarDataItem>('/calendar')

      dispatch(addCard(data))
    } catch (e) {
      console.error(e)
    }
  }
)

export const deleteTaskAsync = createAsyncThunk<
void,
number,
{
  state: any
}
>(
  'calendar/deleteTaskAsync',
  async (id, { dispatch }) => {
    try {
      const { data } = await apiDelete<number>('/calendar', { id })

      dispatch(deleteCard(data))
    } catch (e) {
      console.error(e)
    }
  }
)
