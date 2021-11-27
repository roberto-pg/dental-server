import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IAuthenticateUserRepository } from '../domain/repositories/authenticate_user_repository'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'
import IHttpService from '../../../shared/prisma/http_service'

@injectable()
export class AuthenticateUserRepositoryImpl
  implements IAuthenticateUserRepository
{
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(cpf: string): Promise<{
    id: string
    name: string
    cpf: string
    password: string
  }> {
    const instanceRepository = container.resolve(AuthenticateUserRepositoryImpl)

    const user = await instanceRepository._prismaServer
      .connectPrisma()
      .user.findUnique({
        where: {
          cpf: cpf
        }
      })

    return user
  }
}
