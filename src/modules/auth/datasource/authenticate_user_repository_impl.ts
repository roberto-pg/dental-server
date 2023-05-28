import { IAuthenticateUserRepository } from '../domain/repositories/authenticate_user_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { AuthenticatedModel } from '../../../shared/types/authenticate_model'

export class AuthenticateUserRepositoryImpl implements IAuthenticateUserRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(cpf: string): Promise<AuthenticatedModel | null> {
    const user = await this._prismaServer.connectPrisma().user.findUnique({
      where: {
        cpf: cpf
      }
    })

    return user
  }
}
