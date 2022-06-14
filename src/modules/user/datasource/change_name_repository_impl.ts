import { IChangeNameRepository } from '../domain/repositories/change_name_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ChangeNameRepositoryImpl implements IChangeNameRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, name: string): Promise<string> {
    const user = await this._prismaServer.connectPrisma().user.update({
      where: {
        id,
      },
      data: {
        name: name,
      },
    })

    return user.id
  }
}

export { ChangeNameRepositoryImpl }
