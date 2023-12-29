import IORedis from 'ioredis'

export const redis = new IORedis({
    port: process.env?.redisport, // Redis port
    host: process.env?.redishost, // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: process.env.redispass ?? '',
    db: process.env.redisdb ?? 0,
    keyPrefix: process.env.keyPrefix ?? '',
  })
