import { ICreateScheduleRepository } from '../domain/repositories/create_schedule_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { ScheduleModel2 } from '../../../shared/types'

class CreateScheduleRepositoryImpl implements ICreateScheduleRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(newSchedules: ScheduleModel2[]): Promise<string> {
    await this._prismaServer.connectPrisma().schedule.createMany({
      data: newSchedules,
    })

    return 'Agendamento criado com sucesso'
  }
}

export { CreateScheduleRepositoryImpl }
