import fastify from 'fastify'
import { redis } from './db/redis'
import {getCalendar, setCalendar} from './functions/CalendarFunctions'

const server = fastify({ logger: true })

server.get('/calendar', async (request, reply) => {
    return await getCalendar(redis)
})

server.post('/calendar', async (request, reply) => {
    setCalendar(redis)

    return { asd: 'asd' }
})

server.listen({ port: 3000 })
