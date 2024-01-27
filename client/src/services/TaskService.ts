import {RowType, TaskType} from '../types/TaskTypes'
import {UpdateTaskPayload} from "../pages/TaskPage/TaskPageTypes";
import axios from "axios";

export class TaskService {
    static getTasksData(): TaskType[] {
        const rawData = localStorage.getItem('task-data')

        if (rawData) {
            return JSON.parse(rawData) as TaskType[]
        }

        return []
    }

    static async getTask(id: number): Promise<TaskType | any> {
        const { data } = await axios.get(`${process.env.REACT_APP_MAIN_URL}/task/${id}`)

        return data
    }

    static async addRow(id: number): Promise<void | RowType> {
        const { data } = await axios.post(`${process.env.REACT_APP_MAIN_URL}/task/${id}/rows`, { id })

        return data
    }

    static async updateTaskRow({ changes, rowId }: UpdateTaskPayload, taskId: number): Promise<RowType | void> {
        const { data } = await axios.put(`${process.env.REACT_APP_MAIN_URL}/task/${taskId}/rows/${rowId}`, changes)

        return data
    }

    static async deleteRow(id: number, taskId: number): Promise<number | void> {
        const { data } = await axios.delete(`${process.env.REACT_APP_MAIN_URL}/task/${taskId}/rows`, { data: { id } })

        return data
    }

    static async getTempnamesNames(): Promise<string[]> {
        const { data } = await axios.get(`${process.env.REACT_APP_MAIN_URL}/tempnames`)

        return data
    }
}
