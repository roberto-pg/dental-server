import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListAppointmentByCpfRepository } from '../domain/repositories/list_appointment_by_cpf_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListAppointmentByCpfRepositoryImpl
  implements IListAppointmentByCpfRepository
{
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(
    cfp: string,
    currentDay: Date
  ): Promise<
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
    const instanceRepository = container.resolve(
      ListAppointmentByCpfRepositoryImpl
    )

    const schedules = await instanceRepository._prismaServer
      .connectPrisma()
      .schedule.findMany({
        where: {
          cpf: cfp,
          scheduled: true,
          month_day: {
            gte: currentDay.toISOString()
          }
        },
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

export { ListAppointmentByCpfRepositoryImpl }
