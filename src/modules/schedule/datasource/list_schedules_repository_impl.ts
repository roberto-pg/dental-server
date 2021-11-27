import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListSchedulesRepository } from '../domain/repositories/list_schedules_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListSchedulesRepositoryImpl implements IListSchedulesRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(): Promise<
    {
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
    const instanceRepository = container.resolve(ListSchedulesRepositoryImpl)

    const schedules = await instanceRepository._prismaServer
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
