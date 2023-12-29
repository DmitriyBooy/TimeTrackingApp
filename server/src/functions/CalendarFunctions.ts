import Redis from "ioredis";

export const getCalendar = async (redis: Redis) => {
    return await redis.hget('calendar', 'field1')
}

export const setCalendar = async (redis: Redis) => {
    redis.hset('calendar', {
        field1: 'field1',
        field2: 'field2',
        field3: 'field3',
    })
}
