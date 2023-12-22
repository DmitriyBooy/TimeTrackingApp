import { configureStore } from '@reduxjs/toolkit'

import kalendar from './pages/KalendarPage/KalendarPageSlice'
import task from './pages/TaskPage/TaskPageSlice'
import {useDispatch} from "react-redux";

const rootState = configureStore({
    reducer: {
        kalendar,
        task,
    }
})

export default rootState

export type RootState = ReturnType<typeof rootState.getState>

export type AppDispatch = typeof rootState.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
