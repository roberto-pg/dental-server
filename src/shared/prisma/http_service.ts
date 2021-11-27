import { PrismaClient } from '@prisma/client'

export default interface IHttpService {
  connectPrisma(): PrismaClient
}
