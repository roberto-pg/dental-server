import { PrismaClient } from '@prisma/client'
import IHttpService from './http_service'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

class PrismaServer implements IHttpService {
  connectPrisma() {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }

    return global.prisma
  }
}

export { PrismaServer }
