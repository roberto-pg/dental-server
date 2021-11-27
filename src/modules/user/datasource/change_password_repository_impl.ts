import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IChangePasswordRepository } from '../domain/repositories/change_password.repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ChangePasswordRepositoryImpl implements IChangePasswordRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, password: string): Promise<string> {
    const instanceRepository = container.resolve(ChangePasswordRepositoryImpl)

    const user = await instanceRepository._prismaServer
      .connectPrisma()
      .user.update({
        where: {
          id
        },
        data: {
          password: password
        }
      })

    return user.id
  }
}

export { ChangePasswordRepositoryImpl }
