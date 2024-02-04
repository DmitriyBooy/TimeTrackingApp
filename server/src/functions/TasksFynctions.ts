import Redis from 'ioredis'
import { Task } from "../models/Task";
import { TaskRowChangesPayload } from "../models/TaskRow";

import { setTempname } from './TempnamesFynctions'
import { CalendarItem } from "../models/CalendarItem";

export const getTask = async (redis: Redis, id: string) => {
    const taskData = await redis.hget('tasks', id)

    if (taskData) {
        return JSON.parse(taskData)
    }
}

export const addRow = async (redis: Redis, taskId: number) => {
    const taskData = await redis.hget('tasks', taskId.toString())
    const calendarData = await redis.hget('calendar', taskId.toString())

    const newRow = {
        id: new Date().getTime(),
        from: null,
        to: null,
        title: '',
        taskId,
    }

    if (taskData && calendarData) {
        const task: Task = JSON.parse(taskData)
        const calendarItem: CalendarItem = JSON.parse(calendarData)

        task.rows.push(newRow)
        calendarItem.rowsCount = task.rows.length

        redis.hset('tasks', taskId.toString(), JSON.stringify(task))
        redis.hset('calendar', taskId, JSON.stringify(calendarItem))
    }

    return newRow
}

export const deleteRow = async (redis: Redis, taskId: string, rowId: number): Promise<void | number> => {
    const taskData = await redis.hget('tasks', taskId)
    const calendarData = await redis.hget('calendar', taskId)

    if (taskData && calendarData) {
        const task: Task = JSON.parse(taskData)
        const calendarItem: CalendarItem = JSON.parse(calendarData)

        task.rows = task.rows.filter(({ id }) => id !== rowId)
        calendarItem.rowsCount = task.rows.length

        redis.hset('tasks', taskId, JSON.stringify(task))
        redis.hset('calendar', taskId, JSON.stringify(calendarItem))

        return rowId
    }
}

export const updateRow = async (redis: Redis, taskId: string, { id: rowId, changes }: {id: number, changes: TaskRowChangesPayload}): Promise<any> => {
    const taskData = await redis.hget('tasks', taskId)

    if (taskData) {
        const task: Task = JSON.parse(taskData)

        const targetRowIndex = task.rows.findIndex(({ id }) => id === rowId)

        if (targetRowIndex !== -1) {
            const newRow = {
                ...task.rows[targetRowIndex],
                ...changes,
            }

            if (changes.title && !task.rows[targetRowIndex].title ) {
                setTempname(redis, changes.title)
            }

            task.rows[targetRowIndex] = newRow

            redis.hset('tasks', taskId, JSON.stringify(task))

            return newRow
        }
    }
}
