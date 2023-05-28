import { IListAppointmentByCpfRepository } from '../domain/repositories/list_appointment_by_cpf_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { ScheduleModel } from '../../../shared/types/schedule_model'

class ListAppointmentByCpfRepositoryImpl implements IListAppointmentByCpfRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(cfp: string): Promise<ScheduleModel[]> {
    const schedules = await this._prismaServer.connectPrisma().schedule.findMany({
      where: {
        cpf: cfp,
        scheduled: true
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
