import Redis from 'ioredis'

export const redis = new Redis({
    port: Number(process.env?.redisport), // Redis port
    host: process.env?.redishost, // Redis host
    family: 4,
    password: process.env.redispass ?? '',
    db: 0,
    keyPrefix: process.env.keyPrefix ?? '',
})
