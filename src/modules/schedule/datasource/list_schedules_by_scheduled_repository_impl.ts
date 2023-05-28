import { IListSchedulesByScheduledRepository } from '../domain/repositories/list_schedules_by_scheduled_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { ScheduleModel } from '../../../shared/types/schedule_model'

class ListSchedulesByScheduledRepositoryImpl implements IListSchedulesByScheduledRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(scheduledBool: boolean): Promise<ScheduleModel[]> {
    const schedules = await this._prismaServer.connectPrisma().schedule.findMany({
      where: {
        scheduled: scheduledBool
      }
    })
    return schedules
  }
}

export { ListSchedulesByScheduledRepositoryImpl }
