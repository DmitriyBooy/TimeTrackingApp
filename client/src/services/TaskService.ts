import {RowType, TaskType} from '../types/TaskTypes'
import {UpdateTaskPayload} from "../pages/TaskPage/TaskPageTypes";

export class TaskService {
    static getTasksData(): TaskType[] {
        const rawData = localStorage.getItem('task-data')

        if (rawData) {
            return JSON.parse(rawData) as TaskType[]
        }

        return []
    }

    static getTask(targetId: number): TaskType | undefined {
        const rawData = localStorage.getItem('task-data')

        if (rawData) {
            const data = JSON.parse(rawData) as TaskType[]

            return data.find(({ id }) => id === targetId)
        }

        return
    }

    static addRow(taskId: number): void | RowType {
        const newRow: RowType = {
            id: new Date().getTime(),
            from: null,
            to: null,
            title: '',
            taskId,
        }

        const data = this.getTasksData()

        const targetTask = data.find(({ id }) => id === taskId)

        if (targetTask) {
            targetTask.rows.push(newRow)

            localStorage.setItem('task-data', JSON.stringify(data))

            return newRow
        }
    }

    static updateTaskRow({ changes, rowId }: UpdateTaskPayload, taskId: number): RowType | void {
        const data = this.getTasksData()

        const targetTask = data.find(({ id }) => id === taskId)

        if (targetTask) {
            let targetRowIndex = targetTask.rows.findIndex(({ id }) => id === rowId)

            if (targetRowIndex !== -1) {
                targetTask.rows.splice(targetRowIndex, 1, {
                    ...targetTask.rows[targetRowIndex],
                    ...changes,
                })

                localStorage.setItem('task-data', JSON.stringify(data))

                return targetTask.rows[targetRowIndex]
            }
        }
    }

    static deleteRow(targetId: number, taskId: number): number | void {
        const data = this.getTasksData()

        const targetTask = data.find(({ id }) => id === taskId)

        if (targetTask) {
            let targetRowIndex = targetTask.rows.findIndex(({ id }) => id === targetId)

            if (targetRowIndex !== -1) {
                targetTask.rows.splice(targetRowIndex, 1)

                localStorage.setItem('task-data', JSON.stringify(data))

                return targetId
            }
        }
    }
}
