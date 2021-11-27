import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IAuthenticateAdminRepository } from '../domain/repositories/authenticate_admin_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
export class AuthenticateAdminRepositoryImpl
  implements IAuthenticateAdminRepository
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
    admin: boolean
  }> {
    const instanceRepository = container.resolve(
      AuthenticateAdminRepositoryImpl
    )

    const user = await instanceRepository._prismaServer
      .connectPrisma()
      .user.findUnique({
        where: {
          cpf
        }
      })

    return user
  }
}
