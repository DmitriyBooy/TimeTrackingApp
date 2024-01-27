import Redis from "ioredis";

export const getTempnames = async (redis: Redis) => {
    const keys = await redis.keys('tempnames:*')

    console.log(keys)
    if (!keys.length) {
        return []
    }

    return keys.map((key) => key.replace('tempnames:', ''))
}

export const setTempname = (redis: Redis, title: string) => {
    redis.setex(`tempnames:${title}`, 172800, new Date().toString())
}
