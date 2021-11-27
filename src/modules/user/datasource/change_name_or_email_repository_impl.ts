import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IChangeNameOrEmailRepository } from '../domain/repositories/change_name_or_email_repository'
import container from '../../../shared/ioc/inversify_config'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'

@injectable()
class ChangeNameOrEmailRepositoryImpl implements IChangeNameOrEmailRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, name: string, email: string): Promise<string> {
    const instanceRepository = container.resolve(
      ChangeNameOrEmailRepositoryImpl
    )

    const user = await instanceRepository._prismaServer
      .connectPrisma()
      .user.update({
        where: {
          id
        },
        data: {
          name: name,
          email: email
        }
      })

    return user.id
  }
}

export { ChangeNameOrEmailRepositoryImpl }
