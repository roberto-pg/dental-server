import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IChangeStatusRepository } from '../domain/repositories/change_status_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ChangeStatusRepositoryImpl implements IChangeStatusRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, active: boolean): Promise<string> {
    const instanceRepository = container.resolve(ChangeStatusRepositoryImpl)

    const user = await instanceRepository._prismaServer
      .connectPrisma()
      .user.update({
        where: {
          id
        },
        data: {
          active: active
        }
      })

    return user.id
  }
}

export { ChangeStatusRepositoryImpl }
