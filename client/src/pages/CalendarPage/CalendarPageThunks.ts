import {createAsyncThunk} from "@reduxjs/toolkit";
import CalendarService from "../../services/CalendarService";
import {addCard, setData, deleteCard} from "./CalendarPageSlice";

export const fetchCalendarData = createAsyncThunk(
    'calendar',
    async (_, { dispatch }) => {
        try {
            const data = await CalendarService.getData()

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
            const newTask = await CalendarService.addTask()

            dispatch(addCard(newTask))
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
            const deletedId = await CalendarService.deleteTask(id)

            dispatch(deleteCard(deletedId))
        } catch (e) {
            console.error(e)
        }
    }
)
