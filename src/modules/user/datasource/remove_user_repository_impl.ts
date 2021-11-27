import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IRemoveUserRepository } from '../domain/repositories/remove_user_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class RemoveUserRepositoryImpl implements IRemoveUserRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<string> {
    const instanceRepository = container.resolve(RemoveUserRepositoryImpl)

    const user = await instanceRepository._prismaServer
      .connectPrisma()
      .user.delete({
        where: {
          id
        }
      })

    return user.id
  }
}

export { RemoveUserRepositoryImpl }
