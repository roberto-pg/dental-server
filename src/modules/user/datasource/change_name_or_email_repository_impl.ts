import { IChangeNameOrEmailRepository } from '../domain/repositories/change_name_or_email_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ChangeNameOrEmailRepositoryImpl implements IChangeNameOrEmailRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, name: string, email: string): Promise<string> {
    const user = await this._prismaServer.connectPrisma().user.update({
      where: {
        id
      },
      data: {
        name: name,
        email: email
      }
    })

    return user.id
  }
}

export { ChangeNameOrEmailRepositoryImpl }
