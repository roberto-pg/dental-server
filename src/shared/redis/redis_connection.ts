import Redis from 'ioredis'
require('dotenv').config()

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS
})

module.exports = { redisClient }
