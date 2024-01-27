import { createAsyncThunk } from '@reduxjs/toolkit'
import { type RootState } from '../../store'
import { apiDelete, apiGet, apiPost, apiPut } from '../../Api'
import { type RowType, type TaskType } from '../../types/TaskTypes'
import { addRow, deleteRow, setData, updateRow } from './TaskPageSlice'
import { type UpdateTaskPayload } from './TaskPageTypes'

export const getTaskAsync = createAsyncThunk<void, number, { state: RootState }>(
  'task/getTaskAsync',
  async (id, { dispatch }) => {
    try {
      const { data } = await apiGet<TaskType>(`/task/${id}`)

      dispatch(setData(data))
    } catch (e) {
      console.error(e)
    }
  }
)

export const addTaskRowAsync = createAsyncThunk<void, number, { state: RootState }>(
  'task/addTaskRowAsync',
  async (id, { dispatch }) => {
    try {
      const { data } = await apiPost<RowType>(`/task/${id}/rows`)

      dispatch(addRow(data))
    } catch (e) {
      console.error(e)
    }
  }
)

export const updateTaskRowAsync = createAsyncThunk<void, { id: number, taskId: number, changes: UpdateTaskPayload }, { state: RootState }>(
  'task/updateTaskRowAsync',
  async ({ id, taskId, changes }, { dispatch }) => {
    try {
      const { data } = await apiPut<RowType>(`/task/${taskId}/rows`, { id, changes })

      dispatch(updateRow(data))
    } catch (e) {

    }
  }
)

export const deleteTaskRowAsync = createAsyncThunk<void, { id: number, taskId: number }, { state: RootState }>(
  'task/deleteTaskRowAsync',
  async ({ id, taskId }, { dispatch }) => {
    try {
      const { data } = await apiDelete<number>(`/task/${taskId}/rows`, { id })

      dispatch(deleteRow(data))
    } catch (e) {
      console.error(e)
    }
  }
)
