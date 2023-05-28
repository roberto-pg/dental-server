import { IChangeStatusRepository } from '../domain/repositories/change_status_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ChangeStatusRepositoryImpl implements IChangeStatusRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, active: boolean): Promise<string> {
    const user = await this._prismaServer.connectPrisma().user.update({
      where: {
        id
      },
      data: {
        active: active
      }
    })

    return user.id
  }
}

export { ChangeStatusRepositoryImpl }
