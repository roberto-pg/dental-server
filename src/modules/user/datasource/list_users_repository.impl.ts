import { IListUsersRepository } from '../domain/repositories/list_users_repository'
import IHttpService from '../../../shared/prisma/http_service'

export class ListUsersRepositoryImpl implements IListUsersRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(): Promise<
    {
      name: string
      email: string
      cpf: string
      password?: string
      card: string
      plain: string
      active: boolean
      admin: boolean
    }[]
  > {
    const users = await this._prismaServer.connectPrisma().user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        password: false,
        card: true,
        plain: true,
        active: true,
        admin: true
      }
    })

    return users
  }
}
