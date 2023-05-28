import { IListUsersRepository } from '../domain/repositories/list_users_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { UserModel } from '../../../shared/types'

export class ListUsersRepositoryImpl implements IListUsersRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(): Promise<UserModel[]> {
    const users = await this._prismaServer.connectPrisma().user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        password: true,
        card: true,
        plan: true,
        active: true,
        admin: true
      }
    })

    return users
  }
}
