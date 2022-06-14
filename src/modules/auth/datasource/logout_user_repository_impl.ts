import { ILogoutUserRepository } from '../domain/repositories/logout_user_repository'
import IHttpService from '../../../shared/prisma/http_service'

class LogoutUserRepositoryImpl implements ILogoutUserRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<string> {
    const user = await this._prismaServer.connectPrisma().user.findUnique({
      where: {
        id,
      },
    })

    return user.id
  }
}

export { LogoutUserRepositoryImpl }
