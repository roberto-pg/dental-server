import { IListSchedulesRepository } from '../domain/repositories/list_schedules_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { ScheduleModel } from '../../../shared/types/schedule_model'

class ListSchedulesRepositoryImpl implements IListSchedulesRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(): Promise<ScheduleModel[]> {
    const schedules = await this._prismaServer.connectPrisma().schedule.findMany({
      orderBy: [
        {
          month_day: 'asc'
        },
        {
          hour: 'asc'
        }
      ]
    })

    return schedules
  }
}

export { ListSchedulesRepositoryImpl }
