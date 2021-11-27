import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { ICreateScheduleRepository } from '../domain/repositories/create_schedule_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class CreateScheduleRepositoryImpl implements ICreateScheduleRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
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
      plain?: string
      card?: string
      scheduled: boolean
      editable: boolean
    }[]
  ): Promise<string> {
    const instanceRepository = container.resolve(CreateScheduleRepositoryImpl)

    await instanceRepository._prismaServer.connectPrisma().schedule.createMany({
      data: newSchedules
    })

    return 'Agendamento criado com sucesso'
  }
}

export { CreateScheduleRepositoryImpl }
