import { IListSchedulesRepository } from '../domain/repositories/list_schedules_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ListSchedulesRepositoryImpl implements IListSchedulesRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(): Promise<
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
      plain?: string
      card?: string
      scheduled: boolean
      editable: boolean
    }[]
  > {
    const schedules = await this._prismaServer
      .connectPrisma()
      .schedule.findMany({
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
