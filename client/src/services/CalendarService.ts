import {KalendarDataItem} from "../types/KalendarTypes";
import moment from "moment";
import {TaskType} from "../types/TaskTypes";
import {TaskService} from "./TaskService";

export default class CalendarService {
    static getData(): KalendarDataItem[] {
        const data = localStorage.getItem('calendar-data')

        if (data) {
            return JSON.parse(data)
        }

        return []
    }

    static addTask(): KalendarDataItem {
        const id = new Date().getTime()
        const date = moment().format('yyyy-MM-DD')

        const newKalendarTask: KalendarDataItem = {
            id,
            rowsCount: 0,
            time: '',
            date,
        }

        const data = [
            ...this.getData(),
            newKalendarTask
        ]

        localStorage.setItem('calendar-data', JSON.stringify(data))

        const tasksData = localStorage.getItem('task-data')

        const newTask = {
            date,
            id: id,
            rows: [],
            totalTime: ''
        }

        if (tasksData) {
            const data = JSON.parse(tasksData) as TaskType[]

            data.push(newTask)

            localStorage.setItem('task-data', JSON.stringify(data))
        } else {
            localStorage.setItem('task-data', JSON.stringify([newTask]))
        }

        return newKalendarTask
    }

    static deleteTask(taskId: number): number | void {
        const data = this.getData()

        const targetKalendarItemIndex = data.findIndex(({ id }) => id === taskId)

        if (targetKalendarItemIndex !== -1) {
            const updatedData = data.filter(({ id }) => id !== taskId)

            localStorage.setItem('calendar-data', JSON.stringify(updatedData))
        }

        const tasksData = TaskService.getTasksData()

        const targetTaskIndex = tasksData.findIndex(({ id }) => id === taskId)

        if (targetTaskIndex) {
            const updatedData = tasksData.filter(({ id }) => id !== taskId)

            localStorage.setItem('task-data', JSON.stringify(updatedData))
        }

        return taskId
    }
}
