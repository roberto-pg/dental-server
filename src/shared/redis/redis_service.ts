import 'dotenv/config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Redis = require('./redis_connection').redisClient

Redis.on('connect', () => {
  console.log('Redis connected')
})

const setUserCache = (id: string) =>
  Redis.set(`userId:${id}`, id, 'EX', process.env.LOGIN_EXPIRATION_TIME)

const setBlackList = (token: string, id: string) =>
  Redis.set(
    `blackListUserToken:${token}`,
    `UserId: ${id}`,
    'EX',
    process.env.LOGIN_EXPIRATION_TIME
  )

const verifyBlackListToken = (token: string) =>
  Redis.exists(`blackListUserToken:${token}`)

const deleteUserCache = (id: string) => Redis.del(`userId:${id}`)

export { verifyBlackListToken, deleteUserCache, setBlackList, setUserCache }
