import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IRemoveScheduleRepository } from '../domain/repositories/remove_schedule_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class RemoveScheduleRepositoryImpl implements IRemoveScheduleRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<string> {
    const instanceRepository = container.resolve(RemoveScheduleRepositoryImpl)

    const schedule = await instanceRepository._prismaServer
      .connectPrisma()
      .schedule.delete({
        where: {
          id: id
        }
      })

    return schedule.id
  }
}

export { RemoveScheduleRepositoryImpl }
