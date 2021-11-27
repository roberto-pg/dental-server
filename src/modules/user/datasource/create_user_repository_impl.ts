import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { ICreateUserRepository } from '../domain/repositories/create_user_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
export class CreateUserRepositoryImpl implements ICreateUserRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(
    name: string,
    email: string,
    cpf: string,
    password: string,
    card: string,
    plain: string,
    active: boolean,
    admin: boolean
  ): Promise<{
    name: string
    email: string
    cpf: string
    password: string
    card: string
    plain: string
    active: boolean
    admin: boolean
  }> {
    const instanceRepository = container.resolve(CreateUserRepositoryImpl)

    const user = await instanceRepository._prismaServer
      .connectPrisma()
      .user.create({
        data: {
          name,
          email,
          cpf,
          password,
          card,
          plain,
          active,
          admin
        }
      })
    return user
  }
}
