import { IRemoveUserRepository } from '../domain/repositories/remove_user_repository'
import IHttpService from '../../../shared/prisma/http_service'

class RemoveUserRepositoryImpl implements IRemoveUserRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<string> {
    const user = await this._prismaServer.connectPrisma().user.delete({
      where: {
        id
      }
    })

    return user.id
  }
}

export { RemoveUserRepositoryImpl }
