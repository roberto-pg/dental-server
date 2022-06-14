import { ICreateScheduleRepository } from '../domain/repositories/create_schedule_repository'
import IHttpService from '../../../shared/prisma/http_service'

class CreateScheduleRepositoryImpl implements ICreateScheduleRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(
    newSchedules: {
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
  ): Promise<string> {
    await this._prismaServer.connectPrisma().schedule.createMany({
      data: newSchedules,
    })

    return 'Agendamento criado com sucesso'
  }
}

export { CreateScheduleRepositoryImpl }
