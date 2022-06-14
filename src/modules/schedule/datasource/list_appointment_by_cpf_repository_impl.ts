import { IListAppointmentByCpfRepository } from '../domain/repositories/list_appointment_by_cpf_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ListAppointmentByCpfRepositoryImpl
  implements IListAppointmentByCpfRepository
{
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(cfp: string): Promise<
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
          cpf: cfp,
          scheduled: true,
        },
        orderBy: [
          {
            month_day: 'asc',
          },
          {
            hour: 'asc',
          },
        ],
      })

    return schedules
  }
}

export { ListAppointmentByCpfRepositoryImpl }
