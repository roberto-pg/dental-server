import { IAuthenticateAdminRepository } from '../domain/repositories/authenticate_admin_repository'
import IHttpService from '../../../shared/prisma/http_service'

export class AuthenticateAdminRepositoryImpl
  implements IAuthenticateAdminRepository
{
  private _prismaServer: IHttpService
  constructor(prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(cpf: string): Promise<{
    id: string
    name: string
    cpf: string
    password: string
    admin: boolean
  }> {
    const user = await this._prismaServer.connectPrisma().user.findUnique({
      where: {
        cpf
      }
    })

    return user
  }
}
