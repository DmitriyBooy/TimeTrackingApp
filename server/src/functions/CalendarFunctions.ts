import Redis from "ioredis";
import {CalendarItem} from "../models/CalendarItem";
import {Task} from "../models/Task";

export const getCalendar = async (redis: Redis) => {
    const data = await redis.hgetall('calendar')

    if (data) {
        return Object.values(data).map((json) => JSON.parse(json))
    }

    return []
}

export const setCalendarItem = async (redis: Redis) => {
    const id = new Date().getTime()
    const date = new Date()

    const calendarItem: CalendarItem = {
        id,
        date,
        rowsCount: 0,
        time: ''
    }

    const taskItem: Task = {
        id,
        date,
        rows: [],
        totalTime: ''
    }

    await redis.hset('calendar', id, JSON.stringify(calendarItem))
    await redis.hset(`tasks`, id, JSON.stringify(taskItem))

    return calendarItem
}

export const deleteCalendarItem = async (redis: Redis, { id }: { id: number }) => {
    await redis.hdel('calendar', id.toString())
    await redis.hdel('tasks', id.toString())
    return id
}
