import { CalendarDataItem } from "types/CalendarTypes";
import axios from 'axios'

export default class CalendarService {
    static async getData(): Promise<CalendarDataItem[]> {
        const { data } = await axios.get(`${process.env.REACT_APP_MAIN_URL}/calendar`)
        return data
    }

    static async addTask(): Promise<CalendarDataItem> {
        const { data } = await axios.post(`${process.env.REACT_APP_MAIN_URL}/calendar`)
        return data
    }

    static async deleteTask(taskId: number): Promise<number> {
        const { data } = await axios.delete(`${process.env.REACT_APP_MAIN_URL}/calendar`, { data: { id: taskId } })

        return data
    }
}
