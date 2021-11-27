import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IRemoveAppointmentRepository } from '../domain/repositories/remove_appointment_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class RemoveAppointmentRepositoryImpl implements IRemoveAppointmentRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(
    id: string,
    patientName: string,
    cpf: string,
    plain: string,
    card: string,
    scheduled: boolean,
    editable: boolean
  ): Promise<string> {
    const instanceRepository = container.resolve(
      RemoveAppointmentRepositoryImpl
    )

    const schedule = await instanceRepository._prismaServer
      .connectPrisma()
      .schedule.update({
        where: {
          id: id
        },
        data: {
          patient_name: patientName,
          cpf: cpf,
          plain: plain,
          card: card,
          scheduled: scheduled,
          editable: editable
        }
      })

    return schedule.id
  }
}

export { RemoveAppointmentRepositoryImpl }
