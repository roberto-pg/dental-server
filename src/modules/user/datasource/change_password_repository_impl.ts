import { IChangePasswordRepository } from '../domain/repositories/change_password.repository'
import IHttpService from '../../../shared/prisma/http_service'

class ChangePasswordRepositoryImpl implements IChangePasswordRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, password: string): Promise<string> {
    const user = await this._prismaServer.connectPrisma().user.update({
      where: {
        id
      },
      data: {
        password: password
      }
    })

    return user.id
  }
}

export { ChangePasswordRepositoryImpl }
