import Fastify from 'fastify'
import { redis } from './db/redis.js'

redis.set('key', 'value')

const fastify = Fastify({ logger: true })

fastify.get('/calendar', async (request, reply) => {
    const test = await redis.get('key')

    return { hello: test }
})

fastify.listen({ port: 3000 })
