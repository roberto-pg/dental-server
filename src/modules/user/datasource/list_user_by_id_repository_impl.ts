import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListUserByIdRepository } from '../domain/repositories/list_user_by_id_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListUserByIdRepositoryImpl implements IListUserByIdRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<{
    name: string
    email: string
    cpf: string
    password?: string
    card: string
    plain: string
    active: boolean
    admin: boolean
  }> {
    const instanceRepository = container.resolve(ListUserByIdRepositoryImpl)

    const user = await instanceRepository._prismaServer
      .connectPrisma()
      .user.findUnique({
        where: {
          id
        },
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

    return user
  }
}

export { ListUserByIdRepositoryImpl }
