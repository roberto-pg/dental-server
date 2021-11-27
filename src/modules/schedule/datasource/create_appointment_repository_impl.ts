import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { ICreateAppointmentRepository } from '../domain/repositories/create_appointment_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class CreateAppointmentRepositoryImpl implements ICreateAppointmentRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(
    id: string,
    cpf: string,
    plain: string,
    card: string,
    scheduled: boolean
  ): Promise<string> {
    const instanceRepository = container.resolve(
      CreateAppointmentRepositoryImpl
    )

    const appointment = await instanceRepository._prismaServer
      .connectPrisma()
      .schedule.update({
        where: {
          id: id
        },
        data: {
          cpf: cpf,
          plain: plain,
          card: card,
          scheduled: scheduled
        }
      })

    return appointment.id
  }
}

export { CreateAppointmentRepositoryImpl }
