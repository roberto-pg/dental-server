import { IRemoveScheduleRepository } from '../domain/repositories/remove_schedule_repository'
import IHttpService from '../../../shared/prisma/http_service'

class RemoveScheduleRepositoryImpl implements IRemoveScheduleRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<string> {
    const schedule = await this._prismaServer.connectPrisma().schedule.delete({
      where: {
        id: id,
      },
    })

    return schedule.id
  }
}

export { RemoveScheduleRepositoryImpl }
