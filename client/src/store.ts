import { configureStore } from '@reduxjs/toolkit'

import calendar from 'pages/CalendarPage/CalendarPageSlice'
import task from './pages/TaskPage/TaskPageSlice'
import settings from './pages/SettingsPage/SettingsPageSlice'
import { useDispatch } from 'react-redux'

const rootState = configureStore({
  reducer: {
    calendar,
    task,
    settings
  }
})

export default rootState

export type RootState = ReturnType<typeof rootState.getState>

export type AppDispatch = typeof rootState.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
