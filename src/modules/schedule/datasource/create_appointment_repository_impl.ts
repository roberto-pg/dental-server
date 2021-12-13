import { ICreateAppointmentRepository } from '../domain/repositories/create_appointment_repository'
import IHttpService from '../../../shared/prisma/http_service'

class CreateAppointmentRepositoryImpl implements ICreateAppointmentRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(
    id: string,
    patientName: string,
    cpf: string,
    plain: string,
    card: string,
    scheduled: boolean
  ): Promise<string> {
    const appointment = await this._prismaServer
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
          scheduled: scheduled
        }
      })

    return appointment.id
  }
}

export { CreateAppointmentRepositoryImpl }
