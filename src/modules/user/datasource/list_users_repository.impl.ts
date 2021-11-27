import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListUsersRepository } from '../domain/repositories/list_users_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
export class ListUsersRepositoryImpl implements IListUsersRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
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
    const instanceRepository = container.resolve(ListUsersRepositoryImpl)

    const users = await instanceRepository._prismaServer
      .connectPrisma()
      .user.findMany({
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
