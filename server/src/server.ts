import 'dotenv/config'
import fastify, { FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import { redis } from './db/redis'
import { deleteCalendarItem, getCalendar, setCalendarItem } from './functions/CalendarFunctions'
import { getTask, addRow, deleteRow, updateRow } from './functions/TasksFynctions'

import { TaskRowChangesPayload } from './models/TaskRow'
import {getTempnames} from "./functions/TempnamesFynctions";

const server = fastify({
    logger: true,
})

const start = async () => {
    await server.register(cors)

    server.get('/calendar', async () => {
        return await getCalendar(redis)
    })

    server.post('/calendar', async () => {
        return setCalendarItem(redis)
    })

    server.delete('/calendar', async ({ body }: FastifyRequest<{ Body: { id: number } }>) => {
        return await deleteCalendarItem(redis, body)
    })

    server.get('/task/:taskId', async ({ params: { taskId } }: FastifyRequest<{ Params: { taskId: string } }>) => {
        return await getTask(redis, taskId)
    })

    server.post('/task/:taskId/rows', async ({ params: { taskId } }: FastifyRequest<{ Params: { taskId: string } }>) => {
        return await addRow(redis, Number(taskId))
    })

    server.delete('/task/:taskId/rows', async ({ params: { taskId }, body: { id } }: FastifyRequest<{ Params: { taskId: string }, Body: { id: number } }>) => {
        return await deleteRow(redis, taskId, id)
    })

    server.put('/task/:taskId/rows', async ({ params: { taskId }, body }: FastifyRequest<{ Params: { taskId: string }, Body: {
            changes: TaskRowChangesPayload,
            rowId: number
        } }>) => {
        return await updateRow(redis, taskId, body)
    })

    server.get('/tempnames', async () => {
        return getTempnames(redis)
    })

    server.listen({ port: 3001 })
}

start()
