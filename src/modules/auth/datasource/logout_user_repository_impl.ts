import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { ILogoutUserRepository } from '../domain/repositories/logout_user_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class LogoutUserRepositoryImpl implements ILogoutUserRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<string> {
    const instanceRepository = container.resolve(LogoutUserRepositoryImpl)

    const user = await instanceRepository._prismaServer
      .connectPrisma()
      .user.findUnique({
        where: {
          id
        }
      })

    return user.id
  }
}

export { LogoutUserRepositoryImpl }
