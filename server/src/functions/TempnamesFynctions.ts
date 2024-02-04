import Redis from "ioredis";
import { Tempname } from "../models/Tempname";

export const getTempnames = async (redis: Redis) => {
    const tempnames = await redis.lrange('tempnames', 0, -1)

    if (!tempnames.length) {
        return []
    }

    return tempnames
        .map((tempname) => JSON.parse(tempname))
        .reverse()
}

export const setTempname = async (redis: Redis, name: string) => {
    await redis.rpush('tempnames', JSON.stringify({ name, id: new Date().getTime() }))
    const length = await redis.llen('tempnames')

    if (length > 10) {
        await redis.lpop('tempnames')
    }
}

export const deleteTempname = async (redis: Redis, id: number) => {
    const tempnamesData = await redis.lrange('tempnames', 0, -1)

    if (tempnamesData.length) {
        const tempnamesList: Tempname[] = tempnamesData.map((tempname) => JSON.parse(tempname))

        const target = tempnamesList.find(({ id: targetId }) => targetId === id)

        if (target) {
            await redis.lrem('tempnames', 1, JSON.stringify(target))
        }
    }
}
