import { IAuthenticateAdminRepository } from '../domain/repositories/authenticate_admin_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { AuthenticatedModel } from '../../../shared/types'

export class AuthenticateAdminRepositoryImpl
  implements IAuthenticateAdminRepository
{
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(cpf: string): Promise<AuthenticatedModel | null> {
    const user = await this._prismaServer.connectPrisma().user.findFirst({
      where: {
        cpf,
      },
    })

    return user
  }
}
