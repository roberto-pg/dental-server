import { IListSchedulesByScheduledRepository } from '../domain/repositories/list_schedules_by_scheduled_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ListSchedulesByScheduledRepositoryImpl
  implements IListSchedulesByScheduledRepository
{
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(scheduledBool: boolean): Promise<
    {
      id: string
      doctor_id: string
      doctor_name: string
      specialty: string
      month_day: string
      week_day: string
      hour: string
      patient_name?: string
      cpf?: string
      plan?: string
      card?: string
      scheduled: boolean
      editable: boolean
    }[]
  > {
    const schedules = await this._prismaServer
      .connectPrisma()
      .schedule.findMany({
        where: {
          scheduled: scheduledBool
        }
      })
    return schedules
  }
}

export { ListSchedulesByScheduledRepositoryImpl }
