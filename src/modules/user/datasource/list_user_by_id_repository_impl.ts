import { IListUserByIdRepository } from '../domain/repositories/list_user_by_id_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ListUserByIdRepositoryImpl implements IListUserByIdRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<{
    name: string
    email: string
    cpf: string
    password?: string
    card: string
    plan: string
    active: boolean
    admin: boolean
  }> {
    const user = await this._prismaServer.connectPrisma().user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        password: false,
        card: true,
        plan: true,
        active: true,
        admin: true,
      },
    })

    return user
  }
}

export { ListUserByIdRepositoryImpl }
