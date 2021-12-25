import { ICreateUserRepository } from '../domain/repositories/create_user_repository'
import IHttpService from '../../../shared/prisma/http_service'

export class CreateUserRepositoryImpl implements ICreateUserRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(
    name: string,
    email: string,
    cpf: string,
    password: string,
    card: string,
    plan: string,
    active: boolean,
    admin: boolean
  ): Promise<{
    name: string
    email: string
    cpf: string
    password: string
    card: string
    plan: string
    active: boolean
    admin: boolean
  }> {
    const user = await this._prismaServer.connectPrisma().user.create({
      data: {
        name,
        email,
        cpf,
        password,
        card,
        plan,
        active,
        admin
      }
    })
    return user
  }
}
