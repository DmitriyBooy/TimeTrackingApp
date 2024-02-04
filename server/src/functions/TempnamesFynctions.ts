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
    const newTempname = { name, id: new Date().getTime() }

    const tempnames = await redis.hgetall('test:tempnames')

    await redis.rpush('tempnames', JSON.stringify(newTempname))
    const length = await redis.llen('tempnames')

    if (length > 10) {
        await redis.lpop('tempnames')
    }

    return newTempname
}

export const updateTempname = async (redis: Redis, updatedTempname: Tempname) => {
    const tempnamesData = await redis.lrange('tempnames', 0, -1)

    if (tempnamesData) {
        const tempnamesList: Tempname[] = tempnamesData.map((tempname) => JSON.parse(tempname))

        const target = tempnamesList.find(({ id }) => updatedTempname.id === id)
        const targetIndex = tempnamesList.findIndex(({ id }) => updatedTempname.id === id)

        if (target) {
            await redis.lset('tempnames', targetIndex, JSON.stringify(updatedTempname))
            return updatedTempname
        }
    }
}

export const deleteTempname = async (redis: Redis, id: number) => {
    const tempnamesData = await redis.lrange('tempnames', 0, -1)

    if (tempnamesData.length) {
        const tempnamesList: Tempname[] = tempnamesData.map((tempname) => JSON.parse(tempname))

        const target = tempnamesList.find(({ id: targetId }) => targetId === id)

        if (target) {
            await redis.lrem('tempnames', 1, JSON.stringify(target))

            return target.id
        }
    }
}
