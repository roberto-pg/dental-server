import { IChangeEmailRepository } from '../domain/repositories/change_email_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ChangeEmailRepositoryImpl implements IChangeEmailRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, email: string): Promise<string> {
    const user = await this._prismaServer.connectPrisma().user.update({
      where: {
        id
      },
      data: {
        email: email
      }
    })

    return user.id
  }
}

export { ChangeEmailRepositoryImpl }
