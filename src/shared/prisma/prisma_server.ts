import { PrismaClient } from '@prisma/client'
import IHttpService from './http_service'

class PrismaServer implements IHttpService {
  connectPrisma() {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }

    return global.prisma
  }
}

export { PrismaServer }
